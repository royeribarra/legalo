import Image from "next/image";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] bg-background">
      <div>
        <Image
          src="/assets/legalo-logo.png"
          alt="logo"
          width={160}
          height={30}
          className="max-w-[100px] md:max-w-none"
        />
      </div>
      <div className="lg:flex gap-2 hidden ">
        <Button>¿Quieres contratar?</Button>
        <Button variant="outline">¿Quieres trabajar?</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Iniciar Sesión
        </Button>
        <Button size="sm">Regístrate</Button>
      </div>
    </nav>
  );
};

export default NavBar;
