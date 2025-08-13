const express = require('express')
const router = express.Router();
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');

// Проверка аутентификации (опционально)
router.get('/auth/check-auth', 
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => {
    sendSuccess(res, {
      isAuthenticated: true,
      user: req.user 
    });
  }
));
 
router.post('/auth/logout', 
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => {
    // Здесь можно:
    // 1. Добавить токен в blacklist
    // 2. Записать лог выхода
    // 3. Очистить refresh-токен (если используется)    
    sendSuccess(res, {
      message: 'Logged out',
    });    
  }
));

module.exports = router;