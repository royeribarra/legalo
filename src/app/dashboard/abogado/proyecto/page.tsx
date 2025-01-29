"use client";

import { Info as IcoInfo } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { User } from "lucide-react";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SimilarProyect from "@/components/dashboard/SimilarProyect";

import StepsForProyects from "@/components/dashboard/StepsForProyects";
import ModalPostularProyecto from "@/components/dashboard/ModalPostularProyecto";
import ModalPostulacionOk from "@/components/dashboard/ModalPostulacionOk";

const ProyectPage = () => {
  const [showModalPostular, setShowModalPostular] = useState(false);
  const [showModalPostularOk, setShowModalPostularOk] = useState(false);

  const handleModalPostular = () => {
    setShowModalPostular(!showModalPostular);
  };

  const handleModalPostularOk = () => {
    setShowModalPostular(false);
    setShowModalPostularOk(!showModalPostularOk);
  };

  return (
    <div>
      <div className="p-4 lg:px-16 lg:pt-12 flex gap-16 2xl:gap-32 flex-col lg:flex-row">
        <div className="flex-1 lg:p-8 flex flex-col gap-6">
          <Link href="/dashboard/abogado">
            <ArrowLeft size={32} />
          </Link>
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <h1 className="font-nimbus text-2xl mb-4">
                Asesoría para Contrato de Trabajadores Temporales
              </h1>
              <p className="text-slate-500">Publicado hace 10 días</p>
            </div>
            <div className="mt-4 lg:mt-auto">
              <Button className="w-[300px] h-12" onClick={handleModalPostular}>
                Enviar Postulación
              </Button>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Button
              variant="outline"
              className="border border-black rounded-full h-[43px]"
            >
              <Image
                src="/icos/ico-dash-pin-map.svg"
                alt=""
                width={24}
                height={24}
                className="mr-2"
              />
              <p>Remoto</p>
            </Button>
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
              <p>1-2 semanas</p>
            </Button>
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
              <p>Retail</p>
            </Button>
            <Button
              variant="outline"
              className="border border-black rounded-full h-[43px]"
            >
              <Image
                src="/icos/ico-dash-briefcase.svg"
                alt=""
                width={24}
                height={24}
                className="mr-2"
              />
              <p>Asesoría legal</p>
            </Button>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <User size={24} color="#4B5563" /> 300 postulaciones
          </div>
          <div>
            <p>Descripción de proyecto: </p>{" "}
            <p>
              Estoy en busca de asesoría legal para la creación de un modelo de
              contrato que regule adecuadamente la contratación de trabajadores
              temporales, de acuerdo con la normativa laboral vigente. En mi
              empresa, planeo incorporar empleados para proyectos de mediana
              duración, y quiero asegurarme de que el contrato cumpla con todas
              las disposiciones legales aplicables, garantizando tanto la
              protección de los derechos de los trabajadores como los intereses
              de la empresa. El contrato debe incluir todas las cláusulas
              esenciales, como los términos y condiciones de empleo, la duración
              del contrato, derechos y obligaciones de ambas partes,
              procedimientos de terminación anticipada, el régimen de beneficios
              y compensaciones, así como cualquier otra disposición relevante
              para un empleo temporal. Es fundamental que el contrato se ajuste
              a las normativas laborales específicas del país o región donde
              operamos, asegurando que cubra aspectos como la seguridad social,
              condiciones de trabajo, y cualquier normativa sectorial o especial
              que deba considerarse.
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
                    Ver documentos adjuntosss
                  </div>
                </AccordionTrigger>
                <AccordionContent>- Documentos adjuntos -</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex gap-6 lg:gap-[15%] mt-8 flex-col lg:flex-row">
            <div className="flex items-start gap-8">
              <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
                <User size={24} color="#4B5563" />
              </span>
              <div className="flex flex-col gap-4">
                <p>Duración</p>
                <p>1-2 semanas</p>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
                <User size={24} color="#4B5563" />
              </span>
              <div className="flex flex-col gap-4">
                <p>Experiencia requerida</p>
                <p>Junior</p>
              </div>
            </div>
            <div className="flex items-start gap-8">
              <span className="w-10 h-10 border border-black rounded-full flex items-center justify-center">
                <User size={24} color="#4B5563" />
              </span>
              <div className="flex flex-col gap-4">
                <p>Presupuesto</p>
                <p>S/ 0.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[260px]">
          <div className="p-6 border border-black rounded-[10px] mb-8">
            <h3 className="text-center font-nimbus">Sobre el cliente:</h3>
            <p>Nombre y apellido</p>
            <p>Miembro desde 2021</p>
            <p>Para trabajo/personal</p>
          </div>
          {/* <div className="bg-[#FEF7FF] p-3 flex flex-wrap justify-center lg:justify-between max-w-[474px] border border-[#CAC4D0] rounded-xl gap-2">
            <div className="w-full flex-none flex items-center justify-center">
              <IcoInfo size={24} />
            </div>
            <div className="flex gap-3 lg:flex-1">
              <div className="flex gap-2  items-center w-[45%] flex-wrap">
                <p className="text-sm">Postulaciones restantes:</p>
                <span className="font-bold text-base">5</span>
              </div>
              <div className="w-[1px] my-2 lg:my-1 bg-black"></div>
              <div className="flex gap-2 items-center w-[45%] flex-wrap">
                <p className="text-sm">Tipo de membresia:</p>
                <span className="font-bold text-base">Gratuita</span>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Link href="#" className="text-[#007AFF] font-bold">
                Aumenta tus chances
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      <div className="pl-4 lg:pl-16 lg:pb-16 pr-0 overflow-hidden">
        {/* <div>
          <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-8">
            Oportunidades similares:
          </h3>
          <div className="flex gap-4 overflow-x-auto  scroll-smooth">
            <SimilarProyect />
            <SimilarProyect />
            <SimilarProyect />
          </div>
        </div> */}
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

      {/* {showModalPostular && (
        <ModalPostularProyecto
          handleModalPostular={handleModalPostular}
          handleModalPostularOk={handleModalPostularOk}
          oferta={oferta}
        />
      )} */}

      {showModalPostularOk && (
        <ModalPostulacionOk 
          handleModalPostularOk={handleModalPostularOk}
        />
      )}

      {/* <HalloweenAnimation /> */}
    </div>
  );
};

export default ProyectPage;
