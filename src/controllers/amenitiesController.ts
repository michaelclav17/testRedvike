import { Response } from 'express';
import * as amenityService from '../services/amenityService';
import { RequestWithUser } from 'src/interfaces/auth.interface';

export const getBookings = async (req: RequestWithUser, res: Response) => {
  try {
    const amenityId = req.params.amenityId;
    const timestamp = req.params.timestamp;

    // Validate inputs, parse timestamp, etc.

    const bookings = await amenityService.getBookings(Number(amenityId), Number(timestamp));

    // Return sorted bookings as JSON
    res.json(bookings);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};
