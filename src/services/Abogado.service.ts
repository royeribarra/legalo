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

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async rechazarSolicitud(solicitudId: string): Promise<any> {
    return this.post(`/rechazar-solicitud/${solicitudId}`);
  }
}
