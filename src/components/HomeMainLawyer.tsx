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
      <div className="container p-4 lg:p-8 mx-auto flex justify-center flex-col items-center  mb-5 lg:mt-20">
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
          <h1 className="text-black text-3xl lg:text-[64px] font-tiempos text-center leading-[1.2]">
            Conviértete en nuestro{" "}
            <span className="italic font-light">abogado de confianza</span>
          </h1>
          <p className="my-6 text-center text-lg">
            Crea una cuenta en pocos pasos y accede a nuestra amplia red de
            abogados.
          </p>
        </div>

        <div className="flex max-w-[1200px] gap-[20px] overflow-hidden flex-wrap justify-center">
          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_blue-light h-8 w-8 flex items-center justify-center absolute top-4 left-4">
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
              <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
                Registrate <span className="italic">gratis</span>
              </CardTitle>
              <CardDescription className="line-clamp-4 text-lg text-black">
                Regístrate y completa tu perfil profesional.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_blue-light h-8 w-8 flex items-center justify-center absolute top-4 left-4">
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
              <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
                Busca <span className="italic">proyectos</span>
              </CardTitle>
              <CardDescription className="line-clamp-4 text-lg text-black">
                Utiliza nuestros filtros para encontrar proyectos que se adapten
                a tus necesidades.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_blue-light h-8 w-8 flex items-center justify-center absolute top-4 left-4">
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
              <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
                Explora <span className="italic">perfiles</span>
              </CardTitle>
              <CardDescription className="line-clamp-4 text-lg text-black">
                Envía tu propuesta y elige tu forma de pago.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_blue-light h-8 w-8 flex items-center justify-center absolute top-4 left-4">
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
              <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
                Consigue <span className="italic">un contrato</span>
              </CardTitle>
              <CardDescription className="line-clamp-4 text-lg text-black">
                Si eres seleccionado, recibe el contrato y comienza
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_blue-light h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                5
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
              <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
                Completa el <span className="italic">trabajo</span>
              </CardTitle>
              <CardDescription className="line-clamp-4 text-lg text-black">
                Marca los pasos completados y comunícate con el cliente si
                tienes dudas.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="max-w-[310px] border-none shadow-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_blue-light h-8 w-8 flex items-center justify-center absolute top-4 left-4">
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
              <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
                Recibe<span className="italic">tu pago</span>
              </CardTitle>
              <CardDescription className="line-clamp-4 text-lg text-black">
                Obtén pagos parciales y finales tras la aprobación del cliente.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="lg:h-[584px] 3xl:h-[700px] grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[#1E1E1E] flex flex-col justify-center gap-4 py-8">
          <div className="flex  flex-col justify-center gap-8 3xl:gap-16 p-4 lg:p-16">
            <div className="grid grid-cols-[40px_auto]  gap-4 ">
              <Image
                src="/icos/ico-megaphone-w.png"
                alt="ico"
                width={27}
                height={24}
                className="mx-auto"
              />
              <div className="text-white">
                <h3 className="text-lg lg:text-2xl font-tiempos mb-2">
                  Oportunidades{" "}
                  <span className="italic font-light">Exclusivas</span>
                </h3>
                <p className="text-base">
                  Accede a proyectos y empleos específicos para abogados,
                  garantizando trabajos alineados con tu especialidad.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[40px_auto]  gap-4 ">
              <Image
                src="/icos/ico-like-w.png"
                alt="ico"
                width={24}
                height={30}
                className="mx-auto"
              />
              <div className="text-white">
                <h3 className="text-lg lg:text-2xl font-tiempos mb-2">
                  Confianza y{" "}
                  <span className="italic font-light">Seguridad</span>
                </h3>
                <p className="text-base">
                  Trabaja solo con clientes verificados para garantizar la
                  legitimidad de los proyectos y minimizar riesgos.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-[40px_auto] gap-4 ">
              <Image
                src="/icos/ico-credit-card-w.png"
                alt="ico"
                width={30}
                height={23}
                className="mx-auto"
              />
              <div className="text-white">
                <h3 className="text-lg lg:text-2xl font-tiempos mb-2">
                  Pagos <span className="italic font-light">Seguros</span>
                </h3>
                <p className="text-base">
                  Confía en nuestro sistema para asegurar que recibas tus pagos
                  de manera confiable y puntual.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-lg_blue-light flex flex-col items-center justify-center gap-4 3xl:gap-8 p-8">
          <h3 className="text-[40px] text-center max-w-[416px] font-tiempos 3xl:max-w-[700px] 3xl:text-6xl">
            Calcula tus <span className="italic">ganancias,</span> podrías ganar
          </h3>
          <h2 className="text-6xl italic font-tiempos 3xl:text-7xl">S/ 2160</h2>
          <p className="text-base max-w-[264px] text-center 3xl:max-w-[400px] 3xl:text-xl">
            En comparación a 6 horas al día a un precio estimado de S/12 por día
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
                <SelectItem value="empresarial">Abogado Empresarial</SelectItem>
                <SelectItem value="ambiental">Abogado Ambiental</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

      {/* Reviews */}
      <div className="bg-lg_blue-light lg:h-[640px] flex items-center py-8">
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
                    <Card className="border border-black border-solid bg-lg_blue-light rounded-[32px] min-h-[320px] max-w-[600px]">
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
