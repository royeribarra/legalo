"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";

import { ArrowRight } from "lucide-react";

import { Input } from "@/components/ui/input";

const PublicarPageTwo = () => {
  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={33} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 2/6</p>
      </div>
      <div>
        <h1 className="text-[32px] my-4 font-nimbus">
          Empecemos con el título de tu proyecto
        </h1>
        <p className="mb-6">
          Introduce el título de tu caso o necesidad legal para atraer a los
          abogados adecuados.
        </p>
        <p className="mb-4">
          Escribe el titulo para tu anuncio de trabajo o proyecto
        </p>
        <Input
          type="text"
          className="border-black rounded-[10px] h-12 focus-visible:border-none mb-6"
          placeholder="Proyecto..."
        />
        <h3 className="font-bold mb-3">Ejemplos de títulos</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Necesito asistencia legal para establecer una empresa.</li>
          <li>
            Se necesita un abogado para registrar la marca del nombre comercial
            en PERÚ Y ECUADOR
          </li>
        </ul>
      </div>

      <div className="flex justify-end mt-16">
        <Link href="/publicar/3">
          <Button className="h-12 px-10 px-text-base rounded-[10px]">
            Siguiente <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PublicarPageTwo;
