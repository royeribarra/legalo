"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const EmailVerify = () => {
  const [showStep, setshowStep] = useState(true);

  return (
    <div className="h-screen flex flex-col p-4">
      <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] bg-background min-h-[60px]">
        <div>
          <Image
            src="/assets/legalo-logo.png"
            alt="logo"
            width={160}
            height={30}
            className="max-w-[100px] md:max-w-none"
          />
        </div>
      </header>
      {showStep ? (
        <div className="flex justify-center flex-col items-center gap-4 flex-auto pb-20">
          <Image
            src="/assets/images/image-wireframe.webp"
            alt="img-wireframe"
            width={460}
            height={460}
            className="max-w-[200px] lg:max-w-none"
          />
          <h2 className="text-4xl text-center">Por favor, verifica tu email</h2>
          <p className="text-center">
            No olvides revisar tu carpeta de correo no deseado y otras bandejas
          </p>
          <Button onClick={() => setshowStep(false)}>Enviar de nuevo</Button>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center gap-4 flex-auto pb-20">
          <Image
            src="/assets/images/image-wireframe.webp"
            alt="img-wireframe"
            width={460}
            height={460}
            className="max-w-[200px] lg:max-w-none"
          />
          <h2 className="text-4xl text-center">¡Bienvenido a Legalo!</h2>
          <p className="text-center">Tu cuenta ha sido creada con éxito.</p>
          <Link href="/">
            <Button>Continuar</Button>
          </Link>
        </div>
      )}
      ;
    </div>
  );
};

export default EmailVerify;
