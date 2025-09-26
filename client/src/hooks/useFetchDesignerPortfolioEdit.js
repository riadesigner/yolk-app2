import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchDesignerPortfolioEdit(setErrorMessage) {
  const { portfolioId } = useParams();

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const hdlSavePortfolio = async (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (title.trim() === '') {
      setErrorMessage('Название проекта не может быть пустым!');
      return;
    }

    try {
      const response = await api.patch(`/portfolios/${portfolioId}`, {
        title,
        description,
      });

      if (response.data.success) {
        const resPortfolioItem = response.data.portfolio;
        setPortfolioItem(resPortfolioItem);
        navigate('/cp/designer/portfolio');
      }
    } catch (err) {
      console.error('Ошибка сохранения портфолио', err);
      setErrorMessage('Ошибка сохранения портфолио');
    }
  };

  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        setErrorMessage('');
        const response = await api.get(`/portfolios/${portfolioId}`);

        if (response.data.success) {
          const portfolioItem = response.data.portfolio;
          setPortfolioItem(portfolioItem);
          setDescription(portfolioItem.description);
          setTitle(portfolioItem.title);
          setImages(portfolioItem.images);
        }
      } catch (err) {
        console.error('Проект в портфолио не найден', err);
        setErrorMessage('Проект в портфолио не найден');
      }
    };
    portfolioId && fetchPortfolioItem();
  }, [portfolioId, setErrorMessage]);

  return {
    portfolioItem,
    title,
    setTitle,
    description,
    setDescription,
    images,
    setImages,
    hdlSavePortfolio,
  };
}
