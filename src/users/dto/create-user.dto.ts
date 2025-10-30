import { UserRole } from '../enums/user-role.enum';

export class CreateUserDto {
  username: string;

  password: string;

  role: UserRole;
}



