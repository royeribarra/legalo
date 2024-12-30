import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type HeaderProps = {
  serviceTipe: string;
  updateServiceTipe: (newType: string) => void;
};

const Header: React.FC<HeaderProps> = ({ serviceTipe, updateServiceTipe }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Cambia el valor según el umbral de scroll deseado
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`bg-black lg:sticky lg:top-0 lg:z-20 transition-all duration-300 ${
          isScrolled ? "h-[60px] lg:h-[100px]" : "h-[80px] lg:h-[160px]"
        }`}
      >
        <div className="mx-auto max-w-[1920px] px-4 lg:px-16 flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/assets/logo-legalo-white.png"
                alt="logo"
                width={473}
                height={89}
                className={`max-w-[120px] lg:max-w-[213px] ${
                  isScrolled ? "max-w-[100px] lg:max-w-[180px]" : ""
                }`}
              />
            </Link>
            <div className="hidden lg:block w-[1px] h-10 bg-white mx-6"></div>
            <Link href="/nosotros" className="hidden lg:block text-white">
              Nosotros
            </Link>
          </div>

          <div>
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
                serviceTipe === "lawyer" ? "bg-lg-client text-black" : "bg-black text-white"
              }`}
            >
              ¿Quieres trabajar?
            </Button>
          </div>
          </div>

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
        {/* btns mobile */}
        <div className="lg:hidden flex items-center justify-center pb-4">
          <div className="lg:flex gap-2 border border-white rounded-full p-[2px] w-auto">
            <Button
              variant="switchOutline"
              onClick={() => updateServiceTipe("client")}
              className="bg-lg-client"
            >
              ¿Quieres contratar?
            </Button>
            <Button
              variant="switch"
              onClick={() => updateServiceTipe("lawyer")}
              className="text-white bg-black"
            >
              ¿Quieres trabajar?
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
