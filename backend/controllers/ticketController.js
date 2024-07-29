const Ticket = require("../models/ticket");
const Equipement = require("../models/equipement");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const Notification = require("../models/notification");
const addPhoneTicket = async (req, res) => {
  try {
    const {
      technicien,
      equipement,
      service_type,
      equipement_type,
      garantie_end_date,
      garantie_start_date,
      service_station,
      contact,
      service_status,
      client,
      description,
      call_time,
      type,
      reference,
      status,
      codeqrStart,
    } = req.body;

    const emptyFields = [];

    if (!technicien) emptyFields.push("technicien");
    if (!equipement) emptyFields.push("equipement");
    if (!service_type) emptyFields.push("service_type");
    if (!equipement_type) emptyFields.push("equipement_type");
    if (!garantie_end_date) emptyFields.push("garantie_end_date");
    if (!garantie_start_date) emptyFields.push("garantie_start_date");
    if (!service_station) emptyFields.push("service_station");
    if (!contact) emptyFields.push("contact");
    if (!service_status) emptyFields.push("service_status");
    if (!client) emptyFields.push("client");
    if (!description) emptyFields.push("description");
    if (!call_time) emptyFields.push("call_time");
    if (!type) emptyFields.push("type");
    if (!reference) emptyFields.push("reference");
    if (!status) req.body.status = "ASSIGNED";
    if (!codeqrStart) emptyFields.push("codeqrStart");

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Required fields must be filled", emptyFields });
    }

    // Chercher l'équipement
    const equipementExists = await Equipement.findById(equipement);
    console.log("Equipement trouvé:", equipementExists);
    if (!equipementExists) {
      return res.status(404).json({ error: "Equipement not found" });
    }

    // Chercher le technicien
    const technicienExists = await User.findById(technicien);
    if (!technicienExists) {
      return res.status(404).json({ error: "Technicien not found" });
    }

    // Préparer le nouvel objet Ticket
    const equipementCodeQR = equipementExists.codeqrequipement || "";
    console.log("Code QR de l'équipement:", equipementCodeQR);
    const newTicket = new Ticket({
      equipement: equipementExists._id,
      technicien: technicienExists._id,
      service_type,
      equipement_type,
      garantie_end_date,
      garantie_start_date,
      service_station,
      contact,
      service_status,
      client,
      description,
      call_time,
      type,
      status,
      reference,
      codeqrStart,
      codeqrequipement: equipementCodeQR, // Assigner ici la valeur correcte
    });

    const savedTicket = await newTicket.save();
    console.log("Ticket sauvegardé:", savedTicket);
    const notification = await Notification.create({
      receiverId: technicien,
      message: `Nouveau ticket`,
    });

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addPhoneTicket;

const addFieldTicket = async (req, res) => {
  try {
    const {
      technicien,
      equipement,
      service_type,
      equipement_type,
      garantie_end_date,
      garantie_start_date,
      service_station,
      contact,
      service_status,
      client,
      description,
      call_time,
      type,
      reference,
      status,
      codeqrStart,
      codeqrEnd,
    } = req.body;

    const emptyFields = [];

    if (!technicien) emptyFields.push("technicien");
    if (!equipement) emptyFields.push("equipement");
    if (!service_type) emptyFields.push("service_type");
    if (!equipement_type) emptyFields.push("equipement_type");
    if (!garantie_end_date) emptyFields.push("garantie_end_date");
    if (!garantie_start_date) emptyFields.push("garantie_start_date");
    if (!service_station) emptyFields.push("service_station");
    if (!contact) emptyFields.push("contact");
    if (!service_status) emptyFields.push("service_status");
    if (!client) emptyFields.push("client");
    if (!description) emptyFields.push("description");
    if (!call_time) emptyFields.push("call_time");
    if (!type) emptyFields.push("type");
    if (!reference) emptyFields.push("reference");
    if (!status) {
      req.body.status = "ASSIGNED";
    }
    if (!codeqrStart) emptyFields.push("codeqrStart");

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "Required fields must be filled", emptyFields });
    }

    const equipementExists = await Equipement.findById(equipement);
    if (!equipementExists) {
      return res.status(404).json({ error: "Equipement not found" });
    }

    const technicienExists = await User.findById(technicien);
    if (!technicienExists) {
      return res.status(404).json({ error: "Technicien not found" });
    }

    const newTicket = new Ticket({
      equipement: equipementExists._id,
      technicien: technicienExists._id,
      service_type,
      equipement_type,
      garantie_end_date,
      garantie_start_date,
      service_station,
      contact,
      service_status,
      client,
      description,
      call_time,
      type,
      status,
      reference,
      codeqrStart,
      codeqrEnd,
    });

    console.log("Saving ticket:", newTicket); // Log before saving

    const savedTicket = await newTicket.save();

    console.log("Ticket saved:", savedTicket); // Log after saving

    const notification = await Notification.create({
      receiverId: technicien,
      message: `Nouveau ticket`,
    });

    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error adding ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const solvedTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      status: { $in: ["SOLVED", "APPROVED"] },
    })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn",
      })
      .populate({
        path: "technicien",
        select: "firstname lastname email",
      });
    res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTicketById = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId)
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name mobile email",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn equipement_type modele",
      })
      .populate({
        path: "technicien",
        select: "firstname lastname email",
      });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPhoneTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ type: "PHONE" })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn",
      })
      .populate({
        path: "technicien",
        select: "firstname lastname email",
      })
      .exec();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Population error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getFieldTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ type: "FIELD" })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn",
      })
      .populate({
        path: "technicien",
        select: "firstname lastname email",
      })
      .exec();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Population error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const solvingTicketbyCoordinatrice = async (req, res) => {
  const { ticketId } = req.params;
  const { solving_time, solution, image } = req.body; // Ajout de 'image' dans les données reçues

  if (!solving_time || !solution) {
    return res
      .status(400)
      .json({ error: "solving_time and solution must not be empty" });
  }

  try {
    const updateFields = {
      solving_time: solving_time,
      solution: solution,
      status: "SOLVED",
    };

    if (image) {
      updateFields.image = image; // Si une image est fournie, l'ajouter aux champs mis à jour
    }

    const ticket = await Ticket.findByIdAndUpdate(ticketId, updateFields, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const transferTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { technicien, raison_transfert } = req.body;

  if (!technicien || !raison_transfert) {
    return res
      .status(400)
      .json({ error: "technicien and raison_transfert must not be empty" });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        technicien: technicien,
        raison_transfert: raison_transfert,
        type: "FIELD",
        status: "ASSIGNED",
      },
      { new: true }
    );

    const notification = await Notification.create({
      receiverId: technicien,
      message: `Nouveau ticket`,
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { service_type, reference, service_station, call_time } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        service_type,
        reference,
        service_station,
        call_time: call_time || "",
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/////////////////////////////////////////////////////////
const updateTicketSolve = async (req, res) => {
  const { ticketId } = req.params;
  const { codeqrEnd, solving_time, solution, image } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (!codeqrEnd) {
      return res.status(400).json({ error: "Codeqr End not provided" });
    }

    ticket.status = "SOLVED";
    ticket.solving_time = solving_time;
    ticket.codeqrEnd = codeqrEnd;
    ticket.image = image;
    ticket.solution = solution;

    await ticket.save();

    res.status(200).json({
      status: ticket.status,
      solving_time: ticket.solving_time,
      codeqrEnd: ticket.codeqrEnd,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updateTicketSolve;

/////////////////////////////////////////// CHANGING TICKET STATUS ///////////////////////////////////////////////
const AcceptTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        accepting_time: new Date(),
        status: "ACCEPTED",
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//////////////////////////////////////////// APPROVE /////////////////////////////////////////////////////
const ApprovedTicket = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "APPROVED",
        completion_time: new Date(),
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
/////////////////////////////////////////// START ////////////////////////////////////////////////////////////
const StartTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { codeqrStart, starting_time } = req.body;

  try {
    const ticket = await Ticket.findById(ticketId).populate("equipement");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    console.log("Before update:", ticket);

    // Update the ticket fields
    ticket.status = "LOADING";
    ticket.starting_time = starting_time;
    ticket.codeqrStart = codeqrStart;
    ticket.codeqrequipement = codeqrStart;

    await ticket.save();

    // Update the equipement's codeqrequipement field
    const equipement = ticket.equipement;
    equipement.codeqrequipement = codeqrStart;
    await equipement.save();

    console.log("codeqrStart", codeqrStart);
    console.log("codeqrequipement", equipement.codeqrequipement);

    res
      .status(200)
      .json({ message: "Ticket and equipment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////
const DepartTicket = async (req, res) => {
  const { ticketId } = req.params;
  // const { longitude, latitude, departure_time } = req.body;
  const { departure_time } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId).populate("equipement");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    console.log("Before update:", ticket);

    // Update the ticket fields
    ticket.status = "ENROUTE";
    //  ticket.longitude = Number(longitude); // Convertir en nombre
    // ticket.latitude = Number(latitude); // Convertir en nombre
    ticket.departure_time = departure_time; // Convertir en Date
    await ticket.save();

    //   console.log("longitude", longitude);
    //  console.log("latitude", latitude);

    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
////////////////////////////
const ArrivedTicket = async (req, res) => {
  const { ticketId } = req.params;
  // const { longitude, latitude, departure_time } = req.body;
  const { arrival_time } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId).populate("equipement");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    console.log("Before update:", ticket);

    // Update the ticket fields
    ticket.status = "ARRIVED";
    //  ticket.longitude = Number(longitude); // Convertir en nombre
    // ticket.latitude = Number(latitude); // Convertir en nombre
    ticket.arrival_time = arrival_time; // Convertir en Date
    await ticket.save();

    //   console.log("longitude", longitude);
    //  console.log("latitude", latitude);

    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const ReportingAssigned = async (req, res) => {
  const { ticketId } = req.params;
  const { reporting_note_assigned, reporting_assignedTicket_time } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "REPORTED",
        reporting_note_assigned,
        reporting_assignedTicket_time,
      },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const ReportingSolve = async (req, res) => {
  const { ticketId } = req.params;
  const { reporting_note_solve, reporting_SolvedTicket_time } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "REPORTED",
        reporting_note_solve,
        reporting_SolvedTicket_time,
      },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
///////////////////////////////////// Report ////////////////////////////////////////////////////////////
const ReportTicket = async (req, res) => {
  const { ticketId } = req.params;
  const reporting_note_assigned = req.body.reporting_note_assigned;
  const reporting_assignedTicket_time = req.body.reporting_assignedTicket_time;
  const reporting_note_solve = req.body.reporting_note_solve; // Correction ici
  const reporting_SolvedTicket_time = req.body.reporting_assignedTicket_time;
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "REPORTED",
        reporting_assignedTicket_time: reporting_assignedTicket_time,
        reporting_note_assigned: reporting_note_assigned,
        reporting_note_solve: reporting_note_solve, // Correction ici
        reporting_note_solve: reporting_note_solve, // Correction ici
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////////// Solve ////////////////////////////////////////////////////////////
const SolveTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { solution, image, cloture_time, codeqrend } = req.body;

  try {
    // Vérifiez si l'image est fournie
    if (!image || image.trim() === "") {
      return res.status(400).json({
        error: "Vous devez ajouter l'image de la fiche d'intervention",
      });
    }

    const updateFields = {
      status: "SOLVED",
      solving_time: cloture_time,
      solution: solution,
      codeqrEnd: codeqrend,
      image: image, // Assuming `image` is the URL or path sent from the client
    };

    const ticket = await Ticket.findByIdAndUpdate(ticketId, updateFields, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

////////////////////////////////////////
/* const ReportTicket = async (req, res) => {
  const { ticketId } = req.params;
  const { note, status, reporting_time } = req.body;

  try {
    const updateFields = {
      status: "REPORTED",
      reporting_time: reporting_time,
      //   solving_time: new Date(),
      note: note,
      // Assuming `image` is the URL or path sent from the client
    };

    const ticket = await Ticket.findByIdAndUpdate(ticketId, updateFields, {
      new: true,
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; */
///////////////////////////////////////////APPROVED ------> SOLVED ////////////////////////////////////////////
const ResetToSolved = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "SOLVED",
        solving_time: new Date(),
        completion_time: null,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TECHNICIEN GET PHONE //
const getAssignedPhoneTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ type: "PHONE", technicien: Id })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn",
      });
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
    if (!tickets) {
      return res.status(404).json({ error: "No tickets found" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching assigned phone tickets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// TECHNICIEN GET FIELD //
const getAssignedFieldTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ type: "FIELD", technicien: Id })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn ",
      });
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
    if (!tickets) {
      return res.status(404).json({ error: "No tickets found" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching assigned phone tickets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getReportedFieldTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ type: "FIELD", technicien: Id })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn ",
      });
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
    if (!tickets) {
      return res.status(404).json({ error: "No tickets found" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching assigned phone tickets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAssignedTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ status: "APPROVED", technicien: Id })
      .sort({ createdAt: -1 })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "contact",
        select: "name",
      })
      .populate({
        path: "equipement",
        select: "equipement_sn",
      });
    /*.populate({
      path: 'technicien',
      select: 'firstname lastname email',
    });*/
    if (!tickets) {
      return res.status(404).json({ error: "No tickets found" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching assigned phone tickets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const countTickets = async (req, res) => {
  try {
    let count = await Ticket.countDocuments();
    count = count || 0;
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTicketsByDay = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const allDays = [];
    let currentDay = new Date(startOfMonth);

    while (currentDay <= endOfMonth) {
      allDays.push({
        day: currentDay.toISOString().split("T")[0],
        count: 0,
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    const reclamationsByDay = await Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    reclamationsByDay.forEach((ticket) => {
      const dayObj = allDays.find((day) => day.day === ticket._id);
      if (dayObj) {
        dayObj.count = ticket.count;
      }
    });

    res.status(200).json(allDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReclamationsByDay = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const allDays = [];
    let currentDay = new Date(startOfMonth);

    while (currentDay <= endOfMonth) {
      allDays.push({
        day: currentDay.toISOString().split("T")[0],
        count: 0,
      });

      currentDay.setDate(currentDay.getDate() + 1);
    }

    const reclamationsByDay = await Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    reclamationsByDay.forEach((reclamation) => {
      const dayObj = allDays.find((day) => day.day === reclamation._id);
      if (dayObj) {
        dayObj.count = reclamation.count;
      }
    });

    res.status(200).json(allDays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatetStatus = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId); // Utilisez le modèle Ticket pour trouver le ticket
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }
    let newStatus = "";
    switch (ticket.status) {
      case "assigned":
        newStatus = "accepted";
        break;
      case "accepted":
        newStatus = "enroute";
        break;
      case "enroute":
        newStatus = "arrived";
        break;
      case "arrived":
        newStatus = "encours";
        break;
      case "encours":
        newStatus = "cloturé";
        break;
      default:
        return res.status(400).send({ error: "Invalid status transition" });
    }
    ticket.status = newStatus;
    await ticket.save();
    res.send(ticket);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the ticket" });
  }
};
/*
const getTicketsByDay = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const ticketsByDay = await Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    return ticketsByDay;
  } catch (error) {
    throw new Error(`Error fetching tickets by day: ${error.message}`);
  }
};

*/
const StartFieldTicket = async (req, res) => {
  const { ticketId } = req.params;
  const codeqrStart = req.body.codeqr;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        status: "LOADING",
        codeqr: codeqrStart,
        starting_time: new Date(),
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  getReclamationsByDay,
  getTicketsByDay,
  countTickets,
  getAssignedTickets,
  getAssignedFieldTickets,
  getAssignedPhoneTickets,
  ResetToSolved,
  ApprovedTicket,
  updateTicket,
  deleteTicket,
  solvingTicketbyCoordinatrice,
  getPhoneTickets,
  addPhoneTicket,
  getTicketById,
  getAllTickets,
  transferTicket,
  getFieldTickets,
  solvedTicket,
  AcceptTicket,
  StartTicket,
  SolveTicket,
  ReportTicket,
  getReportedFieldTickets,
  StartFieldTicket,
  addFieldTicket,
  updateTicketSolve,
  // ReportAssignedTicket,
  DepartTicket,
  ArrivedTicket,
  ReportingAssigned,
  ReportingSolve,
};
