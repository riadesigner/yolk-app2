import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchAdmin() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [nowLoading, setNowLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await api.get(`/notifications/me/limit/4`);
      if (response.data.success) {
        const arrNotifications = response.data.notifications;
        arrNotifications &&
          arrNotifications.length > 0 &&
          setNotifications(arrNotifications);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
        await fetchNotifications();
        setNowLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
        setNowLoading(false);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    notifications,
    nowLoading,
  };
}
