import { IsEmail, IsOptional, IsPhoneNumber, MinLength } from "class-validator";


export class UpdateProfileDto {
  @IsOptional()
  @MinLength(3)
  firstName?: string;

  @IsOptional()
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
