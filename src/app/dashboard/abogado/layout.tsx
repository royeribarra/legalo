"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search as IcoSearch } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import { DashboardAbogadoProvider } from "@/contexts/dashboardAbogadoContext";
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
  const whatsappNumber = "51939784580";
  const { token, userRole } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("tokenRole");
    localStorage.removeItem("userRole");
    router.push("/login"); // Redirige al usuario a la página de login
  };

  useEffect(() => {
    if (token && userRole) {
      if (userRole === "cliente") {
        router.push("/dashboard/abogado");
      } else {
        setLoading(false);
      }
    }
  }, [token, userRole, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  {token ? token.nombres[0] + token.apellidos[0] : ""}
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
      <main><DashboardAbogadoProvider>{children}</DashboardAbogadoProvider></main>
    </div>
  );
};

export default DashboardAbogadoLayout;
