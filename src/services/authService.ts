import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/users.entity';
import { removeRefreshToken } from '../utils/tokenManagement';
import { UserRole } from '../interfaces/user.interface';
import { RegisterUserDto } from '../dtos/auth.dto';

interface UserPayload {
  id: number;
  email: string;
}

export const registerUser = async (registerUserData: RegisterUserDto) => {
  const {
    firstName,
    lastName,
    email,
    role,
    password,
  } = registerUserData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = await User.save({
    firstName,
    lastName,
    email,
    role: role as UserRole,
    password: hashedPassword,
  });

  return {
    ...newUser,
  };
};

export const loginUser = async (email: string, password: string) => {
  const user: User = await User.findOne({ where: { email }, select: ['id', 'email', 'password'] });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid ? user : null;
};

export const generateAccessToken = (user: UserPayload) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
};

export const generateRefreshToken = (user: UserPayload) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET!);
};

export const logoutUser = async (token: string) => {
  await removeRefreshToken(token);
};
