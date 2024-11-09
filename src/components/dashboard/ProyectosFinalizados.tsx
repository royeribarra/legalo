"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  ChevronDown,
  Clock,
  Key,
  Check as IconCheck,
  Folder,
} from "lucide-react";
import Image from "next/image";

const ProyectosFinalizados = () => {
  return (
    <div className="space-y-8 overflow-x-auto">
      <div className="min-w-[1000px]">
        <div className=" bg-[#E5E5E5] p-4 flex flex-nowrap justify-between">
          <div className="grid grid-cols-4 min-w-[720px] max-w-[720px] gap-2">
            <div>
              <span>Historial</span>
            </div>
            <div>
              <span>Tipo de servicio</span>
            </div>
            <div className="flex items-center gap-2">
              <Folder size={16} />
              <span>Abogado</span>
            </div>
            <div>
              <span>Fecha de finalización </span>
            </div>
          </div>
          <div>
            <span></span>
          </div>
        </div>
        <div>
          <div className="border border-black p-4 my-8 flex flex-nowrap justify-between ">
            <div className="grid grid-cols-4 min-w-[720px] max-w-[720px] gap-2">
              <div className="flex items-center">
                <span>Legalizar documento</span>
              </div>
              <div className="flex items-center">
                <span>Asesoria Legal</span>
              </div>
              <div className="flex items-center">
                <span>Camila T.</span>
              </div>
              <div className="flex items-center">
                <span>02/07/24</span>
              </div>
            </div>
            <div className="flex flex-nowrap gap-2">
              <Button>Ver documentos</Button>
              <Button>Ver detalle</Button>
            </div>
          </div>
          <div className="border border-black p-4 my-8 flex flex-nowrap justify-between ">
            <div className="grid grid-cols-4 min-w-[720px] max-w-[720px] gap-2">
              <div className="flex items-center">
                <span>Legalizar documento</span>
              </div>
              <div className="flex items-center">
                <span>Asesoria Legal</span>
              </div>
              <div className="flex items-center">
                <span>Beto T.</span>
              </div>
              <div className="flex items-center">
                <span>02/07/24</span>
              </div>
            </div>
            <div className="flex flex-nowrap gap-2">
              <Button>Ver documentos</Button>
              <Button>Ver detalle</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProyectosFinalizados;
