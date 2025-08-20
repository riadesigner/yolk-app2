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
const requestLogger = require('./middleware/requestLogger')
const { asyncHandler, sendSuccess, sendError } = require('./middleware/utils');
const { authErrorHandler, apiErrorHandler, fallbackErrorHandler } = require('./middleware/errorHandlers');

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

configurePassport();
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
app.use(requestLogger);
app.set('view engine','ejs');

// ------------
//    ROUTS
// ------------

app.get('/', (req, res)=>{
    const user = req.user;
    res.render('index',{user});
});

app.use('/auth',require('./auth/auth.routes')); // auth через яндекс  
app.use('/api',require('./auth/auth-api.routes')); // logout
app.use('/api',require('./users/users-api.routes'));
app.use('/api',require('./company/company-api.routes'));
app.use('/api',require('./orders/orders-api.routes'));

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

// 404 — если ни один маршрут не сработал
app.use(error404);

// Ошибка для /auth
app.use('/auth', authErrorHandler);

// Ошибка для /api
app.use('/api', apiErrorHandler(sendError));

// Фолбэк
app.use(fallbackErrorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
});