import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchCompanyAdmin() {
  const [user, setUser] = useState(null);
  const [orders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [nowLoading, setNowLoading] = useState(true);

  const navigate = useNavigate();

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

    const fetchUserFull = async () => {
      try {
        const response = await api.get('/users/me');

        if (response.data.success) {
          const usr = response.data.user;
          if (usr) {
            setUser(usr);
            await fetchNotifications();
            setNowLoading(false);
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
        navigate('/');
      }
    };

    void fetchUserFull();
  }, [navigate]);

  return {
    user,
    orders,
    notifications,
    nowLoading,
  };
}
