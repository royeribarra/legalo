import { MainService } from "./Main.service";

export default class ServicioService extends MainService {
  constructor(url: string = "servicios") {
    super(url);
  }

  public async obtenerTodos(): Promise<any> {
    return this.get("/all");
  }
}
