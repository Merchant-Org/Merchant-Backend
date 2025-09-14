import { IsEnum } from "class-validator";
import { UserStatus } from "../entities/user-status.enum";


export class UpdateStatusDto {
  @IsEnum(UserStatus)
  status: UserStatus;
}
