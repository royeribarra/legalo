import { MainService } from "./Main.service";

export default class PagoService extends MainService {
  constructor(url: string = "pagos") {
    super(url);
  }

  public async updateTrabajo(
    data: { trabajoId: number, progreso: number }
  ): Promise<any> {
    return this.post(`/update-trabajo`, data);
  }
}