// Referencia a habilidadas blandas, trabajo en equipo, buen liderazgo, etc

export interface IEstudio {
    id: number;
    descripcion: string;
    desde_fecha: string;
    institucion: string;
    hasta_fecha: string;
    titulo: string;
    ubicacion: string;
}

export interface IEducacionBack{
    id: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    fecha_fin: string
    fecha_inicio: string;
    descripcion: string;
    institucion: string;
    ubicacion: string;
    titulo: string;
}