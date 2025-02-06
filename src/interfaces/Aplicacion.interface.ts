import { IAbogadoBack } from "./Abogado.interface";
import { IFileBack } from "./File.interface";
import { IOfertaBack } from "./Oferta.interface";
import { ITrabajoBack } from "./Trabajo.interface";

export interface IAplicacion {
    id: number;
    oferta_id: number;
    abogado_id: number;
    estado: number;
}

export interface IAplicacionBack {
    id: number;
    fecha_aplicacion: string;
    status: number;
    oferta: IOfertaBack;
    salarioEsperado: number;
    abogado: IAbogadoBack;
    trabajo: ITrabajoBack;
    files: IFileBack[];
}