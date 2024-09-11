import { IAbogado } from "./Abogado.interface";
import { ICliente } from "./Cliente.interface";
import { IOferta } from "./Oferta.interface";

export interface ITrabajo {
    id: number;
    oferta: IOferta;
    abogado: IAbogado;
    cliente: ICliente;
    estado: number;
}