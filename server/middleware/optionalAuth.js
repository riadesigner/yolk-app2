const passport = require('passport');

function optionalAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (user) req.user = user; // прикрепляем юзера, если он есть
    next(); // идём дальше независимо от результата
  })(req, res, next);
}

module.exports = optionalAuth;