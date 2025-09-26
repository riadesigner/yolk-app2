import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchCompany({ companyId }) {
  const [company, setCompany] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async (companyId) => {
      try {
        const resOrders = await api.get(`/orders/by-company/${companyId}`);
        if (resOrders.data.success) {
          setOrders(resOrders.data.orders);
        }
      } catch (err) {
        console.error('Ошибка загрузки информации о заказах компании', err);
      }
    };

    const fetchCompany = async (companyId) => {
      try {
        const response = await api.get(`/companies/${companyId}`);
        if (response.data.success) {
          const company = response.data.company;
          if (company) {
            setCompany(company);
            setGallery(company.gallery);
            fetchOrders(companyId);
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки информации о комании', err);
      }
    };

    companyId && fetchCompany(companyId);
  }, [companyId]);

  return {
    company,
    gallery,
    orders,
  };
}
