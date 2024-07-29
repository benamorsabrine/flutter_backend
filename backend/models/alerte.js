const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
