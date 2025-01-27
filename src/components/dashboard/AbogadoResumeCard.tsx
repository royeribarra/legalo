import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { MapPin, Clock } from "lucide-react";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CarruselDeIndustrias = ({ abogado } : {abogado: IAbogadoBack}) => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={3}
      grabCursor
    >
      {abogado.industriasAbogado.map((industria) => (
        <SwiperSlide key={industria.industria.id} className="w-auto">
          <Button
            variant="outline"
            className="border border-black rounded-full h-[40px] px-4 flex items-center"
          >
            <MapPin size={28} />
            <p className="ml-2 text-sm lg:text-lg">{industria.industria.nombre}</p>
          </Button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

interface InviteProyectProps {
  inviteProyect: (abogado: IAbogadoBack) => void;
  abogado: IAbogadoBack
}

const AbogadoResumeCard = ({ inviteProyect, abogado }: InviteProyectProps) => {
  const invitarALaOferta = () => {
    inviteProyect(abogado);
  };

  return (
    <div
      className={` p-4 lg:px-8 border border-black  flex flex-col gap-4 flex-wrap`}
    >
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src={`${process.env.S3_FILE_ROUTE}/${abogado.foto_url}`}
            alt="img-abogado"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <p className="text-2xl font-bold">{abogado.nombres + '-' + abogado.apellidos}</p>
            <p>{abogado.serviciosAbogado[0]?.servicio.nombre}</p>
            <p>{abogado.direccion}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant={"outline"}
            className="border border-black rounded-full h-11 text-sm lg:text-lg"
            onClick={invitarALaOferta}
          >
            Invitar a proyecto
          </Button>
        </div>
      </div>
      <div>
      <h3 className="mb-2">Industrias:</h3>
        <div className="flex gap-4 flex-wrap">
          {
            abogado.industriasAbogado.map((industria)=>
              <Button
                variant="outline"
                className="border border-black rounded-full h-[40px]"
                key={industria.id}
              >
                <MapPin size={28} />
                <p className="ml-2 text-sm lg:text-lg">{industria.industria.nombre}</p>
              </Button>
            )
          }
            {/* <CarruselDeIndustrias abogado={abogado} /> */}
          
        
          {/* <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Clock size={28} />
            <p className="ml-2 text-sm lg:text-lg">30-40 horas por semana</p>
          </Button> */}
        </div>
      </div>
      <div>
        <h3 className="mb-2">Especialidades:</h3>
        <div className="flex flex-wrap gap-4  lg:overflow-y-auto">
          {
            abogado.especialidadesAbogado.map((especialidad)=> 
              <Button
                variant="outline"
                className="border border-black rounded-full h-[40px]"
                key={especialidad.id}
              >
                <Briefcase size={28} />
                <p className="ml-2 text-sm lg:text-lg">{especialidad.especialidad.nombre}</p>
              </Button>
            )
          }
          {/* <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Briefcase size={28} />
            <p className="ml-2 text-sm lg:text-lg">Migracion laboral</p>
          </Button>
          <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Briefcase size={28} />
            <p className="ml-2 text-sm lg:text-lg">Terminaciones de Empleo</p>
          </Button>
          <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Briefcase size={28} />
            <p className="ml-2 text-sm lg:text-lg">
              Arbitraje y Mediación Laboral
            </p>
          </Button> */}
        </div>
      </div>

      <p className="line-clamp-3">
        {abogado.sobre_ti}
      </p>
    </div>
  );
};

export default AbogadoResumeCard;