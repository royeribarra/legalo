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
    <div>
      <div className="lg:grid grid-cols-[5fr_6fr] w-full lg:min-h-[616px] items-center border-t border-t-black">
        <div className="bg-lg_blue-light p-8 h-full w-full flex  pt-[6%] pl-[10%] ">
          <div className="max-w-[520px] flex flex-col gap-8">
            <h1 className="text-black text-3xl lg:text-[48px] xl:text-[64px] font-tiempos leading-[1.2]">
              Únete a nuestra red de abogados y lleva tu carrera al{" "}
              <span className="italic font-light">siguiente nivel.</span>
            </h1>
            <div className="w-full max-w-[500px] flex gap-4 2xl:min-w-[560px]">
              <Input
                placeholder="Ejemplo Abogado, Minería, etc."
                className="rounded-[30px] border border-black px-[30px] py-[12px] focus:outline-none "
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black hover:bg-slate-800 w-[48px] h-[42px]"
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="underline text-2xl">
              <Link href="#">Descubre cuanto puedes llegar a ganar</Link>
            </div>
          </div>
        </div>
        <div className="bg-[url('/assets/images/img-landing-lawyers.jpg')] bg-top bg-cover bg-no-repeat w-full h-full hidden lg:block border-l border-l-black"></div>
        <div className="hidden lg:block absolute lg:left-[30vw] xl:left-[38vw] 2xl:left-[30vw] bottom-[24vh]">
          <Image
            src="/assets/images/img-arrow-banner.png"
            alt="arrow"
            width={400}
            height={272}
          />
        </div>
      </div>

      <div className="w-full border-t border-b border-black overflow-hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex h-full min-h-[116px]"
        >
          <div className="w-1/2 lg:w-1/4 flex flex-col justify-center items-center gap-2 border-r border-black relative z-10 bg-white ">
            <p className="font-bold text-xl">Especialidades</p>
            <div className="flex gap-4 items-center justify-center">
              <CarouselPreviousBanner className="static transform-none" />
              <div className="w-[1px] bg-black h-[40px]"></div>
              <CarouselNextBanner className="static transform-none" />
            </div>
          </div>
          <div className="w-1/2 lg:w-3/4 ">
            <CarouselContent className="">
              {carouselItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="max-w-[55vw] lg:max-w-[25vw] border-r border-black min-h-[116px] flex items-center"
                >
                  <div className="">
                    <Card className="p-4 border-none flex gap-4 lg:items-center flex-col lg:flex-row">
                      <div>
                        <div className="rounded-full bg-[#D9D9D9] h-12 w-12 flex items-center justify-center">
                          <Image
                            src={item.ImageSrc}
                            alt="icon"
                            width={25}
                            height={25}
                          />
                        </div>
                      </div>
                      <CardHeader className="p-0 space-y-0">
                        <CardTitle className="text-lg">
                          {item.CardTitle}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 text-sm">
                          {item.CardDescription}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
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
