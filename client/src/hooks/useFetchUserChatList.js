import { useEffect, useState } from 'react';
import api from '../utils/api.jsx';

export const useFetchUserChatList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    api.get('/chats').then(({ data }) => setChats(data.chats));
  }, []);

  return {
    chats,
  };
};
