"use client";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import Image from "next/image";
import Link from "next/link";
import { DashboardClienteProvider } from "@/contexts/dashboardClienteContext";
import { useLoader } from "@/contexts/loaderContext";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

const DashboardClientLayout = ({ children }: LayoutProps) => {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
};

const LayoutContent = ({ children }: { children: ReactNode }) => {
  const whatsappNumber = "51939784580";
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const {setLoading} = useLoader();

  // useEffect(() => {
  //   if (token && userRole !== "cliente") {
  //     router.push(userRole === "abogado" ? "/dashboard/abogado" : "/login");
  //   } else {
  //     setLoading(false);
  //   }
  // }, [token, userRole, router]);

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { id: "abogados", texto: "Abogados", url: "/dashboard/cliente/" },
    { id: "proyectos", texto: "Encargos", url: "/dashboard/cliente/encargos" },
    { id: "trabajos", texto: "Trabajos", url: "/dashboard/cliente/trabajos" },
  ];

  return (
    <div className="">
      <header className="py-4 px-4 lg:px-16 flex justify-between items-center align h-auto lg:h-[72px] bg-lg-client overflow-hidden gap-4 lg:gap-8 flex-wrap lg:flex-row">
        <Link href="/dashboard/cliente" className="max-w-[100px] lg:max-w-none order-1">
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
        <DashboardClienteProvider>
          <div className="px-4 py-4 lg:px-16 lg:py-8 max-w-[1920px] mx-auto">
            <div className="mt-8">
              <Link href={"/dashboard/cliente/nueva-oferta"}>
                <Button>
                  Crear Proyecto
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <div className="border-b-2 border-[#808080] flex w-full overflow-auto lg:overflow-auto">
                {menuItems.map((boton, index) => (
                  <Link href={boton.url} key={index}>
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
        </DashboardClienteProvider>
      </main>
    </div>
  );
};

export default DashboardClientLayout;
