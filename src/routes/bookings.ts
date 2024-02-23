import express, { Router } from 'express';
import * as bookingsController from '../controllers/bookingsController';
import authMiddleware from '../middlewares/auth.middleware';

const router: Router = express.Router();

router.get('/:userId', authMiddleware(), bookingsController.getBookingsByUser);

export default router;
