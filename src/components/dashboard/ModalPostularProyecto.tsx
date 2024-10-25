import React from "react";

import { X as IconX, User } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Pencil } from "lucide-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Minus, Equal } from "lucide-react";
import { Info as IcoInfo } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Image from "next/image";

import { Play as PlayIcon } from "lucide-react";

import DocsForClients from "./DocsForClients";
import { Textarea } from "../ui/textarea";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModalPostularProyectoProps {
  handleModalPostular: () => void;
  handleModalPostularOk: () => void;
}

const ModalPostularProyecto: React.FC<ModalPostularProyectoProps> = ({
  handleModalPostular,
  handleModalPostularOk,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20 ">
      <div className="flex flex-col lg:flex-row bg-white lg:rounded-[24px] shadow-lg relative w-full h-full overflow-y-auto lg:w-[1220px] lg:max-w-[84vw] lg:h-[830px] lg:max-h-[90vh] hidde-scrollbar">
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
                <div className="p-0 lg:p-8 flex flex-col gap-3 overflow-hidden">
                  <h3 className="font-bold text-2xl">
                    Sube un video de tu postulación
                  </h3>
                  <p>
                    Graba un video de 1 minuto sobre quién eres y por qué eres
                    ideal para el puesto.
                  </p>
                  <div className="border border-black border-dashed p-2 flex flex-col items-center">
                    <div className="flex justify-center items-center border border-black w-16 h-16 rounded-full ">
                      <PlayIcon />
                    </div>
                    <p>Agregar un video</p>
                    <p className="text-xs text-gray-500">DOC,DOCX,PDF(2 MB)</p>
                    <p className="text-xs text-gray-500">
                      formatos MP4, MOV, AVI.
                    </p>
                  </div>
                  <div>
                    <h3>Recomendaciones:</h3>
                    <ul className="list-disc  list-outside ml-5">
                      <li>
                        <b>Claridad y Simplicidad: </b>
                        El contenido debe ser lo suficientemente claro para que
                        el cliente no se sienta abrumado por términos
                        complicados.
                      </li>
                      <li>
                        <b>Empatía: </b>
                        Considera que subir un video puede ser estresante para
                        algunos clientes, así que el tono debe ser amigable y
                        tranquilizador en todo momento.
                      </li>
                      <li>
                        <b>Anticipar problemas: </b>
                        Brindar ayuda en caso de fallos sin que el cliente tenga
                        que buscarlo.
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="step3" className="mt-36 lg:mt-0">
                <div className="p-0 lg:p-8 flex flex-col gap-3 overflow-hidden">
                  <h3 className="font-bold text-2xl">
                    Contesta las preguntas que te dejó el cliente
                  </h3>
                  <div>
                    <ol className="list-decimal list-inside ">
                      <li className="my-4">
                        Pregunta
                        <Textarea
                          placeholder="Tu respuesta max 500 caracteres."
                          className="mt-2 border-black"
                        ></Textarea>
                      </li>
                      <li className="my-4">
                        Pregunta
                        <Textarea
                          placeholder="Tu respuesta max 500 caracteres."
                          className="mt-2 border-black"
                        ></Textarea>
                      </li>
                      <li className="my-4">
                        Pregunta
                        <Textarea
                          placeholder="Tu respuesta max 500 caracteres."
                          className="mt-2 border-black"
                        ></Textarea>
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="step4" className="mt-36 lg:mt-0">
                <div className="p-0 lg:p-8 flex flex-col gap-3 overflow-hidden">
                  <h2 className="font-bold text-2xl">Cotización</h2>
                  <h3 className="my-2 text-[#666666] text-sm border-b border-[#666666] pb-2">
                    Simulador de precios
                  </h3>
                  <div className="mb-2">
                    <h3 className="mb-2">Precio</h3>
                    <div className="border border-black h-12 rounded-[10px] flex items-center justify-between overflow-hidden">
                      <input
                        type="text"
                        placeholder="1,000.00"
                        className="flex-1 px-4 text-lg font-bold focus:outline-0 "
                      />
                      <span className="bg-[#E6E6E6] text-[#666666] w-20 h-full border-l border-black flex items-center justify-center">
                        SOLES
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-8 py-6 border-b border-dashed border-black">
                      <div className="border-2 border-black rounded-full w-5 h-5 flex items-center justify-center">
                        <Minus size={16} />
                      </div>
                      <div>
                        <span className="font-bold">S/200</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-right">
                          Comisión por parte de legalo (20% del precio total)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-8 py-6">
                      <div className="border-2 border-black rounded-full w-5 h-5 flex items-center justify-center">
                        <Equal size={16} />
                      </div>
                      <div>
                        <span className="font-bold">S/800</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg text-right">
                          Cantidad total que recibirás
                        </p>
                      </div>
                    </div>
                    <div className="text-[#61646B] flex items-center gap-2 text-sm">
                      <IcoInfo size={16} /> La cantidad total de tu cotización
                      la recibirás al finalizar el proyecto.
                    </div>
                  </div>
                  <h3 className="my-2 text-[#666666] text-sm border-b border-[#666666] pb-2">
                    ¿Dónde quieres recibir tu pago?
                  </h3>
                  <div className="flex justify-between gap-2 items-end flex-wrap">
                    <div className="flex-1">
                      <div>
                        <h3 className="text-sm text-[#61646B] mb-2">
                          Cuenta bancaria (CCI)
                        </h3>
                      </div>
                      <Input
                        type="text"
                        placeholder="83983479837899487934"
                        disabled
                        className="disabled:opacity-90 placeholder:text-[#666666] h-12 border rounded-[10px] border-black text-black bg-[#E6E6E6]  focus-visible:ring-0"
                      />
                    </div>
                    <div className="min-w-32">
                      <div>
                        <h3 className="text-sm text-[#61646B] mb-2">Banco</h3>
                      </div>
                      <Select defaultValue="b2">
                        <SelectTrigger className="rounded-[10px] border-black focus-visible:ring-0 focus:outline-none focus:border-0  bg-[#E6E6E6] h-12">
                          <SelectValue placeholder="Selecciona tu banco" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Bancos</SelectLabel>
                            <SelectItem value="b1">INTERBANK</SelectItem>
                            <SelectItem value="b2">BCP</SelectItem>
                            <SelectItem value="b3">BBVA</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        className="rounded-[10px] border-black h-12 w-36"
                      >
                        Cambiar
                      </Button>
                    </div>
                  </div>
                  <div className="text-[#61646B] flex items-center gap-2 text-sm">
                    <IcoInfo size={16} /> Al realizar la transferencia me
                    comprometo a concluir el servicio.
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="fixed lg:sticky  w-full bg-lg_blue-light h-20 flex justify-between items-center px-4 lg:px-10 bottom-0 flex-none border-t border-black">
            <Button
              variant="outline"
              className="h-12 px-8 lg:px-16 bg-[#d5f1f0] border border-black rounded-[10px] hover:bg-[#d5f1f0]"
            >
              Atrás
            </Button>
            <Button
              onClick={handleModalPostularOk}
              className="h-12 px-8 lg:px-16 gap-2 rounded-[10px]"
            >
              Continuar <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-[416px] mt-10 lg:mt-20 border-l border-black lg:sticky top-20 lg:mr-[-20px]">
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
          className="flex-none fixed lg:sticky top-4 right-4 lg:top-8 lg:right-8 w-5 h-5 bg-black flex  justify-center items-center rounded-full cursor-pointer z-20"
        >
          <IconX className="text-white w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ModalPostularProyecto;
