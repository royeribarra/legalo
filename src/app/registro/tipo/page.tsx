"use client";

import React, { useState } from "react";

// import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [cardSelected, setCardSelected] = useState(null);

  const router = useRouter();

  const handleCardClick = (tipe) => {
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
    <div className="container p-4 lg:p-8 mx-auto flex flex-col gap-8 lg:gap-20 mt-8 max-w-[860px]">
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

      <h2 className="font-bold text-3xl lg:text-5xl text-center">
        Únete como cliente o abogado
      </h2>
      <p className="lg:text-lg ">
        Únete a Legalo como cliente para encontrar abogados especializados
        fácilmente, o como abogado con oportunidades profesionales.
      </p>

      <div className="grid grid-cols-2 gap-5 ">
        <div
          onClick={() => handleCardClick("client")}
          className={`p-8 border border-solid border-black rounded-xl cursor-pointer ${
            cardSelected == "client"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <Briefcase className="h-6 w-6 text-gray-500" />
          <p>Soy un cliente, buscando contratar abogados</p>
        </div>

        <div
          onClick={() => handleCardClick("lawyer")}
          className={`p-8 border border-solid border-black rounded-xl cursor-pointer ${
            cardSelected == "lawyer"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <Briefcase className="h-6 w-6 text-gray-500" />
          <p>Soy abogado, buscando oportunidades</p>
        </div>
      </div>

      <Button disabled={!cardSelected} onClick={handleButtonClick}>
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
