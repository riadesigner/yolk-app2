import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export const useFetchPortfolioItem = (portfolioId) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPortfolioItem = async () => {
      try {
        setLoading(false);
        setError(null);
        const { data: result } = await api.get(`/portfolios/${portfolioId}`);
        setData(result.portfolio);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    void fetchPortfolioItem();
  }, [portfolioId]);

  return {
    data,
    error,
    loading,
  };
};
