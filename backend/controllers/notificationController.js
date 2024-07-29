const Notification = require('../models/notification')
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')
const getNotification = async (req, res) => {
    try {
        const userId = req.user._id; 
        const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });
        res.json( {notifications} );
      } catch (error) { 
        res.status(500).json({ message: 'Internal Server Error' });
      }
  }
/*
  
const getNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    // Set up SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Find notifications for the user
    const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });

    // Send notifications to the client
    notifications.forEach(notification => {
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    });

    // Keep the connection open
    res.flushHeaders();

    // Listen for changes in notifications and send updates to the client
    const changeStream = Notification.watch();
    changeStream.on('change', async () => {
      const updatedNotifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });
      updatedNotifications.forEach(notification => {
        res.write(`data: ${JSON.stringify(notification)}\n\n`);
      });
      res.flushHeaders();
    });

    // Handle client disconnection
    req.on('close', () => {
      changeStream.close();
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
  /*const getNotification = async (req, res) => {
    try {
      const userId = req.user._id;
        res.sseSetup();
      const stream = Notification.find({ receiverId: userId }).sort({ createdAt: -1 }).cursor();
  
      stream.on('data', (notification) => {
        res.sseSend({ notification });
      });
  
      stream.on('close', () => {
        res.end();
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };*/
  
  const deleteNotification = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid notification ID' });
    }
  
    try {
      const notification = await Notification.findOneAndDelete({ _id: id });
  
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
  
      res.status(200).json({ message: 'Notification deleted successfully', notification });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    getNotification,
    deleteNotification
  }