"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Check as CheckIcon, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import { especialidadService } from "@/services";
import ModalEspecialidades from "@/components/dashboard/Cliente/ModalEspecialidades"; // Importamos el modal
import { useLoader } from "@/contexts/loaderContext";

interface Especialidad {
  id: number;
  nombre: string;
  imagen: string;
}

const PublicarPageThree = () => {
  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const route = useRouter();
  const { state, updateState } = useOferta();
  const [selectServices, setSelectServices] = useState<number[]>(
    state.especialidades
  );
  const [serviceList, setServiceList] = useState<Especialidad[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await especialidadService.obtenerTodos();
      setServiceList(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const selectEspecialidad = (item: Especialidad) => {
    const selectedId = item.id;

    if (selectServices.includes(selectedId)) {
      const filteredServices = selectServices.filter((id) => id !== selectedId);
      setSelectServices(filteredServices);
      updateState({ especialidades: filteredServices });
    } else {
      if (selectServices.length >= 3) {
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dataServices = [
    {
      id: 1,
      nombre: "Abogado Civil",
      descripcion: "¿Necesitas revisar o firmar un contrato, asegurar la compra o alquiler de una propiedad o con el trámite de una herencia familiar?",
      imagen: "/civil.svg"
    },
    {
      id: 2,
      nombre: "Abogado Penalista",
      descripcion: "¿Te enfrentas a un juicio penal, necesitas asesoría en una investigación policial o quieres conocer tus derechos ante una detención?",
      imagen: "/penalista.svg"
    },
    {
      id: 3,
      nombre: "Abogado Laboral",
      descripcion: "¿Tienes problemas con un contrato de trabajo, fuiste despedido injustamente, necesitas asesoría en una inspección de SUNAFIL o sobre derechos laborales, como maternidad o acoso?",
      imagen: "/laboral.svg"
    },
    {
      id: 4,
      nombre: "Abogado Procesalista",
      descripcion: "¿Quieres presentar una demanda, necesitas ayuda para defenderte en un proceso judicial, o necesitas orientación en el seguimiento de tu caso judicial?",
      imagen: "/procesalista.svg"
    },
    {
      id: 5,
      nombre: "Abogado Administrativo",
      descripcion: "¿Necesitas apoyo para gestionar trámites con entidades públicas, defenderte de una sanción o multa o resolver problemas con permisos y licencias?",
      imagen: "/administrativo.svg"
    },
    {
      id: 6,
      nombre: "Abogado de Familia",
      descripcion: "¿Estás atravesando un divorcio, buscas custodia compartida, o necesitas asesoría sobre pensiones alimenticias y acuerdos familiares?",
      imagen: "/familia.svg"
    },
    {
      id: 7,
      nombre: "Abogado Tributario",
      descripcion: "¿Necesitas ayuda con la declaración de impuestos, o defensa en fiscalización de SUNAT o en un litigio tributario?",
      imagen: "/tributario.svg"
    },
    {
      id: 8,
      nombre: "Abogado de Migraciones",
      descripcion: "¿Necesitas ayuda con trámites de residencia, permisos de trabajo, o enfrentas problemas de inmigración?",
      imagen: "/migraciones.svg"
    },
    {
      id: 9,
      nombre: "Abogado de Protección al Consumidor",
      descripcion: "¿Te vendieron un producto defectuoso, no cumplieron con la garantía o te han hecho cobros indebidos?",
      imagen: "/proteccion-al-consumidor.svg"
    },
    {
      id: 10,
      nombre: "Abogado Empresarial",
      descripcion: "¿Planeas constituir una empresa, necesitas revisar contratos comerciales o estás involucrado en una fusión o disputa entre socios?",
      imagen: "/empresarial.svg"
    },
    {
      id: 11,
      nombre: "Abogado Ambiental",
      descripcion: "¿Necesitas asesoría sobre normativa ambiental, enfrentas problemas de permisos, o necesitas defensa en casos de contaminación?",
      imagen: "/ambiental.svg"
    },
    {
      id: 12,
      nombre: "Abogado de Arbitraje y Resolución de Conflicto",
      descripcion: "¿Tu contrato requiere resolver un conflicto ante un árbitro o tribunal arbitral o estás considerando iniciar una mediación o demanda arbitral?",
      imagen: "/arbitraje-resolucion-conflictos.svg"
    },
    {
      id: 13,
      nombre: "Abogado de la Competencia",
      descripcion: "¿Te han denunciado por prácticas anticompetitivas, o buscas cumplir con las normativas de competencia y evitar sanciones?",
      imagen: "/competencia.svg"
    },
    {
      id: 14,
      nombre: "Abogado de Competencia Desleal",
      descripcion: "¿Necesitas proteger tu marca de publicidad engañosa o tu negocio enfrenta prácticas desleales?",
      imagen: "/competencia-desleal.svg"
    },
    {
      id: 15,
      nombre: "Abogado de Compliance",
      descripcion: "¿Necesitas asesoría para cumplir con normativas legales, prevenir riesgos empresariales o implementar políticas de ética en tu organización?",
      imagen: "/compliance.svg"
    },
    {
      id: 16,
      nombre: "Abogado de Propiedad Intelectual",
      descripcion: "¿Quieres registrar una marca, proteger una invención o necesitas ayuda para defenderte de infracciones a tus derechos de autor?",
      imagen: "/propiedad-intelectual.svg"
    },
    {
      id: 17,
      nombre: "Abogado de Tecnología y Datos",
      descripcion: "¿Necesitas asesoría para proteger datos personales, negociar contratos de software, o resolver problemas de ciberseguridad?",
      imagen: "/tecnologia-de-datos.svg"
    },
    {
      id: 18,
      nombre: "Abogado de Salud",
      descripcion: "¿Enfrentas un conflicto de mala praxis médica, necesitas asesoría en seguros de salud, o buscas defender tus derechos como paciente?",
      imagen: "/salud.svg"
    }
  ];

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={100/8*3} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 3/8</p>
      </div>

      <h1 className="text-2xl lg:text-5xl my-4 font-nimbus">
        ¿Qué especialidad estás buscando?
      </h1>
      <div className="flex justify-between mt-8">
        <p className="text-lg">Puedes escoger solo 1*</p>
        <button
          className="text-lg font-bold underline"
          onClick={openModal} // Abre el modal
        >
          ¿No sabes qué especialidad buscas?
        </button>
      </div>

      <div>
        <div className="mt-8">
          <div className="grid grid-cols-3 gap-4">
            {serviceList.map((item) => (
              <div
                key={item.id}
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
                    src={`/assets/images/especialidades/${item.imagen}`}
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
                  {selectServices.includes(item.id) && (
                    <CheckIcon className="text-white w-4 h-4" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente/nueva-oferta/titulo">
          <Button
            variant="outline"
            className="h-12 px-10 text-base rounded-[10px]"
          >
            <ArrowLeft className="mr-2" /> Volver
          </Button>
        </Link>
        <Button
          className="h-12 px-10 text-base rounded-[10px]"
          onClick={nextStep}
        >
          Siguiente <ArrowRight className="ml-2" />
        </Button>
      </div>

      <ModalEspecialidades
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Especialidades de Derecho"
        content={dataServices}
      />
    </div>
  );
};

export default PublicarPageThree;
