"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React from "react";

import { Info as IcoInfo } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";

const PublicarPageSix = () => {
  const route = useRouter();
  const { state, updateState } = useOferta();

  // Funciones para manejar los cambios
  const handleDuracionChange = (value: string) => {
    updateState({ duracion: value });
  };

  const handleNivelExperienciaChange = (value: string) => {
    updateState({ nivelExperiencia: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      updateState({ duracion: "indefinido" });
    } else {
      updateState({ duracion: "" });
    }
  };

  const nextStep = () => {
    route.push("/dashboard/cliente/nueva-oferta/presupuesto");
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={100} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 6/6</p>
      </div>
      <div>
        <h1 className="text-[36px] my-4 font-nimbus">
          Estimemos el alcance de tu trabajo
        </h1>
        <p className="mb-6">Consideremos el tamaño de tu proyecto.</p>
        <p className="mb-4">¿Cuánto durará el trabajo?</p>

        <div className="flex overflow-x-auto mb-4">
          <ToggleGroup
            type="single"
            variant="squares"
            className="gap-2"
            value={state.duracion} // Asegura que el valor seleccionado se refleje
            onValueChange={handleDuracionChange} // Actualiza la duración en el contexto
          >
            <ToggleGroupItem value="7">1-7 días</ToggleGroupItem>
            <ToggleGroupItem value="28">1-4 semanas</ToggleGroupItem>
            <ToggleGroupItem value="31">1+ meses</ToggleGroupItem>
            <ToggleGroupItem value="indefinido">
              Indefinido <IcoInfo size={16} color="gray" className="mx-2" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <IcoInfo size={16} color="#61646B" />
          <p>
            Aplicable para Patrocinio en poder judicial y procedimientos admin.
          </p>
        </div>

        <div className="flex items-center mb-4 gap-2">
          <Checkbox onCheckedChange={handleCheckboxChange} />
          <p>No estoy seguro de cuanto tiempo durará</p>
        </div>

        <p className="mb-4">¿Qué nivel de experiencia necesitas?</p>
        <div className="flex overflow-x-auto mb-4">
          <ToggleGroup
            type="single"
            variant="squares"
            className="gap-2"
            value={state.nivelExperiencia}
            onValueChange={handleNivelExperienciaChange}
          >
            <ToggleGroupItem value="junior">Junior</ToggleGroupItem>
            <ToggleGroupItem value="intermedio">Intermedio</ToggleGroupItem>
            <ToggleGroupItem value="experto">Experto</ToggleGroupItem>
            <ToggleGroupItem value="no idea">No lo sé</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="flex justify-end mt-16">
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

export default PublicarPageSix;
