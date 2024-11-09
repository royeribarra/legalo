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

const DashboardLawyerPage = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const [menuActive, setMenuActive] = useState("oportunidades");

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

  useEffect(() => {
    // Fitro contraido por defecto en mobile
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setOpenFilter(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setOpenFilter(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="px-4 py-4 lg:px-16 lg:py-8 max-w-[1920px] mx-auto">
      <div className="flex justify-between flex-col-reverse lg:flex-row gap-4 ">
        <div>
          <p className="pb-2">Búsqueda por palabra clave</p>
          <div className="flex items-center gap-4 border border-black rounded-full h-12 px-4 lg:w-[553px]">
            <IcoSearch size={24} />
            <input type="text" placeholder="Escribe..." className="" />
          </div>
        </div>
        <InfoNominations />
      </div>

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
                          <Select>
                            <SelectTrigger className="focus-visible:ring-0 border border-black rounded-[10px] focus:ring-0 outline-none">
                              <SelectValue placeholder="Selecciona especialidad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="a">Light</SelectItem>
                              <SelectItem value="b">Dark</SelectItem>
                              <SelectItem value="c">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Industria</AccordionTrigger>
                        <AccordionContent>
                          <Select>
                            <SelectTrigger className="focus-visible:ring-0 border border-black rounded-[10px] focus:ring-0 outline-none">
                              <SelectValue placeholder="Selecciona industria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="a">Light</SelectItem>
                              <SelectItem value="b">Dark</SelectItem>
                              <SelectItem value="c">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          Ubicación del cliente
                        </AccordionTrigger>
                        <AccordionContent>
                          <Select>
                            <SelectTrigger className="focus-visible:ring-0 border border-black rounded-[10px] focus:ring-0 outline-none">
                              <SelectValue placeholder="Selecciona ubicación" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="a">Light</SelectItem>
                              <SelectItem value="b">Dark</SelectItem>
                              <SelectItem value="c">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Experiencia</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                          <div className="flex items-center space-x-2 text-base">
                            <Checkbox id="check1" />
                            <label htmlFor="check1">Senior (+10 años)</label>
                          </div>
                          <div className="flex items-center space-x-2 text-base">
                            <Checkbox id="check1" />
                            <label htmlFor="check1">
                              Intermedio (5-10 años)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 text-base">
                            <Checkbox id="check1" />
                            <label htmlFor="check1">Junior (&lt; 5 años)</label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>Tipo</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2 ">
                              <RadioGroupItem value="r1" id="r1" />
                              <LabelCn
                                htmlFor="r1"
                                className="text-base font-light"
                              >
                                Todos
                              </LabelCn>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="r2" id="r2" />
                              <LabelCn
                                htmlFor="r2"
                                className="text-base font-light"
                              >
                                Asesoría legal (Por horas)
                              </LabelCn>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="r3" id="r3" />
                              <LabelCn
                                htmlFor="r3"
                                className="text-base font-light"
                              >
                                Proyecto legal (Días o semanas)
                              </LabelCn>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="r4" id="r4" />
                              <LabelCn
                                htmlFor="r4"
                                className="text-base font-light"
                              >
                                Litigio (Estimación por caso)
                              </LabelCn>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="r5" id="r5" />
                              <LabelCn
                                htmlFor="r5"
                                className="text-base font-light"
                              >
                                Practicas profesionales (meses)
                              </LabelCn>
                            </div>
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-6">
                        <AccordionTrigger>Duración</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                          <div className="flex items-center space-x-2 text-base">
                            <Checkbox id="check1" />
                            <label htmlFor="check1">
                              Corto plazo ( 1- 6 meses)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 text-base">
                            <Checkbox id="check1" />
                            <label htmlFor="check1">
                              Mediano plazo ( 6 - 12 meses)
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 text-base">
                            <Checkbox id="check1" />
                            <label htmlFor="check1">
                              Largo plazo (+ 12 meses)
                            </label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-8 flex-1">
                <ResumeProyect />
                <ResumeProyect />
                <ResumeProyect />
                <ResumeProyect />
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
          <div className="flex flex-col gap-8 flex-1 mt-12">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTriggerBig className="text-2xl font-bold">
                  Cotización aceptada (1)
                </AccordionTriggerBig>
                <AccordionContent className="flex flex-col gap-4">
                  <ProyectItem tipe="cotizacionAceptada" />
                  <ProyectItem tipe="cotizacionPorExpirar" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTriggerBig className="text-2xl font-bold">
                  Cotización enviada (5)
                </AccordionTriggerBig>
                <AccordionContent className="flex flex-col gap-4">
                  <ProyectItem tipe="postulacionEnviada" />
                  <ProyectItem tipe="postulacionEnviada" />
                  <ProyectItem tipe="postulacionEnviada" />
                  <ProyectItem tipe="postulacionEnviada" />
                  <ProyectItem tipe="postulacionEnviada" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLawyerPage;
