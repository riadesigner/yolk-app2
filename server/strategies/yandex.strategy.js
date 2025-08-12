const YandexStrategy = require('passport-yandex').Strategy;
const jwt = require('jsonwebtoken');
const usersService = require('../users/users.service');

module.exports = (passport) => {
  passport.use(new YandexStrategy({
    clientID: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
    callbackURL: process.env.YANDEX_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {

      const { id, username, emails, photos } = profile;

      console.log('profile', profile);

      if (!emails?.[0]?.value) {
        throw new Error("Email is required");
      }

      const yandexUser = {
        id: id,
        email: emails[0].value,
        name: username,
        avatar: photos?.[0]?.value
      };
      
      let usr = await usersService.findByEmail(yandexUser.email);
      
      if(!usr){
        try{
          console.log( `пользователь ${yandexUser.email} не найден, будет создан новый`);
          usr = await usersService.create(yandexUser);
          console.log('создан newUser = ', usr);      
        }catch(e){
          console.log('err:', e.message || e);
          return done('не удалось создать пользователя');          
        }
      }

      const token = jwt.sign(
        { id: usr.id, email: usr.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );      

      console.log('Yandex auth success for:', usr.email);
      return done(null, { ...usr, token, accessToken });

    } catch (err) {
      console.error('Yandex auth error:', err);
      return done(err.message);
    }
  }));
};