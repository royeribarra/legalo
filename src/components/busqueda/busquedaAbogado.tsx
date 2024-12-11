import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Label as LabelCn } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDashboardCliente } from "@/contexts/dashboardClienteContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import AbogadoResumeCard from "@/components/dashboard/AbogadoResumeCard";
import { abogadoService } from "@/services";

function BusquedaAbogado(){
    const { state } = useDashboardCliente();
    const [abogados, setAbogados] = useState<IAbogadoBack[]>([]);
    const [openFilter, setOpenFilter] = useState(true);
    const handleFilter = () => {
        setOpenFilter(!openFilter);
    };

    const inviteProyect = (abogadoId: number = 0) => {
        console.log(abogadoId)
    };

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

    return(
        <>
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
                                {
                                state.especialidades.map((especialidad)=>
                                    <SelectItem value={`${especialidad.id}`}>{especialidad.nombre}</SelectItem>
                                )
                                }
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
                                {
                                state.industrias.map((industria)=>
                                    <SelectItem value={`${industria.id}`}>{industria.nombre}</SelectItem>
                                )
                                }
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
                            <label htmlFor="check1">
                                Junior (&lt; 5 años)
                            </label>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                        <AccordionTrigger>Servicios</AccordionTrigger>
                        <AccordionContent>
                            <RadioGroup defaultValue="comfortable">
                            {
                                state.servicios.map((servicio)=> 
                                <div className="flex items-center space-x-2 ">
                                    <RadioGroupItem value="r1" id="r1" />
                                    <LabelCn
                                    htmlFor="r1"
                                    className="text-base font-light"
                                    >
                                    {servicio.nombre}
                                    </LabelCn>
                                </div>
                                )
                            }
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
                <div className="flex flex-col gap-8 flex-1 mt-12">
                {
                    abogados.map((abogado)=> 
                    <AbogadoResumeCard inviteProyect={inviteProyect} abogado={abogado} />
                    )
                }
                </div>
            </div>
        </>
    )
}

export default BusquedaAbogado;