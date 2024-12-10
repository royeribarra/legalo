import { IEspecialidadAbogado } from "./Especialidad.interface";
import { IExperiencia } from "./Experiencia.interface";
import { IHabilidad } from "./Habilidad.interface";
import { IIndustriaAbogado } from "./Industria.interface";
import { IServicioAbogado } from "./Servicio.interface";
import { ITrabajo } from "./Trabajo.interface";
import { IUser } from "./User.interface";

export interface IAbogado {
    id?: number;
    user: IUser;
    nombres: string;
    apellidos: string;
    dni: string;
    fecha_nacimiento: string;
    universidad: string;
    grado_academico: string;
    acerca_de: string;
    telefono: string;
    direccion: string;
    especializacion: string;
    industria: string;
    experiencia: string;
    experiencia_anos: string;
    pdf_cv: string;
    habilidades: IHabilidad[];
    trabajos: ITrabajo[];
}

export interface IAbogadoBack {
    id: number;
    user: IUser;
    nombres: string;
    apellidos: string;
    dni: string;
    fecha_nacimiento: string;
    universidad: string;
    grado_academico: string;
    sobre_ti: string;
    telefono: string;
    direccion: string;
    especializacion: string;
    industria: string;
    experiencia: string;
    experiencia_anos: string;
    pdf_cv: string;
    imagen: string;
    foto_url: string;
    experiencias: IExperiencia[];
    habilidadesBlandas: IHabilidad[];
    habilidadesDuras: IHabilidad[];
    industriasAbogado: IIndustriaAbogado[];
    serviciosAbogado: IServicioAbogado[];
    especialidadesAbogado: IEspecialidadAbogado[];
    habilidades: IHabilidad[];
    trabajos: ITrabajo[];
}