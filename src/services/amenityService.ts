import { Reservation } from '../entities/reservation.entity';
import { AppDataSource } from '../data-source';

export const getBookings = async (amenityId: number, timestamp: number): Promise<Reservation[]> => {
  const bookings = await AppDataSource.getRepository(Reservation)
    .createQueryBuilder('booking')
    .where('booking.amenityId = :amenityId', { amenityId })
    .andWhere('DATE(TO_TIMESTAMP(booking.startTime / 1000)) = DATE(TO_TIMESTAMP(:timestamp / 1000))', { timestamp })
    .orderBy({ 'booking.startTime': 'ASC' })
    .getMany();

  return bookings;
};
