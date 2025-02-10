"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search as IcoSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import { DashboardAbogadoProvider } from "@/contexts/dashboardAbogadoContext";
import { useLoader } from "@/contexts/loaderContext";
interface LayoutProps {
  children: ReactNode;
}

const DashboardAbogadoLayout = ({ children }: LayoutProps) => {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
};

const LayoutContent = ({ children }: LayoutProps) => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const whatsappNumber = "51939784580";
  const {setLoading } = useLoader();

  const menuItems = [
    { id: "oportunidades", texto: "Oportunidades para ti", url: "/dashboard/abogado" },
    { id: "recientes", texto: "Publicadas recientemente", url: "/dashboard/abogado/publicaciones-recientes" },
    { id: "invitaciones", texto: "Invitaciones", url: "/dashboard/abogado/invitaciones" },
    { id: "postulaciones", texto: "Postulaciones", url: "/dashboard/abogado/postulaciones" },
    { id: "trabajos", texto: "Trabajos", url: "/dashboard/abogado/trabajos" },
    { id: "perfil", texto: "Perfil", url: "/dashboard/abogado/perfil" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="">
      <header className="py-4  px-4 lg:px-16 flex justify-between items-center align h-auto lg:h-[72px] bg-lg-lawyer overflow-hidden gap-4 lg:gap-8 flex-wrap lg:flex-row">
        <Link href="/" className="max-w-[100px] lg:max-w-none order-1">
          <Image
            src="/assets/legalo-logo.png"
            alt="logo"
            width={160}
            height={30}
            className="max-w-[100px] md:max-w-none"
          />
        </Link>
        <div className="flex gap-8 items-center w-1/2 lg:w-auto order-2 lg:order-3 max-w-[160px] lg:max-w-none justify-end">
          <Link href={`https://wa.me/${whatsappNumber}`} passHref target="_blank">
            Ayuda
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {/* {token ? token.nombres[0] + token.apellidos[0] : ""} */}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleLogout}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <DashboardAbogadoProvider>
          <div className="px-4 py-4 lg:px-16 lg:py-8 max-w-[1920px] mx-auto">
            <div className="mt-8">
              <div className="border-b-2 border-[#808080] flex w-full overflow-auto lg:overflow-auto">
                {menuItems.map((boton) => (
                  <Link href={boton.url}>
                    <Button
                      key={boton.id}
                      variant={boton.url === pathname ? "dashActive" : "dashInActive"}
                    >
                      {boton.texto}
                    </Button>
                  </Link>
                ))}
              </div>
              {children}
            </div>
          </div>
        </DashboardAbogadoProvider>
      </main>
    </div>
  );
};

export default DashboardAbogadoLayout;
