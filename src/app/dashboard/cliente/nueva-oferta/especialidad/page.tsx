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

interface Especialidad {
  id: number;
  nombre: string;
  imagen: string;
}

const PublicarPageThree = () => {
  const { showToast } = useToast();
  const route = useRouter();
  const { state, updateState } = useOferta();
  const [selectServices, setSelectServices] = useState<number[]>(state.especialidades);
  const [serviceList, setServiceList] = useState<Especialidad[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await especialidadService.obtenerTodos();
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalContent = [
    {
      title: 'Derecho Civil',
      descripcion: '¿Necesitas ayuda para revisar o firmar un contrato, asegurar la compra o alquiler de una propiedad o con el trámite de una herencia familiar?'
    },
    {
      title: 'Derecho Penalista',
      descripcion: '¿Te enfrentas a un juicio penal, necesitas asesoría en una investigación policial o quieres conocer tus derechos ante una detención?'
    },
    {
      title: 'Derecho Laboral',
      descripcion: '¿Tienes problemas con un contrato de trabajo, fuiste despedido injustamente, necesitas asesoría en una inspección de SUNAFIL o sobre derechos laborales, como maternidad o acoso?'
    },
    {
      title: 'Derecho Procesal',
      descripcion: '¿Quieres presentar una demanda, necesitas ayuda para defenderte en un proceso judicial, o necesitas orientación en el seguimiento de tu caso judicial?'
    },
    {
      title: 'Derecho Administrativo',
      descripcion: '¿Necesitas apoyo para gestionar trámites con entidades públicas, defenderte de una sanción o multa o resolver problemas con permisos y licencias?'
    },
    {
      title: 'Derecho de Familia',
      descripcion: 'Estás atravesando un divorcio, buscas custodia compartida, o necesitas asesoría sobre pensiones alimenticias y acuerdos familiares?'
    },
    {
      title: 'Derecho Tributario',
      descripcion: '¿Necesitas ayuda con la declaración de impuestos, o defensa en fiscalización de SUNAT o en un litigio tributario?'
    },
    {
      title: 'Derecho Migratorio',
      descripcion: '¿Necesitas ayuda con trámites de residencia, permisos de trabajo, o enfrentas problemas de inmigración?'
    },
    {
      title: 'Derecho de Protección al Consumidor',
      descripcion: '¿Te vendieron un producto defectuoso, no cumplieron con la garantía o te han hecho cobros indebidos?'
    },
    {
      title: 'Derecho Empresarial',
      descripcion: '¿Planeas constituir una empresa, necesitas revisar contratos comerciales o estás involucrado en una fusión o disputa entre socios?'
    },
    {
      title: 'Derecho Ambiental',
      descripcion: '¿Necesitas asesoría sobre normativa ambiental, enfrentas problemas de permisos, o necesitas defensa '
    },
    {
      title: 'Derecho de Arbitraje y Resolución de Conflicto',
      descripcion: '¿Tu contrato requiere resolver un conflicto ante un árbitro o tribunal arbitral o estás considerando iniciar una mediación o demanda arbitral?'
    },
    {
      title: 'Derecho de la Competencia',
      descripcion: '¿Te han denunciado por prácticas anticompetitivas, o buscas cumplir con las normativas de competencia y evitar sanciones?'
    },
    {
      title: 'Derecho de la Competencia Desleal',
      descripcion: '¿Necesitas proteger tu marca de publicidad engañosa o tu negocio enfrenta prácticas desleales?'
    },
    {
      title: 'Derecho de Compliance',
      descripcion: '¿Necesitas asesoría para cumplir con normativas legales, prevenir riesgos empresariales o implementar políticas de ética en tu organización?'
    },
    {
      title: 'Derecho de Propiedad Intelectual',
      descripcion: '¿Quieres registrar una marca, proteger una invención o necesitas ayuda para defenderte de infracciones a tus derechos de autor?'
    },
    {
      title: 'Derecho de Tecnología y Datos',
      descripcion: '¿Necesitas asesoría para proteger datos personales, negociar contratos de software, o resolver problemas de ciberseguridad?'
    },
    {
      title: 'Derecho de Salud',
      descripcion: '¿Enfrentas un conflicto de mala praxis médica, necesitas asesoría en seguros de salud, o buscas defender tus derechos como paciente?'
    }
  ];

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[900px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={50} className="mx-auto mb-4 h-2" />
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
                    src={item.imagen}
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
          className="h-12 px-10 text-base rounded-[10px]"
          onClick={nextStep}
        >
          Siguiente <ArrowRight className="ml-2" />
        </Button>
      </div>

      <ModalEspecialidades isOpen={isModalOpen} onClose={closeModal} title="Especialidades de Derecho" content={modalContent} />
    </div>
  );
};

export default PublicarPageThree;
