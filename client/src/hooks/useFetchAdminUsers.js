import api from '../utils/api.jsx';
import { useEffect, useState } from 'react';

export const useFetchAdminUsers = (role) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.get('/admin/users', { params: { role } });
      setUsers(response?.data?.users ?? []);
    };
    void fetchUsers();
  }, [role]);

  return {
    users,
  };
};
