import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type HeaderProps = {
  serviceTipe: string;
  updateServiceTipe: (newType: string) => void;
};

const Header: React.FC<HeaderProps> = ({ serviceTipe, updateServiceTipe }) => {
  const pathname = usePathname();
  const showSwitch = pathname === "/";

  return (
    <header className="bg-black lg:sticky lg:top-0 lg:z-20 transition-all duration-300 h-[80px] lg:h-[160px]">
      <div className="mx-auto max-w-[1920px] px-4 lg:px-16 flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/assets/logo-legalo-white.png"
              alt="logo"
              width={473}
              height={89}
              className="max-w-[120px] lg:max-w-[213px]"
            />
          </Link>
          <div className="hidden lg:block w-[1px] h-10 bg-white mx-6"></div>
          <Link href="/nosotros" className="hidden lg:block text-white">
            Nosotros
          </Link>
        </div>

        {showSwitch && (
          <div className="lg:flex gap-2 hidden border border-white rounded-full p-[2px] w-auto">
            <Button
              variant="switchOutline"
              onClick={() => updateServiceTipe("client")}
              className={`h-10 lg:text-base ${
                serviceTipe === "client" ? "bg-lg-client text-black" : "bg-black text-white"
              }`}
            >
              ¿Quieres contratar?
            </Button>
            <Button
              variant="switch"
              onClick={() => updateServiceTipe("lawyer")}
              className={`h-10 lg:text-base ${
                serviceTipe === "lawyer" ? "bg-lg-lawyer text-black" : "bg-black text-white"
              }`}
            >
              ¿Quieres trabajar?
            </Button>
          </div>
        )}

        <div className="flex gap-2">
          <Link href="/login">
            <Button size="sm" className="bg-black border-none">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/registro/tipo">
            <Button variant="outline" size="sm">
              Regístrate
            </Button>
          </Link>
        </div>
      </div>

      {/* Botones para mobile */}
      {showSwitch && (
        <div className="lg:hidden flex items-center justify-center pb-4">
          <div className="lg:flex gap-2 border border-white rounded-full p-[2px] w-auto">
            <Button variant="switchOutline" onClick={() => updateServiceTipe("client")} className="bg-lg-client">
              ¿Quieres contratar?
            </Button>
            <Button variant="switch" onClick={() => updateServiceTipe("lawyer")} className="text-white bg-black bg-lg-lawyer">
              ¿Quieres trabajar?
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
