import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import { Star } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="container px-4 py-10 lg:p-8 mx-auto flex justify-center flex-col items-center  mb-5 lg:mt-10">
        <div>
          <div className="lg:flex gap-2  border border-black rounded-full p-[2px] w-auto">
            <Button
              variant="switch"
              onClick={() => updateServiceTipe("client")}
            >
              ¿Quieres contratar?
            </Button>
            <Button
              variant="switchOutline"
              onClick={() => updateServiceTipe("lawyer")}
            >
              ¿Quieres trabajar?
            </Button>
          </div>
        </div>

        <div className="max-w-[780px] mx-auto my-8">
          <h1 className="text-black text-3xl lg:text-[64px] font-nimbus text-center leading-[1.2]">
            Accede a una comunidad de{" "}
            <span className="italic font-light">abogados de confianza</span>
          </h1>
          <p className="mx-auto my-6 text-center text-lg max-w-[580px]">
            Crea una cuenta en pocos pasos y únete a nuestra comunidad de
            abogados. Protegemos tu pago hasta que recibas el servicio.
          </p>
        </div>

        <div className="flex max-w-[1200px] gap-[20px]  overflow-hidden flex-wrap justify-center">
          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-client h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/img-register.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4">
                Regístrate gratis
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Crea una cuenta facilmente y accede a nuestra comunidad de
                abogados de confianza.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-client h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                2
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/img-create.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4">
                Publica tu caso
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Cuéntanos tu caso para recibir propuestas de abogados
                interesados en ayudarte.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-client h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                3
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/img-explore.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4">
                Explora ofertas
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Revisa las propuestas de los abogados interesados, consulta sus
                perfiles para tomar una decisión informada.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-client h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                4
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/img-contact.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4">
                Contrata a tu abogado
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Selecciona al abogado que mejor se ajuste a tus necesidades y
                contrátalo para resolver tu caso.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-client h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                5
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/img-resolv.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4">
                Resuelve tu caso legal
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Trabaja con el abogado seleccionado y recibe el apoyo que
                necesitas para tu caso.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg-client h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                6
              </div>
              <div className="w-full h-auto flex justify-center ">
                <Image
                  src="/assets/img-resolv.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle className="font-nimbus lg:text-[32px] lg:pt-4 text-center py-4">
                Recibe el servicio con tranquilidad
              </CardTitle>
              <CardDescription className="line-clamp-4 text-base text-black text-center">
                Nosotros protegemos tu pago hasta que recibas el servicio
                acordado con tu abogado.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="[background:linear-gradient(to_right,_#1E1E1E_50%,_#D5F1F0_50%)] border-t border-b border-black" id="calculo-ahorros">
        <div className="max-w-[1920px] mx-auto lg:h-[620px] 3xl:h-[740px] grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-black flex flex-col  gap-4 py-8 justify-center">
            <div className="flex  flex-col justify-center gap-8 3xl:gap-16 p-4 lg:p-16">
              <div className="grid grid-cols-[40px_auto]  gap-4 ">
                <Image
                  src="/icos/award.svg"
                  alt="ico"
                  width={36}
                  height={36}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-2xl font-nimbus mb-2 ">
                    Profesionalismo y{" "}
                    <span className="italic font-light">Experiencia</span>
                  </h3>
                  <p className="text-base">
                    Todos nuestros abogados han sido verificados y cuentan con
                    años de experiencia en su especialidad.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[40px_auto] gap-4 ">
                <Image
                  src="/icos/ico-users-w.png"
                  alt="ico"
                  width={36}
                  height={27}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-2xl font-nimbus mb-2">
                    Atención{" "}
                    <span className="italic font-light">Personalizada</span>
                  </h3>
                  <p className="text-base">
                    Recibe asesoría legal ajustada a tus necesidades
                    específicas.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_auto] gap-4 ">
                <Image
                  src="/icos/ico-lock-w.png"
                  alt="ico"
                  width={26}
                  height={34}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-2xl font-nimbus mb-2">
                    Seguridad y{" "}
                    <span className="italic font-light">Confidencialidad</span>
                  </h3>
                  <p className="text-base">
                    Aseguramos la confidencialidad de tu caso y protegemos tu
                    pago hasta que recibas el servicio.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[40px_auto]  gap-4 ">
                <Image
                  src="/icos/ico-star-w.png"
                  alt="ico"
                  width={34}
                  height={32}
                  className="mx-auto"
                />
                <div className="text-white">
                  <h3 className="text-lg lg:text-2xl font-nimbus mb-2">
                    Opiniones y{" "}
                    <span className="italic font-light">Valoraciones</span>{" "}
                  </h3>
                  <p className="text-base">
                    Lee las reseñas de otros clientes para tomar una decisión
                    informada.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-lg-client flex flex-col items-center justify-center gap-4 3xl:gap-8 p-8">
            <h3 className="text-[40px] text-center max-w-[416px] 3xl:max-w-[700px] font-nimbus 3xl:text-6xl">
              Con Legalo <span className="italic">ahorra</span> hasta
            </h3>
            <h2 className="text-6xl italic font-nimbus 3xl:text-7xl">
              S/ 2160
            </h2>
            <p className="text-base max-w-[264px] 3xl:max-w-[400px] text-center 3xl:text-xl">
              En comparación a 6 horas al día a un precio estimado de S/12 por
              día
            </p>
            <Link href="#" className="underline 3xl:text-xl">
              ¿Cómo calculamos?
            </Link>
            <Select>
              <SelectTrigger className="w-[320px] border border-black">
                <SelectValue placeholder="Seleccionar especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Especialidades</SelectLabel>
                  <SelectItem value="penalista">Abogado Penalista</SelectItem>
                  <SelectItem value="laboral">Abogado Laboral</SelectItem>
                  <SelectItem value="familia">Abogado Familiar</SelectItem>
                  <SelectItem value="empresarial">
                    Abogado Empresarial
                  </SelectItem>
                  <SelectItem value="ambiental">Abogado Ambiental</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto lg:h-[620px] 3xl:h-[780px] flex p-8 relative flex-col lg:flex-row">
        <div className="flex justify-start items-center w-full lg:w-[50%] lg:px-8">
          <Image
            src="/assets/img-home-7.jpg"
            alt="img"
            width={616}
            height={400}
            className="lg:w-[720px] 3xl:w-[800px]"
          />
        </div>
        <div className="flex justify-center items-star flex-col gap-8 w-full lg:w-[50%] lg:pr-16 mt-8 lg:mt-0">
          <h2 className="text-5xl font-nimbus 3xl:text-6xl">
            <i>Cuéntanos hoy tu caso </i> y encuentra tu abogado mañana.
          </h2>
          <p className="text-lg 3xl:text-2xl">
            Cuéntanos tu caso y accede a una{" "}
            <span className="font-montreal font-bold">comunidad</span> de
            abogados especializados listos para ayudarte. Encuentra al
            profesional ideal para tus necesidades legales y resuelve tu caso
            con confianza y rapidez.
          </p>
          <Link href={"/registro/tipo"}>
            <Button className="w-fit" >Cuéntanos tu caso</Button>
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-lg-client">
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
                      <Card className="border border-black border-solid bg-lg-client rounded-[32px] min-h-[320px] max-w-[600px]">
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

      <div className="bg-[url('/assets/img-home-8.jpeg')] bg-cover   bg-bottom">
        <div className="bg-black bg-opacity-70 px-8 py-8 lg:px-16 lg:h-[242px]">
          <div className="max-w-[1920px] mx-auto py-4 lg:pr-8 flex md:items-center items-start lg:justify-between h-full flex-col lg:flex-row gap-8 xl:gap-16">
            <div className="text-white ">
              <h3 className="text-3xl lg:text-[44px] mb-8 font-nimbus">
                Accede a una comunidad de abogados de confianza
              </h3>
              <p className="text-lg">
                Crea una cuenta en pocos pasos y accede a nuestra comunidad de
                abogados verificados. No te preocupes, nosotros protegemos tu
                pago hasta que recibas el servicio.
              </p>
            </div>
            <Link href={"/registro/tipo"}>
              <Button variant={"secondary"}>Regístrate gratis</Button>
            </Link>
          </div>
        </div>
      </div>

      <HomeFaq />
    </div>
  );
};

export default HomeMain;
