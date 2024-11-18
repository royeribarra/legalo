"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { IServicio } from "@/interfaces/Servicio.interface";

const PublicarPageFour = () => {
  const route = useRouter();
  const { state, updateState } = useOferta();
  const [selectedServices, setSelectedServices] = useState<number[]>([]); // Cambiado a number[]

  const serviceItems = [
    { id: 1, name: "No estoy seguro del servicio a escoger" },
    { id: 2, name: "Asesoría legal" },
    { id: 3, name: "Consultoría" },
    { id: 4, name: "Patrocinio en poder judicial" },
    { id: 5, name: "Patrocinio en procedimiento administrativo" },
    { id: 6, name: "Redacción de Documentos Legales" },
    { id: 7, name: "Cumplimiento Regulatorio" },
    { id: 8, name: "Mediación" },
    { id: 9, name: "Prácticas pre-profesionales" },
  ];

  useEffect(() => {
    if (state.servicios) {
      const servicioIds = state.servicios
        .filter((servicio) => servicio.id !== undefined)
        .map((servicio) => servicio.id as number);
      setSelectedServices(servicioIds);
    }
  }, [state.servicios]);
  
  const handleCheckboxChange = (checked: boolean, serviceId: number) => {
    setSelectedServices((prevState) => {
      const newSelection = checked
        ? [...prevState, serviceId] // Agregar si está marcado
        : prevState.filter((id) => id !== serviceId); // Quitar si no está marcado
  
      // Actualizamos el contexto
      const updatedServicios = newSelection.map((id) => ({
        id,
        nombre: serviceItems.find((item) => item.id === id)?.name || "",
      }));
      updateState({ servicios: updatedServicios });
  
      return newSelection;
    });
  };

  const nextStep = () => {
    route.push("/dashboard/cliente/nueva-oferta/alcance");
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 lg:px-20 m-8 max-w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={84} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 5/6</p>
      </div>
      <div>
        <h1 className="text-2xl lg:text-5xl my-4 font-tiempos">
          Tipo de servicio
        </h1>
        <p className="mb-6 lg:text-lg">Puedes escoger max 2*</p>
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {serviceItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-4 border border-black rounded-[10px]"
            >
              <Checkbox
                id={item.id.toString()}
                checked={selectedServices.includes(item.id)}
                onCheckedChange={(checked) => handleCheckboxChange(!!checked, item.id)}
              />
              <label htmlFor={item.id.toString()} className="text-sm font-medium">
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <Button className="h-12 px-10 px-text-base rounded-[10px]" onClick={nextStep}>
          Siguiente <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PublicarPageFour;
