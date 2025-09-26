import { useEffect, useRef, useState } from 'react';
import api from '../utils/api.jsx';
import { useLocation } from 'react-router-dom';

export default function useFetchOrders({ userInput, userCategories }) {
  const ITEMS_ON_PAGE = 3;
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const date = searchParams.get('date') || '';
  const price = searchParams.get('price') || '';

  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 1,
    hasNext: false,
    hasPrev: false,
    nextPage: 2,
    prevPage: 0,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // пропускаем первый рендер
    }

    const calcCategories = () => {
      const arr_cats = [];
      userCategories.map((cat) => {
        cat.selected && arr_cats.push(cat.id);
      });
      // если есть выбранные категории (но не все!), то перечисляем их Id
      return arr_cats.length > 0 && arr_cats.length < userCategories.length
        ? arr_cats.join(':')
        : '';
    };

    const fetchOrders = async () => {
      let response;

      try {
        if (userInput) {
          const query = [
            `/orders/search/${userInput}?`,
            `&page=${currentPage}&limit=${ITEMS_ON_PAGE}`,
          ].join('');
          response = await api.get(query);
        } else {
          const query = [
            `/orders?date=${date}&price=${price}&cats=${calcCategories()}`,
            `&page=${currentPage}&limit=${ITEMS_ON_PAGE}`,
            `&rnd=${Date.now()}`,
          ].join('');
          // console.log('query', query);
          response = await api.get(query);
        }

        if (response && response.data.success) {
          const foundOrders = response.data.orders;
          const pagination = response.data.pagination;
          foundOrders && setOrders(foundOrders);
          pagination && setPaginationParams(pagination);
        }
      } catch (err) {
        console.error('Ошибка загрузки заказов', err);
      }
    };

    fetchOrders();
  }, [userInput, date, price, userCategories, currentPage]);

  return {
    orders,
    currentPage,
    setCurrentPage,
    paginationParams,
  };
}
