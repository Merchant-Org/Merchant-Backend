import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { UserStatus } from '../entities/user-status.enum';

export class CreateUserDto {
  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;

  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus = UserStatus.Active;
}
