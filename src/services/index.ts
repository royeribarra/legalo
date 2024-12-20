// services/index.ts
import AbogadoService from './Abogado.service';
import ClienteService from './Cliente.service';
import EspecialidadService from './Especialidad.service';
import IndustriaService from './Industria.service';
import OfertaService from './Oferta.service';
import PagoService from './Pago.service';
import ServicioService from './Servicio.service';

export const abogadoService = new AbogadoService();
export const ofertaservice = new OfertaService();
export const pagoService = new PagoService();
export const servicioService = new ServicioService();
export const industriaService = new IndustriaService();
export const especialidadService = new EspecialidadService();
export const clienteService = new ClienteService();