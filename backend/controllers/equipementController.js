const Equipement = require("../models/equipement");
const mongoose = require("mongoose");
const Service = require("../models/service");
// get all equipements
/*const getEquipements = async (req, res) => {
  try {
    const equipements = await Equipement.find().sort({ createdAt: -1 });
    res.status(200).json(equipements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}*/
const getAllDataEquipement = async (req, res) => {
  try {
    const equipements = await Equipement.find()
      .populate({
        path: "client",
        select: "client",
      })

      .populate({
        path: "service",
        select:
          "service_no effective_date termination_date response_time_critical response_time_major response_time_minor",
      })
      .select("equipement_sn status equipement_type adresse status modele");

    res.status(200).json(equipements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEquipementsModal = async (req, res) => {
  try {
    const equipements = await Equipement.find()
      .select(
        "adresse geolocalisation equipement-type terminal_no service_station modele equipement_sn"
      )
      .populate({
        path: "service",
        select: "service_no effective_date termination_no client contact",
      });
    res.status(200).json(equipements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEquipements = async (req, res) => {
  try {
    const equipements = await Equipement.find()
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contrat",
        select: "contrat_sn",
      })
      .populate({
        path: "service",
        select: "service_no ",
      })
      .select("modele equipement_sn status equipement_type createdAt");

    res.status(200).json(equipements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getEquipement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such equipement" });
  }

  try {
    const equipement = await Equipement.findById(id)
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contrat",
        select: "contrat_sn",
      })
      .populate({
        path: "service",
        select: "service_no",
      });

    if (!equipement) {
      return res.status(404).json({ error: "No such equipement" });
    }

    res.status(200).json(equipement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createEquipement = async (req, res) => {
  const {
    equipement_sn,
    modele,
    code_bureau,
    equipement_type,
    terminal_no,
    service_station,
    client,
    status,
    adresse,
    branch_type,
    contrat,
    garantie_start_date,
    garantie_end_date,
    nb_camera,
    type_ecran,
    nb_casette,
    version_application,
    date_visite_preventive,
    date_formation,
    parametre_reseau,
    modele_pc,
    installation_date,
    os,
    modele_ecran,
    geolocalisation,
    codeqrequipement,
    latitude,
    longitude,
  } = req.body;

  let emptyFields = [];

  // Validation des champs obligatoires
  if (!terminal_no) emptyFields.push("terminal_no");

  if (!equipement_type) emptyFields.push("equipement_type");
  if (!equipement_sn) emptyFields.push("equipement_sn");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Remplissez les champs obligatoires", emptyFields });
  }

  // Ajout dans la base de données
  try {
    const equipement = await Equipement.create({
      equipement_sn,
      modele_pc,
      modele,
      code_bureau,
      equipement_type,
      terminal_no,
      service_station,
      client,
      status,
      adresse,
      branch_type,
      contrat,
      garantie_start_date,
      garantie_end_date,
      nb_camera,
      type_ecran,
      nb_casette,
      version_application,
      date_visite_preventive,
      date_formation,
      parametre_reseau,
      installation_date,
      os,
      modele_ecran,
      geolocalisation,
      codeqrequipement,
      latitude,
      longitude,
    });

    res.status(200).json(equipement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete equipement

const deleteEquipement = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid equipement ID" });
    }

    // Delete the equipment
    const equipement = await Equipement.findOneAndDelete({ _id: id });

    if (!equipement) {
      return res.status(404).json({ error: "Equipement not found" });
    }

    // Update service documents to remove the deleted equipment ID
    await Service.updateMany({ equipement: id }, { $pull: { equipement: id } });

    res.status(200).json(equipement);
  } catch (error) {
    console.error("Error deleting equipement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/*
const deleteEquipement = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such equipement'})
  }

  const equipement = await Equipement.findOneAndDelete({_id: id})

  if(!equipement) {
    return res.status(400).json({error: 'No such equipement'})
  }

  res.status(200).json(equipement)
}*/
// update an equipement
const updateEquipement = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such Equipement" });
  }

  const equipement = await Equipement.findById(id);

  if (!equipement) {
    return res.status(400).json({ error: "No such Equipement" });
  }

  const {
    num_serie,
    marque,
    code_agence,
    date_visite_pre,
    date_mise_service,
    date_installation_physique,
    date_transfert,
    modele_pc,
    modele,
    code_barre,
    os,
    nb_camera,
    type_ecran,
    nb_casette,
    version_application,
  } = req.body;

  if (
    !num_serie &&
    !marque &&
    !code_agence &&
    !date_visite_pre &&
    !date_mise_service &&
    !date_installation_physique &&
    !date_transfert &&
    !modele_pc &&
    !modele &&
    !code_barre &&
    !os &&
    !nb_camera &&
    !type_ecran &&
    !nb_casette &&
    !version_application
  ) {
    return res
      .status(400)
      .json({ error: "Please provide at least one field to update" });
  }

  // Construct the update object with only the provided fields
  const updateFields = {
    ...(num_serie && { num_serie }),
    ...(version_application && { version_application }),
    ...(date_visite_pre && { date_visite_pre }),
    ...(nb_casette && { nb_casette }),
    ...(type_ecran && { type_ecran }),
    ...(os && { os }),
    ...(code_barre && { code_barre }),
    ...(marque && { marque }),
    ...(os && { os }),
    ...(modele && { modele }),
    ...(modele_pc && { modele_pc }),
    ...(date_mise_service && { date_mise_service }),
    ...(date_visite_pre && { date_visite_pre }),
    ...(code_agence && { code_agence }),
    ...(code_agence && { code_agence }),
    ...(date_transfert && { date_transfert }),
    ...(date_installation_physique && { date_installation_physique }),
  };

  const updatedEquipement = await Equipement.findByIdAndUpdate(
    id,
    updateFields,
    { new: true }
  );

  res.status(200).json(updatedEquipement);
};

module.exports = {
  getEquipements,
  getEquipement,
  createEquipement,
  deleteEquipement,
  updateEquipement,
  getEquipementsModal,
  getAllDataEquipement,
};
