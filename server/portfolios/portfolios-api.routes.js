const express = require('express')
const UsersService = require('../users/users.service')
const OrdersService = require('./portfolios.service')
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

// Настройка Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Увеличим лимит до 10MB для исходного файла
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// GET /portfolios – получить список всех 
// GET /portfolios/:portfolioId – получить одно 
// PUT /portfolios/:designerId – добавить одно портфолио для дизайнера
// PATCH /portfolios/:portfolioId – частично обновить одно
// DELETE /portfolios/:portfolioId – удалить одно

// POST /portfolios/upload-image – добавить изображение 
// POST /portfolios/delete-image – удалить изображение 

// Более специфичные роуты - выше


router.patch('/portfolios/:portfolioId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        
        // const { orderId, contractorId } = req.params;
        // const userId = req.user.id;
        // const userRole = req.user.role;

        // if(userRole!=='company'){
        //     return sendError(res, 'Назначить Исполнителя может только Компания (Заказчик)', 403);
        // }        

        // const orderUpdated = await OrdersService.setContractor(orderId, contractorId);

        // if(!orderUpdated){
        //     return sendError(res, `Не удалось назначить Исполнителя заказу ${orderId}`, 500);
        // }

        // const companyId = orderUpdated.company;
        
        // // send notifications
        // if (!await NotificationsService.sendAboutNewContractor( {customerId:userId, contractorId, orderId})){
        //     return sendError(res, `Не удалось отправить сообщение о назначени Исполнителя ${contractorId} для заказа ${orderId}`, 500);
        // }
        
        // sendSuccess(res, {             
        //     responded: orderUpdated.responded,
        //     message: 'ok', 
        // });

    })
);

router.put('/portfolios/:designerId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        const { designerId } = req.params;
        const { portfolioData } = req.body;

        const user = await UsersService.findByEmail(req.user.email);
        if (!user) {  return sendError(res, 'Unknown user', 404); }        
        if (user.role !=='company') {  return sendError(res, 'User not autorized for this action', 403);}                

        const company = await CompanyService.findById(companyId);
        if(!company){ return sendError(res, `Company with id ${companyId} not found`, 404); }

        const orderCreateDto = {
            designer: designerId,
            ...portfolioData,
        }

        const orderCreated = await OrdersService.create(orderCreateDto);
        
        sendSuccess(res, { 
            order: orderCreated,
            message: 'Заказ создан', 
        });
    })
);


router.post('/portfolios/upload-image',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    asyncHandler(async (req, res) => {        
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            
            const companyId = req.body.companyId;
            if (!companyId) {
                return res.status(400).json({ error: `Not found company ${companyId}` });
            }
            
            // Оптимизация изображения с помощью sharp
            const optimizedImage = await sharp(req.file.buffer)
            .resize({
                width: 1200,      // Максимальная ширина
                height: 1200,     // Максимальная высота
                fit: 'inside',    // Сохранять пропорции
                withoutEnlargement: true // Не увеличивать маленькие изображения
            })
            .jpeg({ 
                quality: 80,      // Качество JPEG
                mozjpeg: true     // Использовать оптимизацию MozJPEG
            })
            .png({
                quality: 80,      // Качество PNG
                compressionLevel: 9 // Уровень сжатия
            })
            .toBuffer();

            // Проверяем размер после оптимизации
            if (optimizedImage.length > 5 * 1024 * 1024) {
                return res.status(400).json({ error: 'Image is still too large after optimization' });
            }

            const params = {
                Bucket: process.env.YANDEX_BUCKET_NAME,
                Key: `images/${Date.now()}_optimized_${req.file.originalname}`,
                Body: optimizedImage,
                ContentType: req.file.mimetype,
                ACL: 'public-read',
            };

            const result = await s3.upload(params).promise();

            // обновляем галерею компании
            const company = await CompanyService.findById(companyId)
            const companyUpdateDto = {
                gallery:[
                    ...company.gallery,
                    { key:result.Key, url: result.Location },
                ]         
            }
            const updatedCompany = await CompanyService.update(companyId, companyUpdateDto);
            if (!updatedCompany) {
                return sendError(res, 'Не удалось обоновить данные компании', 500);
            }
            console.log('saved company', companyId);

            sendSuccess(res, {
                message: 'File uploaded successfully',
                uploaded_image:{ url: result.Location, key: result.Key },
                size: optimizedImage.length,
                originalSize: req.file.size,
                gallery: updatedCompany.gallery,
            });

        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Failed to upload file' });
        }     
    })
);

router.post('/portfolios/delete-image',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const { imageKey, companyId } = req.body; // Всё из тела

        try {
            const params = {
            Bucket: process.env.YANDEX_BUCKET_NAME,
            Key: imageKey,
            };

            await s3.deleteObject(params).promise();

            // обновляем галерею компании
            const updatedCompany = await CompanyService.deleteFromGallery(companyId, imageKey);
            if (!updatedCompany) {
                return sendError(res, 'Не удалось обоновить данные компании', 500);
            }
            console.log('saved company', companyId);

            sendSuccess(res, { 
                message: 'Данные удалены',
                gallery: updatedCompany.gallery,
            });
            
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ error: 'Failed to delete file' });
        }
        
    })
);


module.exports = router;