const express = require('express')
const PortfoliosService = require('./portfolios.service')
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const multer = require('multer');
const AWS = require('aws-sdk');
const sharp = require('sharp')
const AppError = require('../middleware/AppError')

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

// GET /portfolios/by/:designerId – получить все для для дизайнера 
// GET /portfolios/for/me – получить все для пользователя, который авторизировался 
// GET /portfolios/:portfolioId – получить одно 
// GET /portfolios – получить все  / не реализована

// PUT /portfolios/for/me – добавить одно портфолио для пользователя, который авторизировался 
// PUT /portfolios/:portfolioId/image – добавить одно изображение

// PATCH /portfolios/:portfolioId – частично обновить одно

// DELETE /portfolios/:portfolioId – удалить одно портфолио
// DELETE /portfolios/:portfolioId/image – удалить одно изображение из портфолио

// Более специфичные роуты - выше


router.get('/portfolios/by/:designerId',    
    asyncHandler(async (req, res) => {
        
        const {designerId} = res.params;            
        const allPortfolios = await PortfoliosService.findByUserId(designerId);
        
        if(allPortfolios && allPortfolios.length>0){
            const retPortfolios = allPortfolios.map((p)=>p.toJSON())    
            sendSuccess(res, {             
                portfolios: retPortfolios,            
            });
        }else{
            sendSuccess(res, {             
                portfolios: [],            
            });            
        }
    })
);

router.get('/portfolios/for/me',    
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;

        const allPortfolios = await PortfoliosService.findByUserId(userId);

        if(allPortfolios && allPortfolios.length>0){
            const retPortfolios = allPortfolios.map((p)=>p.toJSON())    
            sendSuccess(res, {             
                portfolios: retPortfolios,            
            });
        }else{
            sendSuccess(res, {             
                portfolios: [],            
            });            
        }

    })
);

router.get('/portfolios/:portfolioId',    
    asyncHandler(async (req, res) => {        
        
        const {portfolioId} = req.params;
        const portfolio = await PortfoliosService.findById(portfolioId);
        
        if(portfolio){
            sendSuccess(res, {             
                portfolio: portfolio.toJSON(),            
            });            
        }else{
            sendSuccess(res, {             
                portfolio: null,            
            });
        }
    })
);

router.put('/portfolios/for/me',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;
        const userRole = req.user.role;
        const {title, description} = req.body;

        if(userRole!=='designer'){
            throw new AppError('Портфолио есть только у дизайнера', 403)            
        }

        if(title.trim()===''){
            throw new AppError('Название проекта не может быть пустым', 400)                        
        }

        const portfolioCreateDto = {
            designer:userId,
            title,
            description,
        }

        const createdPortfolio = await PortfoliosService.create(portfolioCreateDto);        
        
        if(!createdPortfolio){
            throw new AppError('Не удалось сохраниеть проект в портфолио', 500)            
        }
        
        sendSuccess(res, {
            portfolio: createdPortfolio.toJSON(),
        });

    })
);

router.put('/portfolios/:portfolioId/image',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    asyncHandler(async (req, res) => {        
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            
            const {portfolioId} = req.params;

            if (!portfolioId) {
                throw new AppError(`Not found portfolio ${portfolioId}`, 400)                
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
                Key: `images/portfolios/${Date.now()}_optimized_${req.file.originalname}`,
                Body: optimizedImage,
                ContentType: req.file.mimetype,
                ACL: 'public-read',
            };

            const result = await s3.upload(params).promise();

            // обновляем галерею компании
            const portfolio = await PortfoliosService.findById(portfolioId)
            const portfolioUpdateDto = {
                gallery:[
                    ...portfolio.images,
                    { key:result.Key, url: result.Location },
                ]         
            }
            const updatedPortfolio = await PortfoliosService.update(portfolioId, portfolioUpdateDto);
            if (!updatedPortfolio) {
                throw new AppError('Не удалось обоновить портфолио', 500)                
            }            

            sendSuccess(res, {
                message: 'File uploaded successfully',
                uploaded_image:{ url: result.Location, key: result.Key },
                size: optimizedImage.length,
                originalSize: req.file.size,
                gallery: updatedPortfolio.images,
            });

        } catch (err) {            
            throw new AppError(err, 500);
        }
    })
);

router.patch('/portfolios/:portfolioId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;
        const userRole = req.user.role;
        const {title, description} = req.body;

        if(userRole!=='designer'){
            throw new AppError('Портфолио есть только у дизайнера', 403)            
        }

        if(title.trim()===''){
            throw new AppError('Название проекта не может быть пустым', 400)                        
        }

        const portfolioUpdateDto = {
            title,
            description,
        }

        const updatedPortfolio = await PortfoliosService.update(portfolioId, portfolioUpdateDto);        
        
        sendSuccess(res, {
            portfolio: updatedPortfolio.toJSON(),            
        });

    })
);



router.delete('/portfolios/:portfolioId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;
        const userRole = req.user.role;
        const {portfolioId} = req.params;
    
        if(userRole!=='designer'){            
            throw new AppError('Роль не соответствует', 403);
        }

        const portfolio = await PortfoliosService.findById(portfolioId);
        
        if(!portfolio){            
            throw new AppError('Портфолио не найдено', 404);
        }

        if(portfolio.designer.id !== userId){            
            throw new AppError('Не хватает прав на удаление', 403);
        }

        const result = await PortfoliosService.deleteById(portfolioId)
        if(!result){            
            throw new AppError('Не удалось удалить портфолио', 500);
        }

        const allPortfolios = await PortfoliosService.findByUserId(userId);
        const retPortfolios = allPortfolios.map((p)=>p.toJSON())
        
        sendSuccess(res, {             
            portfolios: retPortfolios,            
        });

    })
);



router.delete('/portfolios/:portfolioId/image',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const { portfolioId } = req.params;
        const { imageKey } = req.body;

        try {
            const params = {
            Bucket: process.env.YANDEX_BUCKET_NAME,
            Key: imageKey,
            };

            await s3.deleteObject(params).promise();

            // обновляем галерею компании
            const updatedPortfolio = await PortfoliosService.deleteFromImages(portfolioId, imageKey);
            if (!updatedPortfolio) {
                return sendError(res, 'Не удалось обоновить данные компании', 500);
            }            

            sendSuccess(res, { 
                message: 'Данные удалены',
                images: updatedPortfolio.images,
            });
            
        } catch (err) {
            throw new AppError(err, 500)            
        }
        
    })
);


module.exports = router;