"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React from "react";

import { ArrowLeft, Info as IcoInfo } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import Link from "next/link";

const PublicarPageSix = () => {
  const route = useRouter();
  const { showToast } = useToast();
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
    if (!state.duracion) {
      showToast("error", "Debes seleccionar una duración.", "");
      return;
    }
    if (!state.nivelExperiencia) {
      showToast("error", "Debes seleccionar un nivel.", "");
      return;
    }
    route.push("/dashboard/cliente/nueva-oferta/presupuesto");
  };

  return (
    <div className="mx-auto p-4 lg:p-8 m-8 lg:w-[800px]">
      <div className="w-full  mb-8">
        <Progress value={100/8*6} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 6/8</p>
      </div>
      <div>
        <h1 className="text-[36px] my-4 font-nimbus">
          Estimemos el alcance de tu trabajo
        </h1>
        <p className="mb-6">Consideremos el tamaño de tu proyecto.</p>
        <p className="mb-4 font-bold">¿Cuánto durará el trabajo?</p>

        <div className="flex overflow-x-auto mb-4">
          <ToggleGroup
            type="single"
            variant="chips"
            className="gap-2"
            value={state.duracion} // Asegura que el valor seleccionado se refleje
            onValueChange={handleDuracionChange} // Actualiza la duración en el contexto
          >
            <ToggleGroupItem value="1-7 días">1-7 días</ToggleGroupItem>
            <ToggleGroupItem value="1-4 semanas">1-4 semanas</ToggleGroupItem>
            <ToggleGroupItem value="1+ meses">1+ meses</ToggleGroupItem>
            <ToggleGroupItem value="indefinido">
              Indefinido <IcoInfo size={16} color="gray" className="mx-2" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <IcoInfo size={16} color="#61646B" />
          <p className="text-[#666666]">
            Aplicable para Patrocinio en poder judicial y procedimientos admin.
          </p>
        </div>

        <div className="flex items-center mb-4 gap-2">
          <Checkbox onCheckedChange={handleCheckboxChange} />
          <p>No estoy seguro de cuanto tiempo durará</p>
        </div>

        <p className="mb-4 font-bold mt-8">
          ¿Qué nivel de experiencia necesitas?
        </p>
        <div className="flex overflow-x-auto mb-4">
          <ToggleGroup
            type="single"
            variant="chips"
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

      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente/nueva-oferta/servicio">
          <Button
            variant="outline"
            className="h-12 px-10 text-base rounded-[10px]"
          >
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

export default PublicarPageSix;
