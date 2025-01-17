import { MainService } from "./Main.service";

export default class AplicacionService extends MainService {
  constructor(url: string = "aplicaciones") {
    super(url);
  }

  public async getAplicacionesByAbogadoId(abogadoId: number): Promise<any> {
    return this.get(`/all/${abogadoId}`);
  }
}
