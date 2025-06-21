import { MainService } from "./Main.service";

export default class LibroReclamacionService extends MainService {
  constructor(url: string = "libro-reclamaciones") {
    super(url);
  }

  public async createReclamo(data?: any): Promise<any> {
    return this.post("/create", data);
  }

  public async obtenerTodos(params?: any): Promise<any> {
    return this.get("/all", params);
  }

  public async obtenerPorId(id: number) {
    return this.get(`/${id}`);
  }
  
  public async responderReclamo(id: number, respuesta: string) {
    return this.post(`/${id}/responder`, {respuesta: respuesta})
  }  
}
