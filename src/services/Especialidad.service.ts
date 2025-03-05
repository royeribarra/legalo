import { MainService } from "./Main.service";

export default class EspecialidadService extends MainService {
  constructor(url: string = "especialidades") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async getEstadistica(): Promise<any>{
    return this.post("/estadistica");
  }
}
