import { MainService } from "./Main.service";

export default class MailService extends MainService {
  constructor(url: string = "mail-admin") {
    super(url);
  }

  public async enviarFormularioContacto(data?: any): Promise<any> {
    return this.post("/formulario-contacto", data);
  }
}
