import { MainService } from "./Main.service";

export default class LibroReclamacionService extends MainService {
  constructor(url: string = "libro-reclamaciones") {
    super(url);
  }

  public async createReclamo(data?: any): Promise<any> {
    return this.post("/create", data);
  }
}
