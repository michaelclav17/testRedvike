import express, { Router } from 'express';
import * as amenitiesController from '../controllers/amenitiesController';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/:amenityId/bookings/:timestamp', authMiddleware(), amenitiesController.getBookings);

export default router;
