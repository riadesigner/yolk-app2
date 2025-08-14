const express = require('express')
const UserService = require('./users.service')
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get('/user',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => { 
        const user = await UserService.findByEmail(req.user.email);         
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        sendSuccess(res, { user:user.toJSON() });        
    })
);

router.get('/user-with-info',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => { 
        
        const user = await UserService.findByEmail(req.user.email, true);        
        
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        
        sendSuccess(res, { user:user.toJSON() });        
    })
);

router.post('/user/save',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => { 
        const userData = req.body;
        console.log('Получены данные:', userData);              
        const user = await UserService.update(userData);
        if (!user) {
            return sendError(res, 'Не удалось обоновить данные пользователя', 404);
        }
        console.log('saved user', user);
        
        sendSuccess(res, { message: 'Данные сохранены' });        
    })
);

// Эндпоинт для сохранения пользователя
// router.post('/user/save', authenticate, (req, res) => {
//   const userData = req.body; // Данные из тела запроса
//   console.log('Получены данные:', userData);

//   // Здесь можно сохранить данные в БД (например, с помощью Mongoose)
//   // ...

//   res.status(200).json({ success: true, message: 'Данные сохранены' });
// });




module.exports = router;