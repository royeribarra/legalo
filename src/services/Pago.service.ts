import { MainService } from "./Main.service";

export default class PagoService extends MainService {
  constructor(url: string = "pagos") {
    super(url);
  }

  public async realizarPago(pagoData: { ofertaId: number; monto: number, operacion: string, clienteId: number }): Promise<any> {
    return this.post(`/create`, pagoData);
  }
}
