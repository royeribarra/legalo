import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
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
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HomeMain = () => {
  return (
    <>
      <div className="container p-4 md:p-8 mx-auto flex justify-center flex-col items-center md:h-[860px]">
        <div className="flex gap-2 mb-20">
          <Button>Necesito un abogado</Button>
          <Button variant="outline">Buscar oportunidades</Button>
        </div>
        <div className="flex max-w-[1200px] gap-[70px] overflow-hidden flex-wrap justify-center">
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
                1
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
                1
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
                1
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
                1
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

      <div className="md:h-[584px] grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#1E1E1E] flex flex-col justify-center gap-4">
          <div className="flex items-start  p-4 gap-4  mx-auto md:max-w-[560px]">
            <Image
              src="/icos/award.svg"
              alt="ico"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="text-white">
              <h3 className="text-xl">Profesionalismo y Experiencia:</h3>
              <p className="font-">
                Todos nuestros abogados están certificados y cuentan con años de
                experiencia en sus respectivas áreas.
              </p>
            </div>
          </div>
          <div className="flex items-start  p-4 gap-4  mx-auto md:max-w-[560px]">
            <Image
              src="/icos/award.svg"
              alt="ico"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="text-white">
              <h3 className="text-xl">Profesionalismo y Experiencia:</h3>
              <p className="font-">
                Todos nuestros abogados están certificados y cuentan con años de
                experiencia en sus respectivas áreas.
              </p>
            </div>
          </div>
          <div className="flex items-start  p-4 gap-4  mx-auto md:max-w-[560px]">
            <Image
              src="/icos/award.svg"
              alt="ico"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="text-white">
              <h3 className="text-xl">Profesionalismo y Experiencia:</h3>
              <p className="font-">
                Todos nuestros abogados están certificados y cuentan con años de
                experiencia en sus respectivas áreas.
              </p>
            </div>
          </div>
          <div className="flex items-start  p-4 gap-4  mx-auto md:max-w-[560px]">
            <Image
              src="/icos/award.svg"
              alt="ico"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <div className="text-white">
              <h3 className="text-xl">Profesionalismo y Experiencia:</h3>
              <p className="font-">
                Todos nuestros abogados están certificados y cuentan con años de
                experiencia en sus respectivas áreas.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-lg_yellow flex flex-col items-center justify-center gap-8">
          <h3 className="text-4xl">
            Con Legalo <span className="italic">ahorra</span> hasta
          </h3>
          <h2 className="text-6xl italic">S/ 2160</h2>
          <p>
            En comparación a 6 horas al día a un precio estimado de S/12 por día
          </p>
          <Link href="#" className="underline">
            ¿Cómo calculamos?
          </Link>
          <Select>
            <SelectTrigger className="w-[320px]">
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

      <div className="md:h-[620px] grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center items-center p-10">
          <Image
            src="/assets/img-legalo3.webp"
            alt="img"
            width={616}
            height={400}
            layout="responsive"
            className="max-w-[616px]"
          />
        </div>
        <div className="flex justify-center items-star flex-col gap-8 md:max-w-[620px]">
          <h2 className="text-4xl">
            Publica <span>hoy</span>, encuentra tu abogado mañana.
          </h2>
          <p>
            Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte. Encuentra al profesional ideal
            para tus necesidades legales y resuelve tu situación con confianza y
            rapidez.{" "}
          </p>
          <Button className="w-fit">Publicar proyecto</Button>
        </div>
      </div>
      {/* Reviews */}
      <div className="bg-lg_yellow md:h-[640px] flex items-center">
        <div className="container mx-auto p-4 md:p-8">
          <div className="mb-8 flex">
            <ToggleGroup type="single" variant="chips" className="gap-2">
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
            className="w-full px-4 md:px-8 mb-8"
          >
            <CarouselContent>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="max-w-[600px]">
                  <div>
                    <Card className="border border-black border-solid bg-lg_yellow">
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
                        <CardDescription className="line-clamp-5 text-black">
                          “Tuve una gran experiencia con Legalo. Necesitaba
                          asesoramiento legal rápido para un problema laboral y
                          encontré un abogado especializado en minutos. Fue
                          profesional, atento y resolvió mi caso de manera
                          eficiente. La plataforma es fácil de usar, segura y
                          transparente.”
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="flex gap-4">
                        <Image
                          src="/assets/img-user1.png"
                          alt="img"
                          width={56}
                          height={56}
                          className=""
                        />
                        <div>
                          <p className="text-lg font-medium italic">Jane Doe</p>
                          <p className="text-gray-500">Abogada Empresarial</p>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className=" bg-[url('/assets/img-legalo4.webp')] h-[242px]">
        <div className="container p-4 md:p-8 mx-auto flex items-center justify-between h-full">
          <div className="text-white">
            <h3 className="text-5xl mb-8">
              Descubre oportunidades legales a tu medida.
            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <Button>Regístrate gratis</Button>
        </div>
      </div>

      <div className="container p-4 md:p-8 mx-auto grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-4 md:h-[540px] items-center ">
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl max-w-[500px]">
            Respondemos a tus <span className="italic">preguntas</span>
          </h2>
          <p className="text-[18px]">¿Tienes más preguntas?</p>
          <Button variant="outline" className="w-fit">
            Contáctanos
          </Button>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Cómo puedo asegurarme de que el abogado que estoy contratando
                sea confiable y competente?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Cómo funciona el proceso de publicación de un proyecto en la
                plataforma?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                ¿Cómo se maneja la seguridad de los pagos en la plataforma?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                ¿Qué debo hacer si no estoy satisfecho con el trabajo del
                abogado?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
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
    </>
  );
};

export default HomeMain;
