// alert.controller.js
const cron = require('node-cron');
const Alert = require('../models/alerte');
const Ticket = require('../models/ticket');

cron.schedule('*/1 * * * *', async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  const overdueTickets = await Ticket.find({ status: 'ASSIGNED', createdAt: { $lte: fifteenMinutesAgo } });

  overdueTickets.forEach(async ticket => {
    const existingAlert = await Alert.findOne({ ticketId: ticket._id });
    if (!existingAlert) {
      const alert = new Alert({
        userId: ticket.userId, 
        ticketId: ticket._id,
      });
      await alert.save();
    }
  });
});
const getAlerts = async (req, res) => {
    try {
      // Fetch alerts from the database
      const alerts = await Alert.find().populate('userId').populate('ticketId');
      res.status(200).json({ alerts });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = {
    getAlerts,
  };