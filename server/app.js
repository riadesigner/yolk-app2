require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const error404 = require('./middleware/error404')
const session = require('express-session');
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors');
const passport = require('passport');
const configurePassport = require('./config/passport');

const MONGO_URL =`mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@mongo:27017`;
// const MONGO_DB = process.env.DB_NAME;
const MONGO_DB = 'new-yolk-db';
const PUBLIC_PATH = path.join(__dirname+'/public');

// ----------------
//  CONNECT TO DB
// ---------------- 
(async ()=>{    
    try{
        const db_hdlr = await mongoose.connect(MONGO_URL, {dbName:MONGO_DB});        
        console.log('DB CONNECTED');
    }catch(e){
        console.log(e, "error connect to mongo / mongoose");        
    }    
})();

// -------------------
//      APP INIT
// -------------------
const app = express();

app.set('view engine','ejs')
app.set('views', __dirname + '/views');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public',express.static(PUBLIC_PATH))

// -----------------
//    USE SESSION
// ----------------- 

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  rolling: true,  
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    httpOnly: false,
    maxAge: 10 * 60 * 1000,
  }
});

app.use(sessionMiddleware);

// -----------------
//    USE PASSPORT
// ----------------- 

// Конфигурация Passport
configurePassport();

// Middleware passport
app.use(passport.initialize());
app.use(passport.session());

// Настройка CORS для кросс-портовых запросов
const corsOptions = {
  origin: process.env.FRONT_URL, // Фронтенд-адрес
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization' // Для Bearer token
  ]  
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.set('view engine','ejs');

// Middleware для логирования заголовков (для отладки)
app.use((req, res, next) => {
  console.log('\n=== Новый запрос ===');
  console.log('Session ID:', req.sessionID);
  console.log('Headers:', req.headers);
  //console.log('Cookies:', req.cookies);
  next();
});

// ------------
//    ROUTS
// ------------

app.get('/', (req, res)=>{
    const user = req.user;
    res.render('index',{user});
});

app.use('/api',require('./users/users.routes'));

// Инициируем OAuth-поток в Yandex
app.get('/auth/yandex', passport.authenticate('yandex'));

// Обработчик callback
app.get('/auth/yandex/callback', 
  (req, res, next) => {
    passport.authenticate('yandex', { session: false, failureRedirect: '/auth-failed' })(req, res, err => {
    // проверка на ошибку, когда jwt устарел 
      if (err) {
        if (err.message.includes('Code has expired')) {
          return res.redirect(`${process.env.FRONT_URL}/login?error=session_expired`);
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


// Проверка аутентификации (опционально)
app.get('/api/check-auth', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ 
      isAuthenticated: true,
      user: req.user 
    });
  }
);

// Защищённый роут
app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ secretData: 'Доступ разрешён' });
  } catch (err) {
    res.status(401).json({ error: 'Неверный токен' });
  }
});

// Защищённый роут
app.get('/api/user', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(req.user);
    }
);

app.post('/api/auth/logout', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Здесь можно:
    // 1. Добавить токен в blacklist
    // 2. Записать лог выхода
    // 3. Очистить refresh-токен (если используется)    
    res.json({ success: true, message: 'Logged out' });
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
});