import { getBookingsByUser } from '../bookingService'; 
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Reservation } from '../../entities/reservation.entity';

// Mock AppDataSource
jest.mock('../../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

// Mock Repository
const mockRepository = {
  createQueryBuilder: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
};

describe('getBookingsByUser', () => {
  it('should retrieve bookings by user and group by days correctly', async () => {
    // Mock data
    const mockBookings: Reservation[] = [
      // Add sample Reservation objects here
    ];

    // Mock AppDataSource.getRepository to return the mock repository
    (AppDataSource.getRepository as jest.Mock).mockReturnValueOnce(mockRepository);

    // Mock the repository getMany method to return the mock bookings
    (mockRepository.getMany as jest.Mock).mockResolvedValueOnce(mockBookings);

    // Call the function
    const userId = 123;
    const result = await getBookingsByUser(userId);

    // Assert the result
    expect(result).toEqual({});

    // Assert that AppDataSource.getRepository was called with the correct parameters
    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Reservation);

    // Assert that Repository methods were called with the correct parameters
    expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    expect(mockRepository.where).toHaveBeenCalledWith('booking.userId = :userId', { userId });
    expect(mockRepository.orderBy).toHaveBeenCalledWith({ 'booking.startTime': 'ASC' });
    expect(mockRepository.getMany).toHaveBeenCalled();
  });
});
