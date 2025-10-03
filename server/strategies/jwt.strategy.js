const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

module.exports = (passport) => {
  const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      (req) => req?.cookies?.jwt,
      (req) => req?.query?.token,
    ]),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JwtStrategy(jwtOpts, (jwt_payload, done) => {
      try {
        // Проверяем тип токена - должен быть access токен
        if (jwt_payload.type && jwt_payload.type !== 'access') {
          return done(new Error('Invalid token type'), false);
        }

        return done(null, jwt_payload.user || jwt_payload);
      } catch (err) {
        return done(err);
      }
    }),
  );
};
