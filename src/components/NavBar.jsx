import Image from "next/image"
import BtnPrimary from "@/components/BtnPrimary"

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
      <div>
        <BtnPrimary href="/about">Regístrate</BtnPrimary>
        <BtnPrimary href="/about">Iniciar Sesión</BtnPrimary>
      </div>
    </nav>
  )
}

export default NavBar