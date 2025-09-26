import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../utils/api.jsx';

export default function useFetchCompanySetContractor() {
  const { orderId, contractorId } = useParams();

  const [nowLoading, setNowLoading] = useState(true);
  const [hasContractor, setHasContractor] = useState(false);
  const [user, setUser] = useState(null);
  const [contractor, setContractor] = useState(null);
  const [order, setOrder] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const setNewContractor = async () => {
    setNowLoading(true);
    try {
      const response = await api.patch(
        `/orders/${orderId}/set-contractor/${contractorId}`
      );
      if (response.data.success) {
        const theOrder = response.data.order;
        setOrder(theOrder);
        if (theOrder.contractor) {
          navigate('/cp/company');
        }
      }
    } catch (err) {
      setNowLoading(false);
      setErrorMessage('Не удалось установить исполнителя');
      console.error('Ошибка установки исполнителя', err);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await api.get(`/orders/${orderId}`);
        if (orderResponse.data.success) {
          const retOrder = orderResponse.data.order;
          // console.log('retOrder = ', retOrder);
          setOrder(retOrder);
          if (retOrder.contractor) {
            // console.log('order.contractor = ', retOrder.contractor);
            setHasContractor(true);
            if (retOrder.contractor.id !== contractorId) {
              setErrorMessage(
                'У данного заказа уже есть назначенный исполнитель'
              );
            }
          }
        }
      } catch (err) {
        setErrorMessage('Не удалось загрузить данные о заказе');
        console.error('Ошибка загрузки данных заказа', err);
      }
    };

    const fetchContractor = async () => {
      try {
        const query = `/users/${contractorId}`;
        // console.log('query', query);
        const contractorResponse = await api.get(query);
        if (contractorResponse.data.success) {
          setContractor(contractorResponse.data.user);
        }
      } catch (err) {
        setErrorMessage('Не удалось загрузить данные об Исполнителе');
        console.error('Ошибка загрузки данных о пользователе', err);
      }
    };

    const fetchMe = async () => {
      try {
        const response = await api.get('/users/me');
        if (response.data.success) {
          const usr = response.data.user;
          usr && setUser(usr);
          if (usr.role !== 'company') {
            throw new Error('Нет прав на переход по данному адресу');
          }
          // загрузка данных о заказе
          await fetchOrder();
          await fetchContractor();
          setNowLoading(false);
        }
      } catch (err) {
        console.error('Ошибка загрузки профиля', err);
        navigate('/');
      }
    };

    void fetchMe();
  }, [contractorId, navigate, orderId]);

  return {
    user,
    order,
    contractor,
    hasContractor,
    errorMessage,
    setNewContractor,
    nowLoading,
  };
}
