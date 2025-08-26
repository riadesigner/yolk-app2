const express = require('express')
const UsersService = require('../users/users.service')
const CompanyService = require('../company/company.service')
const OrdersService = require('./orders.service')
const multer = require('multer');
const AWS = require('aws-sdk');

const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const {fixBrokenEncoding} = require('../utils/fixBrokenEncoding')
const {createSafeFilename} = require('../utils/createSafeFilename')

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
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only document files are allowed! (PDF, DOC, PPT, Excel)'), false);
    }
  }
});



// GET /orders – получить список заказов
// POST /orders – создать новый заказ
// GET /orders/:id – получить один заказ
// PUT /orders/:id – полностью обновить заказ
// PATCH /orders/:id – частично обновить заказ
// DELETE /orders/:id – удалить заказ

// Более специфичные роуты - выше

router.get('/orders/by-company/:companyId',
    asyncHandler(async (req, res) => { 
        const { companyId } = req.params;
        const orders = await OrdersService.find({company:companyId});
        sendSuccess(res, { orders:orders });
    })
);
router.get('/orders/:id',    
    asyncHandler(async (req, res) => { 
        const { id } = req.params;
        const order = await OrdersService.findById(id);                 
        if (!order) {
            return sendError(res, 'Order not found', 404);
        }
        sendSuccess(res, { order:order.toJSON() });        
    })
);
router.get('/orders',    
    asyncHandler(async (req, res) => {         
        const { mode } = req.params;        
        const orders = await OrdersService.findAll();
        console.log('orders', orders);
        if (!orders) {
            return sendError(res, 'Order not found', 404);
        }
        const retOrders = orders.map(order=>order.toJSON());
        sendSuccess(res, { orders:retOrders });        
    })
);


router.patch('/orders/:orderId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        const { orderId } = req.params;
        const { orderData } = req.body;

        const user = await UsersService.findByEmail(req.user.email);
        if (!user) {  return sendError(res, 'Unknown user', 404); }        
        if (user.role !=='company') {  return sendError(res, 'User not autorized for this action', 403);}                

        const orderUpdateDto = {            
            ...orderData,
        }

        console.log('orderUpdateDto', orderUpdateDto);

        const orderUpdated = await OrdersService.update(orderId, orderUpdateDto);
        
        sendSuccess(res, { 
            order: orderUpdated,
            message: 'Заказ обновлен', 
        });
    })
);


router.put('/orders/:companyId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        const { companyId } = req.params;
        const { orderData } = req.body;

        const user = await UsersService.findByEmail(req.user.email);
        if (!user) {  return sendError(res, 'Unknown user', 404); }        
        if (user.role !=='company') {  return sendError(res, 'User not autorized for this action', 403);}                

        const company = await CompanyService.findById(companyId);
        if(!company){ return sendError(res, `Company with id ${companyId} not found`, 404); }

        const orderCreateDto = {
            company: companyId,
            ...orderData,
        }

        const orderCreated = await OrdersService.create(orderCreateDto);
        
        sendSuccess(res, { 
            order: orderCreated,
            message: 'Заказ создан', 
        });
    })
);


router.post('/orders/upload-file',
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

            if(req.body.originalName){
                // Декодируем base64
                originalName = decodeURIComponent(atob(req.body.originalName));
            }else{
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
            const order = await OrdersService.findById(orderId)
            
            const uploadedFile = {
                        key: result.Key,
                        url: result.Location,
                        originalName: originalName,
                        type: req.file.mimetype,
                        size: req.file.size,
                    }

            const existFiles = order.files || [];         

            const orderUpdateDto = {
                files:[
                    ...existFiles,
                    uploadedFile,
                ]
            }

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
    })
);


router.delete('/orders/delete-file',
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
            const updatedOrder = await OrdersService.deleteFromFiles(orderId, fileKey);
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
        
    })
);


module.exports = router;