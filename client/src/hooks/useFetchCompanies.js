import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export default function useFetchCompanies() {
  const ITEMS_ON_PAGE = 3;
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState('1');

  const [paginationParams, setPaginationParams] = useState({
    currentPage: 1,
    totalPages: 1,
    totalOrders: 1,
    hasNext: false,
    hasPrev: false,
    nextPage: 2,
    prevPage: 0,
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const query = [
          `/companies?`,
          `page=${currentPage}&limit=${ITEMS_ON_PAGE}`,
          `&rnd=${Date.now()}`,
        ].join('');
        const response = await api.get(query);

        if (response.data.success) {
          const all_companies = response.data.companies;
          if (all_companies) {
            all_companies.map((cat) => (cat.selected = true));
            setCompanies(all_companies);
          }
        }
        const pagination = response.data.pagination;
        pagination && setPaginationParams(pagination);
      } catch (err) {
        console.error('Ошибка загрузки компаний', err);
      }
    };

    fetchCompanies();
  }, [currentPage]);

  return {
    companies,
    paginationParams,
    currentPage,
    setCurrentPage,
  };
}
