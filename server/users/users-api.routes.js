const express = require('express')
const UsersService = require('./users.service')
const UserInfoService = require('../userinfo/userinfo.service')

const CompanyService = require('../company/company.service')
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

// GET /api/users/me      - текущий пользователь (из сессии)
// GET /api/users         - все пользователи  
// GET /api/users/:id     - конкретный пользователь

router.get('/users/me',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {         
        const user = await UsersService.findByEmail(req.user.email);        
        if (!user) { return sendError(res, 'User not found', 404); }        
        sendSuccess(res, { user:user.toJSON() });

    })
);

router.get('/users/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {         
        const {id} = req.param;
        const user = await UsersService.findById(id);
        if (!user) { return sendError(res, 'User not found', 404); }        
        sendSuccess(res, { user:user.toJSON() });        

    })
);

router.patch('/users/me/select-role',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const {role} = req.body;
        const userId = req.user.id;

        const userData = {            
            role:role,
        }

        const user = await UsersService.update(userId, userData);

        if(userData.role === 'company' && !user.userCompany){
            const newUserCompany = await CompanyService.create({userId});
            user.userCompany = newUserCompany._id;            
            await user.save();
        }

        if (!user) {
            return sendError(res, 'Не удалось обоновить данные пользователя', 404);
        }                
        sendSuccess(res, { message: 'Данные сохранены' });        
    })
);


router.patch('/users/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const { id } = req.params;
        
        const {userData, userInfo} = req.body;
        
        console.log('Получены данные:', userData, userInfo);              

        // обновляем пользователя
        if(userData){
            const userUpdated = await UsersService.update(id, userData);
            if (!userUpdated) {
                const errMsg = `Не удалось обоновить данные пользователя ${id}`; 
                return sendError(res, errMsg, 404); 
            }
            console.log('saved user', userUpdated);
        }

        // обновляем расширенные данные пользователя
        if(userInfo){
            const userInfoUpdated = await UserInfoService.update(userInfo.id, userInfo);
            if (!userInfoUpdated) { 
                return sendError(res, 'Не удалось обоновить данные пользователя', 404); 
            }
            console.log('saved userInfo', userInfoUpdated);
        }        

        sendSuccess(res, { message: 'Данные сохранены' });        
    })
);






module.exports = router;