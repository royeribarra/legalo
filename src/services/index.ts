// services/index.ts
import AbogadoService from './Abogado.service';
import AplicacionService from './Aplicacion.service';
import ClienteService from './Cliente.service';
import EspecialidadService from './Especialidad.service';
import FileService from './File.service';
import IndustriaService from './Industria.service';
import MailService from './Mail.service';
import OfertaService from './Oferta.service';
import PagoService from './Pago.service';
import ServicioService from './Servicio.service';
import TrabajoService from './Trabajo.service';
import UsuarioService from './Usuario.service';

export const abogadoService = new AbogadoService();
export const ofertaservice = new OfertaService();
export const pagoService = new PagoService();
export const servicioService = new ServicioService();
export const industriaService = new IndustriaService();
export const especialidadService = new EspecialidadService();
export const clienteService = new ClienteService();
export const aplicacionService = new AplicacionService();
export const fileService = new FileService();
export const usuarioService = new UsuarioService();
export const trabajoService = new TrabajoService();
export const mailService = new MailService();