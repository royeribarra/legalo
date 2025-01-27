"use client";
import React, { useEffect, useState } from "react";
import { Search as IcoSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeProyect from "@/components/dashboard/ResumeProyect";
import InfoNominations from "@/components/dashboard/InfoNominations";

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
  AccordionTriggerBig,
} from "@/components/ui/accordion";
import ProyectItem from "@/components/dashboard/ProyectItem";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { ofertaservice } from "@/services";
import { useDashboardAbogado } from "@/contexts/dashboardAbogadoContext";
import Postulaciones from "@/components/dashboard/abogado/Postulaciones";
import { useAuth } from "@/contexts/authContext";
import PublicacionesRecientes from "@/components/dashboard/abogado/PublicacionesRecientes";
import InvitacionesOferta from "@/components/dashboard/abogado/InvitacionesOferta";
import TrabajosAbogado from "@/components/dashboard/abogado/Trabajos";

const DashboardLawyerPage = () => {
  const {token} = useAuth();
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const { state } = useDashboardAbogado();
  const [menuActive, setMenuActive] = useState("oportunidades");
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);
  const [ofertasFiltradas, setOfertasFiltradas] = useState<IOfertaBack[]>([]);
  const [ofertaPrevioInvitado, setOfertaPrevioInvitado] = useState<number>(0);
  const [inviteProyectModal, setInviteProyectModal] = useState(false);

  const [filtroServicio, setFiltroServicio] = useState<number | null>(null);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<number | null>(null);
  const [filtroIndustria, setFiltroIndustria] = useState<number | null>(null);

  const menuItems = [
    { id: "oportunidades", texto: "Oportunidades para ti" },
    { id: "recientes", texto: "Publicadas recientemente" },
    { id: "invitaciones", texto: "Invitaciones" },
    // { id: "guardados", texto: "Guardados" },
    { id: "postulaciones", texto: "Postulaciones" },
    { id: "trabajos", texto: "Trabajos" },
  ];

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const inviteProyect = (abogadoId: number) => {
    setOfertaPrevioInvitado(abogadoId);
    setInviteProyectModal(true);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setOpenFilter(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setOpenFilter(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  async function fetchOfertas() {
    try {
      const data = {
        estado: 'creado'
      };
      const response = await ofertaservice.obtenerTodos(data);
      setOfertas(response);
      setOfertasFiltradas(response);
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  useEffect(()=> {
    fetchOfertas();
  }, []);

  const handleServicioChangue = (newValue: string) => {
    const nuevaServicio = newValue === 'todos' ? null : Number(newValue);
    setFiltroServicio(nuevaServicio);
    filtrarAbogados(filtroEspecialidad, nuevaServicio, filtroIndustria);
  };

  const handleEspecialidadChange = (selectedValue: string) => {
    const nuevaEspecialidad = selectedValue === 'todos' ? null : Number(selectedValue);
    setFiltroEspecialidad(nuevaEspecialidad);
    filtrarAbogados(nuevaEspecialidad, filtroServicio, filtroIndustria);
  };

  const handleIndustriaChange = (selectedValue: string) => {
    const nuevaIndustria = selectedValue === 'todos' ? null : Number(selectedValue);
    setFiltroIndustria(nuevaIndustria);
    filtrarAbogados(filtroEspecialidad, filtroServicio, nuevaIndustria);
  };

  const filtrarAbogados = (especialidadId: number | null, servicioId: number | null, industriaId: number | null ) => {
    let filtrados = ofertas;
    if (especialidadId) {
      filtrados = filtrados.filter((oferta) =>
        oferta.especialidadesOferta.some(
          (especialidad) => especialidad.especialidad.id === especialidadId
        )
      );
    }

    if (servicioId) {
      filtrados = filtrados.filter((oferta) =>
        oferta.serviciosOferta.some(
          (servicio) => servicio.servicio.id === servicioId
        )
      );
    }

    if (industriaId) {
      filtrados = filtrados.filter((oferta) =>
        oferta.industriasOferta.some(
          (industria) => industria.industria.id === industriaId
        )
      );
    }
    setOfertasFiltradas(filtrados);
  };

  return (
    <div>
      <div>
        <div className="mt-6 h-6">
          <Button
            variant="link"
            onClick={handleFilter}
            className="text-base px-0 font-light gap-2 flex items-center"
          >
            {openFilter ? <ChevronsLeft /> : <ChevronsRight />}
            <span>{openFilter ? "Ocultar Filtros" : "Ver Filtros"}</span>
          </Button>
        </div>
        <div className="mt-8 flex overflow-hidden">
          {/* filtros */}
          {openFilter && (
            <div className="lg:block w-[288px] mr-16 flex-none">
              <div className="border-b border-black flex justify-between items-center pb-6">
                <h3 className="text-2xl">Filtros</h3>
                <Button
                  onClick={handleFilter}
                  variant="link"
                  className="hidden underline px-0"
                >
                  Ocultar todo
                </Button>
              </div>
              <div>
                <Accordion
                  type="multiple"
                  defaultValue={[
                    "item-1",
                    "item-2",
                    "item-3",
                    "item-4",
                    "item-5",
                    "item-6",
                  ]}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Especialidad</AccordionTrigger>
                    <AccordionContent>
                      <Select
                        onValueChange={(selectedValue) => handleEspecialidadChange(selectedValue)}
                      >
                        <SelectTrigger className="focus-visible:ring-0 border border-black rounded-[10px] focus:ring-0 outline-none">
                          <SelectValue placeholder="Selecciona especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={`todos`}>Todos</SelectItem>
                          {state.especialidades.map((especialidad) => (
                            <SelectItem key={especialidad.id} value={`${especialidad.id}`}>
                              {especialidad.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Industria</AccordionTrigger>
                    <AccordionContent>
                      <Select onValueChange={(selectedValue) => handleIndustriaChange(selectedValue)}>
                        <SelectTrigger className="focus-visible:ring-0 border border-black rounded-[10px] focus:ring-0 outline-none">
                          <SelectValue placeholder="Selecciona industria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={`todos`}>Todos</SelectItem>
                          {
                            state.industrias.map((industria)=>
                              <SelectItem value={`${industria.id}`} key={industria.id}>{industria.nombre}</SelectItem>
                            )
                          }
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Servicios</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup defaultValue={`${state.servicios[0]?.id}` || ""} onValueChange={(newValue) => handleServicioChangue(newValue)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="todos" id="radio-todos" />
                          <LabelCn htmlFor="radio-todos" className="text-base font-light">
                              Todos
                          </LabelCn>
                        </div>
                        {state.servicios.map((servicio, index) => {
                          const radioId = `radio-${index}`;
                          return (
                            <div className="flex items-center space-x-2" key={servicio.id || index}>
                              <RadioGroupItem value={`${servicio.id}`} id={radioId} />
                              <LabelCn htmlFor={radioId} className="text-base font-light">
                                {servicio.nombre}
                              </LabelCn>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-8 flex-1 mt-12">
              {
                ofertasFiltradas.map((oferta)=>
                  <ResumeProyect oferta={oferta} inviteProyect={inviteProyect} />
                )
              }
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLawyerPage;
