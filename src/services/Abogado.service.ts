import { MainService } from "./Main.service";

export default class AbogadoService extends MainService {
  constructor(url: string = "abogados") {
    super(url);
  }

  public async getDetalleAbogado(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async getVehiculosAll(): Promise<any> {
    return this.get("/vehiculos/all");
  }

  public async getAbogadoByID(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async getAplicacionesByAbogadoId(abogadoId: number): Promise<any> {
    return this.get(`/all-aplicaciones/${abogadoId}`);
  }

  public async postularOferta(data: {abogadoId: number, ofertaId: number, salarioEsperado: number}): Promise<any> {
    return this.post(`/postular-oferta`, { data });
  }

  public async rechazarSolicitud(solicitudId: string): Promise<any> {
    return this.post(`/rechazar-solicitud/${solicitudId}`);
  }

  public async updateLinkDocumentos(correo: string): Promise<any>{
    return this.post(`/update-archivos`, { correo });
  }

  public async updateStateAdmin(id: number, nuevoEstado: boolean) : Promise<any>{
    return this.put(`/edit/${id}`, { validado_admin: nuevoEstado });
  }
}
