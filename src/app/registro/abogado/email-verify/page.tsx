"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { abogadoService } from "@/services";

const EmailVerify = () => {
  const [showStep, setShowStep] = useState(true);
  const searchParams = useSearchParams(); // Accede a los parámetros de búsqueda
  const correo = searchParams.get("correo"); // Obtén el valor de "correo"

  const checkDocumentos = async () => {
    if (correo) {
      try {
        const response = await abogadoService.updateLinkDocumentos(correo);
        console.log("Respuesta del servidor:", response);
        // Maneja la respuesta según sea necesario
      } catch (error) {
        console.error("Error al verificar el correo:", error);
      }
    } else {
      console.error("No se proporcionó un correo en los parámetros de la URL.");
    }
  };

  useEffect(() => {
    checkDocumentos();
  }, []);

  return (
    <div
      className={`h-screen flex flex-col p-4 ${
        showStep !== true ? "bg-lg-client " : ""
      }`}
    >
      <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] min-h-[60px]">
        <Link href="/">
          <Image
            src="/assets/legalo-logo.png"
            alt="logo"
            width={160}
            height={30}
            className="max-w-[100px] md:max-w-none"
          />
        </Link>
      </header>
      {showStep ? (
        <div className="flex mt-[3%] flex-col items-center gap-5 flex-auto pb-20">
          <Image
            src="/assets/images/img-client-verify.jpg"
            alt="img-wireframe"
            width={460}
            height={320}
          />
          <h2 className="text-4xl text-center font-nimbus font-light">
            Por favor, verifica tu email
          </h2>
          <p className="text-center">
            No olvides revisar tu carpeta de correo no deseado y otras bandejas
          </p>
          <Button
            onClick={() => {
              checkDocumentos(); // Llama a la función al hacer clic
              setShowStep(false);
            }}
            className="mt-4 rounded-[10px] h-12 px-6 text-base"
          >
            Enviar de nuevo
          </Button>
        </div>
      ) : (
        <div className="flex mt-[3%] flex-col items-center gap-5 flex-auto pb-20">
          <Image
            src="/assets/images/img-client-verify2.jpg"
            alt="img-wireframe"
            width={460}
            height={460}
          />
          <h2 className="text-4xl text-center font-nimbus mt-2">
            ¡Bienvenido a Legalo!
          </h2>
          <p className="text-center">Tu cuenta ha sido creada con éxito.</p>
          <Link href="/registro/cliente/bienvenida">
            <Button className="mt-4 rounded-[10px] h-12 px-6 text-base">
              Continuar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const WrappedEmailVerify = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <EmailVerify />
    </Suspense>
  );
};

export default WrappedEmailVerify;
