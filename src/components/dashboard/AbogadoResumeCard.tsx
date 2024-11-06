import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import { MapPin, Clock } from "lucide-react";

const AbogadoResumeCard = () => {
  return (
    <div className={`p-4 lg:p-8 border border-black  flex flex-col gap-4 `}>
      <div className="flex justify-between">
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
        <div>
          <Button
            variant={"outline"}
            className="border border-black rounded-full h-11 text-lg"
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
          <p className="ml-2 text-lg">Lima</p>
        </Button>
        <Button
          variant="outline"
          className="border border-black rounded-full h-[40px]"
        >
          <Clock size={28} />
          <p className="ml-2 text-lg">30-40 horas por semana</p>
        </Button>
      </div>

      <div>
        <h3 className="mb-2">Especialidades:</h3>
        <div className="flex gap-4 flex-wrap">
          <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Briefcase size={28} />
            <p className="ml-2 text-lg">Migracion laboral</p>
          </Button>
          <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Briefcase size={28} />
            <p className="ml-2 text-lg">Terminaciones de Empleo</p>
          </Button>
          <Button
            variant="outline"
            className="border border-black rounded-full h-[40px]"
          >
            <Briefcase size={28} />
            <p className="ml-2 text-lg">Arbitraje y Mediación Laboral</p>
          </Button>
        </div>
      </div>

      <p>
        Experto en asesorar y representar en temas de despidos, discriminación,
        negociaciones colectivas y cumplimiento normativo. Comprometido con la
        protección de los derechos laborales y ambientes de trabajo justos.
      </p>
    </div>
  );
};

export default AbogadoResumeCard;
