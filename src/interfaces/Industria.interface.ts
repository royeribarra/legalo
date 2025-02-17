// Referencia a habilidadas blandas, trabajo en equipo, buen liderazgo, etc

import { IAbogado } from "./Abogado.interface";
import { IOferta } from "./Oferta.interface";

export interface IIndustria {
    id: number;
    nombre: string;
}

export interface IIndustriaOferta {
    id: number;
    industria: IIndustria;
    oferta: IOferta;
}

export interface IIndustriaAbogado {
    id: number;
    industria: IIndustria;
    oferta: IAbogado;
}