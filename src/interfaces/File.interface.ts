import { IAbogadoBack } from "./Abogado.interface";
import { IAplicacionBack } from "./Aplicacion.interface";
import { IOfertaBack } from "./Oferta.interface";
import { ITrabajoBack } from "./Trabajo.interface";

export interface IFile {
  id: number;
  descripcion: string;
  desde_fecha: string;
  institucion: string;
  hasta_fecha: string;
  titulo: string;
  ubicacion: string;
}

export interface IFileBack {
  id: number;
  dni?: string;
  correo?: string;
  nombreArchivo: string;
  filePath: string;
  idFront?: string;
  abogado?: IAbogadoBack;
  oferta?: IOfertaBack;
  aplicacion?: IAplicacionBack;
  trabajo?: ITrabajoBack;
}