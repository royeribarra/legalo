"use client";

import Header from "@/components/Header";

import React, { useState } from "react";

import Footer from "@/components/Footer";
import Link from "next/link";

const PoliticaPrivacidad = () => {
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
          Política de Privacidad de LEGALO
          </h1>
    <p>LEGALO, operado por LEGALO S.A.C., con RUC 20611584220 y domicilio en Jirón Bartolomé de las Casas 422, Surco, valora la privacidad de sus usuarios y se compromete a proteger sus datos personales...</p>
    
    <h2>I. Definiciones</h2>
    <ul>
        <li><strong>Datos personales:</strong> Información que permite identificar a una persona de manera directa o indirecta.</li>
        <li><strong>Titular de los datos:</strong> Persona natural cuyos datos son tratados por LEGALO.</li>
        <li><strong>Tratamiento de datos:</strong> Cualquier operación sobre datos personales...</li>
        <li><strong>Responsable del Tratamiento:</strong> LEGALO, como titular de la base de datos personales.</li>
    </ul>
    
    <h2>II. Información que recopilamos</h2>
    <ul>
        <li><strong>Datos de registro:</strong> Nombre completo, apellidos, DNI, correo electrónico...</li>
        <li><strong>Datos financieros:</strong> Información bancaria o de tarjetas de pago...</li>
        <li><strong>Datos de uso:</strong> Información recopilada automáticamente...</li>
        <li><strong>Datos sensibles:</strong> LEGALO no recopila, almacena ni trata datos sensibles...</li>
    </ul>
    
    <h2>III. Veracidad de los Datos Personales</h2>
    <p>Los usuarios garantizan que los datos personales proporcionados son veraces, completos, exactos y actualizados...</p>
    
    <h2>IV. Finalidad del Tratamiento de Datos</h2>
    <ul>
        <li>Provisión de servicios.</li>
        <li>Gestiones administrativas y contractuales.</li>
        <li>Comunicaciones.</li>
        <li>Análisis y mejora.</li>
        <li>Cumplimiento normativo.</li>
    </ul>
    
    <h2>V. Base Legal para el Tratamiento</h2>
    <ul>
        <li>Consentimiento.</li>
        <li>Relación contractual.</li>
        <li>Obligaciones legales.</li>
    </ul>
    
    <h2>VI. Plazo de Conservación de Datos</h2>
    <p>Conservaremos tus datos personales mientras...</p>
    
    <h2>VII. Medidas de Seguridad</h2>
    <p>Adoptamos medidas técnicas, administrativas y organizativas adecuadas...</p>
    
    <h2>VIII. Derechos de los Titulares</h2>
    <ul>
        <li>Acceso</li>
        <li>Rectificación</li>
        <li>Cancelación</li>
        <li>Oposición</li>
        <li>Portabilidad</li>
    </ul>
    <p>Para ejercer tus derechos, contáctanos a: <a href="mailto:privacidad@legalo.pe">privacidad@legalo.pe</a></p>
    
    <h2>IX. Transferencia y Compartición de Datos</h2>
    <ul>
        <li>Abogados y usuarios registrados en LEGALO.</li>
        <li>Proveedores de servicios.</li>
        <li>Autoridades competentes.</li>
    </ul>
    
    <h2>X. Uso de Cookies y Tecnologías similares</h2>
    <p>LEGALO utiliza cookies y tecnologías similares para mejorar la experiencia del usuario...</p>
    
    <h2>XI. Actualizaciones de esta Política</h2>
    <p>LEGALO se reserva el derecho a modificar esta Política en cualquier momento...</p>
    
    <h2>XII. Contacto</h2>
    <p>Si tienes preguntas o inquietudes, contáctanos al correo: <a href="mailto:privacidad@legalo.pe">privacidad@legalo.pe</a></p>
    
    <p><strong>Fecha de última actualización:</strong> Febrero, 2025.</p>
          <Link href="https://legalo.s3.us-east-1.amazonaws.com/Legalo+-+Pol%C3%ADtica+de+Privacidad+2025.pdf" target="_blank">
            Descarga aquí.
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;
