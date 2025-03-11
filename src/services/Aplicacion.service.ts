import { MainService } from "./Main.service";

export default class AplicacionService extends MainService {
  constructor(url: string = "aplicaciones") {
    super(url);
  }

  public async getAplicacionesByAbogadoId(abogadoId: number): Promise<any> {
    return this.get(`/all/${abogadoId}`);
  }

  public async updateLinkDocumentos(data: {abogadoId: number, ofertaId: number}): Promise<any>{
    return this.post(`/update-archivos`, data);
  }

  public async obtenerTotalAplicacionesPorAbogado(data: any): Promise<any>{
    return this.post(`/obtener-total-aplicaciones-por-abogado`, data);
  }
}
