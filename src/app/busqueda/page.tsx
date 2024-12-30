"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Search as IcoSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import { Label as LabelCn } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AbogadoResumeCard from "@/components/dashboard/AbogadoResumeCard";
import ModalInviteProyect from "@/components/dashboard/ModalInviteProyect";
import Link from "next/link";
import { useDashboardCliente } from "@/contexts/dashboardClienteContext";
import { abogadoService } from "@/services";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BusquedaOferta from "@/components/busqueda/busquedaOferta";
import BusquedaAbogado from "@/components/busqueda/busquedaAbogado";

const DashboardClientPage = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("client");

  const updateServiceTipe = (newType: string) => {
    console.log(newType)
    setServiceTipe(newType);
  };
  const [openFilter, setOpenFilter] = useState(true);
  const [menuActive, setMenuActive] = useState("talentos");
  const { state } = useDashboardCliente();
  const [subMenuActive, setSubMenuActive] = useState("ofertas-activas");
  const [abogados, setAbogados] = useState<IAbogadoBack[]>([]);
  const [abogadoPrevioInvitado, setAbogadoPrevioInvitado] = useState<number>(0);

  const [inviteProyectModal, setInviteProyectModal] = useState(false);

  const menuItems = [
    { id: "talentos", texto: "Talentos" },
    { id: "oportunidades", texto: "Oportunidades" },
  ];

  const subMenuItems = [
    { id: "ofertas-activas", texto: "Ofertas Activas" },
    { id: "ofertas-por-aceptar", texto: "Ofertas con aplicación" },
    { id: "trabajos-activos", texto: "Trabajos activos" },
    { id: "trabajos-finalizados", texto: "Trabajos finalizados" },
  ];

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const inviteProyect = (abogadoId: number) => {
    setAbogadoPrevioInvitado(abogadoId);
    setInviteProyectModal(true);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setOpenFilter(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setOpenFilter(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  async function fetchAbogados() {
    try {
      const data = await abogadoService.obtenerTodos();
      setAbogados(data);
      console.log(data)
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  useEffect(()=> {
    fetchAbogados();
  }, []);

  return (
    <div>
      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      <div className="px-4 py-4 lg:px-16 lg:py-8 max-w-[1920px] mx-auto">
        <div className="flex justify-between flex-col-reverse lg:flex-row gap-4 ">
          <div>
            <p className="pb-2">Búsqueda por palabra clave</p>
            <div className="flex items-center gap-4 border border-black rounded-full h-12 px-4 lg:w-[553px]">
              <IcoSearch size={24} />
              <input type="text" placeholder="Escribe..." className="" />
            </div>
          </div>
          {/* <InfoNominations /> */}
        </div>

        <div className="mt-8">
          <div className="border-b-2 border-[#808080] flex w-full overflow-auto lg:overflow-auto">
            {menuItems.map((boton) => (
              <Button
                key={boton.id}
                variant={menuActive === boton.id ? "dashActive" : "dashInActive"}
                onClick={() => setMenuActive(boton.id)}
              >
                {boton.texto}
              </Button>
            ))}
          </div>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              {menuActive === "talentos" && <BusquedaAbogado />}
            </Suspense>
            {menuActive === "oportunidades" && (
              <BusquedaOferta></BusquedaOferta>
            )}
          </div>
        </div>
        {/* <ModalInviteProyect 
          inviteProyect={inviteProyect} 
          abogados={abogados} 
          abogadoPrevioInvitado={abogadoPrevioInvitado}
          onModalClosed={() => setInviteProyectModal(false)}
          isOpen={inviteProyectModal}
        /> */}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardClientPage;
