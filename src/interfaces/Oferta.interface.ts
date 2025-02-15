import { IAplicacionBack } from "./Aplicacion.interface";
import { ICliente, IClienteBack } from "./Cliente.interface";
import { IEspecialidadOferta } from "./Especialidad.interface";
import { IFileBack } from "./File.interface";
import { IIndustriaOferta } from "./Industria.interface";
import { IServicioOferta } from "./Servicio.interface";
import { ITrabajo } from "./Trabajo.interface";


export interface IRespuestaOfertaBack {
    id: number;
    respuesta: string;
    aplicacion: IAplicacionBack
}

export interface IPreguntaOfertaBack {
    id: number;
    pregunta: string;
    respuesta: string;
    ofertaId: number;
    respuestas: IRespuestaOfertaBack[];
}

export interface IOferta {
    id: number;
    cliente: ICliente;
    titulo: string;
    descripcion: string;
    especializacion_requerida: string;
    estado: string;
    trabajo: ITrabajo;
}

export interface IOfertaBack {
    id: number;
    createdAt: string;
    uso: string;
    titulo: string;
    descripcion: string;
    documento_url: string;
    duracion: string;
    experiencia_abogado: string;
    salario_minimo: number;
    salario_maximo: number;
    estado: string;
    especialidadesOferta: IEspecialidadOferta[];
    serviciosOferta: IServicioOferta[];
    industriasOferta: IIndustriaOferta[];
    cliente: IClienteBack;
    aplicaciones: IAplicacionBack[];
    preguntas_oferta: IPreguntaOfertaBack[];
    files: IFileBack[];
}