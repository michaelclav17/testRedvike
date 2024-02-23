import { getBookings } from '../amenityService';
import { AppDataSource } from '../../data-source';
import { Reservation } from '../../entities/reservation.entity';

// Mock AppDataSource
jest.mock('../../data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('getBookings', () => {
  it('should retrieve bookings correctly', async () => {
    // Mock data
    const mockBookings: Reservation[] = [
      // Add sample Reservation objects here
    ];

    // Mock AppDataSource.getRepository to return the mock bookings
    (AppDataSource.getRepository as jest.Mock).mockReturnValueOnce({
      createQueryBuilder: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(mockBookings),
    });

    // Call the function
    const amenityId = 123;
    const timestamp = 456;
    const result = await getBookings(amenityId, timestamp);

    // Assert the result
    expect(result).toEqual(mockBookings);

    // Assert that AppDataSource.getRepository was called with the correct parameters
    expect(AppDataSource.getRepository).toHaveBeenCalledWith(Reservation);
  });
});
