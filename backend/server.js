const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/healthcare_risk_db';

app.use(cors());
app.use(express.json());

global.isMongoConnected = false;

// Connect to MongoDB with fallback
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  global.isMongoConnected = true;
  console.log('Successfully connected to MongoDB database');
}).catch(err => {
  global.isMongoConnected = false;
  console.warn('MongoDB connection unavailable. Operating in in-memory fallback mode.');
});

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    service: "Healthcare Risk Prediction Express Backend API",
    status: "running",
    database: global.isMongoConnected ? "MongoDB Connected" : "In-Memory Fallback Mode",
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`Express Backend Server listening on http://localhost:${PORT}`);
});
