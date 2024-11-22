export interface IArchivo{
    nombre: string; // Nombre del archivo
    tipo: string; // Tipo MIME del archivo (e.g., 'application/pdf')
    contenido: string; // Contenido del archivo en base64
};