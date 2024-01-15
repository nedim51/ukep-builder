export interface IUserRole {
  id: number;
  role: string;
  role_name: string;
}

export type IUserRoles = Array<IUserRole>;
