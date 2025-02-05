import { MainService } from "./Main.service";

export default class TrabajoService extends MainService {
  constructor(url: string = "trabajos") {
    super(url);
  }

  public async updateTrabajo(
    data: { trabajoId: number, progreso: number }
  ): Promise<any> {
    return this.put(`/actualizar-progreso`, data);
  }
}