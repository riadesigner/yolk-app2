const MailruStrategy = require('passport-mailru-email').Strategy;
const usersService = require('../users/users.service');

const JWTUtils = require('../utils/jwtUtils');

module.exports = (passport) => {
  passport.use(
    new MailruStrategy(
      {
        clientID: process.env.MAILRU_CLIENT_ID,
        clientSecret: process.env.MAILRU_CLIENT_SECRET,
        callbackURL: process.env.MAILRU_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // --------------------
          //  GENERATING PAYLOAD
          // --------------------
          console.log(
            '================== profile ================== ',
            profile,
          );

          const { id, username, displayName, emails, photos, name, gender } =
            profile;

          if (!emails?.[0]?.value) {
            return done('Email is required');
          }

          const userData = {
            mailruId: id,
            email: emails[0].value,
            name: username || displayName,
            avatar: photos?.[0]?.value,
          };

          const userInfo = {
            firstName: name.familyName,
            secondName: name.givenName,
            gender: gender,
          };

          // ----------------------
          //  searching user in db
          // ----------------------
          let usr = await usersService.findByEmail(userData.email);

          // ----------------------------------------------
          //  если нет такого пользователя, то создаем его
          // ----------------------------------------------
          if (!usr) {
            try {
              userData.role = 'unknown';
              usr = await usersService.create(userData, userInfo);
            } catch {
              return done('не удалось создать пользователя');
            }
          }

          const payload = { id: usr._id, email: usr.email, role: usr.role };

          // Генерируем пару токенов (access + refresh)
          const tokenPair = JWTUtils.generateTokenPair(payload, {
            accessExpiresIn: '1h',
            refreshExpiresIn: '7d',
          });

          // Сохраняем refresh token в базе данных
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
          await usersService.saveRefreshToken(
            usr._id,
            tokenPair.refreshToken,
            expiresAt,
          );

          console.log('Mailru auth success for:', payload);
          return done(null, {
            ...usr,
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
            mailruAccessToken: accessToken,
          });
        } catch (err) {
          console.error('Mailru auth error:', err);
          return done(err.message);
        }
      },
    ),
  );
};
