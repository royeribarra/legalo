"use client";

import Header from "@/components/Header";

import React, { useState } from "react";

import Footer from "@/components/Footer";
import Link from "next/link";

const TerminosPage = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("lawyer");

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };
  return (
    <div>
      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      <div>
        <div className="p-8 max-w-[1300px] mx-auto">
          <h1 className="text-4xl lg:text-6xl font-nimbus my-8">
            Términos y Condiciones
          </h1>
          <h1>Términos y Condiciones de Uso de LEGALO</h1>
    <h2>Índice</h2>
    <ol>
        <li>Introducción</li>
        <li>Acuerdo</li>
        <li>Identificación del Titular</li>
        <li>Definiciones</li>
        <li>Estructura y Rol de LEGALO</li>
        <li>Proceso de Registro</li>
        <li>Proceso de Encargo y Postulación</li>
        <li>Política de Facturación y Pagos</li>
        <li>Contrato entre Clientes y Abogados</li>
        <li>Resolución de Disputas</li>
        <li>Cancelación y Reembolsos</li>
        <li>Política de Privacidad</li>
        <li>Seguridad de la Información</li>
        <li>Prohibiciones y Políticas de Conducta</li>
        <li>Comentarios del Mercado y Contenido del Usuario</li>
        <li>Terminación</li>
        <li>Canal de Atención</li>
        <li>Propiedad Intelectual</li>
        <li>Impuestos</li>
        <li>Limitaciones de Responsabilidad y Exoneraciones</li>
        <li>Legislación Aplicable y Jurisdicción Competente</li>
    </ol>

    <h2>1. Introducción</h2>
    <p>Bienvenido a LEGALO. LEGALO S.A.C. es una sociedad constituida conforme a las leyes de Perú...</p>
    
    <h2>2. Acuerdo</h2>
    <p>Al acceder, navegar o utilizar los servicios ofrecidos por LEGALO, aceptas y te comprometes a lo siguiente...</p>
    
    <h2>3. Identificación del Titular</h2>
    <ul>
        <li><strong>Titular:</strong> LEGALO S.A.C.</li>
        <li><strong>RUC:</strong> 20611584220</li>
        <li><strong>Dirección:</strong> Jirón Bartolomé de las Casas 422, Surco.</li>
        <li><strong>Datos registrales:</strong> Partida Registral N°15406391</li>
        <li><strong>Contacto:</strong> xxxx@legalo.pe</li>
        <li><strong>Página Web:</strong> <a href="https://www.legalo.pe">www.legalo.pe</a></li>
    </ul>

    <h2>4. Definiciones</h2>
    <ul>
        <li><strong>LEGALO:</strong> Se refiere a LEGALO S.A.C...</li>
        <li><strong>Plataforma:</strong> El sitio web www.legalo.pe...</li>
        <li><strong>Usuarios:</strong> Personas naturales o jurídicas que utilizan la Plataforma...</li>
        <li><strong>Clientes:</strong> Personas que buscan servicios legales...</li>
        <li><strong>Miembros:</strong> Abogados, bachilleres o estudiantes registrados...</li>
    </ul>
    
    <p><em>El contenido continúa según las secciones establecidas...</em></p>
          <Link href="https://legalo.s3.us-east-1.amazonaws.com/Legalo+-+Te%CC%81rminos+y+Condiciones+de+Uso+-+Enero+2025.pdf" target="_blank">
            Descarga aquí.
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosPage;
