"use client";

import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { SearchForm } from "@/components/admin/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavUser } from "./nav-user";

interface NavItem {
  title: string;
  url: string;
  items?: NavItem[];
}

interface Props {
  navData: NavItem[];
  pathname: string;
}

export function AppSidebar({
  navData,
  pathname,
  ...props
}: Props & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link className="my-4 ml-2" href="/admin">
          <Image
            src="/assets/legalo-logo.png"
            alt="logo"
            width={473}
            height={89}
            className="max-w-[120px] lg:max-w-[180px]"
          />
        </Link>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* Se crea un SidebarGroup colapsable para cada item padre */}
        {navData.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items?.map((subItem) => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={subItem.url === pathname}
                        >
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Royer",
            email: "royer@gmail.com",
            avatar: "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
