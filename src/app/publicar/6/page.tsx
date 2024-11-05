"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";

import { Info as IcoInfo } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PublicarPageSix = () => {
  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={100} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 6/6</p>
      </div>
      <div>
        <h1 className="text-[36px] my-4 font-tiempos">
          Estimemos el alcance de tu trabajo
        </h1>
        <p className="mb-6">Consideremos el tamaño de tu proyecto.</p>
        <p className="mb-4">¿Cuánto durara el trabajo?</p>

        <div className="flex overflow-x-auto mb-4">
          <ToggleGroup
            type="single"
            variant="squares"
            className="gap-2"
            defaultValue="b"
          >
            <ToggleGroupItem value="a">1-7 días</ToggleGroupItem>
            <ToggleGroupItem value="b">1-4 semanas</ToggleGroupItem>
            <ToggleGroupItem value="c">1+ meses</ToggleGroupItem>
            <ToggleGroupItem value="d">
              Indefinido <IcoInfo size={16} color="gray" className="mx-2" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <IcoInfo size={16} color="#61646B" />
          <p>
            Aplicable para Patrociono en poder judicial y procedimientos admin.
          </p>
        </div>

        <div className="flex items-center mb-4 gap-2  ">
          <Checkbox />
          <p>No estoy seguro de cuanto tiempo durará</p>
        </div>

        <p className="mb-4">¿Qué nivel de experiencia necesitas?</p>
        <div className="flex overflow-x-auto mb-4">
          <ToggleGroup
            type="single"
            variant="squares"
            className="gap-2"
            defaultValue="b"
          >
            <ToggleGroupItem value="a">Junior</ToggleGroupItem>
            <ToggleGroupItem value="b">Intermedio</ToggleGroupItem>
            <ToggleGroupItem value="c">Experto</ToggleGroupItem>
            <ToggleGroupItem value="d">No lo sé</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <Link href="/publicar/7">
          <Button className="h-12 px-10 px-text-base rounded-[10px]">
            Siguiente <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PublicarPageSix;
