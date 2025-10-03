const MessagesService = require('./messages.service');

exports.chatListener = async (socket, io) => {
  console.log('User connected:', socket.id);

  socket.on('joinChat', async (data) => {
    const currentRooms = Array.from(socket.rooms);
    currentRooms.forEach((roomName) => {
      if (roomName !== socket.id) {
        socket.leave(roomName);
      }
    });

    socket.join(data.chatId);
    console.log('User joined chat:', data);
  });

  socket.on('newMessage', async (data) => {
    console.log('Message received:', data);

    const message = await MessagesService.create(data);

    io.to(data.chatId).emit('message', message.toJSON());
  });

  socket.on('leaveChat', (data) => {
    socket.leave(data.chatId);
    console.log('User left chat:', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
};
