import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomeLawerPage = () => {
  return (
    <div className="bg-lg-lawyer h-[100vh]">
      <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px]  ">
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
      <main className="container mx-auto px-4 lg:px-8 flex justify-center flex-col items-center gap-6">
        <Image
          src="/assets/images/img-welcome-lawyer.jpg"
          alt="logo"
          width={466}
          height={320}
          className=" md:max-w-none"
        />
        <h1 className="font-bold text-4xl font-tiempos">
          ¡Bienvenido a Legalo!
        </h1>
        <p>Tu cuenta ha sido creada con éxito.</p>
        <div className="border border-black p-4 flex gap-2 max-w-[620px]">
          <div className="border-2 border-black rounded-full h-5 w-5 flex justify-center items-center flex-none">
            <span className="text-black font-bold">i</span>
          </div>
          <div>
            <p className="font-bold text-lg">Cuenta en verificación</p>
            <p>
              En un máximo de 48hrs. tu cuenta estará habilitada desde el enlace
              enviado a tu correo
            </p>
          </div>
        </div>
        <Link href="/">
          <Button className="h-12 w-[118px] rounded-[10px] text-base">
            Continuar
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default WelcomeLawerPage;
