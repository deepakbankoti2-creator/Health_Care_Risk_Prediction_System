const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  diseaseType: {
    type: String,
    default: 'Heart Disease'
  },
  inputData: {
    type: Object,
    required: true
  },
  probability: {
    type: Number,
    required: true
  },
  riskPercentage: {
    type: Number,
    required: true
  },
  riskCategory: {
    type: String,
    enum: ['High Risk', 'Low Risk'],
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  modelName: {
    type: String,
    required: true
  },
  modelVersion: {
    type: String,
    default: '1.0.0'
  },
  shapExplanation: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
