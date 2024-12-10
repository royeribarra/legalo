import { MainService } from "./Main.service";

export default class ServicioService extends MainService {
  constructor(url: string = "servicios") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }
}
