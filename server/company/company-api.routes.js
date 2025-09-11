const express = require('express')
const UsersService = require('../users/users.service')
const CompanyService = require('./company.service')
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

// GET /companies/:id – получить одну 
// GET /companies – получить все

// PUT /companies/for/me – добавить одно портфолио для пользователя, который авторизировался 
// PUT /companies/:portfolioId/image – добавить одно изображение

// PATCH /companies/:portfolioId – частично обновить одно

// DELETE /companies/:portfolioId – удалить одно портфолио
// DELETE /companies/:portfolioId/image – удалить одно изображение из портфолио

// Более специфичные роуты - выше


router.get('/companies/:companyId',    
    asyncHandler(async (req, res) => { 
        
        let { companyId  } =  req.params;

        try{

            const company = await CompanyService.findById(companyId);

            sendSuccess(res, { 
                company: company.toJSON() 
            })

        }catch(e){
            throw new AppError(`Company with id ${companyId} not found`, 404)            
        }
    })
);

router.get('/companies',    
    asyncHandler(async (req, res) => {         
        // Отключаем кэширование
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        
        const page = req.query.page || 1;
        const limit = req.query.limit || 3;

        const {
            data:companies,
            pagination,
        } = await CompanyService.findAll({page, limit});

        const retCompanies = companies.map(co=>co.toJSON());
        sendSuccess(res, { companies:retCompanies, pagination }); 
    })
);

router.put('/companies',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        
        // getting the User
        const user = await UsersService.findById(req.user.id);
        if(!user){
            return sendError(res, `User ${user._id} not found`, 404);    
        }
        // creating userCompany
        const { companyData } = req.body;
        companyData.userId = req.user.id;
        
        const company = await CompanyService.create(companyData);

        if (!company) {            
            throw new AppError(`Не удалось создать компанию для пользователя ${user._id}`, 500);
        }        

        // updating the User
        const userUpdated = await UsersService.update(req.user.id, {userCompany:company._id});
        
        if(!userUpdated){
            throw new AppError(`Не удалось привязать компанию ${company._id} к пользователю ${user._id}`, 500);
        }        

        sendSuccess(res, { message: 'Компания создана, к пользователю привязана' });        
        
    })
);

router.patch('/companies/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {                
        const { id }= req.params; 
        const { companyData } = req.body;
        console.log('Получены данные для обновления:', id, companyData, req.body);        
        const company = await CompanyService.update(id, companyData);
        if (!company) {
            return sendError(res, 'Не удалось обоновить данные компании', 404);
        }    
        sendSuccess(res, { message: `Данные компании ${company._id} обновлены` });        
    })
);


router.put('/companies/:companyId/image',
    passport.authenticate('jwt', { session: false }),
    upload.single('image'),
    asyncHandler(async (req, res) => {        
        try {
            if (!req.file) {
                throw new AppError(`it needs file to upload`,400)                
            }
            
            const {companyId} = req.params;
            
            if (!companyId) {
                throw new AppError(`Not found company ${companyId}`,404)
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
                throw new AppError('Image is still too large after optimization', 400)                
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
                throw new AppError('Не удалось обоновить данные компании', 500)                
            }            

            sendSuccess(res, {
                message: 'File uploaded successfully',
                uploaded_image:{ url: result.Location, key: result.Key },
                size: optimizedImage.length,
                originalSize: req.file.size,
                gallery: updatedCompany.gallery,
            });

        } catch (err) {            
            throw new AppError(err, 500)            
        }
    })
);

router.delete('/companies/:companyId/image',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {                

        const { companyId } = req.params; 
        const { imageKey } = req.body;

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
            
        } catch (err) {            
            throw new AppError(err, 500)            
        }
        
    })
);



module.exports = router;