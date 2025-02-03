"use client";

import React from "react";

import { useState, useEffect } from "react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
// import { Briefcase } from "lucide-react";
// import { ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
  CarouselPreviousBanner,
  CarouselNextBanner,
} from "@/components/ui/carousel";

import {
  Card,
  // CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const HomeBannerClient = () => {
  const router = useRouter();
  const [isImageOne, setIsImageOne] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIsImageOne((prev) => !prev);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const carouselItems = [
    {
      CardTitle: "Civil",
      CardDescription:
        "¿Necesitas revisar o firmar un contrato, asegurar la compra o alquiler de una propiedad o con el trámite de una herencia familiar?",
      ImageSrc: "/icos/ico-d-civil.png",
    },
    {
      CardTitle: "Penal",
      CardDescription:
        "¿Te enfrentas a un juicio penal, necesitas asesoría en una investigación policial o quieres conocer tus derechos ante una detención?",
      ImageSrc: "/icos/ico-d-penal.png",
    },
    {
      CardTitle: "Laboral",
      CardDescription:
        "¿Tienes problemas con un contrato de trabajo, fuiste despedido injustamente, necesitas asesoría en una inspección de SUNAFIL o sobre derechos laborales",
      ImageSrc: "/icos/ico-d-laboral.png",
    },
    {
      CardTitle: "Procesalista",
      CardDescription:
        "¿Quieres presentar una demanda, necesitas ayuda para defenderte en un proceso judicial, o necesitas orientación en el seguimiento de tu caso judicial?",
      ImageSrc: "/icos/ico-d-procesalista.png",
    },
    {
      CardTitle: "Administrativo",
      CardDescription:
        "¿Necesitas apoyo para gestionar trámites con entidades públicas, defenderte de una sanción o multa o resolver problemas con permisos y licencias?",
      ImageSrc: "/icos/ico-d-administrativo.png",
    },
    {
      CardTitle: "de Familia",
      CardDescription:
        "¿Estás atravesando un divorcio, buscas custodia compartida, o necesitas asesoría sobre pensiones alimenticias y acuerdos familiares?",
      ImageSrc: "/icos/ico-d-familia.png",
    },
    {
      CardTitle: "Tributario",
      CardDescription:
        "¿Necesitas ayuda con la declaración de impuestos, o defensa en fiscalización de SUNAT o en un litigio tributario?",
      ImageSrc: "/icos/ico-d-tributario.png",
    },
    {
      CardTitle: "de Migraciones",
      CardDescription:
        "¿Necesitas ayuda con trámites de residencia, permisos de trabajo, o enfrentas problemas de inmigración?",
      ImageSrc: "/icos/ico-d-migraciones.png",
    },
    {
      CardTitle: "de Poteccion al Consumidor",
      CardDescription:
        "¿Te vendieron un producto defectuoso, no cumplieron con la garantía o te han hecho cobros indebidos?",
      ImageSrc: "/icos/ico-d-consumidor.png",
    },
    {
      CardTitle: "Empresarial",
      CardDescription:
        "¿Planeas constituir una empresa, necesitas revisar contratos comerciales o estás involucrado en una fusión o disputa entre socios?",
      ImageSrc: "/icos/ico-d-empresarial.png",
    },
    {
      CardTitle: "Ambiental",
      CardDescription:
        "¿Necesitas asesoría sobre normativa ambiental, enfrentas problemas de permisos, o necesitas defensa en casos de contaminación?",
      ImageSrc: "/icos/ico-d-ambiental.png",
    },
    {
      CardTitle: "de Arbitraje y Resolución de Conflico",
      CardDescription:
        "¿Tu contrato requiere resolver un conflicto ante un árbitro o tribunal arbitral o estás considerando iniciar una mediación o demanda arbitral?",
      ImageSrc: "/icos/ico-d-arbitraje.png",
    },
    {
      CardTitle: "de la Competencia",
      CardDescription:
        "¿Te han denunciado por prácticas anticompetitivas, o buscas cumplir con las normativas de competencia y evitar sanciones?",
      ImageSrc: "/icos/ico-d-competencia2.png",
    },
    {
      CardTitle: "de Competencia Desleal",
      CardDescription:
        "¿Necesitas proteger tu marca de publicidad engañosa o tu negocio enfrenta prácticas desleales?",
      ImageSrc: "/icos/ico-d-compe-desleal.png",
    },
    {
      CardTitle: "de Compliance",
      CardDescription:
        "¿Necesitas proteger tu marca de publicidad engañosa o tu negocio enfrenta prácticas desleales?",
      ImageSrc: "/icos/ico-d-compliance.png",
    },
    {
      CardTitle: "de Propiedad Intelectual",
      CardDescription:
        "¿Quieres registrar una marca, proteger una invención o necesitas ayuda para defenderte de infracciones a tus derechos de autor?",
      ImageSrc: "/icos/ico-d-intelectual.png",
    },

    {
      CardTitle: "de Tecnología y Datos",
      CardDescription:
        "¿Necesitas asesoría para proteger datos personales, negociar contratos de software, o resolver problemas de ciberseguridad?",
      ImageSrc: "/icos/ico-d-tecnologia.png",
    },
    {
      CardTitle: "de Salud",
      CardDescription:
        "¿Enfrentas un conflicto de mala praxis médica, necesitas asesoría en seguros de salud, o buscas defender tus derechos como paciente?",
      ImageSrc: "/icos/ico-d-salud.png",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Actualiza el estado con el valor del input
  };

  const searchOferta = () => {
    if (searchQuery.trim() !== "") {
      // Navega a la ruta con el query param
      router.push(`/busqueda?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className=" 4xl:h-auto flex flex-col bg-lg-lawyer border-t border-t-black">
      <div className="flex w-full lg:min-h-[616px] max-w-[1920px] mx-auto items-center  lg:h-[66vh] flex-col-reverse lg:flex-row">
        <div className="bg-lg-lawyer lg:pl-16 p-4 2xl:p-16 h-full flex lg:w-[44%] items-center w-full">
          <div className="flex flex-col gap-8 py-4 ">
            <h1 className="text-black text-2xl lg:text-[48px] xl:text-[64px] 3xl:text-7xl font-nimbus leading-[1.2]">
              <span className="italic font-light">Conecta </span>
              con clientes que necesitan tu experiencia legal.
            </h1>
            <div className="w-full flex gap-4 relative">
              <Input
                placeholder="Ejemplo Abogado, Minería, etc."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchOferta();
                  }
                }}
                className="rounded-[30px] border border-black px-[30px] py-[12px] focus-visible:border-none h-12"
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black hover:bg-slate-800 w-[62px] lg:w-[53px] h-12"
                onClick={searchOferta}
              >
                <Search className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="underline text-lg lg:text-2xl">
              <Link href="#">Descubre cuánto puedes llegar a ganar</Link>
            </div>
          </div>
        </div>
        <div
          className={`${
            isImageOne
              ? "bg-[url('/assets/images/image-banner-lawyer.jpg')]"
              : "bg-[url('/assets/images/image-banner-lawyer2.jpg')]"
          } bg-top bg-cover bg-no-repeat w-full h-full lg:block border-l border-l-black lg:w-[56%] min-h-[140px] lg:min-h-[inherit]`}
        ></div>
        {/* <div className="hidden lg:block absolute lg:left-[30vw] xl:left-[38vw] 2xl:left-[30vw] bottom-[24vh]">
          <Image
            src="/assets/images/img-arrow-banner.png"
            alt="arrow"
            width={400}
            height={272}
          />
        </div> */}
      </div>
      <div className="bg-white border-t border-b border-black">
        <div className="max-w-[1920px] mx-auto w-[full]  overflow-hidden min-h-[118px]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="flex h-full"
          >
            <div className="w-[40vw] lg:w-[16%] flex flex-col justify-center items-center gap-2 border-r border-black relative z-10 bg-white flex-none">
              <p className="font-bold text-lg lg:text-xl">Especialidades</p>
              <div className="flex gap-4 items-center justify-center">
                <CarouselPreviousBanner className="static transform-none" />
                <div className="w-[1px] bg-black h-[40px]"></div>
                <CarouselNextBanner className="static transform-none" />
              </div>
            </div>
            <div className="w-[60vw] lg:w-[84%] flex flex-none lg:ml-[1px]">
              <CarouselContent className="flex flex-row m-0 w-[60vw] lg:w-auto">
                {carouselItems.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className=" lg:w-1/3 lg:flex-none border-r border-black min-h-[118px] flex items-center m-0 p-0"
                  >
                    <Card className="p-4 border-none flex gap-2 lg:gap-4  lg:items-center flex-col lg:flex-row">
                      <div className="flex items-center justify-center flex-none">
                        <Image
                          src={item.ImageSrc}
                          alt="icon"
                          width={60}
                          height={60}
                        />
                      </div>
                      <CardHeader className="p-0 space-y-0">
                        <CardTitle className="text-base lg:text-lg font-nimbus">
                          Derecho <i>{item.CardTitle}</i>
                        </CardTitle>
                        <CardDescription className="line-clamp-3 lg:text-sm text-xs">
                          {item.CardDescription}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomeBannerClient;
