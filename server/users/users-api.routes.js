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
        const user = await UserService.findByEmail(req.user.email);        
        
        if (!user) {
            return sendError(res, 'User not found', 404);
        }
        
        sendSuccess(res, { user:user.toJSON() });        
    })
);

module.exports = router;