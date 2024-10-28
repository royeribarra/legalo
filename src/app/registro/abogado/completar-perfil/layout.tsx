'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LayoutProps {
  children: ReactNode;
}

const CompleteProfileLawyerLayout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <div className="">
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
    </div>
  );
};

export default CompleteProfileLawyerLayout;
