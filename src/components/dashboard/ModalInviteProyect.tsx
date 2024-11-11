import React from "react";

import { X as IconX } from "lucide-react";
import { Button } from "../ui/button";
import AbogadoResumeCard from "./AbogadoResumeCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextReviews,
  CarouselPreviousReviews,
} from "@/components/ui/carousel";

interface ModalInviteProyectProps {
  inviteProyect: () => void; // Ajusta el tipo según tu función
}

const ModalInviteProyect: React.FC<ModalInviteProyectProps> = ({
  inviteProyect,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20 ">
      <div className="flex flex-col lg:flex-row bg-white lg:rounded-[24px] shadow-lg relative w-full h-full overflow-y-auto lg:w-[1220px] lg:max-w-[84vw] lg:h-[830px] lg:max-h-[90vh] hidde-scrollbar  lg:px-16 lg:py-10 p-4 ">
        <div className="w-full lg:border border-black overflow-hidden overflow-y-scroll relative">
          <div className="mt-10 my-8">
            <h2 className="mb-4 font-tiempos text-2xl lg:text-[44px] text-center">
              ¡Invitaste a Omar a tu proyecto!
            </h2>
            <p className="text-sm lg:text-base text-center">
              Te notificaremos cuando tu proyecto sea aceptado. Mientras tanto,
              te invitamos a revisar tus invitaciones enviadas.
            </p>
          </div>
          <div className="">
            <Carousel>
              <CarouselContent className="">
                <CarouselItem className="lg:pl-8 lg:basis-[80%]">
                  <AbogadoResumeCard inviteProyect={() => true} />
                </CarouselItem>
                <CarouselItem className="lg:pl-8 lg:basis-[80%]">
                  <AbogadoResumeCard inviteProyect={() => true} />
                </CarouselItem>
                <CarouselItem className="lg:pl-8 lg:basis-[80%]">
                  <AbogadoResumeCard inviteProyect={() => true} />
                </CarouselItem>
                <CarouselItem className="lg:px-8 lg:basis-[80%]">
                  <AbogadoResumeCard inviteProyect={() => true} />
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center my-4 gap-4">
                <CarouselPreviousReviews />
                <CarouselNextReviews />
              </div>
            </Carousel>
          </div>
          <div className="flex justify-center gap-4 my-8">
            <Button>Seguir explorando</Button>
            <Button variant={"outline"} className="border-black">
              Ver invitaciones
            </Button>
          </div>
          <div
            onClick={inviteProyect}
            className="absolute lg:hidden flex-none lg:absolute top-0 right-0 lg:top-8 lg:right-8 w-5 h-5 justify-center items-center rounded-full cursor-pointer z-20"
          >
            <IconX className="text-black w-4 h-4" />
          </div>
        </div>

        <div
          onClick={inviteProyect}
          className="hidden lg:flex flex-none fixed lg:absolute top-4 right-4 lg:top-8 lg:right-8 w-5 h-5 justify-center items-center rounded-full cursor-pointer z-20"
        >
          <IconX className="text-black w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ModalInviteProyect;
