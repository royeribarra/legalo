import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const CompleteProfileLawyerLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen grid grid-cols-4 gap-4">
      <div className="col-span-4 lg:col-span-3">
        <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] bg-background">
          <Link href="/">
            <Image
              src="/assets/legalo-logo.png"
              alt="logo"
              width={160}
              height={30}
              className="max-w-[100px] md:max-w-none"
            />
          </Link>

          <div className="flex gap-2 p-2 flex-col md:flex-row">
            <p className="text-sm">¿Buscas Trabajo?</p>
            <Link href="/registro" className="underline text-sm">
              Ir a Oportunidades
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block">
        <Image
          src="/assets/images/image-wireframe.webp"
          alt="img-wireframe"
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default CompleteProfileLawyerLayout;
