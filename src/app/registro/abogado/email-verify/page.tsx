"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, Suspense } from "react";

const EmailVerify = () => {
  const [showStep, setShowStep] = useState(true);

  return (
    <div
      className={`h-screen flex flex-col p-4 bg-lg-lawyer`}
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
        {/* <Image
          src="/assets/images/img-client-verify.jpg"
          alt="img-wireframe"
          width={460}
          height={320}
        /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
          <g clip-path="url(#clip0_783_8603)">
          <path d="M63.8625 7.6425C62.5772 7.54761 61.2888 7.50007 60 7.5V0C61.474 0.000718707 62.9475 0.0557561 64.4175 0.165L63.8625 7.6425ZM78.8925 11.0175C76.4883 10.0898 74.0192 9.34026 71.505 8.775L73.1475 1.455C76.02 2.1 78.8475 2.955 81.5925 4.02L78.8925 11.0175ZM89.1675 16.3425C88.0952 15.6274 86.997 14.9519 85.875 14.3175L89.5725 7.7925C92.1368 9.24552 94.5909 10.8849 96.915 12.6975L92.3025 18.615C91.2857 17.8217 90.24 17.0662 89.1675 16.35V16.3425ZM102.922 29.7675C101.439 27.6598 99.802 25.6644 98.025 23.7975L103.455 18.6225C105.48 20.76 107.355 23.0475 109.058 25.4475L102.922 29.7675ZM108.502 39.9075C108.01 38.7184 107.475 37.5477 106.898 36.3975L113.595 33.0225C114.919 35.6556 116.048 38.3831 116.97 41.1825L109.845 43.53C109.442 42.3065 108.994 41.0982 108.502 39.9075ZM112.477 58.71C112.417 56.1325 112.166 53.5631 111.728 51.0225L119.115 49.7475C119.618 52.6425 119.91 55.5825 119.985 58.5225L112.485 58.71H112.477ZM111.495 70.245C111.743 68.97 111.945 67.7025 112.102 66.42L119.55 67.3425C119.19 70.2687 118.613 73.1641 117.825 76.005L110.595 74.0025C110.94 72.765 111.24 71.5125 111.495 70.245ZM104.355 88.0875C105.735 85.9125 106.95 83.6325 108 81.2775L114.855 84.315C113.655 87.015 112.267 89.61 110.692 92.1L104.355 88.0875ZM97.125 97.125C98.04 96.21 98.9175 95.265 99.75 94.29L105.435 99.1875C104.472 100.304 103.469 101.384 102.427 102.428L97.125 97.125Z" fill="black"/>
          <path d="M60 7.5C51.3666 7.50062 42.8666 9.63035 35.2528 13.7005C27.6391 17.7707 21.1466 23.6558 16.3504 30.8344C11.5543 38.013 8.60245 46.2636 7.75645 54.8555C6.91045 63.4473 8.19637 72.1152 11.5003 80.0914C14.8043 88.0676 20.0243 95.1059 26.6979 100.583C33.3716 106.06 41.293 109.807 49.7605 111.491C58.228 113.175 66.9802 112.746 75.2419 110.24C83.5037 107.734 91.02 103.229 97.125 97.125L102.427 102.427C95.4505 109.408 86.8594 114.56 77.4153 117.427C67.9712 120.294 57.9658 120.788 48.2855 118.864C38.6052 116.939 29.5489 112.657 21.9191 106.397C14.2893 100.136 8.32151 92.09 4.5445 82.9717C0.767493 73.8533 -0.702112 63.9441 0.265897 54.122C1.23391 44.2999 4.60964 34.8683 10.094 26.6626C15.5784 18.457 23.002 11.7308 31.7072 7.08002C40.4124 2.42921 50.1303 -0.00261549 60 2.11094e-06V7.5Z" fill="black"/>
          <path d="M56.25 22.5C57.2446 22.5 58.1984 22.8951 58.9016 23.5984C59.6049 24.3016 60 25.2554 60 26.25V65.325L84.36 79.245C85.1984 79.7508 85.8058 80.5645 86.0522 81.5122C86.2987 82.4598 86.1647 83.4663 85.6789 84.3165C85.193 85.1667 84.394 85.7931 83.4524 86.0619C82.5108 86.3307 81.5014 86.2206 80.64 85.755L54.39 70.755C53.816 70.4271 53.3389 69.9534 53.007 69.3818C52.6751 68.8102 52.5002 68.161 52.5 67.5V26.25C52.5 25.2554 52.8951 24.3016 53.5984 23.5984C54.3016 22.8951 55.2554 22.5 56.25 22.5Z" fill="black"/>
          </g>
          <defs>
          <clipPath id="clip0_783_8603">
          <rect width="120" height="120" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        <h2 className="text-4xl text-center font-nimbus font-light">
          Cuenta en verificación
        </h2>
        <p className="text-center">
          Pronto serás parte del equipo de Legalo.
        </p>
        <div className="text-center border border-gray-300 rounded-lg p-4 shadow-md">
          <h4 className="text-2xl md:text-3xl font-nimbus font-light">
            Estamos validando tu información
          </h4>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            En un máximo de 48 horas recibirás un correo de confirmación.
          </p>
        </div>
        <Button
          onClick={() => {
            setShowStep(false);
          }}
          className="mt-4 rounded-[10px] h-12 px-6 text-base"
        >
          Enviar de nuevo
        </Button>
      </div>
    </div>
  );
};

const WrappedEmailVerify = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <EmailVerify />
    </Suspense>
  );
};

export default WrappedEmailVerify;
