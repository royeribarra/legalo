import { MainService } from "./Main.service";

export default class OfertaService extends MainService {
  constructor(url: string = "ofertas") {
    super(url);
  }

  public async realizarPago(pagoData: { clienteId: number; monto: number }): Promise<any> {
    return this.post(`/realizar-pago`, pagoData);
  }

  public async getOfertaByID(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async rechazarSolicitud(solicitudId: string): Promise<any> {
    return this.post(`/rechazar-solicitud/${solicitudId}`);
  }

  public async getOfertasSinAplicacionesPorAbogado(data: { clienteId: number; abogadoId: number }): Promise<any>{
    return this.post(`/sin-aplicaciones-por-abogado`, data);
  }

  public async invitarAbogado(data: { ofertaId: number | undefined | null; abogadoId: number }): Promise<any>{
    return this.post(`/invitar-abogado`, data);
  }
}
