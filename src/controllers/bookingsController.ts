import { Response } from 'express';
import * as bookingService from '../services/bookingService';
import { RequestWithUser } from 'src/interfaces/auth.interface';

export const getBookingsByUser = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const bookingsByDays = await bookingService.getBookingsByUser(userId);
    res.json(bookingsByDays);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
