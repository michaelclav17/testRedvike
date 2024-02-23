import express, { Router } from 'express';
import * as userController from '../controllers/authController';
import validationMiddleware from '../middlewares/validation.middleware';
import { RegisterUserDto } from '../dtos/auth.dto';

const router: Router = express.Router();

router.post('/register', validationMiddleware(RegisterUserDto, 'body'), userController.register);
router.post('/login', userController.login);
router.post('/token', userController.token);
router.delete('/logout', userController.logout);

export default router;
