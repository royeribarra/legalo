import { IAbogado, IAbogadoBack } from "./Abogado.interface";
import { IAplicacionBack } from "./Aplicacion.interface";
import { ICliente, IClienteBack } from "./Cliente.interface";
import { IOferta, IOfertaBack } from "./Oferta.interface";

export interface ITrabajo {
    id: number;
    oferta: IOferta;
    abogado: IAbogado;
    cliente: ICliente;
    estado: number;
}

export interface IPagoBack {
    direccionFactura: string;
    monto: number;
    nombreFactura: string;
    operacion: string;
    ruc: string;
    tipoComprobante: string;
    tipoPago: string;
    fecha_operacion: string;
    estado: string;
    clienteId: number;
    abogadoId: number;
    ofertaId: number;
    aplicacion: IAplicacionBack;
    oferta: IOfertaBack;
    trabajo: ITrabajoBack;
  }

export interface ITrabajoBack {
    id: number;
    estado: number;
    fecha_fin: string;
    fecha_inicio: string;
    progreso: number;
    cliente: IClienteBack;
    abogado: IAbogadoBack;
    oferta: IOfertaBack;
    aplicacion: IAplicacionBack;
    pagos: IPagoBack[];
}