const express = require('express')
const router = express.Router();
const passport = require('passport');

// Проверка аутентификации (опционально)
router.get('/auth/check-auth', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ 
      isAuthenticated: true,
      user: req.user 
    });
  }
);
 
router.post('/auth/logout', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Здесь можно:
    // 1. Добавить токен в blacklist
    // 2. Записать лог выхода
    // 3. Очистить refresh-токен (если используется)    
    res.json({ success: true, message: 'Logged out' });
  }
);

module.exports = router;