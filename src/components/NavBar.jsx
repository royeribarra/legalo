import Image from "next/image"
import BtnPrimary from "@/components/BtnPrimary"
import BtnSecondary from "@/components/BtnSecondary"

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
      <div>
        <BtnPrimary href="/about">Regístrate</BtnPrimary>
      </div>
      <div className="flex gap-2">
        <BtnSecondary href="/about">Iniciar Sesión</BtnSecondary>
        <BtnPrimary href="/about">Regístrate</BtnPrimary>
      </div>
    </nav>
  )
}

export default NavBar