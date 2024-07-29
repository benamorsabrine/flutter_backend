const Contrat = require('../models/contrat');
const Service = require('../models/service');
const Equipement = require('../models/equipement');
const Client = require('../models/client');
const mongoose = require('mongoose');

const getEquipmentByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Find the service by ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Get the equipment associated with the service
    const equipment = await Equipement.find({ service: serviceId });

    res.status(200).json(equipment);
  } catch (error) {
    console.error('Error getting equipment by service ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addService = async (req, res) => {
  try {
    const { service_no, effective_date, termination_date, model, quantity, equipement, contrat, client, working_hour_start, working_hour_end, response_time_critical, response_time_major, response_time_minor } = req.body;

    // Check for empty fields
    const requiredFields = ['service_no', 'effective_date', 'termination_date', 'model', 'quantity', 'equipement', 'contrat', 'client', 'working_hour_start', 'working_hour_end', 'response_time_critical', 'response_time_major', 'response_time_minor'];
    const emptyFields = requiredFields.filter(field => !req.body[field]);

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: "Please fill in all required fields.", emptyFields });
    }

    // Check if the equipment exists
    const equipementExistsPromises = equipement.map(equipId => Equipement.findById(equipId));
    const equipementExistsResults = await Promise.all(equipementExistsPromises);

    if (equipementExistsResults.some(equip => !equip)) {
      return res.status(404).json({ error: 'One or more equipment not found' });
    }

    // Check if client exists and if service is already associated with a client
    /*const existingServiceForClient = await Service.findOne({ client });
    if (existingServiceForClient) {
      return res.status(400).json({ error: 'A service is already associated with this client' });
    }*/

    // Check if contract exists and if service is already associated with a contract
    const existingServiceForContrat = await Service.findOne({ contrat });
    if (existingServiceForContrat) {
      return res.status(400).json({ error: 'A service is already associated with this contract' });
    }

    const clientExists = await Client.findById(client);
    const contratExists = await Contrat.findById(contrat);

    if (!clientExists) {
      return res.status(404).json({ error: 'Client not found' });
    }
    if (!contratExists) {
      return res.status(404).json({ error: 'Contrat not found' });
    }

    // Validate effective_date and termination_date
    if (effective_date >= termination_date) {
      return res.status(400).json({ error: 'Effective date must be before or equal to termination date' });
    }

    // Check for uniqueness of service_no
    const isServiceNoUnique = await Service.findOne({ service_no });
    if (isServiceNoUnique) {
      return res.status(400).json({ error: 'Service number must be unique' });
    }

    // Create new Service
    const newService = new Service({
      service_no,
      effective_date,
      termination_date,
      model,
      quantity,
      contrat: contratExists._id,
      equipement: equipementExistsResults.map(equip => equip._id), // Assigning array of equipment IDs
      client: clientExists._id,
      working_hour_start,
      working_hour_end,
      response_time_critical,
      response_time_major,
      response_time_minor
    });

    const savedService = await newService.save();

    // Update contrat and client with service
    contratExists.service = savedService._id;
    clientExists.service = savedService._id;
    await Promise.all([contratExists.save(), clientExists.save()]);

    // Update each equipment with service, client, and contrat
    const updateEquipmentsPromises = equipementExistsResults.map(async equip => {
      equip.service = savedService._id;
      equip.client = clientExists._id;
      equip.contrat = contratExists._id;
      await equip.save();
    });
    await Promise.all(updateEquipmentsPromises);

    const response = {
      service: savedService,
      contrat: contratExists._id,
      equipement: equipementExistsResults.map(equip => equip._id), // Assigning array of equipment IDs
      client: clientExists._id,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', errors: validationErrors });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const fetchServices = async (req, res) => {
  try {

    const services = await Service.find()
      .populate({
        path: 'equipement',
        select: 'equipement_sn', // Include only these fields
      }).populate({
        path: 'contrat',
        select: 'contrat_sn', // Include only these fields
      });

    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const fetchServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId)
      .populate({
        path: 'equipement',
        select: 'equipement_sn', // Include only these fields
      })
      .populate({
        path: 'contrat',
        select: 'contrat_sn', // Include only these fields
      });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific service by ID
const getServiceById = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Error getting service by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteServiceById = async (req, res) => {
  const { serviceId } = req.params;

  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Assuming you have relationships in your Service model
    const { clientId, equipmentId, contractId } = deletedService;

    // Delete related records
    await Client.findByIdAndDelete(clientId);
    await Equipement.findByIdAndDelete(equipmentId);
    await Contrat.findByIdAndDelete(contractId);

    res.status(200).json(deletedService);
  } catch (error) {
    console.error('Error deleting service by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
/*const updateServiceById = async (req, res) => {
  const { serviceId } = req.params;
  const updatedServiceData = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, updatedServiceData, { new: true });
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/
const updateServiceById = async (req, res) => {
  const { serviceId } = req.params;
  const updatedServiceData = req.body;

  try {
    if (updatedServiceData.service_no) {
      const existingService = await Service.findOne({ service_no: updatedServiceData.service_no });
      if (existingService && existingService._id.toString() !== serviceId) {
        return res.status(400).json({ error: 'Service number must be unique' });
      }
    }

    const updatedService = await Service.findByIdAndUpdate(serviceId, updatedServiceData, { new: true });
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  updateServiceById, 
  fetchServices,
  addService,
  getAllServices,
  getServiceById,
  deleteServiceById,
  fetchServiceById,
  getEquipmentByServiceId
};
