import React from "react";
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

const HomeBannerClient = () => {
  const carouselItems = [
    {
      CardTitle: "Abogado Civil",
      CardDescription: "Remoto, Lima, Arequipa, Callao, Trujillo.",
      ImageSrc: "/icos/ico-d-civil.png",
    },
    {
      CardTitle: "Abogado Penalista",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-penal.png",
    },
    {
      CardTitle: "Abogado Laboral",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-laboral.png",
    },
    {
      CardTitle: "Abogado Familiar",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-familia.png",
    },
    {
      CardTitle: "Abogado Empresarial",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-empresarial.png",
    },
    {
      CardTitle: "Abogado Ambiental",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-ambiental.png",
    },
    {
      CardTitle: "Abogado de competencia",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-competencia.png",
    },
    {
      CardTitle: "Abogado de competencia desleal",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-compe-desleal.png",
    },
    {
      CardTitle: "Abogado de propiedad intelectual",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-intelectual.png",
    },
    {
      CardTitle: "Abogado de proteccion al consumidor",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-consumidor.png",
    },
    {
      CardTitle: "Abogado de tecnología y datos",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-tecnologia.png",
    },
    {
      CardTitle: "Abogado de Salud",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-salud.png",
    },
    {
      CardTitle: "Abogado de derecho tributario",
      CardDescription: "Remoto, Cusco, Ica, Piura.",
      ImageSrc: "/icos/ico-d-tributario.png",
    },
  ];

  return (
    <div className="lg:h-[calc(100vh-180px)] flex flex-col">
      <div className="flex w-full lg:min-h-[616px] items-center border-t border-t-black lg:flex-1 flex-col-reverse lg:flex-row">
        <div className="bg-lg_blue-light p-4 2xl:p-16 h-full flex lg:w-[44vw] items-center w-full">
          <div className="flex flex-col gap-8 py-4">
            <h1 className="text-black text-2xl lg:text-[48px] xl:text-[64px] 3xl:text-7xl font-tiempos leading-[1.2]">
              Únete a nuestra red de abogados y lleva tu carrera al{" "}
              <span className="italic font-light">siguiente nivel.</span>
            </h1>
            <div className="w-full flex gap-4 relative">
              <Input
                placeholder="Ejemplo Abogado, Minería, etc."
                className="rounded-[30px] border border-black px-[30px] py-[12px] focus:outline-none h-12"
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black hover:bg-slate-800 w-[62px] lg:w-[53px] h-12"
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="underline text-lg lg:text-2xl">
              <Link href="#">Descubre cuanto puedes llegar a ganar</Link>
            </div>
          </div>
        </div>
        <div className="bg-[url('/assets/images/img-landing-lawyers.jpg')] bg-top bg-cover bg-no-repeat w-full h-full lg:block border-l border-l-black lg:w-[56vw] min-h-[140px] "></div>
        <div className="hidden lg:block absolute lg:left-[30vw] xl:left-[38vw] 2xl:left-[30vw] bottom-[24vh]">
          <Image
            src="/assets/images/img-arrow-banner.png"
            alt="arrow"
            width={400}
            height={272}
          />
        </div>
      </div>

      <div className="w-[full] border-t border-b border-black overflow-hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex h-full min-h-[116px]"
        >
          <div className="w-[40vw] lg:w-[16vw] flex flex-col justify-center items-center gap-2 border-r border-black relative z-10 bg-white flex-none">
            <p className="font-bold text-lg lg:text-xl">Especialidades</p>
            <div className="flex gap-4 items-center justify-center">
              <CarouselPreviousBanner className="static transform-none" />
              <div className="w-[1px] bg-black h-[40px]"></div>
              <CarouselNextBanner className="static transform-none" />
            </div>
          </div>
          <div className="w-[60vw] lg:w-[84vw] flex flex-none lg:ml-[-5px]">
            <CarouselContent className="flex flex-row m-0 w-[60vw] lg:w-auto">
              {carouselItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className=" lg:w-[28vw] lg:flex-none border-r border-black min-h-[116px] flex items-center m-0 p-0"
                >
                  <Card className="p-4 border-none flex gap-2 lg:gap-4  lg:items-center flex-col lg:flex-row">
                    <div className="rounded-full bg-[#D9D9D9] h-12 w-12 flex items-center justify-center flex-none">
                      <Image
                        src={item.ImageSrc}
                        alt="icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <CardHeader className="p-0 space-y-0">
                      <CardTitle className="text-base lg:text-lg mb-2">
                        {item.CardTitle}
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
  );
};

export default HomeBannerClient;
