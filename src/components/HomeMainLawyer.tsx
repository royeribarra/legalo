"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import { Star } from "lucide-react";

import { useState } from "react";
import * as Popover from '@radix-ui/react-popover';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SliderY } from "@/components/ui/slider";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  CarouselNextReviews,
  // CarouselPrevious,
  CarouselPreviousReviews,
} from "@/components/ui/carousel";

import HomeFaq from "./HomeFaq";

type HomeMainProps = {
  serviceTipe: string;
  updateServiceTipe: (newType: string) => void;
};

const HomeMain: React.FC<HomeMainProps> = ({
  // serviceTipe,
  updateServiceTipe,
}) => {
  const [totalPaid, setTotalPaid] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);

  const handlePaidChange = () => {
    setTotalPaid(!totalPaid);
  };

  const getPrice = (value: any, isTotalPaid: any) => {
    if (isTotalPaid) {
      if (value === 0) return "S/1,300";
      if (value === 50) return "S/2,000";
      if (value === 100) return "S/10,000";
    } else {
      if (value === 0) return "S/100";
      if (value === 50) return "S/300";
      if (value === 100) return "S/500";
    }
    return "";
  };

  const reviewsItems = [
    {
      name: "Luisa Sanchez",
      description:
        "Tuve una gran experiencia con Legalo. Necesitaba asesoramiento legal rápido para un problema laboral y encontré un abogado especializado en minutos. Fue profesional, atento y resolvió mi caso de manera eficiente. La plataforma es fácil de usar, segura y transparente.",
      ImageSrc: "/assets/img-user1.png",
    },
    {
      name: "Juan Guerra",
      description:
        "Tuve una gran experiencia con Legalo. Necesitaba asesoramiento legal rápido para un problema laboral y encontré un abogado especializado en minutos. Fue profesional, atento y resolvió mi caso de manera eficiente. La plataforma es fácil de usar, segura y transparente.",
      ImageSrc: "/assets/img-user2.png",
    },
    {
      name: "Pablo Rodriguez",
      description:
        "Tuve una gran experiencia con Legalo. Necesitaba asesoramiento legal rápido para un problema laboral y encontré un abogado especializado en minutos. Fue profesional, atento y resolvió mi caso de manera eficiente. La plataforma es fácil de usar, segura y transparente.",
      ImageSrc: "/assets/img-user3.png",
    },
    {
      name: "Luisa Sanchez",
      description:
        "Tuve una gran experiencia con Legalo. Necesitaba asesoramiento legal rápido para un problema laboral y encontré un abogado especializado en minutos. Fue profesional, atento y resolvió mi caso de manera eficiente. La plataforma es fácil de usar, segura y transparente.",
      ImageSrc: "/assets/img-user1.png",
    },
  ];
  return (
    <div className="overflow-hidden">
      <div className="container p-4 lg:p-8 mx-auto flex justify-center flex-col items-center  mb-5 lg:mt-10">
        <div>
          <div className="lg:flex gap-2  border border-black rounded-full p-[2px] w-auto">
            <Button
              variant="switchOutline"
              onClick={() => updateServiceTipe("client")}
            >
              ¿Quieres contratar?
            </Button>
            <Button
              variant="switch"
              onClick={() => updateServiceTipe("lawyer")}
            >
              ¿Quieres trabajar?
            </Button>
          </div>
        </div>

        <div className="max-w-[680px] mx-auto my-8">
          <h1 className="text-black text-3xl lg:text-[64px] font-nimbus text-center leading-[1.2]">
            Sé parte de nuestra comunidad de abogados de{" "}
            <span className="italic font-light"> confianza</span>
          </h1>
          <p className="mx-auto my-6 text-center text-lg max-w-[580px]">
            Crea una cuenta en pocos pasos y accede a casos legales que se
            ajustan a tu experiencia y áreas de interés. Protegemos tu pago.
          </p>
        </div>

        <div className="flex max-w-[1200px] gap-[20px] overflow-hidden flex-wrap justify-center">
          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/images/pasos-publicacion/abogado/paso-1.png"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4 font-light">
                Regístrate gratis
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Crea tu cuenta, completa tu perfil profesional y accede a
                oportunidades legales.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                2
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/images/pasos-publicacion/abogado/paso-2.png"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4 font-light">
                Explora oportunidades
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Utiliza los filtros para encontrar casos legales adaptados a tu
                experiencia e intereses.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                3
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/images/pasos-publicacion/abogado/paso-3.png"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4 font-light">
                Postula a proyectos
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Aplica a casos publicados o cotiza tus servicios según tu
                disponibilidad y experiencia.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                4
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/images/pasos-publicacion/abogado/paso-4.png"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4 font-light">
                Confirma tu contrato
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Si eres seleccionado, acepta el contrato y comienza a trabajar
                con el cliente.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                5
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/images/pasos-publicacion/abogado/paso-5.png"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4 font-light">
                Completa el encargo
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Cumple con los pasos acordados, comunica avances y resuelve las
                dudas del cliente.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                6
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/images/pasos-publicacion/abogado/paso-6.png"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4 font-light">
                Recibe tu pago
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Obtén pagos seguros, parciales o finales, tras la aprobación del
                cliente.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="border border-y-black border-x-0">
        <div className="max-w-[1920px] mx-auto  grid grid-cols-1 lg:grid-cols-[4fr_6fr]">
          <div className="bg-black flex flex-col justify-center gap-4 py-8 items-center">
            <div className="flex  flex-col justify-center gap-8 3xl:gap-16 p-4 max-w-[380px]">
              <div className="grid grid-cols-[40px_auto]  gap-6 ">
                <Image
                  src="/icos/award.svg"
                  alt="ico"
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-[28px] font-nimbus mb-2 font-light">
                    Oportunidades <span className="italic font-light">Exclusivas</span>
                  </h3>
                  <p className="text-base">
                    Accede a encargos legales publicados, alineados con tu
                    experiencia y áreas de especialización.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_auto] gap-6 ">
                <Image
                  src="/icos/ico-lock-w.png"
                  alt="ico"
                  width={30}
                  height={40}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-[28px] font-nimbus mb-2">
                    Pagos seguros y <span className="italic font-light">protegidos</span>
                  </h3>
                  <p className="text-base">
                    Tu pago está garantizado y se libera de forma puntual una
                    vez que completes el encargo.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_auto]  gap-6 ">
                <Image
                  src="/icos/ico-like-w.png"
                  alt="ico"
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-[28px] font-nimbus mb-2">
                    Flexibilidad <span className="italic font-light">profesional</span>
                  </h3>
                  <p className="text-base">
                    Selecciona los casos que más te interesen y trabaja bajo tus
                    propios términos y disponibilidad.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_auto]  gap-6 ">
                <Image
                  src="/icos/ico-star-w.png"
                  alt="ico"
                  width={40}
                  height={40}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-[28px] font-nimbus mb-2">
                    Crecimiento <span className="italic font-light">profesional</span>
                  </h3>
                  <p className="text-base">
                    Amplía tu red de contactos y accede a encargos que impulsan
                    tu experiencia y habilidades legales.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 3xl:gap-8 p-8 lg:py-20">
            <h3 className="text-[40px] text-center max-w-[416px] font-nimbus 3xl:max-w-[700px] 3xl:text-6xl">
              Calcula tus ganancias potenciales
            </h3>
            <p className="text-lg text-center">
              Encuentra la referencia perfecta para tus servicios
            </p>

            <div className="w-full max-w-[620px] px-4 py-8 border border-x-0 border-y-black">
              <p className="mb-8">Complejidad del proyecto:</p>
              <SliderY
                defaultValue={sliderValue}
                onValueChange={(value) => setSliderValue(value)}
                step={50}
                min={0}
                max={100}
                className="cursor-pointer bg-yellow-200"
              />
              <div className="flex justify-between mt-4">
                <span>Baja</span>
                <span>Media</span>
                <span>Alta</span>
              </div>
            </div>
            <div className="w-full max-w-[620px] px-4 pt-2 pb-8 border border-x-0 border-t-0 border-b-black">
              <p className="mb-8">Modalidad de cobro:</p>

              {totalPaid === false ? (
                <div className="w-full rounded-full flex border border-black bg-white p-[1px]">
                  <Button
                    variant={"link"}
                    className="w-1/2 border-none hover-none"
                    onClick={handlePaidChange}
                  >
                    Costo Total
                  </Button>
                  <Button className="w-1/2 rounded-full">Por Hora</Button>
                </div>
              ) : (
                <div className="w-full rounded-full flex border border-black bg-white p-[1px]">
                  <Button className="w-1/2 rounded-full">Costo Total</Button>
                  <Button
                    variant={"link"}
                    className="w-1/2 border-none hover-none"
                    onClick={handlePaidChange}
                  >
                    Por Hora
                  </Button>
                </div>
              )}
            </div>
            <p className="text-lg text-center font-bold">
              Podrías ganar desde:
            </p>
            <h2 className="text-6xl font-bold 3xl:text-7xl mb-4">
              {getPrice(sliderValue[0], totalPaid)}
            </h2>
            <Popover.Root>
              <Popover.Trigger asChild>
                <Button variant={"link"} className="underline 3xl:text-xl text-[#666666]">
                  ¿Cómo calculamos?
                </Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="bg-white text-sm text-gray-700 p-4 rounded-lg shadow-lg w-96"
                  side="top" // Puedes ajustar la posición
                  align="center"
                >
                  Las tarifas promedio presentadas se basan en una encuesta anónima realizada a abogados del Perú y están diseñadas para brindarte una referencia sobre los ingresos potenciales en el mercado legal. Los ingresos reales pueden variar según las particularidades de cada caso, tu experiencia profesional y tus clientes. Según esta encuesta, los factores que podrían incrementar las tarifas son: Urgencia del caso, especialización requerida y volumen de trabajo estimado.
                  <Popover.Arrow className="fill-white" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </div>
      <div className="bg-[url('/assets/img-home-9.jpeg')] bg-cover  bg-center">
        <div className="bg-black bg-opacity-70 px-8 py-8 lg:py-0 lg:px-16 lg:h-[242px]">
          <div className="max-w-[1920px] mx-auto py-4 lg:pr-8 flex md:items-center items-start lg:justify-between h-full flex-col lg:flex-row gap-8 xl:gap-16">
            <div className="text-white">
              <h3 className="text-3xl lg:text-[40px] mb-8 font-nimbus font-light">
                Descubre oportunidades legales
                <span className="italic font-light"> a tu medida.</span>
              </h3>
              <p className="text-lg">
                Crea una cuenta en pocos pasos y accede a nuestra comunidad de
                abogados
              </p>
            </div>
            <Link href={"/registro/tipo"}>
              <Button variant={"secondary"}>Regístrate gratis</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-lg-lawyer">
        <div className="max-w-[1920px] mx-auto lg:min-h-[640px] flex items-center ">
          <div className="container p-4 lg:pl-16  4xl:pr-8 pr-0">
            <div className="mb-5 lg:mb-14 lg:mt-20 flex overflow-x-auto">
              <ToggleGroup
                type="single"
                variant="chips"
                className="gap-2"
                defaultValue="a"
              >
                <ToggleGroupItem value="a">Todos</ToggleGroupItem>
                <ToggleGroupItem value="b">Ambiental</ToggleGroupItem>
                <ToggleGroupItem value="c">Civil</ToggleGroupItem>
                <ToggleGroupItem value="d">Corportaivo</ToggleGroupItem>
                <ToggleGroupItem value="e">Internacional</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full lg:w-[90vw] 4xl:w-[100%] mb-8 overflow-child-visible"
            >
              <CarouselContent className="">
                {reviewsItems.map((item, index) => (
                  <CarouselItem key={index} className="max-w-[600px]">
                    <div>
                      <Card className="border border-black border-solid bg-lg-lawyer  rounded-[32px] min-h-[320px] max-w-[600px]">
                        <CardHeader>
                          <Image
                            src="/icos/ico-stars-solid.png"
                            alt="img"
                            width={120}
                            height={19}
                            className=""
                          />
                        </CardHeader>
                        <CardContent className="flex">
                          <CardDescription className="line-clamp-5 text-black text-[18px]">
                            {item.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="flex gap-4">
                          <Image
                            src={item.ImageSrc}
                            alt="img"
                            width={56}
                            height={56}
                            className=""
                          />
                          <div>
                            <p className="text-[20px]font-medium italic">
                              {item.name}
                            </p>
                            <p className="text-base">Position, Company name</p>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end mt-14 gap-4 mb-14 mr-4 lg:mr-0">
                <CarouselPreviousReviews />
                <CarouselNextReviews />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
      <HomeFaq />
    </div>
  );
};

export default HomeMain;
