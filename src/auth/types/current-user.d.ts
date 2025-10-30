import { UserRole } from "src/users/enums/user-role.enum";

export type CurrentUser = {
  id: number;
  role: UserRole;
};