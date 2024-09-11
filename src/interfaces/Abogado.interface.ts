import { IHabilidad } from "./Habilidad.interface";
import { ITrabajo } from "./Trabajo.interface";
import { IUser } from "./User.interface";

export interface IAbogado {
    id: number;
    user: IUser;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    dni: string;
    fecha_nacimiento: string;
    universidad: string;
    grade_academico: string;
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