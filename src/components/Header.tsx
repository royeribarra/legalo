import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  serviceTipe: string;
  updateServiceTipe: (newType: string) => void;
};

const Header: React.FC<HeaderProps> = ({ serviceTipe, updateServiceTipe }) => {
  console.log(serviceTipe)
  return (
    <>
      {serviceTipe === "client" ? (
        <header>
          <div className="mx-auto max-w-[1920px] px-4 lg:px-16 h-[80px] lg:h-[160px] bg-background flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/assets/legalo-logo.png"
                  alt="logo"
                  width={473}
                  height={89}
                  className="max-w-[120px] lg:max-w-[213px]"
                />
              </Link>
              <div className="hidden lg:block w-[1px] h-10 bg-black mx-6"></div>

              <Link href="/" className="hidden lg:block">
                Nosotros
              </Link>
            </div>

            <div>
              <div className="lg:flex gap-2 hidden border border-black rounded-full p-[2px] w-auto">
                <Button
                  variant="switch"
                  onClick={() => updateServiceTipe("client")}
                >
                  ¿Quieres contratar?
                </Button>
                <Button
                  variant="switchOutline"
                  onClick={() => updateServiceTipe("lawyer")}
                >
                  ¿Quieres trabajar?
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-none">
                Iniciar sesión
              </Button>
              <Link href="/registro/tipo">
                <Button size="sm">Regístrate</Button>
              </Link>
            </div>
          </div>
          {/* btns mobile */}
          <div className="lg:hidden flex items-center justify-center pb-4">
            <div className="lg:flex gap-2  border border-black rounded-full p-[2px] w-auto">
              <Button
                variant="switch"
                onClick={() => updateServiceTipe("client")}
              >
                ¿Quieres contratar?
              </Button>
              <Button
                variant="switchOutline"
                onClick={() => updateServiceTipe("lawyer")}
              >
                ¿Quieres trabajar?
              </Button>
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-black">
          <div className="mx-auto max-w-[1920px] container px-4 lg:px-16 h-[80px] lg:h-[160px] flex justify-between items-center">
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

              <Link href="/" className="hidden lg:block text-white">
                Nosotros
              </Link>
            </div>
            <div>
              <div className="lg:flex gap-2 hidden border border-white rounded-full p-[2px] w-auto">
                <Button
                  variant="switch"
                  onClick={() => updateServiceTipe("client")}
                  className="text-white bg-black"
                >
                  ¿Quieres contratar?
                </Button>
                <Button
                  variant="switchOutline"
                  onClick={() => updateServiceTipe("lawyer")}
                  className="bg-white"
                >
                  ¿Quieres trabajar?
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-black border-none">
                Iniciar sesión
              </Button>
              <Link href="/registro/tipo">
                <Button variant="outline" size="sm">
                  Regístrate
                </Button>
              </Link>
            </div>
          </div>
          {/* btns mobile */}
          <div className="lg:hidden flex items-center justify-center pb-4">
            <div className="lg:flex gap-2  border border-white rounded-full p-[2px] w-auto">
              <Button
                variant="switch"
                onClick={() => updateServiceTipe("client")}
                className="text-white bg-black"
              >
                ¿Quieres contratar?
              </Button>
              <Button
                variant="switchOutline"
                onClick={() => updateServiceTipe("lawyer")}
                className="bg-white"
              >
                ¿Quieres trabajar?
              </Button>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
