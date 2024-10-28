import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const SimilarProyect = () => {
  return (
    <div className="p-4 lg:p-8 border border-black rounded-[20px] flex flex-col gap-4 flex-none w-[320px] lg:w-[430px]">
      <div className="flex justify-between flex-col-reverse lg:flex-row">
        <h2 className="font-tiempos text-base lg:text-lg font-light">
          Asesoría para Contrato de Trabajadores Temporales
        </h2>

        <div className="flex gap-4 justify-end mb-4 lg:mb-0">
          <Button
            variant="outline"
            className="text-sm lg:text-lg h-9 lg:h-[42px] rounded-full"
          >
            Ver proyecto
          </Button>
        </div>
      </div>
      <div className="text-sx lg:text-base">
        <p>Descripción de proyecto: </p>
        <p className="line-clamp-3">
          Necesito asesoría legal para la elaboración de un modelo de contrato
          para trabajadores temporales que se ajuste a la normativa. En mi
          empresa voy a contratar empleados para proyectos de mediana duración,
          y quiero asegurarme de que el contrato incluya todas las cláusulas
          necesarias y las condiciones de trabajo.
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button
          variant="outline"
          className="border border-black rounded-full h-[43px]"
        >
          <Image
            src="/icos/ico-dash-pin-map.svg"
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          <p>Remoto</p>
        </Button>
        <Button
          variant="outline"
          className="border border-black rounded-full h-[43px]"
        >
          <Image
            src="/icos/ico-dash-alarm.svg"
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          <p>1-2 semanas</p>
        </Button>
        <Button
          variant="outline"
          className="border border-black rounded-full h-[43px]"
        >
          <Image
            src="/icos/ico-dash-building.svg"
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          <p>Retail</p>
        </Button>
        <Button
          variant="outline"
          className="border border-black rounded-full h-[43px]"
        >
          <Image
            src="/icos/ico-dash-briefcase.svg"
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          <p>Asesoría legal</p>
        </Button>
      </div>
    </div>
  );
};

export default SimilarProyect;
