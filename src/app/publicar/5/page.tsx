"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";

import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const PublicarPageFour = () => {
  const serviceItems = [
    { id: "serv-1", name: "No estoy seguro del servicio a escoger" },
    { id: "serv-2", name: "Asesoría legal" },
    { id: "serv-3", name: "Consultoría" },
    { id: "serv-4", name: "Patrocinio en poder judicial" },
    { id: "serv-5", name: "Patrocinio en procedimiento administrativo" },
    { id: "serv-6", name: "Redacción de Documentos Legales" },
    { id: "serv-7", name: "Cumplimiento Regulatorio" },
    { id: "serv-8", name: "Mediación" },
    { id: "serv-9", name: "Prácticas pre-profesionales" },
  ];
  return (
    <div className="container mx-auto p-4 lg:p-8 lg:px-20 m-8 max-w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={84} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 5/6</p>
      </div>
      <div>
        <div>
          <h1 className="text-2xl lg:text-5xl my-4 font-tiempos">
            Tipo de servicio
          </h1>
          <p className="mb-6 lg:text-lg ">Puedes escoger max 2*</p>
          <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {serviceItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 border border-black rounded-[10px]"
              >
                <Checkbox id={item.id} />
                <label htmlFor={item.id} className="text-sm font-medium">
                  {item.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <Link href="/publicar/6">
          <Button className="h-12 px-10 px-text-base rounded-[10px]">
            Siguiente <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PublicarPageFour;
