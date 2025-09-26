import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchDesignerInfoPublicPage({ designerId }) {
  const [designer, setDesigner] = useState(null);
  const [schools, setSchools] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [specialization, setSpecialization] = useState('');

  useEffect(() => {
    const fetchDesigner = async (designerId) => {
      try {
        const response = await api.get(`/users/${designerId}`);
        if (response.data.success) {
          const user = response.data.user;
          if (user) {
            // console.log('user', user);

            setDesigner(user);
            setAvatar(user.avatar);
            setSchools(user.userInfo.schools);
            setSpecialization(user.userInfo.specialization);
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки информации о пользователе', err);
      }
    };

    designerId && fetchDesigner(designerId);
  }, [designerId]);

  return {
    designer,
    schools,
    avatar,
    specialization,
  };
}
