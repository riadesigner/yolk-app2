require('dotenv').config();

const express = require('express');

const configureSessions = require('./config/sessions');
const configurePassport = require('./config/passport');
const configureCors = require('./config/cors');
const configureCategories = require('./config/categories');

const error404 = require('./middleware/error404')
const path = require('path')
const mongoose = require('mongoose')

const requestLogger = require('./middleware/requestLogger')

const { asyncHandler, sendSuccess, sendError } = require('./middleware/utils');
const { authErrorHandler, apiErrorHandler, fallbackErrorHandler } = require('./middleware/errorHandlers');

const MONGO_URL =`mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@mongo:27017`;
const MONGO_DB = process.env.DB_NAME;
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

configureSessions(app);
configurePassport(app);
configureCors(app);

app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use('/public',express.static(PUBLIC_PATH))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger);

// ------------
//    ROUTS
// ------------
app.use('/auth',require('./auth/auth.routes')); // auth через яндекс и mailru  
app.use('/api',require('./auth/auth-api.routes'));  // jwt
app.use('/api',require('./users/users-api.routes'));
app.use('/api',require('./company/company-api.routes'));
app.use('/api',require('./orders/orders-api.routes'));
app.use('/api',require('./portfolios/portfolios-api.routes'));
app.use('/api',require('./categories/categories-api.routes'));
app.use('/api',require('./bills/bills-api.routes'));
app.use('/api',require('./notifications/notifications-api.routes'));
app.use('/',require('./auth/login.routes')); // разные роуты для логина и выхода

app.get('/', (req, res)=>{
    const user = req.user;
    res.render('index',{user});
});

configureCategories();


// 404 — если ни один маршрут не сработал
app.use(error404);

// Ошибка для /auth
app.use('/auth', authErrorHandler);

// Ошибка для /api
app.use('/api', apiErrorHandler(sendError));

// Фолбэк
app.use(fallbackErrorHandler);


const server = app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

// Автоматический перезапуск при критических ошибках
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received');
//   server.close(() => {
//     console.log('Process terminated');
//   });
// });