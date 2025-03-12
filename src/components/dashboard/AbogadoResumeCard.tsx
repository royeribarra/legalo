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
    src={`${process.env.S3_FILE_ROUTE}/${abogado?.files.find((file) => file.nombreArchivo === 'archivo_imagen')?.filePath}`}
    alt="img-abogado"
    width={100}
    height={100}
    className="w-[100px] h-[100px] object-cover rounded-full border"
  />
  <div>
    <h3 className="font-sans font-bold">{abogado.nombres + '-' + abogado.apellidos}</h3>
    <p>{abogado.serviciosAbogado[0]?.servicio.nombre}</p>
    <p>{abogado.direccion}</p>
  </div>
</div>

        <div className="flex justify-end">
          <Button
            variant={"secondary"}
            className="border border-black rounded-full h-11 text-sm lg:text-lg"
            onClick={invitarALaOferta}
          >
            Invitar a proyecto
          </Button>
        </div>
      </div>
      <div>
      <p className="mb-2 font-sans font-bold">Industrias:</p>
      <div className="flex flex-wrap gap-2 mt-4">
          {
            abogado.industriasAbogado.map((industria)=>
              <Button
                variant="outline"
                className="border border-black rounded-full h-[40px] cursor-default"
                key={industria.id}
                title={industria.industria.nombre}
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
        <h3 className="mb-2 font-sans font-bold">Especialidades:</h3>
        <div className="flex flex-wrap gap-2 mt-4">
          {
            abogado.especialidadesAbogado.map((especialidad)=>
              <Button
                variant="outline"
                className="border border-black rounded-full h-[40px] cursor-default"
                key={especialidad.id}
                title={especialidad.especialidad.nombre}
              >
                <Image
                  src={"/assets/images/especialidades/" + especialidad.especialidad.imagen}
                  alt=""
                  width={24}
                  height={24}
                  className="mr-2"
                />
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