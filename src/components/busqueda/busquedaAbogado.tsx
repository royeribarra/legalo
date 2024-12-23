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

import { Label as LabelCn } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDashboardCliente } from "@/contexts/dashboardClienteContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import AbogadoResumeCard from "@/components/dashboard/AbogadoResumeCard";
import { abogadoService } from "@/services";

function BusquedaAbogado(){
    const { state } = useDashboardCliente();
    const [abogados, setAbogados] = useState<IAbogadoBack[]>([]);
    const [abogadosFiltrados, setAbogadosFiltrados] = useState<IAbogadoBack[]>([]);
    const [openFilter, setOpenFilter] = useState(true);
    const [filtroServicio, setFiltroServicio] = useState<number | null>(null);
    const [filtroEspecialidad, setFiltroEspecialidad] = useState<number | null>(null);
    const [filtroIndustria, setFiltroIndustria] = useState<number | null>(null);

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
          setAbogadosFiltrados(data)
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
        let filtrados = abogados;
        if (especialidadId) {
          filtrados = filtrados.filter((abogado) =>
            abogado.especialidadesAbogado.some(
              (especialidad) => especialidad.especialidad.id === especialidadId
            )
          );
        }
    
        if (servicioId) {
          filtrados = filtrados.filter((abogado) =>
            abogado.serviciosAbogado.some(
              (servicio) => servicio.servicio.id === servicioId
            )
          );
        }
    
        if (industriaId) {
          filtrados = filtrados.filter((abogado) =>
            abogado.industriasAbogado.some(
              (industria) => industria.industria.id === industriaId
            )
          );
        }
        setAbogadosFiltrados(filtrados);
    };

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
                                <Select onValueChange={(selectedValue) => handleEspecialidadChange(selectedValue)}>
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
                                <Select onValueChange={(selectedValue) => handleIndustriaChange(selectedValue)}>
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
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Servicios</AccordionTrigger>
                            <AccordionContent>
                                <RadioGroup  defaultValue={`${state.servicios[0]?.id}` || ""} onValueChange={(newValue) => handleServicioChangue(newValue)}>
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
                    abogadosFiltrados.map((abogado)=> 
                    <AbogadoResumeCard inviteProyect={inviteProyect} abogado={abogado} />
                    )
                }
                </div>
            </div>
        </>
    )
}

export default BusquedaAbogado;