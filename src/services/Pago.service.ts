import { MainService } from "./Main.service";

export default class PagoService extends MainService {
  constructor(url: string = "pagos") {
    super(url);
  }

  public async realizarPago(
    pagoData: { ofertaId?: number; monto: number, clienteId?: number, aplicacionId?: number, operacion: string, trabajoId?: number }
  ): Promise<any> {
    return this.post(`/create`, pagoData);
  }
}
