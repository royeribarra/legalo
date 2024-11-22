"use client";

import Header from "@/components/Header";

import React, { useState } from "react";

import Footer from "@/components/Footer";

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
            Términos y condiciones
          </h1>
          <p>Last Modified: July 19, 2021</p>

          <p className="font-bold lg:text-xl my-4">
            1. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located.
          </p>

          <p className="font-bold lg:text-xl my-4">
            2. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located.
          </p>

          <p className="font-bold lg:text-xl my-4">
            3. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located.
          </p>

          <p className="font-bold lg:text-xl my-4">
            4. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosPage;
