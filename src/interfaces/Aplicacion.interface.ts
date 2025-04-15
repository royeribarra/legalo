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
    createdAt: string;
    fecha_aplicacion: string;
    fecha_fin: string;
    status: number;
    oferta: IOfertaBack;
    salarioEsperado: number;
    numeroCuenta: string;
    selectedBanco: string;
    abogado: IAbogadoBack;
    trabajo: ITrabajoBack;
    numeroCuentaCci: string;
    files: IFileBack[];
}