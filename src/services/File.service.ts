import { MainService } from "./Main.service";

interface IFile{
  file: File;
  nombreArchivo: string;
  abogadoId?: number;
  ofertaId?: number;
  aplicacionId?: number;
  trabajoId?: number;
  folder: string;
};

export default class FileService extends MainService {
  constructor(url: string = "temp-files") {
    super(url);
  }

  public async uploadDocumentoImagenAbogado(abogadoId: number): Promise<any> {
    return this.post(`/upload-abogado-imagen-s3/${abogadoId}`);
  }

  public async uploadDocumentoCv(abogadoId: number): Promise<any> {
    return this.post(`/upload-abogado-cv/${abogadoId}`);
  }

  public async uploadDocumentoCul(abogadoId: number): Promise<any> {
    return this.post(`/upload-abogado-cul`);
  }

  public async uploadDocumentoOferta(formData: FormData): Promise<any> {
    return this.post(`/upload-oferta-documento`, formData);
  }

  public async uploadDocumentoAplicacion(abogadoId: number): Promise<any> {
    return this.post(`/upload-documento-aplicacion`);
  }

  public async uploadFile(fileData: IFile): Promise<any> {
    const formData = new FormData();
    formData.append('file', fileData.file, fileData.file.name); // El archivo debe ir aquí
    formData.append('nombreArchivo', fileData.nombreArchivo);
    formData.append('folder', fileData.folder);
    if (fileData.abogadoId) formData.append('abogadoId', fileData.abogadoId.toString());
    if (fileData.ofertaId) formData.append('ofertaId', fileData.ofertaId.toString());
    if (fileData.aplicacionId) formData.append('aplicacionId', fileData.aplicacionId.toString());
    if (fileData.trabajoId) formData.append('trabajoId', fileData.trabajoId.toString());
    return this.post(`/upload-file`, formData);
  }
}