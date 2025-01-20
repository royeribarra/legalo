import { MainService } from "./Main.service";

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
}