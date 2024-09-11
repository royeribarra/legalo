import { IProfile } from "./Profile.interface";

export interface IUser {
    id: number;
    username: string;
    password: string;
    email: string;
    perfil: IProfile;
}