const Contrat = require('./../models/contrat');
const Client = require('./../models/client');
const updateContratAttachments = async (req, res) => {
  try {
    const { contratId } = req.params;
    const { attachments } = req.body;

    if (!contratId || !attachments || !Array.isArray(attachments)) {
      return res.status(400).json({ error: 'Invalid data provided' });
    }

    const existingContrat = await Contrat.findById(contratId);

    if (!existingContrat) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    // Update or add attachments to the existing contract
    existingContrat.attachement = attachments;

    const updatedContrat = await existingContrat.save();

    res.status(200).json({ message: 'Attachments updated successfully', updatedContrat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addContrat = async (req, res) => {
  try {
    const { client, attachement, effective_date, termination_date, contrat_sn } = req.body;

    if (!client || !termination_date || !effective_date) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Check if effective_date is less than termination_date
    if (new Date(effective_date) >= new Date(termination_date)) {
      return res.status(400).json({ error: 'Effective date must be before termination date' });
    }

    const clientExists = await Client.findById(client);

    if (!clientExists) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const newContrat = new Contrat({
      contrat_sn,
      attachement,
      effective_date,
      termination_date,
      client: clientExists._id,
    });

    const savedContrat = await newContrat.save();
    clientExists.contrats = clientExists.contrats || [];

    if (Array.isArray(clientExists.contrats)) {
      clientExists.contrats.push(savedContrat._id);
      await clientExists.save();

      const response = {
        contrat: savedContrat,
        clientId: clientExists._id,
      };

      return res.status(201).json(response);
    } else {
      console.error('clientExists.contrats is not an array:', clientExists.contrats);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', errors: validationErrors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate key violation. The combination of contrat_sn must be unique.' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


///LISTE CONTRATS///

const fetchContrats = async (req, res) => {
  try {
    const contracts = await Contrat.find().populate({
      path: 'client',
      select: 'client',
    }).select('effective_date termination_date contrat_sn createdAt attachement');
    res.status(200).json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/////////////////////

const viewContratById = async (req, res) => {
  try {
    const { contratId } = req.params;
    if (!contratId) {
      return res.status(400).json({ error: 'Contract ID is required' });
    }

    // Check if the contract exists
    const contract = await Contrat.findById(contratId).populate('client');

    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    res.status(200).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteContrat = async (req, res) => {
  try {
    const { contratId } = req.params;
    if (!contratId) {
      return res.status(400).json({ error: 'Contract ID is required' });
    }
    const contract = await Contrat.findById(contratId);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    const client = await Client.findById(contract.client);
    if (client) {
      client.contrats = client.contrats.filter((id) => id.toString() !== contratId);
      await client.save();
    }
    await Contrat.findByIdAndDelete(contratId);
    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateContrat = async (req, res) => {
  try {
    const { contratId } = req.params;
    const { client, effective_date, termination_date, contrat_sn } = req.body;

    if (!contratId) {
      return res.status(400).json({ error: 'Contract ID is required' });
    }

    const existingContract = await Contrat.findById(contratId);

    if (!existingContract) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    // Validate effective_date and termination_date
    if (effective_date && termination_date && new Date(effective_date) >= new Date(termination_date)) {
      return res.status(400).json({ error: 'Effective date must be before termination date' });
    }

    // Check for unique contrat_sn
    const isContratSnUnique = await Contrat.findOne({ contrat_sn, _id: { $ne: contratId } });

    if (isContratSnUnique) {
      return res.status(400).json({ error: 'contrat SN must be unique' });
    }

    let clientExists = null;

    if (client) {
      clientExists = await Client.findById(client);

      if (!clientExists) {
        return res.status(404).json({ error: 'Client not found' });
      }

      // Detach the contract from the previous client (if any)
      const previousClientId = existingContract.client;
      if (previousClientId && previousClientId.toString() !== clientExists._id.toString()) {
        const previousClient = await Client.findById(previousClientId);
        if (previousClient) {
          previousClient.contrats = previousClient.contrats.filter((c) => c.toString() !== contratId);
          await previousClient.save();
        }
      }
    }

    existingContract.client = clientExists ? clientExists._id : null;
    existingContract.effective_date = effective_date || existingContract.effective_date;
    existingContract.termination_date = termination_date || existingContract.termination_date;
    existingContract.contrat_sn = contrat_sn || existingContract.contrat_sn;

    const updatedContract = await existingContract.save();

    // Update client's contrats field
    if (clientExists) {
      clientExists.contrats = clientExists.contrats || [];
      const index = clientExists.contrats.findIndex((c) => c.toString() === contratId);
      if (index === -1) {
        clientExists.contrats.push(updatedContract._id);
        await clientExists.save();
      }
    }

    res.status(200).json({ message: 'Contract updated successfully', updatedContract });
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', errors: validationErrors });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
///////// Attachement ///////
const updateAttachments = async (req, res) => {
  const { attachments } = req.body; 

  try {
    const updatedDocument = await YourModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { attachement: attachments } }, 
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Attachments updated successfully', data: updatedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/*
const updateContrat = async (req, res) => {
  try {
    const { contratId } = req.params;
    const { client, service_cn, attachement, effective_date, termination_date, contrat_sn } = req.body;
    if (!contratId) {
      return res.status(400).json({ error: 'Contract ID is required' });
    }
    const existingContract = await Contrat.findById(contratId);
    if (!existingContract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    let clientExists = null;
    if (client) {
      clientExists = await Client.findById(client);

      if (!clientExists) {
        return res.status(404).json({ error: 'Client not found' });
      }
    }
    existingContract.client = clientExists ? clientExists._id : existingContract.client;
    existingContract.attachement = attachement || existingContract.attachement;
    existingContract.effective_date = effective_date || existingContract.effective_date;
    existingContract.termination_date = termination_date || existingContract.termination_date;
    existingContract.contrat_sn = contrat_sn || existingContract.contrat_sn;
    const updatedContract = await existingContract.save();
    res.status(200).json({ message: 'Contract updated successfully', updatedContract });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: 'Validation failed', errors: validationErrors });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};*/
module.exports = {
  addContrat,
  fetchContrats,
  viewContratById,
  deleteContrat,
  updateContrat,
  updateContratAttachments,
  updateAttachments
};
