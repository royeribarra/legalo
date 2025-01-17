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

const DashboardLawyerPage = () => {
  const {token} = useAuth();
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const { state } = useDashboardAbogado();
  const [menuActive, setMenuActive] = useState("oportunidades");
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);
  const [ofertasFiltradas, setAbogadosFiltrados] = useState<IOfertaBack[]>([]);
  const [ofertaPrevioInvitado, setOfertaPrevioInvitado] = useState<number>(0);
  const [inviteProyectModal, setInviteProyectModal] = useState(false);

  const [filtroServicio, setFiltroServicio] = useState<number | null>(null);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState<number | null>(null);
  const [filtroIndustria, setFiltroIndustria] = useState<number | null>(null);

  const menuItems = [
    { id: "oportunidades", texto: "Oportunidades para ti" },
    { id: "publicadas", texto: "Publicadas recientemente" },
    { id: "invitaciones", texto: "Invitaciones" },
    { id: "guardados", texto: "Guardados" },
    { id: "postulaciones", texto: "Postulaciones" },
  ];

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const inviteProyect = (abogadoId: number) => {
    setOfertaPrevioInvitado(abogadoId);
    setInviteProyectModal(true);
  };

  useEffect(() => {
    // Fitro contraido por defecto en mobile
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setOpenFilter(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setOpenFilter(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  async function fetchAbogados() {
    try {
      const data = await ofertaservice.obtenerTodos();
      setOfertas(data);
      setAbogadosFiltrados(data);
      console.log(data)
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  useEffect(()=> {
    fetchAbogados();
  }, []);

  const handleServicioChangue = (newValue: string) => {
    setFiltroServicio(Number(newValue));
    filtrarAbogados(filtroEspecialidad, Number(newValue), filtroIndustria);
  };

  const handleEspecialidadChange = (selectedValue: string) => {
    setFiltroEspecialidad(Number(selectedValue));
    filtrarAbogados(Number(selectedValue), filtroServicio, filtroIndustria);
  };

  const handleIndustriaChange = (selectedValue: string) => {
    setFiltroIndustria(Number(selectedValue));
    filtrarAbogados(filtroEspecialidad, filtroServicio, Number(selectedValue));
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
    setAbogadosFiltrados(filtrados);
  };

  return (
    <div className="px-4 py-4 lg:px-16 lg:py-8 max-w-[1920px] mx-auto">
      {/* <div className="flex justify-between flex-col-reverse lg:flex-row gap-4 ">
        <div>
          <p className="pb-2">Búsqueda por palabra clave</p>
          <div className="flex items-center gap-4 border border-black rounded-full h-12 px-4 lg:w-[553px]">
            <IcoSearch size={24} />
            <input type="text" placeholder="Escribe..." className="" />
          </div>
        </div>
        <InfoNominations />
      </div> */}

      {/* Dashboard */}
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

        {menuActive === "oportunidades" && (
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

              {/* <div className="flex flex-col gap-8 flex-1">
                <ResumeProyect />
                <ResumeProyect />
                <ResumeProyect />
                <ResumeProyect />
              </div> */}
              <div className="flex flex-col gap-8 flex-1 mt-12">
                  {
                    ofertasFiltradas.map((oferta)=>
                      <ResumeProyect oferta={oferta} inviteProyect={inviteProyect} />
                    )
                  }
                </div>
            </div>
          </div>
        )}

        {menuActive === "publicadas" && (
          <div className="flex flex-col gap-8 flex-1 mt-12">
            <ProyectItem tipe="sinPostular" />
          </div>
        )}
        {menuActive === "invitaciones" && (
          <div className="flex flex-col gap-8 flex-1 mt-12">
            <ProyectItem tipe="sinPostular" />
            <ProyectItem tipe="sinPostular" />
          </div>
        )}
        {menuActive === "guardados" && (
          <div className="flex flex-col gap-8 flex-1 mt-12">
            <ProyectItem tipe="sinPostular" />
            <ProyectItem tipe="sinPostular" />
            <ProyectItem tipe="sinPostular" />
          </div>
        )}
        {menuActive === "postulaciones" && (
          <Postulaciones abogado={token?.abogado}></Postulaciones>
        )}
      </div>
    </div>
  );
};

export default DashboardLawyerPage;
