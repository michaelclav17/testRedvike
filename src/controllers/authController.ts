import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../services/authService';
import { retrieveRefreshToken, storeRefreshToken } from '../utils/tokenManagement';
import { ErrorMessage } from '../utils/constants/constants';
import { User } from 'src/entities/users.entity';
import { RegisterUserDto } from '../dtos/auth.dto';

export const register = async (req: Request, res: Response) => {
  try {
    const registerUserDto: RegisterUserDto = req.body as RegisterUserDto;
    const newUser = await userService.registerUser(registerUserDto);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  if (user) {
    const accessToken = userService.generateAccessToken({ id: user.id, email: user.email });
    const refreshToken = userService.generateRefreshToken({ id: user.id, email: user.email });

    await storeRefreshToken(user.id, refreshToken);
    res.json({ accessToken, refreshToken });
  } else {
    res.status(400).send(ErrorMessage.errorInvalidPassword);
  }
};

export const token = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const storedToken = await retrieveRefreshToken(token);
    if (!storedToken) return res.sendStatus(403);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err, user: User) => {
      if (err) return res.sendStatus(403);
      const accessToken = userService.generateAccessToken({ id: user.id, email: user.email });
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await userService.logoutUser(req.body.token);
  } catch (error) {
    console.log(error);
  }

  res.json({ message: 'logout' });
};
