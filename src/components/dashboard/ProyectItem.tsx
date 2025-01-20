import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { IOfertaBack } from "@/interfaces/Oferta.interface";

interface ProyectItemProps {
  tipe: string;
  oferta: IOfertaBack;
}

const ProyectItem: React.FC<ProyectItemProps> = ({ tipe, oferta }) => {
  return (
    <div
      className={`p-4 lg:p-8 border border-black rounded-[20px] flex flex-col gap-4 ${tipe === "cotizacionAceptada" && "bg-[#EEF79C]"} ${tipe === "cotizacionPorExpirar" && "bg-[#EDEDED]"}`}
    >
      <div className="flex justify-between flex-col-reverse lg:flex-row">
        <h2 className="font-nimbus text-xl lg:text-2xl font-light">
          {oferta.titulo}
        </h2>
        {(tipe === "cotizacionAceptada" || tipe === "cotizacionPorExpirar") && (
          <h3 className="text-[22px] px-4 ml-4 border-l border-black flex-none leading-normal">
            Expira en <b> 24hrs</b>
          </h3>
        )}
        {tipe === "sinPostular" && (
          <div className="flex gap-4 justify-end mb-4 lg:mb-0">
            {/* <Button
              variant="outline"
              className="text-sm lg:text-lg h-9 lg:h-[42px] rounded-full border-black flex-none"
            >
              Guardar
            </Button> */}
            <Link href={`/dashboard/abogado/proyecto/${oferta.id}`}>
              <Button className="text-sm lg:text-lg h-9 lg:h-[42px] rounded-full flex-none">
                Ver proyecto
              </Button>
            </Link>
          </div>
        )}
        {tipe === "postulacionEnviada" && (
          <div className="flex gap-4 justify-end mb-4 lg:mb-0">
            <Button
              variant="outline"
              className="text-xs lg:text-base h-9 lg:h-[42px] rounded-full border-black flex-none"
            >
              Postuilación envidada
            </Button>
          </div>
        )}
        {(tipe === "cotizacionAceptada" || tipe === "cotizacionPorExpirar") && (
          <div className="flex gap-4 justify-end mb-4 lg:mb-0">
            <Button className="text-xs lg:text-base h-9 lg:h-[42px] rounded-full w-[200px]">
              <Image
                src="/assets/ico-whatsapp.svg"
                alt="ico-whastapp"
                width={24}
                height={24}
                className="mr-2"
              />
              Contactar al cliente
            </Button>
          </div>
        )}
      </div>
      <div className="text-sx lg:text-base">
        <p>Descripción de proyecto: </p>
        <p>{oferta.descripcion}</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button
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
        </Button>
        <Button
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
        
        </Button>
        <div>
        <h2>Especialidades</h2>
        {
          oferta.especialidadesOferta.map((especialidadesOferta)=> 
            <Button
              variant="outline"
              className="border border-black rounded-full h-[43px]"
            >
              <Image
                src="/icos/ico-dash-building.svg"
                alt=""
                width={24}
                height={24}
                className="mr-2"
              />
              <p>{especialidadesOferta.especialidad.nombre}</p>
            </Button>
          )
        }
        </div>
        <div>
        <h2>Servicios</h2>
        {
          oferta.serviciosOferta.map((serviciosOferta)=> 
            <Button
              variant="outline"
              className="border border-black rounded-full h-[43px]"
            >
              <Image
                src="/icos/ico-dash-building.svg"
                alt=""
                width={24}
                height={24}
                className="mr-2"
              />
              <p>{serviciosOferta.servicio.nombre}</p>
            </Button>
          )
        }
        </div>
      </div>
      {tipe === "cotizacionPorExpirar" && (
        <div className="px-[28px] py-[18px] border border-[#B3261E] bg-[#F9DEDC] rounded-[20px] mt-4">
          <p className="flex items-center gap-2 text-[#B3261E] font-bold lg:text-[22px]">
            <Image
              src="/icos/emoji-neutral.svg"
              alt="emogi"
              width={24}
              height={24}
            ></Image>
            Tu cotización está por expirar
          </p>
          <p className="lg:text-[22px] text-[#B3261E] mt-3">
            Contacta al cliente en las próximas 6 hrs o perderás la postulación
          </p>
        </div>
      )}
    </div>
  );
};

export default ProyectItem;
