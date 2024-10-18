"use client";

import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
import React from "react";

const CompleteProfileLawyerPage = () => {
  return (
    <div className="container mx-auto p-4 m-8 max-w-[720px] flex flex-col gap-8">
      <h1 className="text-5xl my-4 font-tiempos">
        ¡Bienvenida(o) a <span className="italic font-light">Legalo!</span>
      </h1>
      <div>
        <p className="text-xl">¡Vamos a publicar tu primer proyecto! </p>
        <p className="text-xl">
          Conéctate con abogados expertos para llevar tu caso al siguiente
          nivel.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-10">
        <Button size="lg">Publicar proyecto</Button>
        <Button size="lg" variant="outline" className="border-black">
          Ver recomendaciones
        </Button>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerPage;
