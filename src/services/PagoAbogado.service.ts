import { MainService } from "./Main.service";

export default class PagoAbogadoService extends MainService {
  constructor(url: string = "pagos-abogado") {
    super(url);
  }

  public async registrarPago(
    pagoData: { monto: number,  operacion: string, trabajoId: number }
  ): Promise<any> {
    return this.post(`/create`, pagoData);
  }
}
