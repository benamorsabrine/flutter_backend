const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = new Schema(
  {
    reference: {
      type: String,
    },
    type: {
      type: String,
      enum: ["PHONE", "FIELD"],
    },

    service_station: {
      type: String,
    },
    service_type: {
      type: String,
    },

    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },

    localisation: {
      type: String,
    },
    receiving_time: {
      type: String,
    },
    accepting_time: {
      type: String,
    },
    departure_time: {
      type: String,
    },
    arrival_time: {
      type: String,
    },
    solving_time: {
      type: String,
    },
    completion_time: {
      type: String,
    },
    starting_time: {
      type: String,
    },

    reporting_assignedTicket_time: { type: Date, default: null },

    reporting_SolvedTicket_time: { type: Date, default: null },
    attachement: {
      type: String,
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    equipement: {
      type: Schema.Types.ObjectId,
      ref: "Equipement",
      required: true,
    },
    technicien: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    call_time: {
      type: Date,
    },
    garantie_start_date: {
      type: Date,
    },
    garantie_end_date: {
      type: Date,
    },
    solution: {
      type: String,
    },
    codeqrStart: {
      type: String,
    },
    /* latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    }, */

    codeqrequipement: {
      type: String,
      default: "", // ou null, selon le cas
    },
    codeqrEnd: { type: String },
    status: {
      type: String,
      default: "ASSIGNED",
      enum: [
        "ASSIGNED",
        "ARRIVED",
        "SOLVED",
        "ACCEPTED",
        "APPROVED",
        "LOADING",
        "REPORTED",
        "ENROUTE",
      ],
    },
    note: {
      type: String,
    },
    raison_transfert: {
      type: String,
    },
    image: {
      // Champ pour l'image
      type: String, // Vous pouvez stocker l'URL de l'image ou le chemin où elle est stockée
    },
    reporting_note_assigned: { type: String, default: "" },
    reporting_note_solve: { type: String, default: "" },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
