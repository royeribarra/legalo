"use client";

import React, { useState } from "react";

// import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterPage = () => {
  const [cardSelected, setCardSelected] = useState<string>("");

  const router = useRouter();

  const handleCardClick = (tipe: string) => {
    setCardSelected(tipe);
  };

  const handleButtonClick = () => {
    if (cardSelected === "lawyer") {
      router.push("/registro/abogado");
    } else if (cardSelected === "client") {
      router.push("/registro/cliente");
    }
  };

  return (
    <div className="container p-4 lg:p-8 mx-auto flex flex-col gap-8 lg:gap-8 mt-8 max-w-[860px]">
      {/* {cardSelected === "client" ? (
        <div>
          <Progress value={33} className="mx-auto mb-4" />
          <p className="text-center">Paso 1/3</p>
        </div>
      ) : (
        <div>
          <Progress value={50} className="mx-auto mb-4" />
          <p className="text-center">Paso 1/2</p>
        </div>
      )} */}

      <h2 className=" text-3xl lg:text-5xl text-left font-tiempos">
        Únete como <span className="italic">cliente</span>&nbsp;o&nbsp;
        <span className="italic">abogado</span>
      </h2>
      <p className="lg:text-lg ">
        Únete a Legalo como cliente para encontrar abogados especializados
        fácilmente, o como abogado con oportunidades profesionales.
      </p>

      <div className="grid grid-cols-2 gap-5 lg:my-10">
        <div
          onClick={() => handleCardClick("client")}
          className={`relative p-4 lg:p-8 border border-solid border-black rounded-xl cursor-pointer ${
            cardSelected == "client"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <Image
            src="/assets/images/img-tipo-b-cliente.png"
            alt="img-cliente"
            width={74}
            height={74}
            className={`${cardSelected == "client" ? "invert-100" : ""}`}
          />
          <p className="text-sm lg:text-2xl lg:mt-3">
            Soy un cliente, buscando contratar abogados
          </p>
          <div
            className={`absolute right-4 top-4 rounded-full w-[20px] h-[20px] flex justify-center items-center ${cardSelected == "client" ? "bg-[#007AFF]" : "border border-black"}`}
          >
            <Check className="text-white w-[24px] h-[16px]" />
          </div>
        </div>

        <div
          onClick={() => handleCardClick("lawyer")}
          className={`relative p-4 lg:p-8 border border-solid border-black rounded-xl cursor-pointer ${
            cardSelected == "lawyer"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <Image
            src="/assets/images/img-tipo-b-abogado.png"
            alt="img-cliente"
            width={79}
            height={80}
            className={`${cardSelected == "lawyer" ? "invert-100" : ""}`}
          />
          <p className="text-sm lg:text-2xl lg:mt-3">
            Soy abogado, buscando oportunidades
          </p>
          <div
            className={`absolute right-4 top-4 rounded-full w-[20px] h-[20px] flex justify-center items-center ${cardSelected == "lawyer" ? "bg-[#007AFF]" : "border border-black"}`}
          >
            <Check className="text-white w-[24px] h-[16px]" />
          </div>
        </div>
      </div>

      <Button
        disabled={!cardSelected}
        onClick={handleButtonClick}
        className="w-[280px] h-[48px] text-base mx-auto border rounded-xl lg:mb-10"
      >
        Crear cuenta
      </Button>

      <p className="text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="underline">
          Ingresa
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
