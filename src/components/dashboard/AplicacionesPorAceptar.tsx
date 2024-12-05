"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { useAuth } from "@/contexts/authContext";

const AplicacionesPorAceptar = () => {
  const { token } = useAuth();
  const [openProyecto, setOpenProyecto] = useState<number | null>(null);
  const [ofertasConAplicaciones, setOfertasConAplicaciones] = useState<IOfertaBack[]>([]);

  // Función para obtener las ofertas con aplicaciones
  const fetchOfertasConAplicaciones = async () => {
    try {
      const response = await fetch(`${process.env.BASE_APP_API_URL}/ofertas/cliente/${token?.cliente.id}/con-aplicaciones`);
      if (!response.ok) {
        throw new Error("Error al obtener las ofertas");
      }
      const data = await response.json();
      setOfertasConAplicaciones(data);
    } catch (error) {
      console.error("Error al obtener las ofertas con aplicaciones:", error);
    }
  };

  useEffect(() => {
    fetchOfertasConAplicaciones();
  }, [fetchOfertasConAplicaciones]);

  // const verAplicaciones = (ofertaId: number) => {
  //   console.log(ofertaId)
  //   setOpenProyecto(ofertaId);
  // };

  const aceptarOferta = () => {

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
              </div>
              <div className="flex flex-nowrap gap-2">
                {openProyecto !== oferta.id && 
                // (
                //   <Button
                //     onClick={()=>verAplicaciones(null)}
                //     className="bg-[#727272]"
                //   >
                //     Ver aplicaciones 1<ChevronUp />
                //   </Button>
                // ) : 
                (
                  <Button
                    onClick={() => setOpenProyecto(oferta.id)}
                  >
                    Ver aplicaciones 2<ChevronDown />
                  </Button>
                )}
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
                        src={"https://www.example.com/foto-carlos.jpg"}
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
                      <Button variant={"outline"} className="border-black">
                        Ver perfil completo
                      </Button>
                      <Button onClick={aceptarOferta}>Aceptar oferta</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AplicacionesPorAceptar;
