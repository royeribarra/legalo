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
  nombres: string;
  correo: string;
  apellidos: string;
  tipo_persona_id: number;
  razon_social: string;
  persona_contacto: string;
  dni_contacto: string;
  ruc: string;
  industria: string;
  direccion: string;
  telefono_contacto: string;
  validado_admin: boolean;
  trabajos: ITrabajo[];
}

export interface IClienteUpdateBack{
  id?: number;
  user?: IUser;
  nombres?: string;
  apellidos?: string;
  tipo_persona_id?: number;
  razon_social?: string;
  persona_contacto?: string;
  dni_contacto?: string;
  ruc?: string;
  industria?: string;
  direccion?: string;
  telefono_contacto?: string;
  validado_admin?: boolean;
}