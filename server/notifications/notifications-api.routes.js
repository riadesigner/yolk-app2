const express = require('express');
const NotificationsService = require('./notifications.service');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const passport = require('passport');

const router = express.Router();

router.get(
  '/notifications/me/limit/:num',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
      const { data: notifs, pagination } =
        await NotificationsService.findByUserId(userId, {
          page: 1,
          limit: req.params.num || 5,
        });

      const retNotifs = notifs.map((n) => n.toJSON());
      sendSuccess(res, { notifications: retNotifs, pagination });
    } catch (e) {
      console.log(e);
      return sendError(res, `Notifications not found`, 404);
    }
  }),
);

router.get(
  '/notifications',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const userId = req.user.id;

    // Отключаем кэширование
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const page = req.query.page || 1;
    const limit = req.query.limit || 3;

    try {
      const { data: notifs, pagination } =
        await NotificationsService.findByUserId(userId, { page, limit });

      const retNotifs = notifs.map((n) => n.toJSON());
      sendSuccess(res, { notifications: retNotifs, pagination });
    } catch (e) {
      console.error(e);
      return sendError(res, `Notifications not found`, 404);
    }
  }),
);

module.exports = router;
