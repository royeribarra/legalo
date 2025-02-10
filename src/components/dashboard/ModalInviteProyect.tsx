import React, { useState, useEffect } from "react";
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
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import { IOferta } from "@/interfaces/Oferta.interface"; // Interfaz para ofertas
import { ofertaservice } from "@/services";
import { useAuth } from "@/contexts/authContext";

interface ModalInviteProyectProps {
  inviteProyect: (abogado: IAbogadoBack, ofertaId: number) => void; // Ahora incluye ofertaId
  abogados: IAbogadoBack[];
  abogadoPrevioInvitado?: IAbogadoBack;
  isOpen: boolean;
  onModalClosed?: () => void;
}

const ModalInviteProyect: React.FC<ModalInviteProyectProps> = ({
  inviteProyect,
  abogados,
  abogadoPrevioInvitado,
  isOpen,
  onModalClosed,
}) => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(isOpen);
  const [currentStep, setCurrentStep] = useState(1);
  const [ofertasDisponibles, setOfertasDisponibles] = useState<IOferta[]>([]);
  const [selectedOferta, setSelectedOferta] = useState<number | null>(null);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (currentStep === 1) {
      console.log("hola")
      fetchOfertasDisponibles();
    }
  }, [currentStep, abogadoPrevioInvitado]);

  const fetchOfertasDisponibles = async () => {
    if(user?.cliente?.id && abogadoPrevioInvitado?.id){
      try {
        const body = {
          abogadoId: abogadoPrevioInvitado.id,
          clienteId: user?.cliente.id
        };
        const data = await ofertaservice.getOfertasSinAplicacionesPorAbogado(body);
        setOfertasDisponibles(data);
      } catch (error) {
        console.error("Error al obtener las ofertas disponibles:", error);
      }
    }
  };

  const handleNextStep = async () => {
    if (selectedOferta && abogadoPrevioInvitado?.id) {
      const body = {
        abogadoId: abogadoPrevioInvitado?.id,
        ofertaId: selectedOferta
      };
      const data = await ofertaservice.invitarAbogado(body);
      setCurrentStep(2);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setCurrentStep(1);
    if (onModalClosed) {
      onModalClosed();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
      <div className="flex flex-col lg:flex-row bg-white lg:rounded-[24px] shadow-lg relative w-full h-full overflow-y-auto lg:w-[1220px] lg:max-w-[84vw] lg:h-[830px] lg:max-h-[90vh] hidde-scrollbar lg:px-16 lg:py-10 p-4">
        <div
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer z-30"
        >
          <IconX className="text-black w-6 h-6" />
        </div>

        {currentStep === 1 ? (
          <div className="w-full overflow-hidden overflow-y-scroll relative">
            <h2 className="text-center text-2xl lg:text-[44px] my-6">
              Selecciona una oferta para invitar al abogado
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {ofertasDisponibles.map((oferta) => (
                <div
                  key={oferta.id}
                  className={`border p-4 rounded-lg cursor-pointer ${
                    selectedOferta === oferta.id ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedOferta(oferta.id)}
                >
                  <h3 className="font-bold">{oferta.titulo}</h3>
                  <p>{oferta.descripcion}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleNextStep}
                disabled={!selectedOferta}
                className="bg-blue-500 text-white"
              >
                Siguiente
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full lg:border border-black overflow-hidden overflow-y-scroll relative">
            <div className="mt-10 my-8">
              <h2 className="mb-4 font-nimbus text-2xl lg:text-[44px] text-center">
                ¡Invitaste a {abogadoPrevioInvitado?.nombres} a tu proyecto!
              </h2>
              <p className="text-sm lg:text-base text-center">
                Te notificaremos cuando tu proyecto sea aceptado. Mientras tanto,
                te invitamos a revisar tus invitaciones enviadas.
              </p>
            </div>
            <Carousel>
              <CarouselContent className="">
                {abogados
                  .filter((abogado) => abogado.id !== abogadoPrevioInvitado?.id)
                  .map((abogado) => (
                    <CarouselItem className="lg:pl-8 lg:basis-[80%]" key={abogado.id}>
                      <AbogadoResumeCard
                        inviteProyect={() => inviteProyect(abogado, selectedOferta!)}
                        abogado={abogado}
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="flex justify-center my-4 gap-4">
                <CarouselPreviousReviews />
                <CarouselNextReviews />
              </div>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInviteProyect;
