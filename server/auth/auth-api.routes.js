const express = require('express');
const router = express.Router();
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
const UsersService = require('../users/users.service');
const JWTUtils = require('../utils/jwtUtils');

// Проверка аутентификации (опционально)
router.get(
  '/auth/check-auth',
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => {
    sendSuccess(res, {
      isAuthenticated: true,
      user: req.user,
    });
  }),
);

// Обновление токенов через refresh token
router.post(
  '/auth/refresh',
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendError(res, 'Refresh token is required', 400);
    }

    try {
      // Валидируем refresh token
      JWTUtils.verifyRefreshToken(refreshToken);

      // Ищем пользователя по refresh token в базе
      const user = await UsersService.findByRefreshToken(refreshToken);

      if (!user) {
        return sendError(res, 'Invalid or expired refresh token', 401);
      }

      // Генерируем новую пару токенов
      const tokenPair = JWTUtils.generateTokenPair(user, {
        accessExpiresIn: '1h',
        refreshExpiresIn: '7d',
      });

      // Сохраняем новый refresh token в базе
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
      await UsersService.saveRefreshToken(
        user._id,
        tokenPair.refreshToken,
        expiresAt,
      );

      sendSuccess(res, {
        accessToken: tokenPair.accessToken,
        refreshToken: tokenPair.refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      return sendError(res, 'Invalid or expired refresh token', 401);
    }
  }),
);

router.get(
  '/auth/new-token',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    const user = await UsersService.findById(req.user.id);
    if (!user) {
      return sendError(res, `User ${user._id} not found`, 404);
    }
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = JWTUtils.generateToken(payload, { expiresIn: '15m' });
    sendSuccess(res, { token });
  }),
);

router.post(
  '/auth/logout',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(async (req, res) => {
    try {
      // Очищаем refresh token из базы данных
      await UsersService.clearRefreshToken(req.user.id);

      sendSuccess(res, {
        message: 'Logged out successfully',
      });
    } catch (error) {
      console.error('Logout error:', error);
      sendSuccess(res, {
        message: 'Logged out',
      });
    }
  }),
);

module.exports = router;
