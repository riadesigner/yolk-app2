const express = require('express')
const UsersService = require('./users.service')
const UserInfoService = require('../userinfo/userinfo.service')

const CompanyService = require('../company/company.service')
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => { 
        const user = await UsersService.findByEmail(req.user.email);         
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        sendSuccess(res, { user:user.toJSON() });        
    })
);

router.get('/user/full',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => { 
        
        const user = await UsersService.findByEmail(req.user.email, true);        
        
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        
        sendSuccess(res, { user:user.toJSON() });        
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


router.post('/user/select-role',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const {role} = req.body;
        const id = req.user.id;

        const userData = {            
            role:role,
        }

        const user = await UsersService.update(id, userData);

        if(userData.role === 'company' && !user.userCompany){
            const newUserCompany = await CompanyService.create();
            user.userCompany = newUserCompany._id;            
            await user.save();
        }

        if (!user) {
            return sendError(res, 'Не удалось обоновить данные пользователя', 404);
        }        
        console.log('saved user', user);
        sendSuccess(res, { message: 'Данные сохранены' });        
    })
);




module.exports = router;