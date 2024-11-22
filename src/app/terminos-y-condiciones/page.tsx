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
            Axiom that govern your use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform").
            <br />
            <br />
            These terms and conditions, together with any documents they
            expressly incorporate by reference (collectively, "Terms of Use"),
            govern your access to and use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform"), including any
            content, functionality, services or products available to you on or
            through the Platform. By using the Platform, you agree to be bound
            by these Terms of Use. If you do not agree to these Terms of Use you
            must not use the Platform. "You" means you individually and the
            Axiom Client that you represent (and, as applicable, your Users). If
            you are entering into the Agreement for an Axiom Client, you
            represent that you have the authority to bind that entity.
            <br />
            <br />
            Please read these Terms of Use carefully before you start to use the
            Platform. By using the Platform or by clicking to accept or agree to
            the Terms of Use when this option is made available to you, you
            accept and agree to be bound and abide by these Terms of Use and by
            our Privacy Notice and our Cookies Notice, both of which are
            incorporated herein by reference. If you do not agree to these Terms
            of Use or the Privacy Notice or Cookie Notice, you must not access
            or use the Platform.
          </p>

          <p className="font-bold lg:text-xl my-4">
            2. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform").
            <br />
            <br />
            These terms and conditions, together with any documents they
            expressly incorporate by reference (collectively, "Terms of Use"),
            govern your access to and use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform"), including any
            content, functionality, services or products available to you on or
            through the Platform. By using the Platform, you agree to be bound
            by these Terms of Use. If you do not agree to these Terms of Use you
            must not use the Platform. "You" means you individually and the
            Axiom Client that you represent (and, as applicable, your Users). If
            you are entering into the Agreement for an Axiom Client, you
            represent that you have the authority to bind that entity.
            <br />
            <br />
            Please read these Terms of Use carefully before you start to use the
            Platform. By using the Platform or by clicking to accept or agree to
            the Terms of Use when this option is made available to you, you
            accept and agree to be bound and abide by these Terms of Use and by
            our Privacy Notice and our Cookies Notice, both of which are
            incorporated herein by reference. If you do not agree to these Terms
            of Use or the Privacy Notice or Cookie Notice, you must not access
            or use the Platform.
          </p>

          <p className="font-bold lg:text-xl my-4">
            3. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform").
            <br />
            <br />
            These terms and conditions, together with any documents they
            expressly incorporate by reference (collectively, "Terms of Use"),
            govern your access to and use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform"), including any
            content, functionality, services or products available to you on or
            through the Platform. By using the Platform, you agree to be bound
            by these Terms of Use. If you do not agree to these Terms of Use you
            must not use the Platform. "You" means you individually and the
            Axiom Client that you represent (and, as applicable, your Users). If
            you are entering into the Agreement for an Axiom Client, you
            represent that you have the authority to bind that entity.
            <br />
            <br />
            Please read these Terms of Use carefully before you start to use the
            Platform. By using the Platform or by clicking to accept or agree to
            the Terms of Use when this option is made available to you, you
            accept and agree to be bound and abide by these Terms of Use and by
            our Privacy Notice and our Cookies Notice, both of which are
            incorporated herein by reference. If you do not agree to these Terms
            of Use or the Privacy Notice or Cookie Notice, you must not access
            or use the Platform.
          </p>

          <p className="font-bold lg:text-xl my-4">
            4. Acceptance of the Terms of Use
          </p>

          <p className="lg:text-xl">
            This section states that you are entering into contract terms with
            Axiom that govern your use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform").
            <br />
            <br />
            These terms and conditions, together with any documents they
            expressly incorporate by reference (collectively, "Terms of Use"),
            govern your access to and use of the Axiom Platform located
            at https://apps.axiomlaw.com (the "Platform"), including any
            content, functionality, services or products available to you on or
            through the Platform. By using the Platform, you agree to be bound
            by these Terms of Use. If you do not agree to these Terms of Use you
            must not use the Platform. "You" means you individually and the
            Axiom Client that you represent (and, as applicable, your Users). If
            you are entering into the Agreement for an Axiom Client, you
            represent that you have the authority to bind that entity.
            <br />
            <br />
            Please read these Terms of Use carefully before you start to use the
            Platform. By using the Platform or by clicking to accept or agree to
            the Terms of Use when this option is made available to you, you
            accept and agree to be bound and abide by these Terms of Use and by
            our Privacy Notice and our Cookies Notice, both of which are
            incorporated herein by reference. If you do not agree to these Terms
            of Use or the Privacy Notice or Cookie Notice, you must not access
            or use the Platform.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosPage;
