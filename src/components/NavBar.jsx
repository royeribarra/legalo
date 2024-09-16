import Image from "next/image"
import { Button } from "@/components/ui/button"

const NavBar = () => {
  return (
    <nav className="container mx-auto px-4 md:px-8 flex justify-between items-center align h-[72px] bg-background">
      <div>
        <Image 
          src="/assets/legalo-logo.png" 
          alt="logo" 
          width={160} 
          height={30}
        />
      </div>
      <div className="md:flex gap-2 hidden ">
        <Button>¿Quieres contratar?</Button>
        <Button variant="outline">¿Quieres trabajar?</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Iniciar Sesión</Button>
        <Button>Regístrate</Button>
      </div>
    </nav>
  )
}

export default NavBar