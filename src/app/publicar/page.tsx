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
      label: "Para mi uso/ayuda personal",
      icon: "/icos/ico-uso-personal.png",
    },
    {
      id: 2,
      label: "Para mi lugar de trabajo",
      icon: "/icos/ico-uso-trabajo.png",
    },
  ];

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={17} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 1/6</p>
      </div>
      <div>
        <h1 className="text-4xl my-4 font-tiempos">
          ¿Para quien estás creando proyecto?
        </h1>
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
                className="w-14 h-14"
                width={64}
                height={64}
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
      <div className="flex justify-end mt-16">
        <Link href="/publicar/2">
          <Button className="h-12 px-10 px-text-base rounded-[10px]">
            Siguiente <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerPage;
