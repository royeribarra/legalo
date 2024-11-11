"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, Clock, Key } from "lucide-react";
import Image from "next/image";
const ProyectosActivos = () => {
  const [openProyecto, setOpenProyecto] = useState(false);

  return (
    <div className="space-y-8 overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className=" bg-[#E5E5E5] p-4 flex flex-nowrap justify-between">
          <div className="grid grid-cols-4 min-w-[720px] max-w-[720px] gap-2">
            <div>
              <span>Título del proyecto</span>
            </div>
            <div>
              <span>Tipo de servicio</span>
            </div>
            <div>
              <span>Abogado</span>
            </div>
            <div>
              <span>Fecha de publicación</span>
            </div>
          </div>
          <div>
            <span></span>
          </div>
        </div>
        <div className="border border-black p-4 flex flex-nowrap justify-between my-8">
          {openProyecto === false ? (
            <>
              <div className="grid grid-cols-4 min-w-[720px] max-w-[720px] gap-2">
                <div className="flex items-center">
                  <span>Título del proyecto</span>
                </div>
                <div className="flex items-center">
                  <span>Asesoria Legal</span>
                </div>
                <div className="flex items-center">
                  <span>Omat T.</span>
                </div>
                <div className="flex items-center">
                  <span>02/07/24</span>
                </div>
              </div>
              <div className="flex flex-nowrap gap-2">
                <Button onClick={() => setOpenProyecto(!openProyecto)}>
                  Ver mas <ChevronDown />
                </Button>
                <Button variant={"outline"}>Pago realizado</Button>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  Proyecto: Legalizar documentos corporativos
                </h3>
                <Button onClick={() => setOpenProyecto(!openProyecto)}>
                  Ver menos
                </Button>
              </div>
              <div className="flex items-center justify-between mt-6 mb-4">
                <div className="flex gap-4 flex-wrap">
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[40px]"
                  >
                    <Clock size={28} />
                    <p className="ml-2 text-sm lg:text-lg">3 meses</p>
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[40px]"
                  >
                    <Key size={28} />
                    <p className="ml-2 text-sm lg:text-lg">Asesoria Legal</p>
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[40px]"
                  >
                    <p className="ml-2 text-sm lg:text-lg">Inicio: 02-06-24</p>
                  </Button>
                </div>
                <div className="text-lg">Abogado elegido ✅</div>
              </div>
              <div className="flex items-center justify-between ">
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
                    <p className="text-2xl font-bold">
                      S/ 5600 pago realizado{" "}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant={"outline"} className="border-black">
                    Ver perfil completo
                  </Button>
                  <Button variant={"outline"} className="border-black">
                    Contactar abogado
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProyectosActivos;
