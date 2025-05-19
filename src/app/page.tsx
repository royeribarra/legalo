"use client";

import React from "react";
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

  return (
    <div>
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
      <a
        href="https://wa.me/51945072517"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <img
          src={"/assets/whatsapp.png"}
          alt="WhatsApp"
          className="w-14 h-14"
        />
      </a>
      <Footer />
    </div>
  );
};

export default HomePage;
