import { IAbogado, IAbogadoBack } from "./Abogado.interface";
import { ICliente, IClienteBack } from "./Cliente.interface";
export interface IUser {
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    nombres: string;
    apellidos: string;
    correo: string;
    usuario: string;
    contrasena: string;
    direccion: string | null;
    dni: string;
    telefono: string;
    activationCode: string | null;
    activationCodeExpires: string;
    isActive: boolean;
    cliente: IClienteBack | null;
    abogado: IAbogadoBack | null;
}