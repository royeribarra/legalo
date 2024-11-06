"use client";
import React, { useEffect, useState } from "react";
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
  AccordionTriggerBig,
} from "@/components/ui/accordion";
import ProyectItem from "@/components/dashboard/ProyectItem";
import AbogadoResumeCard from "@/components/dashboard/AbogadoResumeCard";

const DashboardClientPage = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(true);
  const [menuActive, setMenuActive] = useState("abogados");

  const menuItems = [
    { id: "abogados", texto: "Abogados" },
    { id: "proyectos", texto: "Proyectos" },
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
        {/* <InfoNominations /> */}
      </div>

      {/* Dashboard */}
      <div className="mt-8">
        <div className="border-b-2 border-[#808080] flex w-full overflow-scroll lg:overflow-auto">
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
                      <AccordionTrigger>Ubicación del cliente</AccordionTrigger>
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
                          <label htmlFor="check1">Intermedio (5-10 años)</label>
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

            {menuActive === "abogados" && (
              <div className="flex flex-col gap-8 flex-1 mt-12">
                <AbogadoResumeCard />
              </div>
            )}
            {menuActive === "proyectos" && (
              <div className="flex flex-col gap-8 flex-1 mt-12">
                <AbogadoResumeCard />
                <AbogadoResumeCard />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClientPage;
