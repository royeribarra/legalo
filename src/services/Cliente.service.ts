import { IClienteUpdateBack } from "@/interfaces/Cliente.interface";
import { MainService } from "./Main.service";

export default class ClienteService extends MainService {
  constructor(url: string = "clientes") {
    super(url);
  }

  public async createCliente(data: any): Promise<any>{
    return this.post(`/create`, data);
  }

  public async getDetalleCliente(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async updateCliente(id: number, fieldsToUpdate: Partial<IClienteUpdateBack>) : Promise<any>{
    return this.put(`/edit/${id}`, fieldsToUpdate);
  }

  public async getTrabajos(data: {clienteId: number, estado?: string}): Promise<any> {
    return this.post(`/get-trabajos`, data);
  }

  public async getOfertas(params?: any): Promise<any> {
    return this.post("/get-ofertas", params);
  }

  public async getOfertasConAplicaciones(data: {clienteId: number, estado?: string}): Promise<any> {
    return this.post(`/ofertas/con-aplicaciones`, data);
  }

  public async updateDocumentoOferta(data: {clienteId: number, ofertaId?: number}): Promise<any> {
    return this.post(`/update-documento-oferta`, data);
  }

  public async createOferta(data: any): Promise<any> {
    return this.post(`/create-oferta`, data);
  }
}
