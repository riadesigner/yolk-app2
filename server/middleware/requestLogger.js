const requestLogger = (req, res, next) => {
  console.log('\n=== Новый запрос ===');
//   console.log('Session ID:', req.sessionID);
  console.log('Headers / referer:', req.headers.referer, '\n');
  //console.log('Cookies:', req.cookies);
  next();
};

module.exports = requestLogger;