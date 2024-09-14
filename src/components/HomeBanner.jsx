import React from 'react'
import CardAbogCategory from './CardAbogCategory'
import Link from 'next/link'

const HomeBanner = () => {
  return (
    <div className="bg-banner bg-cover bg-center w-full ">
      <h1>Encuentra a los mejores abogados <span>especializados</span></h1>
      <div>
        <input type="text" placeholder="Ejemplo Abogado, Minería, etc."/>
        <button>Buscar</button>
      </div>
      <div className="flex">
        <CardAbogCategory  
          icon="" 
          title="Abogado Civil"
          description="Listo para proteger tus contratos, gestionar propiedades y planificar herencias familiares"
        />
        <CardAbogCategory  
          icon="" 
          title="Abogado Civil"
          description="Listo para proteger tus contratos, gestionar propiedades y planificar herencias familiares"
        />
        <CardAbogCategory  
          icon="" 
          title="Abogado Civil"
          description="Listo para proteger tus contratos, gestionar propiedades y planificar herencias familiares"
        />
        <CardAbogCategory  
          icon="" 
          title="Abogado Civil"
          description="Listo para proteger tus contratos, gestionar propiedades y planificar herencias familiares"
        />
        <CardAbogCategory  
          icon="" 
          title="Abogado Civil"
          description="Listo para proteger tus contratos, gestionar propiedades y planificar herencias familiares"
        />
      </div>
      <div>
        <p>¿No sabes que especialidad puede ayudarte con tu caso?</p>
        <Link href="">Aberigualo</Link>
      </div>
    </div>
  )
}

export default HomeBanner