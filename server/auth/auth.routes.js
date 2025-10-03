const express = require('express');
// const crypto = require('crypto');
const UsersService = require('../users/users.service');
const passport = require('passport');
const rnd = require('randomstring');
const router = express.Router();

// --------------------------
//         AUTH YANDEX
// --------------------------

router.get('/yandex', (req, res, next) => {
  passport.authenticate('yandex')(req, res, next);
});

router.get('/mailru', (req, res, next) => {
  passport.authenticate('mailru', { state: rnd.generate(12) })(req, res, next);
});

router.get(
  '/yandex/callback',
  (req, res, next) => {
    const errRedirect = `${process.env.FRONT_URL}/login`;
    passport.authenticate('yandex', {
      session: false,
      failureRedirect: `${errRedirect}?error=auth-failed`,
    })(req, res, (err) => {
      // проверка на ошибку, когда jwt устарел
      if (err) {
        if (err.message && err.message.includes('Code has expired')) {
          return res.redirect(`${errRedirect}?error=session_expired`);
        }
        return next(err);
      }
      // ошибок нет, идем дальше
      next();
    });
  },
  (req, res) => {
    // Успешная аутентификация
    const { accessToken, refreshToken } = req.user;
    const tokenParam = encodeURIComponent(accessToken);
    const refreshParam = encodeURIComponent(refreshToken);

    res.redirect(
      `${process.env.FRONT_URL}/auth-callback?token=${tokenParam}&refreshToken=${refreshParam}`,
    );
  },
);

router.get(
  '/mailru/callback',
  (req, res, next) => {
    const errRedirect = `${process.env.FRONT_URL}/login`;
    passport.authenticate('mailru', {
      session: false,
      failureRedirect: `${errRedirect}?error=auth-failed`,
    })(req, res, (err) => {
      // проверка на ошибку, когда jwt устарел
      if (err) {
        if (err.message.includes('Code has expired')) {
          return res.redirect(`${errRedirect}?error=session_expired`);
        }
        return next(err);
      }
      // ошибок нет, идем дальше
      next();
    });
  },
  (req, res) => {
    // Успешная аутентификация
    const { accessToken, refreshToken } = req.user;
    const tokenParam = encodeURIComponent(accessToken);
    const refreshParam = encodeURIComponent(refreshToken);

    res.redirect(
      `${process.env.FRONT_URL}/auth-callback?token=${tokenParam}&refreshToken=${refreshParam}`,
    );
  },
);

module.exports = router;
