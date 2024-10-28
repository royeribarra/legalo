"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React from "react";

import { ArrowRight } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const PublicarPageFour = () => {
  return (
    <div className="container mx-auto p-4 lg:p-8 lg:px-20 m-8 ">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={67} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 4/6</p>
      </div>
      <div className="flex flex-wrap lg: flex-nowrap gap-16">
        <div>
          <h1 className="text-2xl lg:text-5xl my-4 font-tiempos">
            Cuéntanos lo qué necesitas
          </h1>
          <p className="mb-6 lg:text-xl font-bold">
            Nuestros abogados necesitan saber:
          </p>
          <ul className="lg:text-xl space-y-6">
            <li>
              ✅ Naturaleza del problema: Civil, penal, laboral, comercial, etc.
            </li>
            <li>
              ✅ Partes involucradas: Personas u organizaciones implicadas.
            </li>
            <li>
              ✅ Contexto y antecedentes: Breve historia y acciones previas.
            </li>
            <li>
              ✅ Objetivos: Qué esperas lograr (resolución amistosa, litigio,
              negociación, etc.)
            </li>
            <li>
              ✅ Urgencia: Si hay aspectos que requieran atención inmediata.
            </li>
          </ul>
        </div>
        <div>
          <p className="lg:text-lg mb-2">Descripción del caso:</p>
          <Textarea
            rows={7}
            placeholder="Escribe tu descripción"
            className="mb-4 border-black focus-visible:border-none rounded-[10px]"
          ></Textarea>
          <Link href="#" className="font-bold lg:text-lg block mb-4 underline">
            Ver ejemplos descripciones efectivas
          </Link>
          <p className="lg:text-lg">Documentación</p>
          <div className="border border-black border-dashed p-2 flex flex-col items-center">
            <Image
              src="/assets/images/ico-upload.png"
              alt="ico-cv"
              width={64}
              height={64}
            ></Image>
            <p>Clic aquí o arrastra el documento a adjuntar</p>
            <p className="text-xs text-gray-500">DOC,DOCX,PDF(2 MB)</p>
          </div>
          <p>Adjunta todo documento que creas que pueda ayudar en tu caso.</p>
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <Link href="/publicar/5">
          <Button className="h-12 px-10 px-text-base rounded-[10px]">
            Confirmar <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PublicarPageFour;
