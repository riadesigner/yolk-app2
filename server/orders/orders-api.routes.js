const express = require('express')
const UsersService = require('../users/users.service')
const CompanyService = require('../company/company.service')
const OrdersService = require('./orders.service')
 
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

const router = express.Router();

// GET /orders – получить список заказов
// POST /orders – создать новый заказ
// GET /orders/:id – получить один заказ
// PUT /orders/:id – полностью обновить заказ
// PATCH /orders/:id – частично обновить заказ
// DELETE /orders/:id – удалить заказ

// Более специфичные роуты - выше

router.get('/orders/by-company/:companyId',
    asyncHandler(async (req, res) => { 
        const { companyId } = req.params;
        const orders = await OrdersService.find({company:companyId});
        sendSuccess(res, { orders:orders });
    })
);
router.get('/orders/:id',    
    asyncHandler(async (req, res) => { 
        const { id } = req.params;
        const order = await OrdersService.findById(id);                 
        if (!order) {
            return sendError(res, 'Order not found', 404);
        }
        sendSuccess(res, { order:order.toJSON() });        
    })
);
router.get('/orders',    
    asyncHandler(async (req, res) => {         
        const { mode } = req.params;        
        const orders = await OrdersService.findAll();
        console.log('orders', orders);
        if (!orders) {
            return sendError(res, 'Order not found', 404);
        }
        const retOrders = orders.map(order=>order.toJSON());
        sendSuccess(res, { orders:retOrders });        
    })
);


router.patch('/orders/:orderId',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        
        const { orderId } = req.params;
        const { orderData } = req.body;

        const user = await UsersService.findByEmail(req.user.email);
        if (!user) {  return sendError(res, 'Unknown user', 404); }        
        if (user.role !=='company') {  return sendError(res, 'User not autorized for this action', 403);}                

        const orderUpdateDto = {            
            ...orderData,
        }

        console.log('orderUpdateDto', orderUpdateDto);

        const orderUpdated = await OrdersService.update(orderId, orderUpdateDto);
        
        sendSuccess(res, { 
            order: orderUpdated,
            message: 'Заказ обновлен', 
        });
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

        const company = await CompanyService.findById(companyId);
        if(!company){ return sendError(res, `Company with id ${companyId} not found`, 404); }

        const orderCreateDto = {
            company: companyId,
            ...orderData,
        }

        const orderCreated = await OrdersService.create(orderCreateDto);
        
        sendSuccess(res, { 
            order: orderCreated,
            message: 'Заказ создан', 
        });
    })
);



module.exports = router;