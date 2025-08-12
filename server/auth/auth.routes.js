const express = require('express')
const crypto = require('crypto');
const UserService = require('../users/users.service')
const passport = require('passport');

const router = express.Router();

const passportLocal = require('../libs/pass-local')
passportLocal.init(router,'email','password');

// --------------------------
//         AUTH YANDEX
// --------------------------

// Инициируем OAuth-поток в Yandex
router.get('/yandex', passport.authenticate('yandex'));

// Обработчик callback
router.get('/yandex/callback', 
  (req, res, next) => {    
    const errRedirect = `${process.env.FRONT_URL}/login`;
    passport.authenticate('yandex', { session: false, failureRedirect: `${errRedirect}?error=auth-failed` })(req, res, err => {
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
    res.redirect(`${process.env.FRONT_URL}/auth-callback?token=${encodeURIComponent(req.user.token)}`);    
  }
);


// ------------------------------------
//   AUTH LOCAL-STRATEGY WITH SESSION
// ------------------------------------

router.get('/login', (req, res) => {
  res.status(200)
  res.render('login',{user:req.user})    
});

router.get("/logout", (req, res, next) => {  
  req.logout(req.user, err => {
    if(err) return next(err);    
      req.session.destroy(function (err) {
        res.json("ok");
      });
  });
});  

router.post('/signin', passportLocal.authenticate,(err, req, res, next)=>{
  res.json({
    "error": err,
    "status": "error"
  });
},(req,res)=>{
  const user = req.user;
  if(!user){
    res.json({
      "error": "не найден пользователь",
      "status": "error"
    });
  }else{
    res.json({
      "data": {
        "id": user._id,
        "email": user.email,
        "name": user.name||"",
        "contantPhone": user.contantPhone||""
      },
      "status": "ok"
    });
  }  
});

router.post('/signup', async (req, res) => {
  
  const  { email, name, password, contactPhone  } = req.body;
  const data = {
    email,
    passwordHash:crypto.createHash('md5').update(password).digest('hex'),
    name,
    contactPhone
  };
 
  try{
      const user = await UserService.findByEmail(email);
      if(user){
        res.json({
          "error": `пользователь c почтой ${email} уже есть`,
          "status": "error"
        });        
      }else{
        const user = await UserService.create(data);        
        const answer =
        {
          "data": {
            "id": user._id,
            "email": user.email,
            "name": user.name,
            "contactPhone": user.contactPhone
          },
          "status": "ok"
        };                 
        res.status(200)
        res.json(answer)        
      }

  }catch(e){
    res.status(200)
    res.json({
      "error": "ошибка создания нового пользователя",
      "status": "error"
    });
  }

});


module.exports = router;