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
  CarouselNext,
  CarouselNextReviews,
  CarouselPrevious,
  CarouselPreviousReviews,
} from "@/components/ui/carousel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type HomeMainProps = {
  serviceTipe: string;
  updateServiceTipe: (newType: string) => void;
};

const HomeMain: React.FC<HomeMainProps> = ({
  serviceTipe,
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
      <div className="container p-4 lg:p-8 mx-auto flex justify-center flex-col items-center  mb-5 ">
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

        <div className="max-w-[640px] mx-auto my-8">
          <h1 className="text-black text-3xl lg:text-6xl  font-tiempos text-center">
            Accede a una amplia red de{" "}
            <span className="italic font-light">abogados</span>
          </h1>
          <p className="my-6">
            Crea una cuenta en pocos pasos y accede a nuestra amplia red de
            abogados.
          </p>
        </div>

        <div className="flex max-w-[1200px] gap-[20px] lg:gap-[70px] overflow-hidden flex-wrap justify-center">
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image
                  src="/assets/img-register.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className="line-clamp-3">
                Crea una cuenta en pocos pasos y accede a nuestra amplia red de
                abogados.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                2
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image
                  src="/assets/img-create.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className="line-clamp-3">
                Crea una cuenta en pocos pasos y accede a nuestra amplia red de
                abogados.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                3
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image
                  src="/assets/img-explore.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className="line-clamp-3">
                Crea una cuenta en pocos pasos y accede a nuestra amplia red de
                abogados.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                4
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image
                  src="/assets/img-contact.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className="line-clamp-3">
                Crea una cuenta en pocos pasos y accede a nuestra amplia red de
                abogados.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                5
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image
                  src="/assets/img-resolv.webp"
                  alt="Regístrate"
                  width={107}
                  height={107}
                  className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className="line-clamp-3">
                Crea una cuenta en pocos pasos y accede a nuestra amplia red de
                abogados.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="lg:h-[584px] grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#1E1E1E] flex flex-col items-start gap-4 py-8 justify-center">
          <div className="lg:max-w-[560px] flex mx-auto flex-col justify-center gap-8">
            <div className="grid grid-cols-[40px_auto]  gap-4 ">
              <Image
                src="/icos/award.svg"
                alt="ico"
                width={36}
                height={36}
                className="mx-auto"
              />
              <div className="text-white">
                <h3 className="text-lg lg:text-xl font-tiempos mb-2">
                  Profesionalismo y{" "}
                  <span className="italic font-light">Experiencia</span>
                </h3>
                <p className="text-sm">
                  Todos nuestros abogados están certificados y cuentan con años
                  de experiencia en sus respectivas áreas.
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
                <h3 className="text-lg lg:text-xl font-tiempos mb-2">
                  Opiniones y{" "}
                  <span className="italic font-light">Valoraciones</span>{" "}
                  Valoraciones
                </h3>
                <p className="text-sm">
                  Lee las reseñas de otros clientes para tomar una decisión
                  informada.
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
                <h3 className="text-lg lg:text-xl font-tiempos mb-2">
                  Atención{" "}
                  <span className="italic font-light">Personalizada</span>
                </h3>
                <p className="text-sm">
                  Recibe asesoría legal adaptada a tus necesidades específicas.
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
                <h3 className="text-lg lg:text-xl font-tiempos mb-2">
                  Seguridad y{" "}
                  <span className="italic font-light">Confidencialidad</span>
                </h3>
                <p className="text-sm">
                  Garantizamos la protección de tu información y la
                  confidencialidad de tu caso.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-lg_yellow flex flex-col items-center justify-center gap-4 p-8">
          <h3 className="text-[40px] text-center max-w-[416px] font-tiempos">
            Con Legalo <span className="italic">ahorra</span> hasta
          </h3>
          <h2 className="text-6xl italic font-tiempos">S/ 2160</h2>
          <p className="text-base max-w-[264px] text-center">
            En comparación a 6 horas al día a un precio estimado de S/12 por día
          </p>
          <Link href="#" className="underline">
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
                <SelectItem value="empresarial">Abogado Empresarial</SelectItem>
                <SelectItem value="ambiental">Abogado Ambiental</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="lg:h-[620px] grid grid-cols-1 lg:grid-cols-2 p-8 relative">
        <div className="flex justify-center items-center p-10">
          <Image
            src="/assets/img-legalo3.webp"
            alt="img"
            width={616}
            height={400}
            className="max-w-[616px]"
          />
        </div>
        <div className="flex justify-center items-star flex-col gap-8 lg:max-w-[620px]">
          <h2 className="text-4xl font-tiempos">
            Publica <span className="italic">hoy</span>, encuentra tu abogado
            mañana.
          </h2>
          <p>
            Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte. Encuentra al profesional ideal
            para tus necesidades legales y resuelve tu situación con confianza y
            rapidez.{" "}
          </p>
          <Button className="w-fit">Publicar proyecto</Button>
        </div>
        <div className="hidden xl:block absolute xl:left-[38vw] 2xl:left-[40vw] bottom-[5vh] transform rotate-[-36deg]">
          <Image
            src="/assets/images/img-arrow-banner.png"
            alt="arrow"
            width={400}
            height={272}
            className="transform scale-x-[-1]"
          />
        </div>
      </div>
      {/* Reviews */}
      <div className="bg-lg_yellow lg:h-[640px] flex items-center py-8">
        <div className="container mx-auto p-4 lg:p-8 pr-0">
          <div className="mb-8 flex overflow-x-auto">
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
            className="w-full mb-8 overflow-child-visible"
          >
            <CarouselContent className="">
              {reviewsItems.map((item, index) => (
                <CarouselItem key={index} className="max-w-[600px]">
                  <div>
                    <Card className="border border-black border-solid bg-lg_yellow rounded-[32px] min-h-[320px] max-w-[600px]">
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
            <div className="flex justify-end mt-12 gap-4">
              <CarouselPreviousReviews />
              <CarouselNextReviews />
            </div>
          </Carousel>
        </div>
      </div>

      <div className="bg-[url('/assets/img-legalo4.webp')] bg-cover lg:h-[242px] py-8">
        <div className="container p-4 lg:p-8 mx-auto flex md:items-center items-start lg:justify-between h-full flex-col lg:flex-row">
          <div className="text-white mb-8">
            <h3 className="text-3xl lg:text-[40px] mb-8 font-tiempos">
              Descubre oportunidades legales{" "}
              <span className="italic font-light"> a tu medida.</span>
            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <Button>Regístrate gratis</Button>
        </div>
      </div>

      <div className="container p-4 lg:p-8 mx-auto grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-4 lg:h-[540px] items-center py-8">
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <h2 className="text-3xl lg:text-5xl max-w-[400px] text-center lg:text-left font-tiempos">
            Respondemos a tus <span className="italic">preguntas</span>
          </h2>
          <p className="text-[18px]">¿Tienes más preguntas?</p>
          <Button
            variant="outline"
            className="w-fit border border-black rounded-full text-xl px-6 "
          >
            Contáctanos
          </Button>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="item-1"
              className="border-b-black border-t border-t-black "
            >
              <AccordionTrigger>
                ¿Cómo puedo asegurarme de que el abogado que estoy contratando
                sea confiable y competente?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b-black">
              <AccordionTrigger>
                ¿Cómo funciona el proceso de publicación de un proyecto en la
                plataforma?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b-black">
              <AccordionTrigger>
                ¿Cómo se maneja la seguridad de los pagos en la plataforma?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b-black">
              <AccordionTrigger>
                ¿Qué debo hacer si no estoy satisfecho con el trabajo del
                abogado?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-b-black">
              <AccordionTrigger>
                ¿Puedo contratar abogados para proyectos a largo plazo o solo
                para tareas específicas?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
