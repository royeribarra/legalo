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
  const { logout, user, totalOfertasCliente, totalTrabajosCliente } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { id: "abogados", texto: "Abogados", url: "/dashboard/cliente" },
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
                  {user ? user.nombres[0] + user.apellidos[0] : ""}
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
            <div className="mt-8 bg-blue-100 p-4 rounded-lg flex justify-between items-center">
              {/* Imágenes superpuestas y texto */}
              <div className="flex items-center gap-4">
                <div className="flex">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                    <Image src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 1" width={48} height={48} />
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white -ml-4">
                    <Image src="https://randomuser.me/api/portraits/men/46.jpg" alt="User 2" width={48} height={48} />
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white -ml-4">
                    <Image src="https://randomuser.me/api/portraits/women/50.jpg" alt="User 3" width={48} height={48} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Comienza con la creación del proyecto</h3>
                  <p className="text-gray-600">Encuentra el abogado perfecto para tus necesidades</p>
                </div>
              </div>

              {/* Botón */}
              <Link href="/dashboard/cliente/nueva-oferta">
                <Button className="text-white px-6 py-2 rounded-md" variant={"default"}>
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
                      {boton.id === 'trabajos'
                        ? `${boton.texto} (${totalTrabajosCliente})`
                        : boton.id === 'proyectos'
                        ? `${boton.texto} (${totalOfertasCliente})`
                        : boton.texto
                      }
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
