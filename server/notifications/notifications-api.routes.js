const express = require('express')
const NotificationsService = require('./notifications.service')
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const passport = require('passport');

const router = express.Router();


router.get('/notifications/me/limit/:num',    
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const userId = req.user.id;
        try{
            const opt = {
                limit:req.params.num || 100,
            }
            const notifs = await NotificationsService.findByUserId(userId, opt);
            sendSuccess(res, { notifications: notifs.map((n)=>n.toJSON()) })
        }catch(e){
            return sendError(res, `Notifications not found`, 404);
        }        
    })
);

router.get('/notifications',    
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {
        const userId = req.user.id;

        // Отключаем кэширование
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        const page = req.query.page || 1;
        const limit = req.query.limit || 3;

        try{

            const {
                data:notifs,
                pagination,
            } = await NotificationsService.findByUserId(userId, {page, limit});            

            const retNotifs = notifs.map((n)=>n.toJSON());
            sendSuccess(res, { notifications:retNotifs, pagination }); 
            
        }catch(e){
            return sendError(res, `Notifications not found`, 404);
        }        
    })
);



module.exports = router;