// Core Modules
const http = require('http');

// 3rd party modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Our modules
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors());

// Register the modules
app.use('/api/auth', authRoutes);

// SERVER
const server = http.createServer(app);

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
