import { MainService } from "./Main.service";

export default class ClienteService extends MainService {
  constructor(url: string = "clientes") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }
}
