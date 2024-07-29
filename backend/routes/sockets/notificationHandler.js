const Profile = require('../../models/userModel');

const notificationHandler = (io, socket, data) => {
  Profile.findOne({ user: data.user })
    .populate('user')
    .then(profile => {
      if (profile) {
        const roomId = `notifications:${data.user}`;
        socket.join(roomId, () => {
          console.log('user joined room', roomId);
        });
      }
    });
};

module.exports = notificationHandler;
