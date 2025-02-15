"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import * as Popover from '@radix-ui/react-popover';
import { Upload, Trash, Check } from "lucide-react";

const PublicarPageFour = () => {
  const route = useRouter();
  const { showToast } = useToast();
  const { state, updateState } = useOferta();
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (state.documento) {
  //     setFileError(null);
  //   }
  // }, [state.documento]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const fileSizeLimit = 11 * 1024 * 1024;

    if (!selectedFile) return;

    if (!validTypes.includes(selectedFile.type)) {
      setFileError("Formato de archivo no válido. Solo se aceptan PDF, DOC, DOCX y TXT.");
      alert(`Formato de archivo no válido. Solo se permiten: ${validTypes.join(", ")}.`);
      return;
    }

    if (selectedFile.size > fileSizeLimit) {
      alert(`El archivo debe pesar menos de ${(fileSizeLimit / 1024 / 1024).toFixed(2)} MB.`);
      setFileError("El archivo debe pesar menos de 4 MB.");
      return;
    }
    setFileError(null);
    updateState({
      documento: {
        nombre: selectedFile.name,
        tipo: selectedFile.type,
        contenido: selectedFile, // Guardamos el archivo como File
      },
    });
  };

  const removeFile = () => {
    updateState({ documento: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nextStep = () => {
    if (!state.descripcion) {
      showToast("error", "Ingresa una descripción", "");
      return;
    }
    // if (!state.documento) {
    //   showToast("error", "Sube un documento", "");
    //   return;
    // }
    route.push("/dashboard/cliente/nueva-oferta/servicio");
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateState({ descripcion: event.target.value });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 lg:px-20 m-8">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={(100 / 8) * 4} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 4/8</p>
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
            <li>✅ Naturaleza del problema: Civil, penal, laboral, comercial, etc.</li>
            <li>✅ Partes involucradas: Personas u organizaciones implicadas.</li>
            <li>✅ Contexto y antecedentes: Breve historia y acciones previas.</li>
            <li>✅ Objetivos: Qué esperas lograr (resolución amistosa, litigio, negociación, etc.)</li>
            <li>✅ Urgencia: Si hay aspectos que requieran atención inmediata.</li>
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
          {/* <Link href="#" className="font-bold lg:text-lg block mb-4 underline">
            Ver ejemplos descripciones efectivas
          </Link> */}
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant={"link"} className="font-bold lg:text-lg block mb-4 underline">
              Ver ejemplos descripciones efectivas
              </Button>
            </Popover.Trigger>
            
            <Popover.Portal>
              <Popover.Content 
                className="bg-white text-sm text-gray-700 p-4 rounded-lg shadow-lg w-96"
                side="top" // Puedes ajustar la posición
                align="center"
              >
                Ejemplo de caso: Tengo un problema con un inquilino que lleva tres
                meses sin pagar el alquiler y se niega a desalojar la propiedad. El
                contrato de arrendamiento sigue vigente. Mi objetivo principal es
                recuperar el inmueble lo antes posible y cobrar las rentas atrasadas.
                Necesito asesoría para entender las opciones legales disponibles y
                como iniciar un proceso de desalojo.
                <Popover.Arrow className="fill-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <p className="lg:text-lg">Documentación</p>
          <div className="border border-black border-dashed p-2 flex flex-col items-center">
            <Image src="/assets/images/ico-upload.png" alt="ico-cv" width={64} height={64} />
            <div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                className="mb-2"
              />
              <Button onClick={handleClick}>
                Sube tu documento <Upload size={18} color="white" className="ml-2" />
              </Button>
            </div>
            {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
            {state.documento && (
              <div className="text-center mt-2">
                <p className="text-green-500 text-sm">¡Archivo subido exitosamente!</p>
                <p className="text-xs text-gray-500">{state.documento.nombre}</p>
                <button
                  onClick={removeFile}
                  className="text-red-500 text-xs underline mt-1"
                >
                  Eliminar archivo
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500">PDF, Txt, .doc (máx. 4 MB)</p>
          </div>
          <p>Adjunta todo documento que creas que pueda ayudar en tu caso.</p>
        </div>
      </div>

      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente/nueva-oferta/especialidad">
          <Button variant="outline" className="h-12 px-10 text-base rounded-[10px]">
            <ArrowLeft className="mr-2" /> Volver
          </Button>
        </Link>
        <Button className="h-12 px-10 px-text-base rounded-[10px]" onClick={nextStep}>
          Confirmar <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PublicarPageFour;
