import { IAbogado } from "./Abogado.interface";
import { IOferta } from "./Oferta.interface";

export interface IServicio {
    id: number;
    nombre: string;
}

export interface IServicioOferta {
    id: number;
    servicio: IServicio;
    oferta: IOferta;
}

export interface IServicioAbogado {
    id: number;
    servicio: IServicio;
    abogado: IAbogado;
}