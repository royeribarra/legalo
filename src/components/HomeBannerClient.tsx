import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Briefcase } from "lucide-react";
import { ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeBannerClient = () => {
  return (
    <div>
      <div className="lg:grid grid-cols-2 w-full lg:min-h-[560px] items-center ">
        <div className="bg-lg_yellow p-8 h-full w-full flex justify-center pt-[10%]">
          <div className="max-w-[560px] flex flex-col gap-8">
            <h1 className="text-black text-3xl lg:text-6xl  font-tiempos">
              Encuentra a los mejores abogados{" "}
              <span className="italic font-light">especializados</span>
            </h1>
            <div className="underline">
              <Link href="#">Descubre cuanto puedes llegar a ahorrar</Link>
            </div>
            <div className="w-full max-w-[500px] flex gap-4">
              <Input placeholder="Ejemplo Abogado, Minería, etc." />
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black hover:bg-slate-800"
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-[url('/assets/bg-banner3.jpg')] bg-cover bg-center w-full h-full hidden lg:block"></div>
      </div>

      <div className="w-full border-t border-b border-black overflow-hidden">
        <Carousel
          opts={{
            align: "start",
          }}
          className="flex"
        >
          <div className="w-1/2 lg:w-1/4 flex flex-col justify-center items-center gap-8 border-r border-black relative z-10 bg-white mix-h-[120px]">
            <p className="font-bold text-xl">Especialidades</p>
            <div className="flex gap-4 items-center justify-center">
              <CarouselPrevious className="static transform-none" />
              <p>|</p>
              <CarouselNext className="static transform-none" />
            </div>
          </div>
          <div className="w-1/2 lg:w-3/4">
            <CarouselContent className="">
              {Array.from({ length: 7 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="max-w-[55vw] lg:max-w-[25vw]"
                >
                  <div className="border-r border-black">
                    <Card className="p-4 border-none flex gap-4 lg:items-center flex-col lg:flex-row">
                      <div>
                        <div className="rounded-full bg-slate-300 h-12 w-12 flex items-center justify-center">
                          <Briefcase className="h-6 w-6 text-gray-700" />
                        </div>
                      </div>
                      <CardHeader className="p-0">
                        <CardTitle className="text-lg">Abogado Civil</CardTitle>
                        <CardDescription className="line-clamp-3 text-sm">
                          Listo para proteger tus contratos, gestionar
                          propiedades y planificar herencias familiares
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
