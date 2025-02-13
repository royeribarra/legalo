import { MainService } from "./Main.service";

export default class TrabajoService extends MainService {
  constructor(url: string = "trabajos") {
    super(url);
  }

  public async createTrabajo(data: any): Promise<any>{
    return this.post(`/create`, data);
  }

  public async updateTrabajo(
    data: { trabajoId: number, progreso: number }
  ): Promise<any> {
    return this.put(`/actualizar-progreso`, data);
  }
}