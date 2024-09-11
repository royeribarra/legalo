import { ICliente } from "./Cliente.interface";
import { ITrabajo } from "./Trabajo.interface";

export interface IOferta {
    id: number;
    cliente: ICliente;
    titulo: string;
    descripcion: string;
    especializacion_requerida: string;
    estado: string;
    trabajo: ITrabajo;
}