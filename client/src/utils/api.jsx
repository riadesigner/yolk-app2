// Создаём экземпляр axios с интерцепторами
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Флаг для предотвращения множественных запросов на обновление токена
let isRefreshing = false;
let failedQueue = [];

// Функция для обработки очереди запросов
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обрабатываем ответы и автоматическое обновление токенов
api.interceptors.response.use(
  (response) => {
    // Проверяем, есть ли новые токены в заголовках
    const newAccessToken = response.headers['x-new-access-token'];
    const newRefreshToken = response.headers['x-new-refresh-token'];

    if (newAccessToken) {
      localStorage.setItem('jwt', newAccessToken);
      // Access token automatically refreshed
    }

    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
      // Refresh token automatically refreshed
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Если получили 401 и это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Если уже обновляем токен, добавляем запрос в очередь
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Пытаемся обновить токены
          const response = await axios.post('/api/auth/refresh', {
            refreshToken: refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;

          localStorage.setItem('jwt', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Обновляем заголовок оригинального запроса
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Обрабатываем очередь запросов
          processQueue(null, accessToken);

          // Повторяем оригинальный запрос
          return api(originalRequest);
        } catch (refreshError) {
          // Если не удалось обновить токен, очищаем localStorage и перенаправляем на логин
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');

          processQueue(refreshError, null);

          // Можно добавить перенаправление на страницу логина
          window.location.href = '/login';

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Нет refresh токена, очищаем localStorage
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');

        processQueue(error, null);

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
