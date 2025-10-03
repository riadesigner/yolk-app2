import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../utils/api.jsx';
import { getPayloads } from '../utils/payloads.jsx';
import { useSocket } from './useSocket';

const MESSAGES_LIMIT = 10;

export const useFetchChats = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [loadMoreError, setLoadMoreError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false);
  const scrollPositionRef = useRef(null);
  const pl = getPayloads();
  const other = chatData?.users?.filter((i) => i.id !== pl.id)[0];
  const { socket, isConnected } = useSocket();

  const getChatContainer = useCallback(() => {
    return document.querySelector('[class*="chatMessages"]');
  }, []);

  // Сохранение позиции скролла
  const saveScrollPosition = useCallback(() => {
    const chatContainer = getChatContainer();
    if (
      chatContainer &&
      chatContainer.scrollHeight > chatContainer.clientHeight
    ) {
      scrollPositionRef.current = {
        scrollTop: chatContainer.scrollTop,
        scrollHeight: chatContainer.scrollHeight,
      };
    }
  }, [getChatContainer]);

  // Восстановление позиции скролла
  const restoreScrollPosition = useCallback(() => {
    const chatContainer = getChatContainer();
    if (chatContainer && scrollPositionRef.current) {
      const { scrollTop, scrollHeight } = scrollPositionRef.current;
      const newScrollHeight = chatContainer.scrollHeight;
      const heightDifference = newScrollHeight - scrollHeight;

      chatContainer.scrollTop = scrollTop + heightDifference;
      scrollPositionRef.current = null;
    }
  }, [getChatContainer]);

  // Загрузка сообщений
  const loadMessages = useCallback(
    async (reset = true) => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;

        if (reset) {
          setIsLoading(true);
          offsetRef.current = 0;
        } else {
          saveScrollPosition();
          setIsLoadingMore(true);
        }

        setLoadMoreError(null);

        const offset = reset ? 0 : offsetRef.current;
        const response = await api.get(`/chats/${chatId}/messages`, {
          params: {
            limit: MESSAGES_LIMIT,
            offset,
            sortBy: 'createdAt',
            sortOrder: 'desc',
          },
        });

        const newMessages = response.data.messages;

        if (reset) {
          // Для первоначальной загрузки - сортируем по возрастанию
          setMessages(newMessages.toReversed());
        } else {
          // Для подгрузки старых - добавляем в начало
          setMessages((prev) => [...newMessages.toReversed(), ...prev]);
        }

        const hasMore = newMessages.length === MESSAGES_LIMIT;
        setHasMoreMessages(hasMore);

        if (!reset && hasMore) {
          offsetRef.current += MESSAGES_LIMIT;
        } else if (reset) {
          offsetRef.current = hasMore ? MESSAGES_LIMIT : 0;
        }

        // Восстанавливаем скролл после обновления DOM
        if (!reset) {
          requestAnimationFrame(() => {
            restoreScrollPosition();
          });
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        setLoadMoreError('Не удалось загрузить сообщения');
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
        isFetchingRef.current = false;
      }
    },
    [chatId, saveScrollPosition, restoreScrollPosition]
  );

  // Загрузка данных чата
  const loadChatData = useCallback(async () => {
    try {
      const response = await api.get(`/chats/${chatId}`);
      setChatData(response.data.chat);
    } catch (error) {
      console.error('Error loading chat data:', error);
    }
  }, [chatId]);

  // Пагинация
  const loadMoreMessages = useCallback(async () => {
    if (isFetchingRef.current || isLoadingMore || !hasMoreMessages) {
      return;
    }
    await loadMessages(false);
  }, [isLoadingMore, hasMoreMessages, loadMessages]);

  // Отправка сообщения
  const sendMessage = useCallback(
    (messageText) => {
      if (socket && messageText.trim()) {
        socket.emit('newMessage', {
          chatId,
          text: messageText.trim(),
          sender: pl.id,
        });
      }
    },
    [chatId, pl.id, socket]
  );

  // Автопрокрутка к новым сообщениям только если пользователь внизу
  const scrollToNewMessages = useCallback(() => {
    if (messages.length === 0 || isLoadingMore) return;

    setTimeout(() => {
      const chatContainer = getChatContainer();
      if (chatContainer) {
        const isNearBottom =
          chatContainer.scrollTop + chatContainer.clientHeight >=
          chatContainer.scrollHeight - 100;

        if (isNearBottom) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
    }, 100);
  }, [messages.length, isLoadingMore, getChatContainer]);

  // Обработчик новых сообщений из сокета
  const handleNewMessage = useCallback((message) => {
    setMessages((prev) => {
      if (prev.some((msg) => msg.id === message.id)) {
        return prev;
      }
      return [...prev, message];
    });
  }, []);

  // Эффекты
  useEffect(() => {
    // Сброс состояния при смене чата
    setMessages([]);
    setChatData(null);
    offsetRef.current = 0;
    setHasMoreMessages(true);
    setIsLoadingMore(false);
    setLoadMoreError(null);
    isFetchingRef.current = false;
    scrollPositionRef.current = null;
  }, [chatId]);

  // Загрузка данных
  useEffect(() => {
    if (!chatId) return;

    const fetchData = async () => {
      await Promise.all([loadMessages(true), loadChatData()]);
    };

    void fetchData();
  }, [chatId, loadMessages, loadChatData]);

  // Автопрокрутка при новых сообщениях
  useEffect(() => {
    scrollToNewMessages();
  }, [messages.length, scrollToNewMessages]);

  // Работа с сокетом
  useEffect(() => {
    if (!socket || !isConnected || !chatId) return;

    socket.emit('joinChat', { chatId });
    socket.on('message', handleNewMessage);

    return () => {
      socket.emit('leaveChat', { chatId });
      socket.off('message', handleNewMessage);
    };
  }, [chatId, socket, isConnected, handleNewMessage]);

  return {
    messages,
    chatData,
    sendMessage,
    other,
    isSocketConnected: isConnected,
    loadMoreMessages,
    isLoadingMore,
    isLoading,
    hasMoreMessages,
    loadMoreError,
  };
};
