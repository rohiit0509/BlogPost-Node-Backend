import { Server, Socket } from 'socket.io';

let users: { userId: string; socketId: string }[] = [];

const addUser = (userId: string, socketId: string) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
    console.log(`User added: ${userId} with socket ID: ${socketId}`);
  }
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
  console.log(`User with socket ID ${socketId} removed`);
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

export const socketSetup = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('addUser', (userId: string) => {
      addUser(userId, socket.id);
    });

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user?.socketId) {
        io.to(user.socketId).emit('getMessage', { senderId, text });
        console.log(`Message sent from ${senderId} to ${receiverId}: ${text}`);
      } else {
        console.log(`User ${receiverId} not connected`);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      removeUser(socket.id);
      io.emit('getUsers', users);
    });
  });
};
