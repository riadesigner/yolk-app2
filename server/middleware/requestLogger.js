const requestLogger = (req, res, next) => {
  console.log('\n=== Новый запрос ===\n');
//   console.log('Session ID:', req.sessionID);
  console.log('Headers:', req.headers);
  //console.log('Cookies:', req.cookies);
  next();
};

module.exports = requestLogger;