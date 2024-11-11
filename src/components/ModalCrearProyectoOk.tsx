import React from "react";

import { X as IconX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ModalPostulacionOkProps {
  handleModalCrearProyectoOk: () => void;
}

const ModalCrearProyectoOk: React.FC<ModalPostulacionOkProps> = ({
  handleModalCrearProyectoOk,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20 ">
      <div className="flex flex-col lg:flex-row bg-white lg:rounded-[24px] shadow-lg relative w-full h-full overflow-y-auto lg:w-[1220px] lg:max-w-[84vw] lg:h-[830px] lg:max-h-[90vh] hidde-scrollbar">
        <div className="flex flex-col justify-center items-center gap-8 w-full p-4 pt-16">
          <Image
            src="/assets/images/image-client-proyect-create.jpg"
            alt="img"
            width={369}
            height={214}
          />
          <h2 className="text-3xl lg:text-[40px] font-tiempos text-center">
            ¿Qué sigue después de publicar un proyecto?
          </h2>
          <p className="text-center">
            Comenzarás a recibir propuestas y también podrás invitar a abogados
            a unirse a tu proyecto. No se aplicarán cargos hasta que los
            contrates.
          </p>

          <div className="flex gap-4">
            <Button>Editar proyecto</Button>
            <Link href={"/dashboard/cliente"}>
              <Button variant={"outline"} className="border-black">
                Publicar proyecto
              </Button>
            </Link>
          </div>
        </div>

        <div
          onClick={handleModalCrearProyectoOk}
          className="flex-none fixed lg:absolute top-4 right-4 lg:top-8 lg:right-8 w-5 h-5 bg-black flex  justify-center items-center rounded-full cursor-pointer z-20"
        >
          <IconX className="text-white w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default ModalCrearProyectoOk;
