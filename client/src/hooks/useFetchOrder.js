import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.jsx';
import useFiles from './useFiles.js';

export default function useFetchOrder({ orderId, companyId, setErrorMessage }) {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [order, setOrder] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [price, setPrice] = useState(1000);
  const [dateTo, setDateTo] = useState('');
  const [showConfirmToDeleteOrder, setShowConfirmToDeleteOrder] =
    useState(false);

  const { files, setFiles } = useFiles([]);

  const hdlRemoveOrder = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowConfirmToDeleteOrder(true);
  };

  const hdlRemoveOrderConfirmed = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      if (orderId) {
        // eslint-disable-next-line no-unused-vars
        const response = await api.delete(`/orders/${orderId}`);
        // console.log('Успешно удален заказ:', response.data.message);
        navigate('/cp/company');
      }
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
      setErrorMessage('Не удалось удалить заказ');
    }
  };

  const hdlSaveOrder = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const catsSelected = [];
    cats.map((cat) => {
      cat.selected && catsSelected.push(cat.id);
    });

    const arrTags = tags.split(',');
    const arrTrimmed = arrTags.map((el) => el.trim()).filter((el) => el !== '');

    const orderData = {
      title,
      description,
      categories: catsSelected,
      tags: arrTrimmed,
      price,
      dateTo,
    };

    if (!title.trim() || !description.trim()) {
      setErrorMessage('Заполните обязательные поля перед сохранением');
      return;
    }

    try {
      if (orderId) {
        await api.patch(`/orders/${orderId}`, { orderData });
        // console.log('Успешно обновлен заказ:', response.data);
        navigate('/cp/company');
      } else {
        await api.put(`/orders/${companyId}`, { orderData });
        // console.log('Успешно добавлен заказ:', response.data);
        navigate('/cp/company');
      }
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
      setErrorMessage('Не удалось сохранить');
      throw error; // Можно обработать ошибку в компоненте
    }
  };

  useEffect(() => {
    const fetchOrder = async (allCats) => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        if (response.data.success) {
          const order = response.data.order;

          if (order) {
            setOrder(order);
            setTitle(order.title || '');
            setDescription(order.description || '');
            setDateTo(order.dateTo ? order.dateTo.split('T')[0] : '');
            setPrice(order.price || 1000);
            const arrTags = order.tags;
            setTags(arrTags ? arrTags.join(', ') : '');
            const updatedCats = [...allCats];
            // выделяем выбранные категории
            if (order.categories.length > 0) {
              updatedCats.map((cat) => {
                if (order.categories.includes(cat.id)) {
                  cat.selected = true;
                }
              });
            }
            setFiles(order.files || []);
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки заказа', err);
        navigate('/');
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data.success) {
          const allCats = response.data.categories;
          if (!orderId) {
            // если новый заказ
            // выделяем все категории
            allCats.map((cat) => {
              cat.selected = true;
              return cat;
            });
          }
          setCats(allCats);
          // если заказ существует
          // то загружаем его
          orderId && fetchOrder(allCats);
        }
      } catch (err) {
        console.error('Ошибка загрузки категорий', err);
        throw new Error('Ошибка загрузки категорий');
      }
    };
    void fetchCategories();
  }, [navigate, orderId, setFiles]);

  return {
    order,
    cats,
    setCats,
    title,
    setTitle,
    description,
    setDescription,
    tags,
    setTags,
    price,
    setPrice,
    dateTo,
    setDateTo,
    files,
    setFiles,
    hdlSaveOrder,
    hdlRemoveOrder,
    hdlRemoveOrderConfirmed,
    showConfirmToDeleteOrder,
    setShowConfirmToDeleteOrder,
  };
}
