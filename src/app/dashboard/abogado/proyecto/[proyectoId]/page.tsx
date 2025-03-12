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
        const response = await ofertaservice.getOfertaByID(Number(proyectoId));
        setOferta(response.data);
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
            <Link href="/dashboard/abogado" className="flex items-center gap-4">
              <ArrowLeft size={32} /><p>Volver</p>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Primera columna (8 de 12) */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <h1 className="font-nimbus text-4xl mb-4">{oferta.titulo}</h1>
                <div className="flex">
                  <p className="text-slate-500">
                    {!diasPublicados ? "Publicado Hoy" : `Publicado hace ${diasPublicados} días |`}
                  </p>
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={24} color="#4B5563" />{oferta.aplicaciones?.length} postulaciones
                  </div>
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[43px] cursor-default"
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
              </div>
              {/* Segunda columna (4 de 12) */}
              <div className="lg:col-span-4">
                <div className="mt-4 lg:mt-0 mb-4">
                  {["creado", "verificar_postulaciones"].includes(oferta.estado) && (
                    <Button className="w-full h-12 bg-black hover:bg-gray-800 text-white transition-colors duration-200" onClick={handleModalPostular}>
                      Postular al caso
                    </Button>
                  )}
                  {oferta.estado === "asignado" && (
                    <Button className="w-full h-12 bg-yellow-500 hover:bg-yellow-700 text-white">
                      Asignado
                    </Button>
                  )}
                  {oferta.estado === "cerrado" && (
                    <Button className="w-full h-12 bg-gray-500 hover:bg-gray-700 text-white">
                      Cerrado
                    </Button>
                  )}
                  {oferta.estado === "cancelado" && (
                    <Button className="w-full h-12 bg-red-500 hover:bg-red-700 text-white">
                      Cancelado
                    </Button>
                  )}
                </div>
                <div className="w-full">
                  <div className="p-6 border border-black rounded-[10px] bg-lg-lawyer">
                    <h3 className="text-left font-nimbus">Sobre el cliente:</h3>
                    <p>{oferta.cliente.nombres + ' ' + oferta.cliente.apellidos} </p>
                    <p>Para uso {oferta.uso}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gap-4 flex-wrap">
              <div className="flex items-center gap-4 text-lg font-semibold text-gray-800">
                <p><span className="font-sans font-bold">Presupuesto:</span> S/ {oferta.salario_minimo} - {oferta.salario_maximo}</p>
                <span className="text-gray-500 text-xl">|</span>
                <p><span className="font-sans font-bold">Experiencia requerida:</span> {oferta.experiencia_abogado}</p>
              </div>
              <div className="mt-2">
                <h2 className="font-sans font-bold">Especialidades</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                {
                  oferta.especialidadesOferta.map((especialidad)=>
                    <Button
                      key={especialidad.id}
                      variant="outline"
                      className="border border-black rounded-full h-[43px] cursor-default"
                    >
                      <Image
                        src={"/assets/images/especialidades/" + especialidad.especialidad.imagen}
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
              </div>
              <div className="mt-2">
                <h2 className="font-sans font-bold">Servicios</h2>
                <div className="flex flex-wrap gap-2 mt-4">
                {
                  oferta.serviciosOferta.map((servicio)=>
                    <Button
                      variant="outline"
                      className="border border-black rounded-full h-[43px] cursor-default"
                      key={servicio.id}
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
            </div>
            <div>
              <h4 className="font-sans font-bold">Descripción de proyecto:</h4>
              <p>{oferta.descripcion}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-sans font-bold">Documentación del caso:</p>
              <Link
                href={`${process.env.S3_FILE_ROUTE}/${oferta?.files.find((file)=>file.nombreArchivo==='oferta_documento')?.filePath}`}
                target="_blank"
                className="text-blue-600 hover:underline flex items-center gap-2"
              >
                <Image
                  src="/icos/ico-document.svg"
                  alt="ico"
                  width={20}
                  height={20}
                />
                Documento con la información del caso
              </Link>
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
