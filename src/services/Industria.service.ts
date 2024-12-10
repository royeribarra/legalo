import { MainService } from "./Main.service";

export default class IndustriaService extends MainService {
  constructor(url: string = "industrias") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }
}
