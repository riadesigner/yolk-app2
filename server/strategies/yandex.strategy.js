const YandexStrategy = require('passport-yandex').Strategy;
const usersService = require('../users/users.service');

const JWTUtils = require('../utils/jwtUtils');

module.exports = (passport) => {
  passport.use(new YandexStrategy({
    clientID: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
    callbackURL: process.env.YANDEX_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {

      const { id, username, emails, photos, name, gender } = profile;

      console.log('profile', profile);

      if (!emails?.[0]?.value) {
        throw new Error("Email is required");
      }

      const userData = {
        yandexId: id,
        email: emails[0].value,
        name: username,
        avatar: photos?.[0]?.value        
      };
      
      const userInfo = {
        firstName: name.familyName,
        secondName: name.givenName,
        gender: gender,     
      }

      let usr = await usersService.findByEmail(userData.email);
      
      if(!usr){
        try{
          userData.role = 'unknown';
          console.log( `пользователь ${userData.email} не найден, будет создан новый`);
          usr = await usersService.create(userData, userInfo);
          console.log('создан newUser = ', usr);      
        }catch(err){
          console.log('err:', err);
          return done('не удалось создать пользователя');          
        }
      }

      const payload = { id: usr.id, email: usr.email, role:usr.role };      
      const token = JWTUtils.generateToken(payload, { expiresIn: '15m' });

      console.log('Yandex auth success for:', payload );
      return done(null, { ...usr, token, accessToken });

    } catch (err) {
      console.error('Yandex auth error:', err);
      return done(err.message);
    }
  }));
};