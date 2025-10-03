const xss = require('xss');

const sanitize = (req, res, next) => {
  // Функция глубокой санитизации
  const deepSanitize = (data) => {
    if (typeof data === 'string') {
      return xss(data.trim());
    }

    if (Array.isArray(data)) {
      return data.map(deepSanitize);
    }

    if (data && typeof data === 'object') {
      const sanitized = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = deepSanitize(value);
      }
      return sanitized;
    }

    return data;
  };

  // Применяем ко всем входящим данным
  if (req.body) req.body = deepSanitize(req.body);
  if (req.query) req.query = deepSanitize(req.query);
  if (req.params) req.params = deepSanitize(req.params);

  next();
};

module.exports = sanitize;
