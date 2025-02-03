"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import Link from "next/link";
import axios from "axios";
import { IServicio } from "@/interfaces/Servicio.interface";

const PublicarPageFour = () => {
  const route = useRouter();
  const { showToast } = useToast();
  const { state, updateState } = useOferta();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [serviceList, setServiceList] = useState<IServicio[]>([]);
  const serviceItems = [
    { id: 1, 
      nombre: "No estoy seguro del servicio a escoger",
      descripcion: "Recibe orientación para identificar el tipo de servicio legal que necesitas."
    },
    { id: 2, 
      nombre: "Consultoría/ Asesoría legal",
      descripcion: "Consulta con un abogado para aclarar dudas legales y obtener recomendaciones."
    },
    { id: 3, 
      nombre: "Patrocinio en Poder judicial",
      descripcion: "Representación en procesos judiciales ante el Poder Judicial."
    },
    { id: 4, 
      nombre: "Defensa y trámites ante entidades públicas",
      descripcion: "Representación y gestión en trámites y procesos ante entidades públicas."
    },
    { 
      id: 5, 
      nombre: "Redacción de Documentos Legales",
      descripcion: "Elaboración de contratos, demandas y otros documentos jurídicos."
    },
    { id: 6, 
      nombre: "Cumplimiento regulatorio",
      descripcion: "Asegura que tus actividades cumplan con la normativa vigente."
    },
    { 
      id: 7, 
      nombre: "Mediación/Conciliación",
      descripcion: "Representación y/o asistencia a audiencias de conciliación o mediación."
    },
    { 
      id: 8, 
      nombre: "Prácticas preprofesionales y profesionales",
      descripcion: "Asistencia de estudiantes o bachilleres en tareas legales supervisadas."
    },
    { 
      id: 9, 
      nombre: "Investigación legal",
      descripcion: "Búsqueda, análisis y síntesis de información jurídica por estudiantes o bachilleres."
    },
  ];

  // Sincronizar estado inicial desde el contexto
  useEffect(() => {
    if (state.servicios) {
      const servicioIds = state.servicios
        .filter((servicio) => servicio !== undefined)
        .map((servicio) => servicio as number);
      setSelectedServices(servicioIds);
    }
  }, [state.servicios]);

  const handleCheckboxChange = (checked: boolean, serviceId: number) => {
    setSelectedServices((prevState) => {
      let newSelection;

      if (checked) {
        if (prevState.length >= 2) {
          showToast("error", "Solo puedes seleccionar hasta 2 servicios.", "");
          return prevState; // No agregar más si ya hay 2 seleccionados
        }
        newSelection = [...prevState, serviceId];
      } else {
        newSelection = prevState.filter((id) => id !== serviceId);
      }

      updateState({ servicios: newSelection });

      return newSelection;
    });
  };

  const nextStep = () => {
    if (selectedServices.length === 0) {
      alert("Debes seleccionar al menos un servicio.");
      return;
    }
    route.push("/dashboard/cliente/nueva-oferta/alcance");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_APP_API_URL}/servicios/all`
        );
        setServiceList(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="mx-auto p-4 lg:p-8 max-w-[900px]">
      <div className="w-full my-8">
        <Progress value={100/8*5} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 5/8</p>
      </div>
      <div>
        <h1 className="text-2xl lg:text-5xl my-4 font-nimbus">
          Tipo de servicio
        </h1>
        <p className="mb-6 lg:text-lg">Puedes escoger max 2*</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-3 gap-4">
          {serviceItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-4 p-4 border border-black rounded-[10px] ${
                selectedServices.includes(item.id) ? "bg-[#D9D9D9]" : ""
              }`}
            >
              <Checkbox
                id={item.id.toString()}
                checked={selectedServices.includes(item.id)}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(!!checked, item.id)
                }
                className={`w-5 h-5 rounded-sm !border-gray-300 !border-2 ${
                  selectedServices.includes(item.id)
                    ? "!bg-blue-500 !text-white"
                    : "!bg-white !text-transparent"
                }`}
              />
              <label
                htmlFor={item.id.toString()}
                className="text-base font-bold"
              >
                {item.nombre}
              </label>
              <p className="text-sm">
                {item.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente/nueva-oferta/descripcion">
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

export default PublicarPageFour;
