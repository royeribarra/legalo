"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { User } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StepsForProyects from "@/components/dashboard/StepsForProyects";
import ModalPostularProyecto from "@/components/dashboard/ModalPostularProyecto";
import ModalPostulacionOk from "@/components/dashboard/ModalPostulacionOk";
import { abogadoService, ofertaservice } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { useLoader } from "@/contexts/loaderContext";

const ProyectSinglePage = () => {
  const { setLoading } = useLoader();
  const { proyectoId } = useParams();
  const [oferta, setOferta] = useState<IOfertaBack>();
  const [diasPublicados, setDiasPublicados] = useState<number>(0);
  const [showModalPostular, setShowModalPostular] = useState(false);
  const [showModalPostularOk, setShowModalPostularOk] = useState(false);
  const [newAplicacionId, setNewAplicacionId] = useState<number>(0);

  const handleModalPostular = () => {
    setShowModalPostular(!showModalPostular);
  };

  const handleModalPostularOk = (aplicacionId? : number) => {
    setShowModalPostular(false);
    setShowModalPostularOk(!showModalPostularOk);
    if(aplicacionId){
      setNewAplicacionId(aplicacionId);
    }
  };

  async function fetchOferta() {
    setLoading(true);
    try {
      if (proyectoId) {
        const data = await ofertaservice.getOfertaByID(Number(proyectoId));
        console.log(data)
        setOferta(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchOferta()
  }, [proyectoId]);

  function calculateDaysSinceCreation(createdAt: string): number {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate.getTime() - createdDate.getTime();
    const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    setDiasPublicados(daysDifference);
    return daysDifference;
  }

  useEffect(()=> {
    if(oferta){
      calculateDaysSinceCreation(oferta?.createdAt);
    }
  }, [oferta]);

  return (
    <div>
      {
        oferta &&
        <div className="p-4 lg:px-16 lg:pt-12 flex gap-16 2xl:gap-32 lg:flex-row">
          <div className="flex-1 lg:p-8 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Columna izquierda con título y estado */}
              <div className="flex-1 flex flex-col gap-6">
                <Link href="/dashboard/abogado">
                  <ArrowLeft size={32} />
                </Link>
                <div className="flex items-start justify-between flex-wrap">
                  <div>
                    <h1 className="font-nimbus text-2xl mb-4">{oferta.titulo}</h1>
                    <p className="text-slate-500">
                      {!diasPublicados ? "Publicado Hoy" : `Publicado hace ${diasPublicados} días`}
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    {["creado", "verificar_postulaciones"].includes(oferta.estado) && (
                      <Button className="w-[300px] h-12 bg-blue-500 hover:bg-blue-700 text-white" onClick={handleModalPostular}>
                        Enviar Postulación
                      </Button>
                    )}
                    {oferta.estado === "asignado" && (
                      <Button className="w-[300px] h-12 bg-yellow-500 hover:bg-yellow-700 text-white">
                        Asignado
                      </Button>
                    )}
                    {oferta.estado === "cerrado" && (
                      <Button className="w-[300px] h-12 bg-gray-500 hover:bg-gray-700 text-white">
                        Cerrado
                      </Button>
                    )}
                    {oferta.estado === "cancelado" && (
                      <Button className="w-[300px] h-12 bg-red-500 hover:bg-red-700 text-white">
                        Cancelado
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {/* Columna derecha con información del cliente */}
              <div className="w-full lg:w-[260px]">
                <div className="p-6 border border-black rounded-[10px]">
                  <h3 className="text-center font-nimbus">Sobre el cliente:</h3>
                  <p>Nombre y apellido: {oferta.cliente.nombres}</p>
                  <p>Para uso {oferta.uso}</p>
                </div>
              </div>
            </div>

            <div className="gap-4 flex-wrap">
              <div>
              <Button
                variant="outline"
                className="border border-black rounded-full h-[43px]"
              >
                <Image
                  src="/icos/ico-dash-alarm.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <p>{oferta.duracion}</p>
              </Button>
              </div>
              <div className="mt-2">
                <h2>Especialidades</h2>
              {
                oferta.especialidadesOferta.map((especialidad)=>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[43px]"
                  >
                    <Image
                      src="/icos/ico-dash-building.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <p>{especialidad.especialidad.nombre}</p>
                  </Button>
                )
              }
              </div>
              <div className="mt-2">
                <h2>Servicios</h2>
              {
                oferta.serviciosOferta.map((servicio)=>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[43px]"
                  >
                    <Image
                      src="/icos/ico-dash-building.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <p>{servicio.servicio.nombre}</p>
                  </Button>
                )
              }
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <User size={24} color="#4B5563" /> {oferta.aplicaciones.length} postulaciones
            </div>
            <div>
              <p>Descripción de proyecto: </p>{" "}
              <p>
                {oferta.descripcion}
              </p>
            </div>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-y border-black">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icos/ico-document.svg"
                        alt="ico"
                        width={24}
                        height={24}
                      />
                      Ver documentos adjuntos
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link href={`${process.env.S3_FILE_ROUTE}/${oferta?.files.find((file)=>file.nombreArchivo==='oferta_documento')?.filePath}`} target="_blank">Ver documento</Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex gap-6 lg:gap-10 mt-8 flex-col lg:flex-row justify-between">
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
                  <User size={24} color="#4B5563" />
                </span>
                <div>
                  <p>Duración</p>
                  <p>{oferta.duracion}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
                  <User size={24} color="#4B5563" />
                </span>
                <div>
                  <p>Experiencia requerida</p>
                  <p>{oferta.experiencia_abogado}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
                  <User size={24} color="#4B5563" />
                </span>
                <div>
                  <p>Presupuesto S/</p>
                  <p>{oferta.salario_minimo} - {oferta.salario_maximo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      <div className="pl-4 lg:pl-16 lg:pb-16 pr-0 overflow-hidden">
        <h3 className="text-xl lg:text-2xl font-bold my-8 ">
          Pasos para postular a un proyecto:
        </h3>
        <div className="flex gap-4 overflow-x-auto  scroll-smooth">
          <StepsForProyects
            step="1"
            imageUrl="/assets/img-register.webp"
            title="Proyectos"
            text="Regístrate y completa tu perfil profesional."
          />
          <StepsForProyects
            step="2"
            imageUrl="/assets/img-register.webp"
            title="Busca Proyectos"
            text="Utiliza nuestros filtros para encontrar proyectos que se adapten a tus necesidades."
          />
          <StepsForProyects
            step="3"
            imageUrl="/assets/img-register.webp"
            title="Postula"
            text="Envía tu propuesta y elige tu forma de pago."
          />
          <StepsForProyects
            step="4"
            imageUrl="/assets/img-register.webp"
            title="Consigue un contrato"
            text="Si eres seleccionado, recibe el contrato y comienza."
          />
          <StepsForProyects
            step="5"
            imageUrl="/assets/img-register.webp"
            title="Completa el trabajo"
            text="Marca los pasos completados y comunícate con el cliente si tienes dudas."
          />
          <StepsForProyects
            step="6"
            imageUrl="/assets/img-register.webp"
            title="Recibe tu pago"
            text="Obtén pagos parciales y finales tras la aprobación del cliente."
          />
        </div>
      </div>

      {showModalPostular && oferta && (
        <ModalPostularProyecto
          proyectoId={Number(proyectoId)}
          handleModalPostular={handleModalPostular}
          handleModalPostularOk={handleModalPostularOk}
          oferta={oferta}
        />
      )}

      {showModalPostularOk && (
        <ModalPostulacionOk
          handleModalPostularOk={handleModalPostularOk}
          oferta={oferta}
          newAplicacionId={newAplicacionId}
        />
      )}
    </div>
  );
};

export default ProyectSinglePage;
