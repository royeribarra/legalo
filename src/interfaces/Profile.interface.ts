import { IUser } from "./User.interface";

export interface IProfile {
    id: number;
    user: IUser; // Relación uno a uno con el usuario
    nombre: string;
}
