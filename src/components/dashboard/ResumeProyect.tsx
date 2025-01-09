import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { IOfertaBack } from "@/interfaces/Oferta.interface";

interface ProyectProps {
  inviteProyect: (ofertaId: number) => void;
  oferta: IOfertaBack
}

const ResumeProyect = ({ inviteProyect, oferta }: ProyectProps) => {
  return (
    <div className="p-4 lg:p-8 border border-black rounded-[20px] flex flex-col gap-4">
      <div className="flex justify-between flex-col-reverse lg:flex-row">
        <h2 className="font-nimbus text-xl lg:text-2xl font-light">
          {oferta.titulo}
        </h2>

        <div className="flex gap-4 justify-end mb-4 lg:mb-0">
          <Button
            variant="outline"
            className="text-sm lg:text-lg h-9 lg:h-[42px] rounded-full"
          >
            Guardar
          </Button>
          <Link href="/registro/tipo">
            <Button className="text-sm lg:text-lg h-9 lg:h-[42px] rounded-full">
              Ver proyecto
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-sx lg:text-base">
        <p>Descripción de proyecto: </p>
        <p>
        {oferta.descripcion}
        </p>
      </div>
      <div className="flex gap-4 flex-wrap">
        {/* <Button
          variant="outline"
          className="border border-black rounded-full h-[43px]"
        >
          <Image
            src="/icos/ico-dash-pin-map.svg"
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          <p>Remoto</p>
        </Button> */}
        {/* <Button
          variant="outline"
          className="border border-black rounded-full h-[43px]"
        >
          <Image
            src="/icos/ico-dash-alarm.svg"
            alt=""
            width={24}
            height={24}
            className="mr-2"
          />
          <p>1-2 semanas</p>
        </Button> */}
        
        <div>
          <h5>Especialidades</h5>
          {
            oferta.especialidadesOferta.map((especialidad)=>
              <Button
                variant="outline"
                className="border border-black rounded-full h-[43px] mt-4"
              >
                <Image
                  src="/icos/ico-dash-building.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <p>{especialidad.especialidad.nombre}</p>
              </Button>
            )
          }
        </div>
        <div>
          <h5>Servicios</h5>
          {
            oferta.serviciosOferta.map((servicio)=>
              <Button
                variant="outline"
                className="border border-black rounded-full h-[43px] mt-4"
              >
                <Image
                  src="/icos/ico-dash-briefcase.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <p>{servicio.servicio.nombre}</p>
              </Button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ResumeProyect;
