"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IOfertaBack, IPreguntaOfertaBack } from "@/interfaces/Oferta.interface";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { clienteService } from "@/services";
import { useLoader } from "@/contexts/loaderContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import ModalAbogadoDetalle from "./Cliente/ModalAbogadoDetalle";
import { IAplicacionBack } from "@/interfaces/Aplicacion.interface";
import ModalPagoOferta from "./Cliente/ModalPago";
import ModalDetalleAplicacion from "./Cliente/ModalDetalleAplicacion";

const AplicacionesPorAceptar = () => {
  const { token } = useAuth();
  const router = useRouter();
  const { setLoading } = useLoader();
  const [openProyecto, setOpenProyecto] = useState<number | null>(null);
  const [ofertasConAplicaciones, setOfertasConAplicaciones] = useState<IOfertaBack[]>([]);
  const [openModalAbogado, setOpenModalAbogado] = useState(false);
  const [openModalPago, setOpenModalPago] = useState(false);
  const [openModalDetalleAplicacion, setOpenModalDetalleAplicacion] = useState(false);
  const [abogadoSeleccionado, setAbogadoSeleccionado] = useState<IAbogadoBack | null>(null);
  
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState<IOfertaBack | null>(null);
  const [aplicacionSeleccionada, setAplicacionSeleccionada] = useState<IAplicacionBack | null>(null);

  useEffect(() => {
    const fetchOfertasConAplicaciones = async () => {
      setLoading(true);
      try {
        if (token?.cliente?.id) {
          const data = { clienteId: token.cliente.id, estado: "verificar_postulaciones" };
          const response = await clienteService.getOfertas(data);
          setOfertasConAplicaciones(response.data);
        }
      } catch (error) {
        console.error("Error al obtener las ofertas con aplicaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOfertasConAplicaciones();
  }, []);

  const showModalAbogadoDetalle = (abogado: IAbogadoBack) => {
    setOpenModalAbogado(true);
    setAbogadoSeleccionado(abogado);
  };

  const hideModalAbogadoDetalle = () => {
    setOpenModalAbogado(false);
    setAbogadoSeleccionado(null);
  };

  const showModalPagoDetalle = (oferta: IOfertaBack, aplicacion: IAplicacionBack) => {
    setOpenModalPago(true);
    setOfertaSeleccionada(oferta);
    setAplicacionSeleccionada(aplicacion);
  };

  const hideModalPagoDetalle = () => {
    setOpenModalPago(false);
    setOfertaSeleccionada(null);
    setAplicacionSeleccionada(null);
  };

  const showModalDetalleAplicacion = (oferta: IOfertaBack, aplicacion: IAplicacionBack) => {
    console.log()
    setOpenModalDetalleAplicacion(true);
    setOfertaSeleccionada(oferta);
    setAplicacionSeleccionada(aplicacion);
  };

  const hideModalDetalleAplicacion = () => {
    setOpenModalDetalleAplicacion(false);
    setOfertaSeleccionada(null);
    setAplicacionSeleccionada(null);
  };

  return (
    <div className="space-y-8 overflow-x-auto min-w-[900px]">
      {ofertasConAplicaciones.map((oferta) => (
        <div key={oferta.id} className="border border-black p-4 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Proyecto: {oferta.titulo}</h2>
              <p>Aplicaciones recibidas ({oferta.aplicaciones.length})</p>
              <p>Presupuesto: {oferta.salario_minimo} - {oferta.salario_maximo}</p>
            </div>
            <Button onClick={() => setOpenProyecto(openProyecto === oferta.id ? null : oferta.id)}>
              {openProyecto === oferta.id ? "Ver menos" : "Ver aplicaciones"} <ChevronDown />
            </Button>
          </div>

          {openProyecto === oferta.id && (
            <div className="mt-4 space-y-4">
              {oferta.aplicaciones.map((aplicacion) => (
                <div key={aplicacion.id} className="flex justify-between items-center border p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`${process.env.S3_FILE_ROUTE}/${aplicacion.abogado?.files.find(file => file.nombreArchivo === 'archivo_imagen')?.filePath}`}
                      alt="img-abogado"
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-xl font-bold">{aplicacion.abogado.nombres}</p>
                      <p>{aplicacion.abogado.grado_academico}</p>
                      <Button variant="outline" onClick={() => showModalAbogadoDetalle(aplicacion.abogado)}>
                        Ver perfil
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="border p-2 text-sm">Presupuesto s/{aplicacion.salarioEsperado}</span>
                    <Button onClick={() => showModalDetalleAplicacion(oferta, aplicacion)}>
                      Ver postulación
                    </Button>
                    <Button onClick={() => showModalPagoDetalle(oferta, aplicacion)}>
                      Aceptar oferta
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {openModalAbogado && abogadoSeleccionado && (
        <ModalAbogadoDetalle
          open={openModalAbogado}
          onClose={hideModalAbogadoDetalle}
          abogadoId={abogadoSeleccionado.id}
        />
      )}

      {openModalPago && ofertaSeleccionada && aplicacionSeleccionada && (
        <ModalPagoOferta
          isOpen={openModalPago}
          onClose={hideModalPagoDetalle}
          ofertaId={ofertaSeleccionada.id}
          monto={aplicacionSeleccionada.salarioEsperado}
          aplicacionId={aplicacionSeleccionada.id}
        />
      )}

      {openModalDetalleAplicacion && ofertaSeleccionada && aplicacionSeleccionada && (
        <ModalDetalleAplicacion
          isOpen={openModalDetalleAplicacion}
          onClose={hideModalDetalleAplicacion}
          aplicacion={aplicacionSeleccionada}
          oferta={ofertaSeleccionada}
        />
      )}
    </div>
  );
};

export default AplicacionesPorAceptar;
