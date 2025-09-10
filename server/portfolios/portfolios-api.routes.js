const express = require('express')
const UsersService = require('../users/users.service')
const PortfoliosService = require('./portfolios.service')
const multer = require('multer');
const AWS = require('aws-sdk');

const AppError = require('../middleware/AppError')

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
// GET /portfolios/me – получить список всех для пользователя, который авторизировался 
// GET /portfolios/by/:designerId – получить одно для дизайнера 
// GET /portfolios/:portfolioId – получить одно 
// PUT /portfolios/for/me – добавить одно портфолио для пользователя, который авторизировался 
// PATCH /portfolios/:portfolioId – частично обновить одно
// DELETE /portfolios/:portfolioId – удалить одно

// POST /portfolios/upload-image – добавить изображение 
// POST /portfolios/delete-image – удалить изображение 

// Более специфичные роуты - выше


router.get('/portfolios/me',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;
        const userRole = req.user.role;

        if(userRole!=='designer'){
            return sendError(res, 'Портфолио есть только у дизайнера', 403);
        }

        const allPortfolios = await PortfoliosService.findByUserId(userId);
        const retPortfolios = allPortfolios.map((p)=>p.toJSON())
        
        sendSuccess(res, {             
            portfolios: retPortfolios,            
        });

    })
);

router.get('/portfolios/:portfolioId',    
    asyncHandler(async (req, res) => {        
        
        const {portfolioId} = req.params;
        const portfolio = await PortfoliosService.findById(portfolioId);
        if(!portfolio){
            throw new AppError(`Не найден проект в портфолио с id ${portfolioId}`, 404);
        }
        
        sendSuccess(res, {             
            portfolio: portfolio.toJSON(),            
        });

    })
);

router.put('/portfolios/for/me',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;
        const userRole = req.user.role;
        const {title, description} = req.body;

        if(userRole!=='designer'){
            return sendError(res, 'Портфолио есть только у дизайнера', 403);
        }

        if(title.trim()===''){
            return sendError(res, 'Название проекта не может быть пустым', 400);
        }

        const portfolioCreateDto = {
            designer:userId,
            title,
            description,
        }

        const createdPortfolio = await PortfoliosService.create(portfolioCreateDto);
        console.log('==== createdPortfolio ======', createdPortfolio);
        
        if(!createdPortfolio){
            return sendError(res, 'Не удалось сохраниеть проект в портфолио', 500);
        }
        
        sendSuccess(res, {
            portfolio: createdPortfolio.toJSON(),            
        });

    })
);

router.patch('/portfolios/for/me',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
                
        const userId = req.user.id;
        const userRole = req.user.role;
        const {portfolioId, title, description} = req.body;

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

// router.get('/portfolios/me',
//     passport.authenticate('jwt', { session: false }),
//     asyncHandler(async (req, res) => {        
                
//         const userId = req.user.id;
//         const userRole = req.user.role;

//         if(userRole!=='designer'){
//             return sendError(res, 'Портфолио есть только у дизайнера', 403);
//         }

//         const allPortfolios = await PortfoliosService.findByUserId(userId);
//         const retPortfolios = allPortfolios.map((p)=>p.toJSON())
        
//         sendSuccess(res, {             
//             portfolios: retPortfolios,            
//         });

//     })
// );




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