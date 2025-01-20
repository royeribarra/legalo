import { IClienteUpdateBack } from "@/interfaces/Cliente.interface";
import { MainService } from "./Main.service";

export default class ClienteService extends MainService {
  constructor(url: string = "clientes") {
    super(url);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async updateCliente(id: number, fieldsToUpdate: Partial<IClienteUpdateBack>) : Promise<any>{
    return this.put(`/edit/${id}`, fieldsToUpdate);
  }
}
