"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const EmailVerify = () => {

  return (
    <div
      className={` h-screen flex flex-col p-4 bg-lg-client}`}
    >
      <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] min-h-[60px]">
        <Link href="/">
          <Image
            src="/assets/legalo-logo.png"
            alt="logo"
            width={160}
            height={30}
            className="max-w-[100px] md:max-w-none"
          />
        </Link>
      </header>
      <div className="flex mt-[3%] flex-col items-center gap-5 flex-auto pb-20">
        <Image
          src="/assets/images/img-client-verify.webp"
          alt="img-wireframe"
          width={460}
          height={320}
        />
        <h2 className="text-4xl text-center font-nimbus font-light">
          Por favor, verifica tu email
        </h2>
        <p className="text-center">
          No olvides revisar tu carpeta de correo no deseado y otras bandejas
        </p>
        <Link href={"/"}>
          <Button
            className="mt-4 rounded-[10px] h-12 px-6 text-base"
          >
            Ir al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmailVerify;
