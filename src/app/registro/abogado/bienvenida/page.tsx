"use client";

import { Button } from "@/components/ui/button";
import { useLoader } from "@/contexts/loaderContext";
import { usuarioService } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const WelcomeLawyerPage = () => {
  const { setLoading, loading } = useLoader();
  const [isVerified, setIsVerified] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // Estado para saber si sigue verificando
  const searchParams = useSearchParams();
  const activationCode = searchParams.get("code_activation");
  const router = useRouter();

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
        setTimeout(() => router.push("/dashboard"), 2000); // Redirigir tras 2s
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
    <div className="bg-lg-lawyer h-[100vh]">
      <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center h-[72px]">
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

      {loading || isChecking ? (
        <div className="flex flex-col items-center gap-5 flex-auto pb-20 mt-[3%]">
          <h2 className="text-4xl text-center font-nimbus mt-2 text-gray-600">
            Verificando cuenta...
          </h2>
          <p className="text-center">Por favor, espera un momento.</p>
        </div>
      ) : isVerified ? (
        <main className="container mx-auto px-4 lg:px-8 flex justify-center flex-col items-center gap-6">
          <Image
            src="/assets/images/img-welcome-lawyer.jpg"
            alt="Bienvenida"
            width={466}
            height={320}
            className="md:max-w-none"
          />
          <h1 className="font-bold text-4xl font-nimbus">¡Bienvenido a Legalo!</h1>
          <p>Tu cuenta ha sido creada con éxito.</p>
          <div className="border border-black p-4 flex gap-2 max-w-[620px]">
            <div className="border-2 border-black rounded-full h-5 w-5 flex justify-center items-center flex-none">
              <span className="text-black font-bold">i</span>
            </div>
            <div>
              <p className="font-bold text-lg">Cuenta en verificación</p>
              <p>
                En un máximo de 48hrs. tu cuenta estará habilitada desde el
                enlace enviado a tu correo.
              </p>
            </div>
          </div>
          <Link href="/login">
            <Button className="h-12 w-[118px] rounded-[10px] text-base">
              Ir al login
            </Button>
          </Link>
        </main>
      ) : (
        <div className="flex flex-col items-center gap-5 flex-auto pb-20 mt-[3%]">
          <h2 className="text-4xl text-center font-nimbus mt-2 text-red-500">
            Error en la verificación del código
          </h2>
          <p className="text-center">
            El código de activación no es válido o ha expirado.
          </p>
          <Link href="/">
            <Button className="h-12  rounded-[10px] text-base">
              Ir a la página principal
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <WelcomeLawyerPage />
    </Suspense>
  );
}
