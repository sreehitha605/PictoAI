import express from 'express';
import { handlePaymentSuccess } from '../controllers/imageController.js';

const router = express.Router();

// Route to handle payment success and update credits
router.post('/payment-success', handlePaymentSuccess);

export default router;  // Make sure to export the router
