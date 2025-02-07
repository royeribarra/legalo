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
            Política de Privacidad
          </h1>
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
