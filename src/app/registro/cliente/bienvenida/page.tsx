"use client";

import { Button } from "@/components/ui/button";
import { useLoader } from "@/contexts/loaderContext";
import { usuarioService } from "@/services";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const RegistroBienvenidaCliente = () => {
  const { setLoading, loading } = useLoader();
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const searchParams = useSearchParams();
  const activationCode = searchParams.get("code_activation");

  const verifyActivationCode = async () => {
    if (!activationCode) {
      setIsChecking(false);
      return;
    }

    setLoading(true);
    try {
      const response = await usuarioService.validarcuenta({ code: activationCode });
      if (response.success) {
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Error en la verificación:", error);
    } finally {
      setLoading(false);
      setIsChecking(false);
    }
  };

  useEffect(() => {
    verifyActivationCode();
  }, [activationCode]);

  return (
    <>
      {loading || isChecking ? (
        <div className="flex mt-[3%] flex-col items-center gap-5 flex-auto pb-20">
          <h2 className="text-4xl text-center font-nimbus mt-2 text-gray-600">
            Verificando cuenta...
          </h2>
          <p className="text-center">Por favor, espera un momento.</p>
        </div>
      ) : isVerified ? (
        <div className="container mx-auto p-4 m-8 max-w-[720px] flex flex-col gap-8">
          <h1 className="text-5xl my-4 font-nimbus">
            ¡Bienvenida(o) a <span className="italic font-light">Legalo!</span>
          </h1>
          <Image
            src="/assets/images/img-client-bienvenida.webp"
            alt="img-wireframe"
            width={460}
            height={320}
          />
          <div>
            <p className="text-xl">¡Vamos a publicar tu primer proyecto!</p>
            <p className="text-xl">
              Conéctate con abogados expertos para llevar tu caso al siguiente nivel.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 mt-10">
            <Link href="/login">
              <Button className="rounded-[10px] h-12 px-6 text-base">
                Publicar proyecto
              </Button>
            </Link>
            <Link href={"/busqueda"}>
              <Button
                variant="outline"
                className="border-black rounded-[10px] h-12 px-6 text-base"
              >
                Ver recomendaciones
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex mt-[3%] flex-col items-center gap-5 flex-auto pb-20">
          <h2 className="text-4xl text-center font-nimbus mt-2 text-red-500">
            Error en la verificación del código
          </h2>
          <p className="text-center">
            El código de activación no es válido o ha expirado.
          </p>
          <Link href="/">
            <Button className="h-12 rounded-[10px] text-base">
              Ir a la página principal
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RegistroBienvenidaCliente />
    </Suspense>
  );
}
