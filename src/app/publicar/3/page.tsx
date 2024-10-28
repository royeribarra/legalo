"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";
import { useState } from "react";

import { Check as CheckIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import specialtiesItems from "@/data/specialtiesItems";

interface Especialidad {
  CardTitle: string,
  CardDescription: string,
  ImageSrc: string,
}

const PublicarPageThree = () => {
  const [selectServices, setSelectServices] = useState<string[]>([]);

  const selectEspecialidad = (item: Especialidad) => {
    if (
      selectServices.length >= 1 &&
      !selectServices.includes(item.CardTitle)
    ) {
      console.log("No se puede escoger una especialidad");
      return;
    }
    if (selectServices.includes(item.CardTitle)) {
    } else {
      setSelectServices([...selectServices, item.CardTitle]);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={50} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 3/6</p>
      </div>

      <h1 className="text-2xl lg:text-5xl my-4 font-tiempos">
        ¿Qué especialidad estás buscando?
      </h1>
      <div className="flex justify-between mt-8">
        <p className="text-lg">Puedes escoger solo 1*</p>
        <Link href="#" className="text-lg font-bold">
          ¿No sabes que especialidad buscas?
        </Link>
      </div>
      <div>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4">
            {specialtiesItems.map((item) => (
              <div
                key={item.CardTitle}
                className="relative p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
                onClick={() => selectEspecialidad(item)}
              >
                <div
                  className={`w-12 h-12 flex justify-center items-center rounded-full ${selectServices.includes(item.CardTitle) ? "bg-[#D5F1F0]" : "bg-[#D9D9D9]"}`}
                >
                  <Image
                    src={item.ImageSrc}
                    alt={item.CardTitle}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="mt-2 text-center">{item.CardTitle}</p>
                <div
                  className={`absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-sm ${selectServices.includes(item.CardTitle) ? "bg-[#007AFF]" : "border border-black"}`}
                >
                  {selectServices.includes(item.CardTitle) && (
                    <CheckIcon className="text-white w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex justify-end gap-6 pt-4 mt-4">
          <Button
            className="w-[190px] h-12 rounded-[10px]"
            onClick={guardarEspecialidad}
          >
            Aceptar
          </Button>
          <Button
            className="w-[190px] h-12 rounded-[10px] border border-gray-300"
            //onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>
        </div> */}
      </div>

      <div className="flex justify-end mt-16">
        <Link href="/publicar/4">
          <Button className="h-12 px-10 px-text-base rounded-[10px]">
            Siguiente <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PublicarPageThree;
