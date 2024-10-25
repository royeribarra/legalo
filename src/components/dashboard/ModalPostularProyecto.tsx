import React from "react";

import { X as IconX, User } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Pencil } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";

import DocsForClients from "./DocsForClients";

interface ModalPostularProyectoProps {
  handleModalPostular: () => void; // Ajusta el tipo según tu función
}

const ModalPostularProyecto: React.FC<ModalPostularProyectoProps> = ({
  handleModalPostular,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 ">
      <div className="flex flex-col lg:flex-row bg-white lg:rounded-[24px] shadow-lg relative w-full h-full lg:w-auto lg:h-auto overflow-y-auto lg:max-w-[84vw] lg:max-h-[90vh] hidde-scrollbar">
        <div className="flex-1 flex flex-col justify-between">
          <div className="px-4 lg:p-9 lg:pt-0">
            <Tabs defaultValue="step1" className="">
              <TabsList className="fixed bg-white px-0 pt-20 lg:pt-12 pr-6 lg:pr-2 pb-8 lg:sticky top-0 z-10 w-full justify-start overflow-x-scroll overflow-y-hidden lg:overflow-hidden">
                <TabsTrigger
                  value="step1"
                  className="steps-btn text-[#B1B1B1] px-0"
                >
                  <span className="w-6 h-6 bg-[#B1B1B1] rounded-full text-white flex justify-center items-center mr-2 ">
                    1
                  </span>
                  Confirma tu perfil
                  <ChevronRight className="ml-2 text-[#B1B1B1]" />
                </TabsTrigger>
                <TabsTrigger
                  value="step2"
                  className="steps-btn text-[#B1B1B1] pr-0"
                >
                  <span className="w-6 h-6 bg-[#B1B1B1] rounded-full text-white flex justify-center items-center mr-2">
                    2
                  </span>
                  Video <ChevronRight className="ml-2 text-[#B1B1B1]" />
                </TabsTrigger>
                <TabsTrigger
                  value="step3"
                  className="steps-btn text-[#B1B1B1] pr-0"
                >
                  <span className="w-6 h-6 bg-[#B1B1B1] rounded-full text-white flex justify-center items-center mr-2">
                    3
                  </span>
                  Preguntas <ChevronRight className="ml-2 text-[#B1B1B1]" />
                </TabsTrigger>
                <TabsTrigger value="step4" className="steps-btn text-[#B1B1B1]">
                  <span className="w-6 h-6 bg-[#B1B1B1] rounded-full text-white flex justify-center items-center mr-2">
                    4
                  </span>
                  Cotización
                </TabsTrigger>
              </TabsList>
              <TabsContent value="step1" className="mt-36 lg:mt-0">
                <div className="p-0 lg:p-8 flex flex-col gap-3 overflow-hidden">
                  <div className="flex gap-8 items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" alt="user-img" />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-2xl">Juan P.</span>
                      <span>[Abogado Laboral]</span>
                      <Button
                        variant="link"
                        className="text-[#007AFF] flex items-center gap-2 px-0 justify-start"
                      >
                        <Pencil size={24} />
                        <span>Editar perfil</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap ">
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
                  </div>

                  <div className="my-2">
                    <span className="font-bold text-lg">Especialidades</span>
                    <div className="flex gap-4 flex-wrap mt-3">
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
                        <p>Migración laboral</p>
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
                        <p>Terminaciones de empleo</p>
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
                        <p>Arbitraje y Mediación Laboral</p>
                      </Button>
                    </div>
                  </div>

                  <div className="my-2">
                    <p className="font-bold text-lg mb-2">Descripción:</p>
                    <p>
                      Experto en asesorar y representar en temas de despidos,
                      discriminación, negociaciones colectivas y cumplimiento
                      normativo. Comprometido con la protección de los derechos
                      laborales y ambientes de trabajo justos.
                    </p>
                  </div>

                  <div className="my-2">
                    <span className="font-bold text-lg">
                      Documentos que se le enviaran al cliente:
                    </span>

                    <div className="flex flex-col gap-2 mt-3">
                      <DocsForClients />
                      <DocsForClients />
                    </div>
                  </div>
                  <div className="my-2">
                    <p className="font-bold text-lg mb-4">
                      Consideras necesario enviar algún documento extra para
                      potenciar tu postulación?
                    </p>

                    <div className="border border-black border-dashed p-2 flex flex-col items-center">
                      <Image
                        src="/assets/images/ico-upload.png"
                        alt="ico-cv"
                        width={64}
                        height={64}
                      ></Image>
                      <p>Clic aquí o arrastra el documento a adjuntar</p>
                      <p className="text-xs text-gray-500">
                        DOC,DOCX,PDF(2 MB)
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="step2" className="mt-36 lg:mt-0">
                2 Change your password here.
              </TabsContent>
              <TabsContent value="step3" className="mt-36 lg:mt-0">
                3 Change your password here.
              </TabsContent>
              <TabsContent value="step4" className="mt-36 lg:mt-0">
                4 Change your password here.
              </TabsContent>
            </Tabs>
          </div>
          <div className="fixed lg:sticky  w-full bg-lg_blue-light h-20 flex justify-between items-center px-4 lg:px-10 bottom-0 flex-none">
            <Button
              variant="outline"
              className="h-12 px-8 lg:px-16 bg-[#d5f1f0] border border-black rounded-[10px] hover:bg-[#d5f1f0]"
            >
              Atrás
            </Button>
            <Button className="h-12 px-8 lg:px-16 gap-2 rounded-[10px]">
              Continuar <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-[416px] mt-10 lg:mt-20 border-l border-black lg:sticky top-20">
          <div className="px-5 pt-0 pb-2">
            <h3 className="font-tiempos text-xl mb-4">
              Asesoría para Contrato de Trabajadores Temporales
            </h3>
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
            <div className="flex gap-6  mt-8 flex-col">
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
            <h3 className="font-tiempos text-2xl mt-8">Sobre el cliente:</h3>
          </div>
          <div className="p-5 border-t border-black pb-24 lg:pb-5">
            <p>Nombre y apellido</p>
            <p>Miembro desde 2021</p>
            <p>Para trabajo/personal</p>
          </div>
        </div>

        <div
          onClick={handleModalPostular}
          className="fixed lg:sticky top-4 right-4 lg:top-8 lg:right-8 w-5 h-5 bg-black flex  justify-center items-center rounded-full cursor-pointer z-20"
        >
          <IconX className="text-white w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ModalPostularProyecto;
