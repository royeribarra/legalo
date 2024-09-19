export const metadata = {
  title: "Legalo",
  description: "Abogados especializados",
};

import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

export default function AboutLayout({ children }) {
  return (
    <div className="h-screen">
      <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] bg-background">
        <div>
          <Image
            src="/assets/legalo-logo.png"
            alt="logo"
            width={160}
            height={30}
            className="max-w-[100px] md:max-w-none"
          />
        </div>
        <div className="flex gap-2 p-2 flex-col md:flex-row">
          <p className="text-sm">¿Buscas Trabajo?</p>
          <Link href="/registro" className="underline text-sm">
            Ir a Oportunidades
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
