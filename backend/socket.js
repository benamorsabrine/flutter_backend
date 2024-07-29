const { Server } = require('socket.io');
var io = require('socket.io');
var fs = require('fs');
const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = initSocket;
