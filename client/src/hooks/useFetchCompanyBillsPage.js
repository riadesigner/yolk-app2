import { useEffect, useState } from 'react';
import api from '../utils/api.jsx'; // Путь к вашему API
import { getPayloads } from '../utils/payloads.jsx';

export default function useFetchCompanyBiils() {
  const [bills, setBills] = useState([]);
  const [nowLoading, setNowLoading] = useState(true);

  const pl = getPayloads();
  const receiverId = pl.id;

  useEffect(() => {
    const fetchCompanyBills = async () => {
      // console.log('receiverId = ', receiverId);
      try {
        const response = await api.get(`/bills/to/company/${receiverId}`);
        if (response.data.success) {
          const resBills = response.data.bills;
          if (resBills) {
            // console.log('resBills', resBills);
            setBills(resBills);
            setNowLoading(false);
          }
        } else {
          console.error('response.data', response.data);
        }
      } catch (err) {
        console.error('Ошибка загрузки данных', err);
        setNowLoading(false);
      }
    };
    void fetchCompanyBills();
  }, [receiverId]);

  return {
    nowLoading,
    bills,
  };
}
