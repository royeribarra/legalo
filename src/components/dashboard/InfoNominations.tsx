import React from "react";
import { Info as IcoInfo } from "lucide-react";
import Link from "next/link";

const InfoPostulations = () => {
  return (
    <div className="bg-[#FEF7FF] p-3 flex flex-wrap justify-center lg:justify-between max-w-[474px] border border-[#CAC4D0] rounded-xl gap-2">
      <div className="flex-none flex items-center">
        <IcoInfo size={24} />
      </div>
      <div className="flex gap-3 lg:flex-1">
        <div className="flex gap-2  items-center w-[45%]">
          <p className="text-sm">Postulaciones restantes:</p>
          <span className="font-bold text-base">5</span>
        </div>
        <div className="w-[1px] my-2 lg:my-1 bg-black"></div>
        <div className="flex gap-2 items-center w-[45%]">
          <p className="text-sm">Tipo de membresia:</p>
          <span className="font-bold text-base">Gratuita</span>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Link href="#" className="text-[#007AFF] font-bold">
          Aumenta tus chances
        </Link>
      </div>
    </div>
  );
};

export default InfoPostulations;
