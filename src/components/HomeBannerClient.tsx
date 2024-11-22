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
  CarouselNextBanner,
  // CarouselPrevious,
  CarouselPreviousBanner,
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
      CardDescription:
        "¿Necesitas revisar o firmar un contrato, asegurar la compra o alquiler de una propiedad o con el trámite de una herencia familiar?",
      ImageSrc: "/icos/ico-d-civil.png",
    },
    {
      CardTitle: "Abogado Penalista",
      CardDescription:
        "¿Te enfrentas a un juicio penal, necesitas asesoría en una investigación policial o quieres conocer tus derechos ante una detención?",
      ImageSrc: "/icos/ico-d-penal.png",
    },
    {
      CardTitle: "Abogado Laboral",
      CardDescription:
        "¿Tienes problemas con un contrato de trabajo, fuiste despedido injustamente, necesitas asesoría en una inspección de SUNAFIL o sobre derechos laborales",
      ImageSrc: "/icos/ico-d-laboral.png",
    },
    {
      CardTitle: "Abogado Familiar",
      CardDescription:
        "¿Listo para proteger tus contratos, gestionar propiedades, y planificar herencias sin complicaciones?",
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
    <div className=" 4xl:h-auto flex flex-col bg-lg-client">
      <div className="flex w-full lg:min-h-[616px] max-w-[1920px] mx-auto items-center border-t border-t-black lg:h-[66vh] flex-col-reverse lg:flex-row">
        <div className="bg-lg-client p-4 lg:pl-16 2xl:p-16 h-full flex lg:w-[44%] items-center w-full">
          <div className="flex flex-col gap-8 py-4 ">
            <h1 className="text-black text-2xl lg:text-[48px] xl:text-[60px] 3xl:text-7xl font-nimbus leading-[1.2]">
              <span className="italic font-light"> Simplificamos</span> la
              contratación de tu abogado, donde y cuándo lo necesites
            </h1>
            <div className="w-full  flex gap-4 relative ">
              <Input
                placeholder="Ejemplo Abogado, Minería, etc."
                className="rounded-[30px] border border-black px-[30px] py-[12px] focus-visible:border-none h-12"
              />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black hover:bg-slate-800 w-[62px] lg:w-[53px] h-12"
              >
                <Search className="h-6 w-6 text-white" />
              </Button>
            </div>
            <div className="underline text-lg lg:text-2xl">
              <Link href="#">Descubre cuanto puedes llegar a ahorrar</Link>
            </div>
          </div>
        </div>
        <div className="bg-[url('/assets/images/img-landing-clients-2.jpg')] bg-top bg-cover bg-no-repeat h-full lg:block border-l border-l-black lg:w-[56%] w-full min-h-[140px] lg:min-h-[inherit]"></div>
      </div>
      <div className="bg-white border-t border-b border-black">
        <div className="max-w-[1920px] mx-auto w-[full]  overflow-hidden min-h-[118px]">
          <Carousel
            opts={{
              align: "start",
            }}
            className="flex h-full "
          >
            <div className="w-[40vw] lg:w-[16%] flex flex-col justify-center items-center gap-2 border-r border-black relative z-10 bg-white flex-none">
              <p className="font-bold  text-lg lg:text-xl">Especialidades</p>
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
                    className="lg:w-1/3 lg:flex-none border-r border-black min-h-[118px] flex items-center m-0 p-0"
                  >
                    <Card className="p-4 border-none flex gap-2 lg:gap-4 lg:items-center flex-col lg:flex-row">
                      <div className="flex-none flex items-center justify-center">
                        <Image
                          src={item.ImageSrc}
                          alt="icon"
                          width={48}
                          height={48}
                        />
                      </div>
                      <CardHeader className="p-0 space-y-0">
                        <CardTitle className="text-base lg:text-lg  font-nimbus">
                          {item.CardTitle}
                        </CardTitle>
                        <CardDescription className="line-clamp-3 lg:text-sm text-xs text-black">
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
