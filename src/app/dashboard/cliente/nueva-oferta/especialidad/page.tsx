"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Check as CheckIcon, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useOferta } from "@/contexts/ofertaContext"; // Asegúrate de importar la interfaz
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import axios from "axios";
import { especialidadService } from "@/services";

interface Especialidad {
  id: number; // Cambiado para que use el id numérico
  nombre: string;
  imagen: string;
}

const PublicarPageThree = () => {
  const { showToast } = useToast();
  const route = useRouter();
  const { state, updateState } = useOferta();
  const [selectServices, setSelectServices] = useState<number[]>(state.especialidades);
  const [serviceList, setServiceList] = useState<Especialidad[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await especialidadService.obtenerTodos();
        console.log(response)
        setServiceList(response);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  const selectEspecialidad = (item: Especialidad) => {
    const selectedId = item.id;

    if (selectServices.includes(selectedId)) {
      const filteredServices = selectServices.filter(id => id !== selectedId);
      setSelectServices(filteredServices);
      updateState({ especialidades: filteredServices });
    } else {
      if (selectServices.length >= 1) {
        console.log("No se puede escoger más de una especialidad");
        return;
      }
      const updatedServices = [...selectServices, selectedId];
      setSelectServices(updatedServices);
      updateState({ especialidades: updatedServices });
    }
  };

  const nextStep = () => {
    if (selectServices.length === 0) {
      showToast("error", "Selecciona una especialidad", "");
      return;
    }
    route.push("/dashboard/cliente/nueva-oferta/descripcion");
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={50} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 3/6</p>
      </div>

      <h1 className="text-2xl lg:text-5xl my-4 font-nimbus">
        ¿Qué especialidad estás buscando?
      </h1>
      <div className="flex justify-between mt-8">
        <p className="text-lg">Puedes escoger solo 1*</p>
        <Link href="#" className="text-lg font-bold underline">
          ¿No sabes qué especialidad buscas?
        </Link>
      </div>
      <div>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4">
            {serviceList.map((item) => (
              <div
                key={item.id} // Usamos `id` como la clave en el map
                className="relative p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
                onClick={() => selectEspecialidad(item)}
              >
                <div
                  className={`w-12 h-12 flex justify-center items-center rounded-full ${
                    selectServices.includes(item.id)
                      ? "bg-[#D5F1F0]"
                      : "bg-[#D9D9D9]"
                  }`}
                >
                  <Image
                    src={`${process.env.BASE_APP_URL}/${item.imagen}`}
                    alt={item.nombre}
                    width={25}
                    height={25}
                  />
                </div>
                <p className="mt-2 text-center">{item.nombre}</p>
                <div
                  className={`absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-sm ${
                    selectServices.includes(item.id)
                      ? "bg-[#007AFF]"
                      : "border border-black"
                  }`}
                >
                  {selectServices.includes(item.id) && <CheckIcon className="text-white w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente/nueva-oferta/titulo">
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

export default PublicarPageThree;
