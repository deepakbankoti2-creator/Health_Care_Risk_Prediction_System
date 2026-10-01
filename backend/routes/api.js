const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const predictionController = require('../controllers/predictionController');
const { authenticateToken, requireAuth } = require('../middleware/auth');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/me', authenticateToken, authController.getMe);

// Prediction routes
router.post('/predict', authenticateToken, predictionController.createPrediction);
router.get('/predictions', authenticateToken, predictionController.getPredictions);
router.get('/predictions/:id', authenticateToken, predictionController.getPredictionById);

// Dashboard & Model monitoring routes
router.get('/dashboard', predictionController.getDashboardStats);
router.get('/model-metrics', predictionController.getModelMetrics);

module.exports = router;
