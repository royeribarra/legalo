import { MainService } from "./Main.service";

export default class PagoService extends MainService {
  constructor(url: string = "pagos") {
    super(url);
  }

  public async realizarPago(pagoData: { clienteId: number; monto: number }): Promise<any> {
    return this.post(`/create`, pagoData);
  }
}
