"use client";

import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/admin/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { SearchForm } from "@/components/admin/search-form";
import { NavUser } from "@/components/admin/nav-user";

interface LayoutProps {
  children: ReactNode;
}
interface Item {
  title: string;
  url: string;
}
interface NavItem {
  title: string;
  url: string;
  items: Item[];
}

const navData: NavItem[] = [
  {
    title: "Listas",
    url: "#",
    items: [
      {
        title: "Ofertas",
        url: "/admin/ofertas",
      },
      {
        title: "Oportunidades",
        url: "/admin/oportunidades",
      },
    ],
  },
  {
    title: "Personas",
    url: "#",
    items: [
      {
        title: "Lista de clientes",
        url: "/admin/clientes",
      },
      {
        title: "Lista de abogados",
        url: "/admin/abogados",
      },
    ],
  },
];

function AdminLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <AppSidebar navData={navData} pathname={pathname} />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 bg-lg-client">
          <SidebarTrigger className="-ml-1" />

          <div className="flex justify-start items-center w-full">
            {navData.map((item) => (
              <div key={item.title} className="flex-none">
                {item.items?.map(
                  (subItem) =>
                    subItem.url === pathname && (
                      <h1 className="font-tiempos text-xl" key={subItem.url}>
                        {subItem.title}
                      </h1>
                    )
                )}
              </div>
            ))}
            <div className="flex justify-end items-center w-full">
              <div className="flex items-center">
                <SearchForm className="lg:min-w-[300px]" />
                <NavUser
                  user={{
                    name: "Royer",
                    email: "royer@gmail.com",
                    avatar: "",
                  }}
                />
              </div>
            </div>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
