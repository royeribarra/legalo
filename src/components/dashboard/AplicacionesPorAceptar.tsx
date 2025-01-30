"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clienteService } from "@/services";
import { useLoader } from "@/contexts/loaderContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import ModalAbogadoDetalle from "./Cliente/ModalAbogadoDetalle";
import { IAplicacionBack } from "@/interfaces/Aplicacion.interface";
import ModalPagoOferta from "./abogado/ModalPagoOferta";

const AplicacionesPorAceptar = () => {
  const { token } = useAuth();
  const router = useRouter();
  const { setLoading } = useLoader();
  const [openProyecto, setOpenProyecto] = useState<number | null>(null);
  const [ofertasConAplicaciones, setOfertasConAplicaciones] = useState<IOfertaBack[]>([]);
  const [openModalAbogado, setOpenModalAbogado] = useState(false);
  const [abogadoSeleccionado, setAbogadoSeleccionado] = useState<IAbogadoBack | null>(null);
  const [openModalPago, setOpenModalPago] = useState(false);
  const [ofertaSeleccionada, setOfertaSeleccionada] = useState<IOfertaBack | null>(null);
  const [aplicacionSeleccionada, setAplicacionSeleccionada] = useState<IAplicacionBack | null>(null);

  // Función para obtener las ofertas con aplicaciones

  const showModalAbogadoDetalle = (abogado: IAbogadoBack) => {
    setOpenModalAbogado(true);
    setAbogadoSeleccionado(abogado);
  };

  const hideModalAbogadoDetalle = () => {
    setOpenModalAbogado(false);
    setAbogadoSeleccionado(null);
  };

  const showModalPagoDetalle = (salarioEsperado: number, oferta: IOfertaBack, aplicacion: IAplicacionBack) => {
    setOpenModalPago(true);
    setOfertaSeleccionada(oferta);
    setAplicacionSeleccionada(aplicacion);
  };

  const hideModalPagoDetalle = () => {
    setOpenModalPago(false);
    setOfertaSeleccionada(null);
    setAplicacionSeleccionada(null);
  };

  const fetchOfertasConAplicaciones = async () => {
    setLoading(true);
    try {
      if(token?.cliente?.id)
      {
        const data = {
          clienteId: token?.cliente?.id,
          estado: 'verificar_postulaciones'
        };
        // const response1 = await clienteService.getOfertasConAplicaciones(data);
        const response = await clienteService.getOfertas(data);
        setOfertasConAplicaciones(response.data);
      }
    } catch (error) {
      console.error("Error al obtener las ofertas con aplicaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfertasConAplicaciones();
  }, []);

  // const verAplicaciones = (ofertaId: number) => {
  //   console.log(ofertaId)
  //   setOpenProyecto(ofertaId);
  // };

  const aceptarOferta = (salario: number, ofertaId: number, aplicacionId: number) => {
    const clienteId = token?.cliente?.id;
    const url = `/dashboard/cliente/pagos/${ofertaId}?monto=${salario}&clienteId=${clienteId}&aplicacionId=${aplicacionId}`;
    router.push(url);
  };

  return (
    <div className="space-y-8 overflow-x-auto">
      <div className="min-w-[900px]">
        {ofertasConAplicaciones.map((oferta) => (
          <div key={oferta.id} className="border border-black p-4 mb-8">
            <div className="flex flex-nowrap justify-between">
              <div className="min-w-[640px] max-w-[720px] gap-2">
                <h2 className="text-2xl font-bold">Proyecto: {oferta.titulo}</h2>
                <p>Aplicaciones recibidas ({oferta.aplicaciones.length})</p>
                <p>Presupuesto de la Oferta: {oferta.salario_minimo + '-' + oferta.salario_maximo}</p>
              </div>
              <div className="flex flex-nowrap gap-2">
                {openProyecto !== oferta.id ?
                (
                  <Button
                    onClick={() => setOpenProyecto(oferta.id)}
                  >
                    Ver aplicaciones<ChevronDown />
                  </Button>
                ) :
                <div>
                  <Button onClick={() => setOpenProyecto(null)}>
                    Ver menos
                  </Button>
                </div>
                }
              </div>
            </div>
            {openProyecto === oferta.id && (
              <div>
                {oferta.aplicaciones.map((aplicacion) => (
                  <div
                    key={aplicacion.id}
                    className="m-4 flex items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <Image
                        src={`${process.env.S3_FILE_ROUTE}/${aplicacion.abogado.foto_url}`}
                        alt="img-abogado"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-2xl font-bold">{aplicacion.abogado.nombres}</p>
                        <p>{aplicacion.abogado.grado_academico}</p>
                      </div>
                      <div>
                        <Button
                          variant={"outline"}
                          className="h-8 text-sm border-black"
                        >
                          Presupuesto s/{aplicacion.salarioEsperado}
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-nowrap gap-2">
                      <Button
                        variant={"outline"}
                        className="border-black"
                        onClick={()=> showModalAbogadoDetalle(aplicacion.abogado)}>
                        Ver perfil completo
                      </Button>
                      <Button onClick={() => showModalPagoDetalle(aplicacion.salarioEsperado, oferta, aplicacion)}>Aceptar ofertas</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {openModalAbogado && abogadoSeleccionado && (
        <ModalAbogadoDetalle
          open={openModalAbogado}
          onClose={hideModalAbogadoDetalle}
          abogadoId={abogadoSeleccionado.id}
        />
      )}
      {
        openModalPago && ofertaSeleccionada && aplicacionSeleccionada &&
        <ModalPagoOferta
          isOpen={openModalPago}
          onClose={hideModalPagoDetalle}
          ofertaId={ofertaSeleccionada.id}
          monto={aplicacionSeleccionada?.salarioEsperado}
          aplicacionId={aplicacionSeleccionada.id}
        />
      }
    </div>
  );
};

export default AplicacionesPorAceptar;
