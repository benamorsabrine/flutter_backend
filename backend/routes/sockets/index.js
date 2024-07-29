const socketio = require('socket.io');
let io = null;

exports.io = () => {
  return io;
};

exports.init = server => {
  if (!io) {
    io = socketio(server);
    require('../../config/socket')(io);
  }
  return io;
};
