import api from '../utils/api.jsx';
import { useEffect, useState } from 'react';

export const useFetchAdminBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdminBills = () =>
    api
      .get('/bills/admin')
      .then(({ data }) => {
        setBills(data.bills);
      })
      .catch(setError)
      .finally(() => setLoading(false));

  const fetchSetBillPayed = async (id) => {
    setLoading(true);
    await api.patch(`/bills/${id}/set-paided`);
    fetchAdminBills();
  };

  useEffect(() => {
    setLoading(true);
    fetchAdminBills();
  }, []);

  return {
    bills,
    error,
    loading,
    fetchSetBillPayed,
  };
};
