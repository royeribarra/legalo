import { MainService } from "./Main.service";

export default class UsuarioService extends MainService {
  constructor(url: string = "usuarios") {
    super(url);
  }

  public async validarcuenta(data: any): Promise<any> {
    return this.post("/validar-cuenta", data);
  }
}
