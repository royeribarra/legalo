import { IAbogado, IAbogadoBack } from "./Abogado.interface";
import { IAplicacionBack } from "./Aplicacion.interface";
import { ICliente, IClienteBack } from "./Cliente.interface";
import { IOferta } from "./Oferta.interface";

export interface ITrabajo {
    id: number;
    oferta: IOferta;
    abogado: IAbogado;
    cliente: ICliente;
    estado: number;
}

export interface ITrabajoBack {
    id: number;
    estado: number;
    fecha_fin: string;
    fecha_inicio: string;
    progreso: number;
    cliente: IClienteBack;
    abogado: IAbogadoBack;
    aplicacion: IAplicacionBack;
}