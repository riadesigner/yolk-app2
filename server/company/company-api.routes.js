const express = require('express')
const UserService = require('../users/users.service')
const CompanyService = require('./company.service')
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get('/company',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => { 
        const user = await UserService.findByEmail(req.user.email);         
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        sendSuccess(res, { user:user.toJSON() });        
    })
);

// router.get('/company/full',
//     passport.authenticate('jwt', { session: false }),
//     asyncHandler(async (req, res) => { 
        
//         const user = await UserService.findByEmail(req.user.email, true);        
        
//         if (!user) {
//             return sendError(res, 'User not found', 404);
//         }
        
//         sendSuccess(res, { user:user.toJSON() });        
//     })
// );

router.post('/company/save',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const companyData = req.body;
        console.log('Получены данные:', companyData);
        
        const { createdAt, updatedAt, id, ...companyUpdateDto } = companyData;
        
        const company = await CompanyService.update(id, companyUpdateDto);
        if (!company) {
            return sendError(res, 'Не удалось обоновить данные компании', 404);
        }
        console.log('saved company', company);

        sendSuccess(res, { message: 'Данные сохранены' });        
    })
);

//  companyData =  {
//    details: [],
//    createdAt: '2025-08-18T06:39:43.741Z',
//    updatedAt: '2025-08-18T06:39:43.741Z',
//    id: '68a2caaf49e21318401da4fa',
//    companyName: 'диваны',
//    gallery: [],
//    description: 'и тут туже',
//    city: '',
//    specialization: 'тут всякое'
//  }
 



module.exports = router;