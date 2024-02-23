import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { AppDataSource } from '../data-source';

export const getBookingsByUser = async (userId: number): Promise<{ [key: string]: Reservation[] }> => {
  const repository: Repository<Reservation> = AppDataSource.getRepository(Reservation);
  const bookings = await repository
    .createQueryBuilder('booking')
    .where('booking.userId = :userId', { userId })
    .orderBy({ 'booking.startTime': 'ASC' })
    .getMany();

  // Group bookings by days
  const bookingsByDays: { [key: string]: Reservation[] } = {};
  bookings.forEach((booking) => {
    const dateKey = new Date(booking.startTime).toLocaleDateString();
    if (!bookingsByDays[dateKey]) {
      bookingsByDays[dateKey] = [];
    }
    bookingsByDays[dateKey].push(booking);
  });

  return bookingsByDays;
};
