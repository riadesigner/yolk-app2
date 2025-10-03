// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTUtils {
  static generateToken(user, options = {}) {
    const { expiresIn = '1h', secret = process.env.JWT_SECRET } = options;

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      type: 'access', // Тип токена
      // Добавляем timestamp для дополнительной безопасности
      iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, secret, { expiresIn });
  }

  static generateRefreshToken(user, options = {}) {
    const {
      expiresIn = '7d',
      secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    } = options;

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      type: 'refresh',
      tokenId: crypto.randomUUID(), // Уникальный ID для refresh токена
      iat: Math.floor(Date.now() / 1000),
    };

    return jwt.sign(payload, secret, { expiresIn });
  }

  static generateTokenPair(user, options = {}) {
    const { accessExpiresIn = '1h', refreshExpiresIn = '7d' } = options;

    return {
      accessToken: this.generateToken(user, { expiresIn: accessExpiresIn }),
      refreshToken: this.generateRefreshToken(user, {
        expiresIn: refreshExpiresIn,
      }),
    };
  }

  static verifyToken(token, secret = process.env.JWT_SECRET) {
    try {
      return jwt.verify(token, secret);
    } catch {
      throw new Error('Invalid or expired token');
    }
  }

  static verifyRefreshToken(
    token,
    secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
  ) {
    try {
      const decoded = jwt.verify(token, secret);
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }
      return decoded;
    } catch {
      throw new Error('Invalid or expired refresh token');
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }

  static isTokenExpired(token) {
    try {
      const decoded = jwt.decode(token);
      if (!decoded || !decoded.exp) {
        return true;
      }
      return Date.now() >= decoded.exp * 1000;
    } catch {
      return true;
    }
  }
}

module.exports = JWTUtils;
