"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const EmailVerify = () => {
  const [showStep, setshowStep] = useState(true);

  return (
    <div
      className={` h-screen flex flex-col p-4 ${showStep !== true ? "bg-lg_yellow " : ""}`}
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
          <h2 className="text-4xl text-center font-tiempos font-light">
            Por favor, verifica tu email
          </h2>
          <p className="text-center">
            No olvides revisar tu carpeta de correo no deseado y otras bandejas
          </p>
          <Button
            onClick={() => setshowStep(false)}
            className="mt-4 rounded-[10px] h-12 px-6 text-base"
          >
            Enviar de nuevo
          </Button>
        </div>
      ) : (
        <div className="flex mt-[3%]  flex-col items-center gap-5 flex-auto pb-20">
          <Image
            src="/assets/images/img-client-verify2.jpg"
            alt="img-wireframe"
            width={460}
            height={460}
          />
          <h2 className="text-4xl text-center font-tiempos mt-2">
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

export default EmailVerify;
