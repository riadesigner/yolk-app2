const express = require('express');

const passport = require('passport');
const { asyncHandler, sendSuccess } = require('../middleware/utils');
const AppError = require('../middleware/AppError');
const ChatsService = require('./chats.service');
const MessagesService = require('./messages.service');

const router = express.Router();

router.get(
  '/chats/:chatId/messages',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const {
      limit = 10,
      offset = 0,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      sortBy,
      sortOrder,
    };

    const messages = await MessagesService.findByChatId(chatId, options);
    sendSuccess(res, { messages });
  }),
);

router.get(
  '/chats/:chatId',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const chat = await ChatsService.findById(chatId);
    sendSuccess(res, { chat });
  }),
);

router.get(
  '/chats',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const chats = await ChatsService.findByUserId(req.user.id);
    sendSuccess(res, { chats });
  }),
);

module.exports = router;
