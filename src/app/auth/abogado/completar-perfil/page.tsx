"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const CompleteProfileLawyerPage = () => {
  const [selected, setSelected] = useState(null);

  const options = [
    {
      id: 1,
      label: "Generar ingresos adicionales",
      icon: "/path/to/icon1.png",
    },
    {
      id: 2,
      label: "Ganar experiencia para un trabajo a tiempo completo",
      icon: "/path/to/icon2.png",
    },
    {
      id: 3,
      label: "Todavía no tengo un objetivo en mente",
      icon: "/path/to/icon3.png",
    },
  ];

  return (
    <div className="container mx-auto p-4 m-8 max-w-[720px]">
      <div className="max-w-[480px] mx-auto">
        <Progress value={66} className="mx-auto mb-4" />
        <p className="text-center">Paso 2/3</p>
      </div>
      <div>
        <h1 className="text-4xl my-4">¿Cuál es tu objetivo?</h1>
        <p>Como Legalo puede ayudarte:</p>
      </div>
      <div className="space-y-4 mt-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`flex items-center justify-between w-full p-4 border rounded-lg cursor-pointer ${
              selected === option.id
                ? "border-black bg-gray-100"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img src={option.icon} alt="" className="w-8 h-8" />
              <span className="text-sm font-medium">{option.label}</span>
            </div>
            <div
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                selected === option.id
                  ? "bg-black border-black"
                  : "border-gray-300"
              }`}
            >
              {selected === option.id && (
                <div className="w-3 h-3 bg-white rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-20">
        <Link href="/">
          <Button className="w-full">SIGUIENTE</Button>
        </Link>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerPage;
