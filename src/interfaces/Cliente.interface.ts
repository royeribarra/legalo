import { ITrabajo } from "./Trabajo.interface";
import { IUser } from "./User.interface";

export interface ICliente{
    id: number;
    user: IUser;
    tipo_persona_id: number;
    razon_social: string;
    persona_contacto: string;
    dni_contacto: string;
    ruc: string;
    industria: string;
    direccion: string;
    telefono_contacto: string;
    trabajos: ITrabajo[];
}

export interface IClienteBack{
    id: number;
    user: IUser;
    tipo_persona_id: number;
    razon_social: string;
    persona_contacto: string;
    dni_contacto: string;
    ruc: string;
    industria: string;
    direccion: string;
    telefono_contacto: string;
    trabajos: ITrabajo[];
}