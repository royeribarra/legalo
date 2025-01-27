import React, { useEffect } from "react";

import { X as IconX } from "lucide-react";
import { Check as IconCheck } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { aplicacionService } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { useAuth } from "@/contexts/authContext";

interface ModalPostulacionOkProps {
  handleModalPostularOk: () => void;
  oferta?: IOfertaBack;
  newAplicacionId?: number;
}

const ModalPostulacionOk: React.FC<ModalPostulacionOkProps> = ({
  handleModalPostularOk,
  oferta,
  newAplicacionId
}) => {
  // const { token, userRole } = useAuth();
  // async function updateArchivosAplicacion() {
  //   if(token?.abogado?.id && oferta){
  //     const data = {
  //       abogadoId: token?.abogado?.id,
  //       ofertaId: oferta.id,
  //       aplicacionId: newAplicacionId
  //     };
  //     const response = await aplicacionService.updateLinkDocumentos(data);
  //   }
  // }

  // useEffect(()=>{
  //   updateArchivosAplicacion();
  // }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20 ">
      <div className="flex flex-col lg:flex-row bg-lg-lawyer lg:rounded-[24px] shadow-lg relative w-full h-full overflow-y-auto lg:w-[1220px] lg:max-w-[84vw] lg:h-[830px] lg:max-h-[90vh] hidde-scrollbar">
        <div className="w-full flex flex-col h-full">
          <div className="flex items-center justify-center h-[35%] lg:h-[55%]">
            <div className="w-36 h-36 lg:w-44 lg:h-44 border border-black rounded-full flex items-center justify-center">
              <IconCheck size={46} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 border-t border-black  p-8 lg:flex-1">
            <h1 className="text-4xl lg:text-[42px] text-center font-bold font-nimbus">
              Postulación enviada con éxito
            </h1>
            <p className="text-center">
              Te notificaremos en un máximo de 3 días, si haz sido aceptado en
              el proyecto.
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/abogado/postulaciones">
                <Button
                  onClick={handleModalPostularOk}
                  className="rounded-[10px]"
                >
                  Ver candidatura
                </Button>
              </Link>
              <Link href="/dashboard/abogado">
                <Button
                  variant="outline"
                  className="hover:bg-[#d1eeed] bg-[#D5F1F0] border-black rounded-[10px]"
                >
                  Seguir buscando
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div
          onClick={handleModalPostularOk}
          className="flex-none fixed lg:absolute top-4 right-4 lg:top-8 lg:right-8 w-5 h-5 bg-black flex  justify-center items-center rounded-full cursor-pointer z-20"
        >
          <IconX className="text-white w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ModalPostulacionOk;
