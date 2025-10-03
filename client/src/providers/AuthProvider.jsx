// providers/AuthProvider.jsx
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import api from '../utils/api';

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwt')
  );

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('jwt', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    setIsAuthenticated(true);
    // Login executed with tokens
  };

  const logout = async () => {
    try {
      // Отправляем запрос на сервер для очистки refresh token
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
      // Продолжаем выполнение даже если запрос на сервер не удался
    }

    // Очищаем токены из localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    // Logout executed
  };

  const refreshTokens = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await api.post('/auth/refresh', {
        refreshToken: refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data.data;

      localStorage.setItem('jwt', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Очищаем токены при неудачном обновлении
      localStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        refreshTokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
