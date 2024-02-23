import { Request } from 'express';
import { MulterFile } from 'multer';
import { User } from '../entities/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export interface RequestWithFile extends Request {
  file: MulterFile;
}

export interface DataStoredInToken {
  id: number;
  name: string;
  type: string;
  role: string;
  email: string;
}
