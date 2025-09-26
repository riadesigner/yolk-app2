import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchDesignersPage() {
  const [designers, setDesigners] = useState([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await api.get(`/users/role/designer`);
        if (response.data.success) {
          const resDesigners = response.data.designers;
          resDesigners && resDesigners.length > 0 && setDesigners(resDesigners);
        }
      } catch (err) {
        console.error('Ошибка загрузки информации о дизайнерах', err);
      }
    };

    fetchDesigners();
  }, []);

  return {
    designers,
  };
}
