const express = require('express');
const BillsService = require('../bills/bills.service');
const OrdersService = require('../orders/orders.service');
const NotificationService = require('../notifications/notifications.service');

// const CompaniesService = require('./companies.service')
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const AppError = require('../middleware/AppError');

const router = express.Router();

router.get(
  '/bills/to/company/:receiverId',
  asyncHandler(async (req, res) => {
    let { receiverId } = req.params;
    try {
      const bills = await BillsService.findByReceiverId(receiverId);
      sendSuccess(res, {
        bills: bills.map((b) => b.toJSON()),
      });
    } catch (e) {
      console.error(e);
      sendSuccess(res, {
        bills: [],
      });
    }
  }),
);

router.get(
  '/bills/admin',
  passport.authenticate('jwt'),
  asyncHandler(async (req, res) => {
    if (req.user.role !== 'administrator') {
      return sendError(res, 'Доступ запрещен', 403);
    }
    const bills = await BillsService.findAdminBills();
    sendSuccess(res, {
      bills: bills.map((b) => b.toJSON()),
    });
  }),
);

router.get(
  '/bills/:billId',
  asyncHandler(async (req, res) => {
    let { billId } = req.params;
    try {
      const bill = await BillsService.findById(billId);
      sendSuccess(res, {
        bill: bill.toJSON(),
      });
    } catch (e) {
      console.error(e);
      throw new AppError(`Bill with id ${billId} not found`, 404);
    }
  }),
);

router.patch(
  '/bills/:billId/set-paided',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { role } = req.user;

    if (role !== 'administrator') {
      return sendError(res, 'Доступ запрещен', 403);
    }
    let { billId } = req.params;
    try {
      const bill = await BillsService.setPayed(billId);
      await OrdersService.updateStatus(
        bill.order.id,
        bill.direction === 'FROM_YOLK' ? 'DEPOSIT_PAID' : 'ARCHIVED',
      );

      if (bill.direction === 'FROM_YOLK') {
        try {
          await NotificationService.sendBillPayedToDesigner(
            bill.order.contractor.id,
            bill.order.id,
          );
          await NotificationService.sendBillPayedToCompany(
            bill.receiver.id,
            bill.order.id,
          );
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          await NotificationService.sendCompleteOrderToDesigner(
            bill.order.contractor.id,
            bill.order.id,
          );
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
      if (e.status === 404) {
        return sendError(res, 'Счет или заказ не найден', 404);
      }
      return sendError(res, e.message, e.status);
    }
    return sendSuccess(res, {
      message: 'Статус счета успешно изменен',
    });
  }),
);

module.exports = router;
