import { MainService } from "./Main.service";

export default class UsuarioService extends MainService {
  constructor(url: string = "usuarios") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async validarcuenta(data: any): Promise<any> {
    return this.post("/validar-cuenta", data);
  }

  public async validarUsuarioPorAdmin(data: {abogadoId?: number, is_active: boolean}): Promise<any> {
    return this.post("/validar-usuario-por-admin", data);
  }
}
