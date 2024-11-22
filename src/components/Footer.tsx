import Image from "next/image";
import Link from "next/link";
// import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]">
      <div className="max-w-[1920px] mx-auto flex flex-col justify-center overflow-hidden lg:pb-10 p-4 lg:px-16">
        <div className="w-full  flex flex-col lg:flex-row items-start lg:justify-between lg:items-center border-b border-white mx-auto lg:h-[180px] gap-4">
          <Image
            src="/assets/legalo-logo-white.webp"
            alt="img"
            width={160}
            height={30}
            className="my-8"
          />
          <div className="text-white flex gap-8 flex-col lg:flex-row ">
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/ayuda">Ayuda Online</Link>
          </div>

          <div className="flex space-x-4 my-4 ">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icos/icon_facebook.webp"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icos/icon_instagram.webp"
                alt="X"
                className="w-6 h-6"
              />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="/icos/icon_x.webp" alt="X" className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/icos/icon_linkedin.webp"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>

        <div className="w-full   flex flex-col-reverse lg:flex-wrap gap-8 justify-center text-white my-8 lg:flex-row ">
          <p>© 2024 Legalo. Todos los derechos reservados</p>
          <Link href="#" className="underline">
            Política de privacidad
          </Link>
          <Link href="/terminos-y-condiciones" className="underline">
            Términos y Condiciones
          </Link>
          <Link href="#" className="underline">
            Libro de Reclamaciones
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
