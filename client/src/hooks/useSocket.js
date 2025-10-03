import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

let socketInstance = null;

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const getSocket = useCallback(() => {
    if (!socketInstance) {
      socketInstance = io('/', {
        transports: ['websocket'],
        path: '/socket.io/',
        autoConnect: true, // Подключаться автоматически
      });
    }
    return socketInstance;
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    // Если уже подключен, сразу устанавливаем состояние
    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [getSocket]);

  return { socket: socketRef.current, isConnected };
};
