import { IAbogado } from "./Abogado.interface";
import { IOferta } from "./Oferta.interface";

export interface IEspecialidad {
    id: number;
    nombre: string;
    imagen: string;
}

export interface IEspecialidadOferta {
    id: number;
    especialidad: IEspecialidad;
    oferta: IOferta;
}

export interface IEspecialidadAbogado {
    id: number;
    especialidad: IEspecialidad;
    abogado: IAbogado;
}