// Core Modules
const http = require('http');

// 3rd party modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const socketServer = require('./socketServer');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Our modules
const authRoutes = require('./routes/authRoutes');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');

require('dotenv').config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cors());

app.use(mongoSanitize());
app.use(xss());

app.use(compression());

// Register the modules
app.use('/api/auth', authRoutes);
app.use('/api/friend-invitation', friendInvitationRoutes);

// SERVER
const server = http.createServer(app);
socketServer.registerSocketServer(server);
const MONGO_URL = process.env.MONGO_URI.replace(
  '<password>',
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Database connection failed. Server not started');
    console.error(err);
  });
