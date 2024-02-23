import { RefreshToken } from '../../entities/refresh-tokens.entity';

export const storeRefreshToken = async (userId: number, token: string) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30); // Set token to expire in 30 days

  await RefreshToken.save({
    userId,
    token,
    expiryDate,
  });
};

export const retrieveRefreshToken = async (token: string): Promise<string | null> => {
  const refreshToken = await RefreshToken.findOne({
    where: { token },
  });

  if (!refreshToken || refreshToken.expiryDate <= new Date()) return null;
  return refreshToken.token;
};

export const removeRefreshToken = async (token: string) => {
  await RefreshToken.delete({ token });
};
