const JWTUtils = require('../utils/jwtUtils');
const UsersService = require('../users/users.service');

/**
 * Middleware для автоматического обновления токенов
 * Проверяет, истекает ли access token в ближайшее время и автоматически обновляет его
 */
const refreshTokenMiddleware = async (req, res, next) => {
  // Пропускаем middleware для публичных эндпоинтов
  const publicPaths = [
    '/auth/login',
    '/auth/refresh',
    '/auth/yandex',
    '/auth/mailru',
    '/auth/callback',
  ];
  if (publicPaths.some((path) => req.path.startsWith(path))) {
    return next();
  }

  try {
    // Извлекаем токен из заголовка Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const accessToken = authHeader.substring(7);

    // Проверяем, не истек ли токен
    if (JWTUtils.isTokenExpired(accessToken)) {
      return next();
    }

    // Декодируем токен для получения времени истечения
    const decoded = JWTUtils.decodeToken(accessToken);
    if (!decoded || !decoded.exp) {
      return next();
    }

    // Проверяем, истекает ли токен в ближайшие 15 минут
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;
    const fifteenMinutes = 15 * 60 * 1000; // 15 минут в миллисекундах

    // Если токен истекает в ближайшие 15 минут, обновляем его
    if (timeUntilExpiration <= fifteenMinutes && timeUntilExpiration > 0) {
      // Находим пользователя по ID из токена
      const user = await UsersService.findById(decoded.id);
      if (!user || !user.refreshToken) {
        return next();
      }

      // Проверяем refresh token
      try {
        JWTUtils.verifyRefreshToken(user.refreshToken);

        // Генерируем новую пару токенов
        const tokenPair = JWTUtils.generateTokenPair(user, {
          accessExpiresIn: '1h',
          refreshExpiresIn: '7d',
        });

        // Сохраняем новый refresh token в базе
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await UsersService.saveRefreshToken(
          user._id,
          tokenPair.refreshToken,
          expiresAt,
        );

        // Добавляем новые токены в заголовки ответа
        res.setHeader('X-New-Access-Token', tokenPair.accessToken);
        res.setHeader('X-New-Refresh-Token', tokenPair.refreshToken);

        console.log(`Token refreshed for user ${user.email}`);
      } catch (refreshError) {
        console.error('Refresh token validation failed:', refreshError);
        // Очищаем недействительный refresh token
        await UsersService.clearRefreshToken(user._id);
      }
    }

    next();
  } catch (error) {
    console.error('Refresh token middleware error:', error);
    next();
  }
};

module.exports = refreshTokenMiddleware;
