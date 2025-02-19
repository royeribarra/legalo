// Referencia a habilidadas blandas, trabajo en equipo, buen liderazgo, etc

export interface IExperiencia {
    id: number;
    descripcion: string;
    desde_fecha: string;
    empresa: string;
    hasta_fecha: string;
    titulo: string;
    ubicacion: string;
}

export interface IExperienciaBack{
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    fecha_fin: string
    fecha_inicio: string;
    descripcion: string;
    institucion: string;
    titulo: string;
    ubicacion: string;
}