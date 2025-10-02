import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export const useFetchAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetchAdminOrders = () =>
    api
      .get('/orders', { query: { limit: Infinity } })
      .then(({ data }) => {
        setOrders(data.orders);
      })
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });

  const updateAdminBill = (billId) => {
    setLoading(true);
    return api
      .patch('/bills/' + billId + '/set-paided')
      .then(fetchAdminOrders)
      .catch(setError);
  };

  useEffect(() => {
    setLoading(true);
    fetchAdminOrders();
  }, []);

  return {
    orders,
    error,
    loading,
    updateAdminBill,
  };
};
