"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

const CompleteProfileLawyerPage = () => {
  const [showStep, setshowStep] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const activationCode = params.get("code_activation");

    if (activationCode) {
      // Hacer el fetch para verificar el código
      const verifyActivationCode = async () => {
        try {
          const response = await fetch(`${process.env.BASE_APP_API_URL}/usuarios/verify-activation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: activationCode }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setIsVerified(true);
              setshowStep(false);
            } else {
              console.error("Código de activación no válido o expirado.");
            }
          } else {
            console.error("Error en la verificación del código.");
          }
        } catch (error) {
          console.error("Error en la solicitud de verificación:", error);
        }
      };

      verifyActivationCode();
    }
  }, []);

  return (
    <>
      {
        isVerified ?
        <div className="container mx-auto p-4 m-8 max-w-[720px] flex flex-col gap-8">
          <h1 className="text-5xl my-4 font-tiempos">
            ¡Bienvenida(o) a <span className="italic font-light">Legalo!</span>
          </h1>
          <div>
            <p className="text-xl">¡Vamos a publicar tu primer proyecto! </p>
            <p className="text-xl">
              Conéctate con abogados expertos para llevar tu caso al siguiente
              nivel.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-10">
            <Link href="/publicar">
              <Button className="rounded-[10px] h-12 px-6 text-base">
                Publicar proyecto
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-black rounded-[10px] h-12 px-6 text-base"
            >
              Ver recomendaciones
            </Button>
          </div>
        </div> :
        <div className="flex mt-[3%] flex-col items-center gap-5 flex-auto pb-20">
          <h2 className="text-4xl text-center font-tiempos mt-2 text-red-500">
            Error en la verificación del código
          </h2>
          <p className="text-center">El código de activación no es válido o ha expirado.</p>
        </div>
      }
    </>
  );
};

export default CompleteProfileLawyerPage;
