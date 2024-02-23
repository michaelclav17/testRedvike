import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../interfaces/user.interface';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsEnum(UserRole, { message: 'Must send a valid role.' })
  @IsNotEmpty()
  public role: UserRole;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
