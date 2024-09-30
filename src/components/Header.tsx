import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  serviceTipe: string;
  updateServiceTipe: (newType: string) => void;
};

const Header: React.FC<HeaderProps> = ({ serviceTipe, updateServiceTipe }) => {
  return (
    <>
      {serviceTipe === "client" ? (
        <header className="container mx-auto px-4 lg:px-8 h-[80px] lg:h-[160px] bg-background flex justify-between items-center">
          <div>
            <Link href="/">
              <Image
                src="/assets/legalo-logo.png"
                alt="logo"
                width={473}
                height={89}
                className="max-w-[120px] lg:max-w-none"
              />
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
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
            <Link href="/registro">
              <Button size="sm">Regístrate</Button>
            </Link>
          </div>
        </header>
      ) : (
        <div className="bg-black">
          <header className="container mx-auto px-4 lg:px-8 h-[80px] lg:h-[160px] flex justify-between items-center">
            <div>
              <Link href="/">
                <Image
                  src="/assets/logo-legalo-white.png"
                  alt="logo"
                  width={473}
                  height={89}
                  className="max-w-[120px] lg:max-w-none"
                />
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
              <Button size="sm" className="bg-black">
                Iniciar Sesión
              </Button>
              <Link href="/registro">
                <Button variant="outline" size="sm">
                  Regístrate
                </Button>
              </Link>
            </div>
          </header>
        </div>
      )}
    </>
  );
};

export default Header;
