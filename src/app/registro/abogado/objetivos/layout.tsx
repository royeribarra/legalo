"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRegistroAbogado } from "@/contexts/registroAbogadoContext";

interface LayoutProps {
  children: ReactNode;
}

const CompleteProfileLawyerLayout = ({ children }: LayoutProps) => {
  
  const { stateAbogado } = useRegistroAbogado();
  return (
    <div className="h-screen grid grid-cols-4">
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
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{stateAbogado.nombres[0] + ' ' + stateAbogado.apellidos[0]+ '.'}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block degrade-lawyer z-10"></div>
    </div>
  );
};

export default CompleteProfileLawyerLayout;
