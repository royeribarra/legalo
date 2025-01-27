import { AbogadoUpdateDTO } from "@/interfaces/Abogado.interface";
import { MainService } from "./Main.service";

export default class AbogadoService extends MainService {
  constructor(url: string = "abogados") {
    super(url);
  }

  public async createAbogado(data: any): Promise<any>{
    return this.post(`/create`, data);
  }

  public async getDetalleAbogado(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async getVehiculosAll(): Promise<any> {
    return this.get("/vehiculos/all");
  }

  public async getAbogadoByID(id: number): Promise<any> {
    return this.get(`/${id}`);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async getAplicacionesByAbogadoId(abogadoId: number): Promise<any> {
    return this.get(`/all-aplicaciones/${abogadoId}`);
  }

  public async getAplicaciones(data: {abogadoId: number, estado: string}): Promise<any> {
    return this.post(`/aplicaciones`, data);
  }

  public async getTrabajos(data: {abogadoId: number, estado?: string}): Promise<any> {
    return this.post(`/trabajos`, data);
  }

  public async postularOferta(data: {abogadoId: number, ofertaId: number, salarioEsperado: number}): Promise<any> {
    return this.post(`/postular-oferta`, { data });
  }

  public async rechazarSolicitud(solicitudId: string): Promise<any> {
    return this.post(`/rechazar-solicitud/${solicitudId}`);
  }

  public async updateLinkDocumentos(correo: string): Promise<any>{
    return this.post(`/update-archivos`, { correo });
  }

  public async updateAbogado(id: number, fieldsToUpdate: Partial<AbogadoUpdateDTO>) : Promise<any>{
    return this.put(`/edit/${id}`, fieldsToUpdate);
  }

  public async getInvitacionesAOfertas(data: { abogadoId: number }): Promise<any> {
    return this.post("/invitacion-a-ofertas", data);
  }
}
