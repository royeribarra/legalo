"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useState } from "react";

import { ArrowRight } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";

const PublicarPageFour = () => {
  const route = useRouter();
  const { showToast } = useToast();
  const { state, updateState } = useOferta();
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
        "text/plain" // TXT
      ];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Formato de archivo no válido. Solo se aceptan PDF, DOC, DOCX y TXT.");
        return;
      }

      const fileSizeLimit = 4 * 1024 * 1024; // 5 MB
      if (selectedFile.size > fileSizeLimit) {
        setFileError("El archivo debe pesar menos de 5 MB.");
        return;
      }

      setFileError(null); // Limpiar errores previos
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result?.toString();
        if (base64File) {
          updateState({
            documento: {
              nombre: selectedFile.name,
              tipo: selectedFile.type,
              contenido: base64File,
            },
          });
          setUploadSuccess(true);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const nextStep = () => {
    if (!state.descripcion) {
      showToast("error", "Ingresa una descripción", "");
      return;
    }
    if (!state.documento) {
      showToast("error", "Sube un documento", "");
      return;
    }
    route.push("/dashboard/cliente/nueva-oferta/servicio");
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateState({ descripcion: event.target.value });
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 lg:px-20 m-8">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={67} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 4/6</p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-16">
        <div>
          <h1 className="text-2xl lg:text-5xl my-4 font-nimbus">
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
            value={state.descripcion}
            onChange={handleChange}
          />
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
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="mb-2"
            />
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            {uploadSuccess && <p className="text-green-500 text-sm">¡Archivo subido exitosamente!</p>}
            <p className="text-xs text-gray-500">PDF, JPG, PNG (máx. 5 MB)</p>
          </div>
          <p>Adjunta todo documento que creas que pueda ayudar en tu caso.</p>
        </div>
      </div>

      <div className="flex justify-end mt-16">
        <Button
          className="h-12 px-10 px-text-base rounded-[10px]"
          onClick={nextStep}
        >
          Confirmar <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PublicarPageFour;
