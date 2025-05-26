import { IEspecialidadAbogado } from "./Especialidad.interface";
import { IEducacionBack } from "./Estudio.interface";
import { IExperiencia, IExperienciaBack } from "./Experiencia.interface";
import { IFileBack } from "./File.interface";
import { IHabilidad } from "./Habilidad.interface";
import { IIndustriaAbogado } from "./Industria.interface";
import { IServicioAbogado } from "./Servicio.interface";
import { ITrabajo } from "./Trabajo.interface";
import { IUser, IUsuarioBack } from "./User.interface";

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
  correo?: string;
  id: number;
  user: IUser;
  usuario: IUsuarioBack;
  nombres: string;
  apellidos: string;
  cip: string;
  dni: string;
  fecha_nacimiento: string;
  universidad: string;
  grado_academico: string;
  sobre_ti: string;
  telefono: string;
  direccion: string;
  especializacion: string;
  experiencia: string;
  experiencia_anos: string;
  pdf_cv: string;
  cul_url: string;
  cv_url: string;
  foto_url: string;
  video_url: string;
  objetivo: string;
  validado_admin: boolean;
  experiencias: IExperienciaBack[];
  educaciones: IEducacionBack[];
  habilidadesBlandas: IHabilidad[];
  habilidadesDuras: IHabilidad[];
  industriasAbogado: IIndustriaAbogado[];
  serviciosAbogado: IServicioAbogado[];
  especialidadesAbogado: IEspecialidadAbogado[];
  habilidades: IHabilidad[];
  trabajos: ITrabajo[];
  files: IFileBack[];
}

export interface AbogadoUpdateDTO {
  contrasena?: string;
  telefono?: string;
  direccion?: string;
  sobre_ti?: string;
  grado_academico?: string;
  cip?: string;
  colegio?: string;
  video?: string;
  foto?: string;
  cv?: string;
  cul?: string;
  validado_admin?: boolean;
}