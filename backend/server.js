require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const traiteurRoutes = require("./routes/traiteur");
const recRoutes = require("./routes/reclamation");
const equiRoutes = require("./routes/equipement");
const notiRoutes = require("./routes/notification");
const interRoutes = require("./routes/intervention");
const clientRoutes = require("./routes/client");
const contractRoutes = require("./routes/contrat");
const serviceRoutes = require("./routes/service");
const ticketRoutes = require("./routes/ticket");
const ticketHTRoutes = require("./routes/ticketHT");
const Notification = require("./models/notification");
const alertRoutes = require("./routes/alert");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/inter", interRoutes);
// app.use('/api/rec', recRoutes);
app.use("/api/equi", equiRoutes);
app.use("/api/trait", traiteurRoutes);
app.use("/api/notification", notiRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/contrat", contractRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/ticketht", ticketHTRoutes);
app.use("/api/alerts", alertRoutes);

// Corrected server initialization
const server = require("http").createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("A client connected");

  // Handle events from the client
  socket.on("event", (data) => {
    console.log("Received event:", data);
    // Handle the event here
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// API endpoint to send push notification
/*app.post('/send-notification', async (req, res) => {
  const { tokens, title, body } = req.body;
  const data = {
    title: title || 'Notification Title',
    body: body || 'Notification Body',
  };
  try {
    const result = await push.send(tokens, data);
    console.log('Push notification sent successfully:', result);
    res.status(200).json({ message: 'Push notification sent successfully' });
  } catch (error) {
    console.error('Error sending push notification:', error);
    res.status(500).json({ error: 'Failed to send push notification' });
  }
});
*/
const httpPort = process.env.PORT || 3000;
server.listen(httpPort, () => {
  console.log(`HTTP Server running on port ${httpPort}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
