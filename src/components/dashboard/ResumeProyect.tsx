import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { getFriendlyStateName, getStateColor } from "utils/oferta";

interface ProyectProps {
  inviteProyect: (ofertaId: number) => void;
  oferta: IOfertaBack;
}

const ResumeProyect = ({ inviteProyect, oferta }: ProyectProps) => {
  return (
    <div className="p-4 lg:p-8 border border-black rounded-[20px] flex flex-col gap-4">
      {/* Cabecera: Título + Etiqueta + Botón */}
      <div className="flex justify-between items-start flex-col lg:flex-row">
        {/* Columna: Título y etiqueta */}
        <div className="flex flex-col gap-2">
          <h2 className="font-nimbus text-xl lg:text-2xl font-light">
            {oferta.titulo.toUpperCase()}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-xs lg:text-sm ${getStateColor(
              oferta.estado
            )}`}
            style={{ width: "150px", display: "inline-block", textAlign: "center" }}
          >
            {getFriendlyStateName(oferta.estado)}
          </span>
        </div>

        {/* Columna: Botón */}
        <div className="mt-4 lg:mt-0">
          <Link href={`/dashboard/abogado/proyecto/${oferta.id}`}>
            <Button className="text-sm lg:text-lg h-9 lg:h-[42px] rounded-full">
              Ver proyecto
            </Button>
          </Link>
        </div>
      </div>

      {/* Descripción del proyecto */}
      <div className="text-sx lg:text-base">
        <span className="font-sans font-bold">Descripción de proyecto:</span>
        <p className="line-clamp-2">{oferta.descripcion}</p>
      </div>

      {/* Presupuesto */}
      <div className="text-sx lg:text-base">
        <span className="font-sans font-bold">Presupuesto:</span>
        {oferta.salario_minimo === oferta.salario_maximo ? (
          <p>S/ {oferta.salario_maximo}</p>
        ) : (
          <p>
            S/ {oferta.salario_minimo} - S/ {oferta.salario_maximo}
          </p>
        )}
      </div>

      {/* Especialidades y Servicios */}
      <div className="flex gap-8 flex-wrap">
        <div>
          <span className="font-sans font-bold">Especialidades</span>
          <div className="flex flex-wrap gap-2 mt-4">
            {oferta.especialidadesOferta.map((especialidad) => (
              <Button
                key={especialidad.especialidad.id}
                variant="outline"
                className="border border-black rounded-full h-[43px] cursor-default"
                title={especialidad.especialidad.nombre}
              >
                <Image
                  src={"/assets/images/especialidades/" + especialidad.especialidad.imagen}
                  alt=""
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <p>{especialidad.especialidad.nombre}</p>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <span className="font-sans font-bold">Servicios</span>
          <div className="flex flex-wrap gap-2 mt-4">
            {oferta.serviciosOferta.map((servicio) => (
              <Button
                key={servicio.servicio.id}
                variant="outline"
                className="border border-black rounded-full h-[43px] cursor-default"
                title={servicio.servicio.nombre}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeProyect;
