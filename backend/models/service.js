const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    service_no: {
      type: String,
      required: true,
      unique: true
    },
    model: {
      type: String,
    },
    effective_date: Date,
    termination_date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number, 
      required: true,
    },
    working_hour_start: {
      type: String,
    },
    working_hour_end: {
      type: String,
    },
    response_time_critical: {
      type: Number,
    },
    response_time_major: {
      type: Number,
    },
    response_time_minor: {
      type: Number,
    },
    client: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Client',
      }
    ],
    equipement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipement' }], 
    contrat: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Contrat',
      },
    ],
  },
  { timestamps: true }
);


const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
