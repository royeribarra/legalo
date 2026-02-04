"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import Image from "next/image";

const MiPagina = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("lawyer");

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };

  // Schema JSON-LD para FAQ Page
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo funciona Legalo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En Legalo puedes publicar tu caso, recibir propuestas de abogados y contratar al profesional que mejor se adapte a tus necesidades."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo tarda en encontrar un abogado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Generalmente los abogados interesados contestan rápido tras publicar tu caso; puedes recibir propuestas en pocas horas y contratar a un abogado en menos de un día o máximo 48 horas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es seguro realizar pagos en Legalo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "¡Sí – Legalo protege tu pago hasta que recibes el servicio acordado con tu abogado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo elige Legalo a los abogados de la plataforma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Todos los abogados en LEGALO han sido verificados para asegurar que puedan ejercer, que su experiencia y especialidad sean reales y estén actualizadas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tipo de servicios legales puedo encontrar en Legalo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acceso a abogados especializados en diversas áreas, como derecho civil, penal, laboral, corporativo, y más."
        }
      }
    ]
  };

  return (
    <div>
      {/* Schema estructurado para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      
      {/* Contenido */}
      <div className="p-4 max-w-[1250px] mx-auto">
        {/* Aquí va tu contenido de FAQ */}
      </div>

      <Footer />
    </div>
  );
};

export default MiPagina;