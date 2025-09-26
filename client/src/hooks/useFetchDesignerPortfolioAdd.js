import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchDesignerPortfolio(setErrorMessage) {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [portfolioItem, setPortfolioItem] = useState(null);
  const navigate = useNavigate();

  const hdlSavePortfolio = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (title.trim() === '') {
      setErrorMessage('Название проекта не может быть пустым!');
      return;
    }

    try {
      const response = await api.put('/portfolios/me', { title, description });

      if (response.data.success) {
        const resPortfolioItem = response.data.portfolio;
        setErrorMessage('');
        setPortfolioItem(resPortfolioItem);
        navigate('/cp/designer/portfolio');
      }
    } catch (err) {
      console.error('Ошибка сохранения портфолио', err);
      setErrorMessage('Ошибка сохранения портфолио');
    }
  };

  useEffect(() => {}, []);

  return {
    portfolioItem,
    title,
    setTitle,
    description,
    setDescription,
    hdlSavePortfolio,
  };
}
