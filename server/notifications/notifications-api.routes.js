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
        try{
            const notifs = await NotificationsService.findByUserId(userId);
            sendSuccess(res, { notifications: notifs.map((n)=>n.toJSON()) })
        }catch(e){
            return sendError(res, `Notifications not found`, 404);
        }        
    })
);



module.exports = router;