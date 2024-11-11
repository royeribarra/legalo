import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Briefcase } from "lucide-react";
import { MapPin, Clock } from "lucide-react";

interface inviteProyectProps {
  inviteProyect: () => void;
}

const AbogadoResumeCard: React.FC<inviteProyectProps> = ({ inviteProyect }) => {
  return (
    <div
      className={` p-4 lg:px-8 border border-black  flex flex-col gap-4 flex-wrap`}
    >
      <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src="/assets/images/face-6.jpeg"
            alt="img-abogado"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <p className="text-2xl font-bold">Omar T.</p>
            <p>Abogado Laboral</p>
            <p>Lima, Perú</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant={"outline"}
            className="border border-black rounded-full h-11 text-sm lg:text-lg"
            onClick={inviteProyect}
          >
            Invitar a proyecto
          </Button>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button
          variant="outline"
          className="border border-black rounded-full h-[40px]"
        >
          <MapPin size={28} />
          <p className="ml-2 text-sm lg:text-lg">Lima</p>
        </Button>
        <Button
          variant="outline"
          className="border border-black rounded-full h-[40px]"
        >
          <Clock size={28} />
          <p className="ml-2 text-sm lg:text-lg">30-40 horas por semana</p>
        </Button>
      </div>

      <div>
        <h3 className="mb-2">Especialidades:</h3>
        <div className="flex flex-wrap gap-4  lg:overflow-y-auto">
          <Button
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
          </Button>
        </div>
      </div>

      <p className="line-clamp-3">
        Experto en asesorar y representar en temas de despidos, discriminación,
        negociaciones colectivas y cumplimiento normativo. Comprometido con la
        protección de los derechos laborales y ambientes de trabajo justos.
      </p>
    </div>
  );
};

export default AbogadoResumeCard;
