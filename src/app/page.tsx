"use client";

import React from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeBannerClient from "@/components/HomeBannerClient";
import HomeMainClient from "@/components/HomeMainClient";
import { useState } from "react";
import HomeBannerLawyer from "@/components/HomeBannerLawyer";
import HomeMainLawyer from "@/components/HomeMainLawyer";

const HomePage = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("client");

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };

   // Schema JSON-LD para la página principal
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.legalo.pe/#organization",
        "name": "LEGALO",
        "url": "https://www.legalo.pe/",
        "logo": "https://www.legalo.pe/logo.png",
        "sameAs": [
          "https://www.facebook.com/legalo.pe",
          "https://www.instagram.com/legalo.pe"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+51-939-125-533",
            "contactType": "Customer Service",
            "availableLanguage": "Spanish"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.legalo.pe/#website",
        "url": "https://www.legalo.pe/",
        "name": "Legalo - Conecta abogados y clientes",
        "description": "Plataforma digital que conecta abogados con clientes de forma rápida, segura y eficiente.",
        "publisher": {
          "@id": "https://www.legalo.pe/#organization"
        }
      }
    ]
  };

  return (
    <div>
      
      {/* Schema estructurado para SEO */}
      <Script
        id="schema-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      {serviceTipe === "client" && (
        <>
          <HomeBannerClient />
          <HomeMainClient
            serviceTipe={serviceTipe}
            updateServiceTipe={updateServiceTipe}
          />
        </>
      )}

      {serviceTipe === "lawyer" && (
        <>
          <HomeBannerLawyer />
          <HomeMainLawyer
            serviceTipe={serviceTipe}
            updateServiceTipe={updateServiceTipe}
          />
        </>
      )}
      {/* <a
        href="https://wa.me/51939125533"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <img
          src={"/assets/whatsapp.png"}
          alt="WhatsApp"
          className="w-14 h-14"
        />
        <span className="text-sm font-medium text-green-700 hidden sm:inline">
          Escríbenos aquí
        </span>
      </a> */}
      <a
        href="https://wa.me/51939125533"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 flex items-center bg-[#25D366] px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <img
          src="/assets/whatsapp.png"
          alt="WhatsApp"
          className="w-10 h-10"
        />
        <span className="ml-2 text-sm font-medium text-white hidden sm:inline">
          Contáctanos
        </span>
      </a>
      <Footer />
    </div>
  );
};

export default HomePage;
