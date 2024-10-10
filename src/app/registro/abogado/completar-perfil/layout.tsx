import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const CompleteProfileLawyerLayout = ({ children }: LayoutProps) => {
  return (
    <div className="">
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
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <div className="fixed left-0 bottom-0 w-screen h-[115px] bg-[#D5F1F0] flex">
        <div className="flex justify-center lg:justify-between items-center container mx-auto lg:px-8 max-w-[1000px]">
          <Link href="/registro/abogado/objetivos">
            <Button size="lg" variant="link">
              <ArrowLeft className="mr-2 h-4 w-4" /> Atras
            </Button>
          </Link>
          <Link href="/registro/abogado/bienvenida">
            <Button size="lg" className="">
              Sigue completando tu perfil{" "}
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerLayout;
