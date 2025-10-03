const express = require('express');
const UsersService = require('../users/users.service');
const CompaniesService = require('../companies/companies.service');
const BillsService = require('../bills/bills.service');
const OrdersService = require('./orders.service');
const NotificationsService = require('../notifications/notifications.service');
const multer = require('multer');
const AWS = require('aws-sdk');
const AppError = require('../middleware/AppError');

const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const { createSafeFilename } = require('../utils/createSafeFilename');
const optionalAuth = require('../middleware/optionalAuth');

const router = express.Router();

// Настройка S3 клиента для Yandex Cloud
const s3 = new AWS.S3({
  endpoint: process.env.YANDEX_ENDPOINT,
  region: process.env.YANDEX_REGION,
  accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
  secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
});

// Настройка Multer для файлов
const uploadDocuments = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB лимит
  },
  fileFilter: (req, file, cb) => {
    // Разрешенные MIME типы для документов
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error('Only document files are allowed! (PDF, DOC, PPT, Excel)'),
        false,
      );
    }
  },
});

// GET /orders – получить список заказов
// POST /orders – создать новый заказ
// GET /orders/:id – получить один заказ
// PUT /orders/:id – полностью обновить заказ
// PATCH /orders/:id – частично обновить заказ
// DELETE /orders/:id – удалить заказ

// Более специфичные роуты - выше

router.get(
  '/orders/by-company/:companyId',
  asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    const orders = await OrdersService.find({ company: companyId });
    sendSuccess(res, { orders: orders });
  }),
);

router.get(
  '/orders/search/:userInput',
  asyncHandler(async (req, res) => {
    // Отключаем кэширование
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const { userInput } = req.params;

    const page = req.query.page || 1;
    const limit = req.query.limit || 3;

    const { data: orders, pagination } = await OrdersService.findAll({
      page,
      limit,
      userInput,
    });

    const retOrders = orders.map((order) => order.toJSON());
    sendSuccess(res, { orders: retOrders, pagination });
  }),
);

router.get(
  '/orders/by-contractor/:contractorId',
  asyncHandler(async (req, res) => {
    const { contractorId } = req.params;
    const orders = await OrdersService.find({ contractor: contractorId });
    sendSuccess(res, { orders: orders });
  }),
);

router.get(
  '/orders/:id',
  optionalAuth,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    let order = await OrdersService.findById(id);
    if (!order) {
      return sendError(res, 'Order not found', 404);
    }
    console.log(req.user);
    // Записываем просмотр только для авторизованных дизайнеров
    if (req.user && req.user.role === 'designer') {
      await OrdersService.recordView(id, req.user.id);
      order = await OrdersService.findById(id);
    }
    sendSuccess(res, { order: order.toJSON() });
  }),
);

router.get(
  '/orders',
  optionalAuth,
  asyncHandler(async (req, res) => {
    // Отключаем кэширование
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const date = req.query.date || null; // "up | down"
    const price = req.query.price || null; // "up | down"
    const cats = req.query.cats || null; // "...catId:catId:catId"

    const categories = cats !== null ? cats.split(':') : [];

    let sort = null;

    if (date !== null) {
      if (date === 'up') {
        sort = { createdAt: 1 };
      } else {
        sort = { createdAt: -1 };
      }
    } else if (price !== null) {
      if (price === 'up') {
        sort = { price: 1 };
      } else {
        sort = { price: -1 };
      }
    } else {
      sort = null;
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    let withBills = false;
    if (req.user && req.user.role === 'administrator') {
      withBills = true;
    }

    const { data: orders, pagination } = await OrdersService.findAll({
      sort,
      page,
      limit,
      categories,
      withBills,
    });

    console.log('--- orders ----', orders);

    const retOrders = orders.map((order) => order.toJSON());
    sendSuccess(res, { orders: retOrders, pagination });
  }),
);

router.patch(
  '/orders/:orderId/set-contractor/:contractorId',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { orderId, contractorId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== 'company') {
      throw new AppError(
        'Назначить Исполнителя может только Компания (Заказчик)',
        403,
      );
    }

    // set contractor
    const orderUpdated = await OrdersService.setContractor(
      orderId,
      contractorId,
    );

    // send notifications
    if (
      !(await NotificationsService.sendAboutNewContractor({
        customerId: userId,
        contractorId,
        orderId,
      }))
    ) {
      throw new AppError(
        `Не удалось отправить сообщение о назначении Исполнителя ${contractorId} для заказа ${orderId}`,
        500,
      );
    }

    // create the bill
    const totalFound = await BillsService.count({ receiver: userId });
    const key = totalFound.toString().padStart(2, '0'); // номер счета
    const theBill = await BillsService.create({
      direction: 'FROM_YOLK',
      receiver: userId,
      key: key,
      order: orderId,
      amount: orderUpdated.price,
      description: `Авансовый платеж по Договору. Оплата заказа № ${orderId}`, // Основание счета
    });

    // send notification about check the bill
    if (
      !(await NotificationsService.sendAboutCheckTheBill({
        customerId: userId,
        contractorId,
        orderId,
        billId: theBill._id,
      }))
    ) {
      throw new AppError(
        `Не удалось отправить сообщение о создании счета для Заказчика (для перевода аванса на счет Yolk)`,
        500,
      );
    }

    sendSuccess(res, {
      order: orderUpdated,
    });
  }),
);

router.patch(
  '/orders/:orderId/new-respond',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole !== 'designer') {
      return sendError(res, 'Откликнуться на заказ может только Дизайнер', 403);
    }

    const orderUpdated = await OrdersService.addRespond(orderId, userId);

    if (!orderUpdated) {
      return sendError(res, `Не удалось откликнуться на заказ ${orderId}`, 500);
    }

    const companyId = orderUpdated.company;

    // send notifications
    const company = await CompaniesService.findById(companyId);
    if (!company) {
      return sendError(
        res,
        `Не удалось загрузить информацию о компании ${companyId}`,
        404,
      );
    }

    if (
      !(await NotificationsService.sendAboutNewRespond({
        designerId: userId,
        orderId,
        customerId: company.userId,
      }))
    ) {
      return sendError(res, 'Не удалось отправить сообщение', 500);
    }

    sendSuccess(res, {
      responded: orderUpdated.responded,
      message: 'ok',
    });
  }),
);

router.patch(
  '/orders/:orderId/set-done',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'Unknown user', 404);
    }

    const order = await OrdersService.findById(orderId);
    if (!order) {
      return sendError(res, 'Unknown order', 404);
    }

    if (
      user.role !== 'company' ||
      user.id !== order.company.userId.toString()
    ) {
      return sendError(res, 'User not authorized for this action', 403);
    }

    const orderUpdated = await OrdersService.update(orderId, {
      status: 'DONE',
    });

    try {
      const admin = (await UsersService.findAdmins())[0];
      console.log('admin', admin);
      const totalFound = await BillsService.count({ receiver: admin.id });
      const key = totalFound.toString().padStart(2, '0'); // номер счета
      const bill = await BillsService.create({
        direction: 'TO_YOLK',
        receiver: admin.id,
        key,
        order: orderUpdated.id,
        amount:
          orderUpdated.price * (1 - process.env.VITE_PLATFORM_COMMISSION / 100),
        sender: orderUpdated.contractor.toString(),
        description: `Счет на получение гонорара. Заказ № ${orderId}`, // Основание счета
      });

      await NotificationsService.sendWorkCompletedToAdministrator(
        admin.id,
        orderUpdated.id,
        bill.id,
      );
      await NotificationsService.sendWorkCompletedToDesigner(
        orderUpdated.contractor.toString(),
        orderUpdated.id,
      );
      await NotificationsService.sendWorkCompletedToCompany(
        orderUpdated.company.userId.toString(),
        orderUpdated.id,
      );
    } catch (e) {
      console.error(e);
    }

    sendSuccess(res, {
      order: orderUpdated, //68de4e4989502dd12ea313d9 68de4e4989502dd12ea313d9
      message: 'Заказ обновлен', //68de4a2a89502dd12ea313a0 68de4a2a89502dd12ea313a0
    });
  }),
);

router.patch(
  '/orders/:orderId',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderData } = req.body;

    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'Unknown user', 404);
    }
    if (user.role !== 'company') {
      return sendError(res, 'User not authorized for this action', 403);
    }

    const orderUpdateDto = {
      ...orderData,
    };

    console.log('orderUpdateDto', orderUpdateDto);

    const orderUpdated = await OrdersService.update(orderId, orderUpdateDto);

    sendSuccess(res, {
      order: orderUpdated,
      message: 'Заказ обновлен',
    });
  }),
);

router.put(
  '/orders/:companyId',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    const { orderData } = req.body;

    const user = await UsersService.findByEmail(req.user.email);
    if (!user) {
      return sendError(res, 'Unknown user', 404);
    }
    if (user.role !== 'company') {
      return sendError(res, 'User not autorized for this action', 403);
    }

    const company = await CompaniesService.findById(companyId);
    if (!company) {
      return sendError(res, `Company with id ${companyId} not found`, 404);
    }

    const orderCreateDto = {
      company: companyId,
      ...orderData,
    };

    const orderCreated = await OrdersService.create(orderCreateDto);

    sendSuccess(res, {
      order: orderCreated,
      message: 'Заказ создан',
    });
  }),
);

router.post(
  '/orders/upload-file',
  passport.authenticate('jwt', { session: false }),
  uploadDocuments.single('file'),
  asyncHandler(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const orderId = req.body.orderId;
      if (!orderId) {
        return res.status(400).json({ error: `Not found order ${orderId}` });
      }

      const fileBuffer = req.file.buffer;

      // Проверяем размер файла
      if (fileBuffer.length > 10 * 1024 * 1024) {
        return res.status(400).json({ error: 'File is too large' });
      }

      let originalName;

      if (req.body.originalName) {
        // Декодируем base64
        originalName = decodeURIComponent(atob(req.body.originalName));
      } else {
        originalName = req.file.originalName;
      }

      const safeName = createSafeFilename(originalName);

      const params = {
        Bucket: process.env.YANDEX_BUCKET_NAME,
        Key: `documents/${Date.now()}_${safeName}`, // ← добавляем папку documents
        Body: fileBuffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read',
      };

      const result = await s3.upload(params).promise();

      // обновляем список файлов заказа
      const order = await OrdersService.findById(orderId);

      const uploadedFile = {
        key: result.Key,
        url: result.Location,
        originalName: originalName,
        type: req.file.mimetype,
        size: req.file.size,
      };

      const existFiles = order.files || [];

      const orderUpdateDto = {
        files: [...existFiles, uploadedFile],
      };

      const updatedOrder = await OrdersService.update(orderId, orderUpdateDto);
      if (!updatedOrder) {
        return sendError(res, 'Не удалось обоновить данные заказа', 500);
      }
      console.log('saved order', orderId);

      sendSuccess(res, {
        message: 'File uploaded successfully',
        uploadedFile: uploadedFile,
        files: updatedOrder.files,
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }),
);

router.delete(
  '/orders/delete-file',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { fileKey, orderId } = req.body; // Всё из тела

    try {
      const params = {
        Bucket: process.env.YANDEX_BUCKET_NAME,
        Key: fileKey,
      };

      await s3.deleteObject(params).promise();

      // обновляем галерею компании
      const updatedOrder = await OrdersService.deleteFromFiles(
        orderId,
        fileKey,
      );
      if (!updatedOrder) {
        return sendError(res, 'Не удалось обоновить данные заказа', 500);
      }
      console.log('saved order', orderId);

      sendSuccess(res, {
        message: 'Данные удалены',
        files: updatedOrder.files,
      });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Failed to delete file' });
    }
  }),
);

router.delete(
  '/orders/:orderId',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await OrdersService.findById(orderId);

      if (order.contractor) {
        throw new AppError(
          `Заказ нельзя удалить, так как у него есть Исполнитель.`,
          403,
        );
      }

      // удаляем сначала все файлы заказа
      const orderFiles = order.files;

      for (const file of orderFiles) {
        const params = {
          Bucket: process.env.YANDEX_BUCKET_NAME,
          Key: file.key,
        };
        await s3.deleteObject(params).promise();
      }

      // удаляем заказ
      await OrdersService.deleteById(orderId);

      sendSuccess(res, {
        message: `Заказ ${orderId} удален`,
      });
    } catch (err) {
      throw new AppError(err, 500);
    }
  }),
);

module.exports = router;
