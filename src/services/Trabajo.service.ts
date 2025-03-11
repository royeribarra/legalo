import { MainService } from "./Main.service";

export default class TrabajoService extends MainService {
  constructor(url: string = "trabajos") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async getTrabajoById(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async createTrabajo(data: any): Promise<any>{
    return this.post(`/create`, data);
  }

  public async registrarProgreso(data: any): Promise<any>{
    return this.post(`/registrar-progreso`, data);
  }

  public async finalizarTrabajo(data: any): Promise<any>{
    return this.post(`/finalizar-trabajo`, data);
  }

  public async obtenerTotalTrabajosPorCliente(data: any): Promise<any>{
    return this.post(`/obtener-total-trabajos-por-cliente`, data);
  }

  public async obtenerTotalTrabajosPorAbogado(data: any): Promise<any>{
    return this.post(`/obtener-total-trabajos-por-abogado`, data);
  }

  public async updateTrabajo(
    data: { trabajoId: number, progreso: number }
  ): Promise<any> {
    return this.put(`/actualizar-progreso`, data);
  }
}