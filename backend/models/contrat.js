const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contratSchema = new Schema(
  {
    contrat_sn: {
      type: String,
      required: true,
      unique: true,
    },
    attachement: [{
      url: {
        type: String,
      },
    }],
    effective_date: Date,
    termination_date: {
      type: Date,
      required: true,
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
      },
    ],
    client: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Client',
      },
    ],
  },
  { timestamps: true }
);

contratSchema.index({ contrat_sn: 1,service:1 }, { unique: true });

const Contrat = mongoose.model('Contrat', contratSchema);
module.exports = Contrat;
