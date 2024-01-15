import { IUserRole } from "./user-role.interface";

export interface IUser {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role_id: IUserRole['id'];
    right: string;
    authdata?: string;
}

export type IUsers = Array<IUser>;

export const INITIAL_USER: IUser = {
    id: -1,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    right: '',
    role_id: -1
}

// export interface IUser {
//     id: number;
//     login: string;
//     f_name: string;
//     m_name: string;
//     l_name: string;
//     email: string;
//     role_id: IUserRole['id'];
//   }