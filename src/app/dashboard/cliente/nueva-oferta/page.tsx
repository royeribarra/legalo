"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useState } from "react";

import { Check } from "lucide-react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";

const NuevaOferta = () => {
  const route = useRouter();
  const { updateState } = useOferta();

  // Inicializa usoSelect con el valor del primer elemento
  const [usoSelect, setUsoSelect] = useState("uso personal");

  const options = [
    {
      id: 1,
      label: "Para mi uso/ayuda personal",
      value: "uso personal",
      icon: "/icos/ico-uso-personal.png",
    },
    {
      id: 2,
      label: "Para mi lugar de trabajo",
      icon: "/icos/ico-uso-trabajo.png",
      value: "uso trabajo",
    },
  ];

  const nextStep = () => {
    updateState({ uso: usoSelect });
    route.push("/dashboard/cliente/nueva-oferta/titulo");
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[900px]">
      <div className="w-full mx-auto mb-8">
        <Progress value={100/8*1} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 1/8</p>
      </div>
      <div>
        <h1 className="text-4xl my-4 font-nimbus">
          ¿Para quien estás creando proyecto?
        </h1>
        <p>Como Legalo puede ayudarte:</p>
      </div>
      <div className="space-y-4 mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setUsoSelect(option.value)}
            className={`flex items-center justify-between w-full p-4 border rounded-lg cursor-pointer ${
              usoSelect === option.value ? "bg-[#D9D9D9]" : "border-black"
            }`}
          >
            <div className="flex items-center space-x-4">
              <Image
                src={option.icon}
                alt=""
                className="w-14 h-14"
                width={64}
                height={64}
              />
              <span className="text-sm lg:text-2xl">{option.label}</span>
            </div>
            <div
              className={`rounded-full w-[20px] h-[20px] flex justify-center items-center ${
                usoSelect === option.value
                  ? "bg-[#007AFF]"
                  : "border border-black"
              }`}
            >
              {usoSelect === option.value && (
                <Check className="text-white w-[24px] h-[16px]" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente">
          <Button variant="outline" className="h-12 px-10 text-base rounded-[10px]">
            <ArrowLeft className="mr-2" /> Volver
          </Button>
        </Link>
        <Button
          className="h-12 px-10 px-text-base rounded-[10px]"
          onClick={nextStep}
        >
          Siguiente <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default NuevaOferta;
