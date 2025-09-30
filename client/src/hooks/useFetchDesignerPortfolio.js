import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';
import { useNavigate } from 'react-router-dom';

export default function useFetchDesignerPortfolio(setErrorMessage) {
  const navigate = useNavigate();
  const hdlAddToPortfolio = (e) => {
    e.preventDefault();
    navigate('/cp/designer/portfolio/add');
  };

  const hdlEdit = (e, id) => {
    e.preventDefault();
    navigate(`/cp/designer/portfolio/${id}/edit`);
  };

  const hdlDelete = async (e, idPortfolio) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/portfolios/${idPortfolio}`);

      if (response.data.success) {
        const arrPortfolios = response.data.portfolios;
        setPortfolios(arrPortfolios);
      }
    } catch (err) {
      console.error('Ошибка удаления портфолио', err);
      setErrorMessage('Ошибка удаления портфолио');
    }
  };

  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfoliosForMe = async () => {
      try {
        const response = await api.get('/portfolios/me');

        if (response.data.success) {
          const arrPortfolios = response.data.portfolios;
          setPortfolios(arrPortfolios);
        }
      } catch (err) {
        console.error('Ошибка загрузки портфолио', err);
        setErrorMessage('Ошибка загрузки портфолио');
      }
    };

    void fetchPortfoliosForMe();
  }, [setErrorMessage]);

  return {
    hdlAddToPortfolio,
    hdlDelete,
    hdlEdit,
    portfolios,
  };
}
