"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search as IcoSearch } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
interface LayoutProps {
  children: ReactNode;
}

const DashboardLawyerLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      router.push("/login");
    } else if (userRole === "cliente") {
      router.push("/dashboard/cliente");
    } else if (userRole !== "abogado") {
      router.push("/login");
    }
  }, [router]);
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
        <div className="flex items-center justify-center lg:justify-end gap-2 lg:gap-4 w-full lg:flex-1 order-3 lg:order-2">
          <div className="flex items-center h-10 bg-white border border-black rounded-full overflow-hidden px-4 lg:w-[380px]">
            <IcoSearch />
            <Input
              type="text"
              placeholder="Búsqueda por trabajo"
              className="bg-white border-none  focus-visible:ring-0 rounded-none text-xs lg:text-base"
            />
          </div>
          <div className="rounded-full border border-black overflow-hidden">
            <Select>
              <SelectTrigger className="w-[120px] lg:w-[160px] bg-[#EDEDED] focus-visible:ring-0 text-[#505050] text-xs lg:text-base">
                <SelectValue placeholder="Oportunidades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-8 items-center w-1/2 lg:w-auto order-2 lg:order-3 max-w-[160px] lg:max-w-none justify-end">
          <Link href="#" className="underline">
            Ayuda
          </Link>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLawyerLayout;
