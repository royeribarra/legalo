"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";
import { useState } from "react";

import { ArrowLeft, Check } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const CompleteProfileLawyerPage = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const options = [
    {
      id: 1,
      label: "Generar ingresos adicionales",
      icon: "/icos/ico-ingresos-adicionales.png",
    },
    {
      id: 2,
      label: "Ganar experiencia para un trabajo a tiempo completo",
      icon: "/icos/ico-gana-experiencia.png",
    },
    {
      id: 3,
      label: "Todavía no tengo un objetivo en mente",
      icon: "/icos/ico-objetivo-mente.png",
    },
  ];

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[740px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={66} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 2/3</p>
      </div>
      <div>
        <h1 className="text-4xl my-4 font-nimbus">¿Cuál es tu objetivo?</h1>
        <p>Como Legalo puede ayudarte:</p>
      </div>
      <div className="space-y-4 mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`flex items-center justify-between w-full p-4 border rounded-lg cursor-pointer ${
              selected === option.id ? " bg-[#D9D9D9]" : "border-black"
            }`}
          >
            <div className="flex items-center space-x-4">
              <Image
                src={option.icon}
                alt=""
                className="w-12 h-12"
                width={54}
                height={54}
              />
              <span className="text-sm lg:text-2xl">{option.label}</span>
            </div>
            <div
              className={`rounded-full w-[20px] h-[20px] flex justify-center items-center ${selected === option.id ? "bg-[#007AFF]" : "border border-black"}`}
            >
              <Check className="text-white w-[24px] h-[16px]" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 fixed left-0 bottom-0 w-screen h-[115px] bg-[#D5F1F0] ">
        <div className="col-span-4 lg:col-span-3 flex justify-center lg:justify-between items-center container mx-auto px-4 lg:px-8 max-w-[800px]">
          <div className="w-[30%] ">
            <Link href="/registro/abogado" className="">
              <Button size="lg" variant="link" className="mx-0 px-2">
                <ArrowLeft className="mr-2 h-4 w-4" /> Atras
              </Button>
            </Link>
          </div>
          <div className="w-[70%] flex justify-end">
            <Link href="/registro/abogado/completar-perfil">
              <Button size="lg" className="p-4 lg:px-8">
                <p className="">Sigue completando tu perfil</p>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerPage;
