"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const ProyectosPorAceptar = () => {
  const [openProyecto, setOpenProyecto] = useState(false);

  return (
    <div className="space-y-8 overflow-x-auto">
      <div className="min-w-[900px]">
        <div className="border border-black p-4  mb-8">
          <div className="flex flex-nowrap justify-between">
            <div className="min-w-[640px] max-w-[720px] gap-2">
              <h2 className="text-2xl font-bold">
                Proyecto: Regularización de documentos corporativos
              </h2>
              <p>Ofertas recibidas (23)</p>
            </div>
            <div className="flex flex-nowrap gap-2">
              {openProyecto === false ? (
                <Button onClick={() => setOpenProyecto(!openProyecto)}>
                  Ver ofertas <ChevronDown />
                </Button>
              ) : (
                <Button
                  onClick={() => setOpenProyecto(!openProyecto)}
                  className="bg-[#727272]"
                >
                  Ver ofertas <ChevronUp />
                </Button>
              )}
            </div>
          </div>
          {openProyecto === true && (
            <div>
              <div className="m-4 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/assets/images/face-6.jpeg"
                    alt="img-abogado"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-2xl font-bold">Omar T.</p>
                    <p>Abogado Laboral</p>
                  </div>
                  <div>
                    <Button
                      variant={"outline"}
                      className="h-8 text-sm border-black"
                    >
                      Presupuesto s/4500
                    </Button>
                  </div>
                </div>

                <div className="flex flex-nowrap gap-2">
                  <Button variant={"outline"} className="border-black">
                    Ver perfil completo
                  </Button>
                  <Button>Aceptar oferta</Button>
                </div>
              </div>
              <div className="m-4 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/assets/images/face-6.jpeg"
                    alt="img-abogado"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-2xl font-bold">Omar T.</p>
                    <p>Abogado Laboral</p>
                  </div>
                  <div>
                    <Button
                      variant={"outline"}
                      className="h-8 text-sm border-black"
                    >
                      Presupuesto s/4500
                    </Button>
                  </div>
                </div>

                <div className="flex flex-nowrap gap-2">
                  <Button variant={"outline"} className="border-black">
                    Ver perfil completo
                  </Button>
                  <Button>Aceptar oferta</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProyectosPorAceptar;
