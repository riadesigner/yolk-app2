import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchPortfolio({ designerId }) {
  // const [portfolioItems, setPortfolioItems] = useState([]);
  const [designer, setDesigner] = useState(null);
  const [schools, setSchools] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [specialization, setSpecialization] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async (designerId) => {
      try {
        const response = await api.get(`/users/${designerId}`);
        if (response.data.success) {
          const user = response.data.user;
          if (user) {
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

    designerId && fetchPortfolio(designerId);
  }, [designerId]);

  return {
    designer,
    schools,
    avatar,
    specialization,
  };
}
