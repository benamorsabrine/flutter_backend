const Ticket = require("../models/ticket");
const Equipement = require("../models/equipement");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const Notification = require("../models/notification");

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

// TECHNICIEN GET PHONE //
const getAssignedPhoneTickets = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const Id = req.user._id;

    const tickets = await Ticket.find({ type: "PHONE", technicien: Id })
      .sort({ createdAt: -1 })
      .populate({
        path: "client",
        select: "client",
      })
      .populate({
        path: "equipementCodeQR",
        select: "equipementCodeQR", // Sélectionne les champs 'equipement_sn' et 'codeqr' du modèle Equipement
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
        path: "equipementCodeQR",
        select: "equipementCodeQR", // Sélectionne les champs 'equipement_sn' et 'codeqr' du modèle Equipement
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
        path: "equipementCodeQR",
        select: "equipementCodeQR", // Sélectionne les champs 'equipement_sn' et 'codeqr' du modèle Equipement
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

module.exports = {
  getTicketsByDay,
  getAssignedTickets,
  getAssignedFieldTickets,
  getAssignedPhoneTickets,
  getReclamationsByDay,
};
