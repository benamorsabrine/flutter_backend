const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const equipementSchema = new Schema(
  {
    equipement_sn: {
      type: String,
      required: true,
      unique: true,
    },
    modele_pc: {
      type: String,
    },
    modele: {
      type: String,
    },
    equipement_type: {
      type: String,
      required: true,
    },
    terminal_no: {
      type: String,
    },
    service_station: {
      type: String,
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    status: {
      type: String,
    },
    adresse: {
      type: String,
    },
    branch_type: {
      type: String,
    },
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    garantie_start_date: {
      type: Date,
    },
    garantie_end_date: {
      type: Date,
    },
    nb_camera: {
      type: Number,
    },
    type_ecran: {
      type: String,
    },
    nb_casette: {
      type: Number,
    },
    version_application: {
      type: String,
    },
    date_visite_preventive: {
      type: Date,
    },
    date_formation: {
      type: Date,
    },
    parametre_reseau: {
      type: String,
    },
    modele_pc: {
      type: String,
    },
    installation_date: {
      type: String,
    },
    os: {
      type: String,
    },
    modele_ecran: {
      type: String,
    },
    geolocalisation: {
      type: String,
    },
    longitude: {
      stype: String,
    },
    latitude: {
      type: String,
    },
    code_bureau: {
      type: String,
    },
    contrat: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contrat",
      },
    ],
    service: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    codeqrequipement: {
      type: String,
      default: "",
    },
    client: [
      {
        type: Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
  },
  { timestamps: true }
);
equipementSchema.index({ equipement_sn: 1 }, { unique: true });

module.exports = mongoose.model("Equipement", equipementSchema);
