require('dotenv').config();

const express = require('express');
const configureDataBase = require('./config/db');
const configureSessions = require('./config/sessions');
const configurePassport = require('./config/passport');
const configureCors = require('./config/cors');
const configureCategories = require('./config/categories');
const configureAdmins = require('./config/admin');
const helmet = require('helmet');

const error404 = require('./middleware/error404');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const sanitize = require('./middleware/sanitize');

const { sendError } = require('./middleware/utils');
const {
  authErrorHandler,
  apiErrorHandler,
  fallbackErrorHandler,
} = require('./middleware/errorHandlers');

const PUBLIC_PATH = path.join(__dirname + '/public');

// -------------------
//      APP INIT
// -------------------
const app = express();
configureDataBase();
configureSessions(app);
configurePassport(app);
configureCors(app);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/public', express.static(PUBLIC_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(helmet());
app.use(sanitize);

// ------------
//    ROUTS
// ------------
app.use('/auth', require('./auth/auth.routes')); // auth через яндекс и mailru
app.use('/api', require('./auth/auth-api.routes')); // jwt
app.use('/api', require('./users/users-api.routes'));
app.use('/api', require('./companies/companies-api.routes'));
app.use('/api', require('./orders/orders-api.routes'));
app.use('/api', require('./portfolios/portfolios-api.routes'));
app.use('/api', require('./categories/categories-api.routes'));
app.use('/api', require('./bills/bills-api.routes'));
app.use('/api', require('./notifications/notifications-api.routes'));

app.get('/', (req, res) => {
  res.redirect('/');
});

configureCategories();
configureAdmins();

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
