import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api.jsx'; // Путь к вашему API

export default function useFetchBillToPrintPage() {
  const [bill, setBill] = useState(null);
  const [nowLoading, setNowLoading] = useState(true);
  const params = useParams();
  const { billId } = params;

  const fetchBill = useCallback(async () => {
    // console.log('try to loading ', billId);
    try {
      const response = await api.get(`/bills/${billId}`);
      if (response.data.success) {
        const resBill = response.data.bill;
        // console.log('resBill', resBill);
        if (resBill) {
          setBill(resBill);
        }
      } else {
        console.error('response.data', response.data);
      }
    } catch (err) {
      console.error('Ошибка загрузки данных', err);
    } finally {
      setNowLoading(false);
    }
  }, [billId]);

  const fetchBillSetPayed = async () => {
    setNowLoading(true);
    try {
      await api.patch(`/bills/${billId}/set-paided`).then(fetchBill);
    } catch (e) {
      console.error(e);
    } finally {
      setNowLoading(false);
    }
  };

  // console.log('fetchBill', fetchBill);/

  useEffect(() => {
    setNowLoading(true);
    void fetchBill();
  }, [fetchBill]);

  return {
    fetchBillSetPayed,
    nowLoading,
    bill,
  };
}
