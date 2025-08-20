const express = require('express')
const UsersService = require('../users/users.service')
const CompanyService = require('../company/company.service')
const OrdersService = require('./orders.service')
 
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

router.get('/order/:id',    
    asyncHandler(async (req, res) => { 
        const { id } = req.params;
        const order = await OrdersService.findById(id);                 
        if (!order) {
            return sendError(res, 'Order not found', 404);
        }
        sendSuccess(res, { order:order.toJSON() });        
    })
);

router.put('/orders/:companyId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        const { companyId } = req.params;
        const { orderData } = req.body;

        const user = await UsersService.findByEmail(req.user.email);
        if (!user) {  return sendError(res, 'Unknown user', 404); }        
        if (user.role !=='company') {  return sendError(res, 'User not autorized for this action', 403);}                

        const company = await CompanyService.getById(companyId);
        if(!company){ return sendError(res, `Company with id ${companyId} not found`, 404); }

        const orderCreateDto = {
            companyId: companyId,
            ...orderData,
        }

        const orderCreated = await OrdersService.create(companyId, orderCreateDto);
        
        sendSuccess(res, { 
            order: orderCreated,
            message: 'Заказ создан', 
        });
    })
);


module.exports = router;