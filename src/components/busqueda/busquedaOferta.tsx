
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    AccordionTriggerBig,
} from "@/components/ui/accordion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label as LabelCn } from "@/components/ui/label";
import ResumeProyect from "@/components/dashboard/ResumeProyect";
import ProyectItem from "@/components/dashboard/ProyectItem";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { ofertaservice } from "@/services";
import { useDashboardCliente } from "@/contexts/dashboardClienteContext";

const menuItems = [
    { id: "oportunidades", texto: "Oportunidades para ti" },
    { id: "publicadas", texto: "Publicadas recientemente" },
    { id: "invitaciones", texto: "Invitaciones" },
    { id: "guardados", texto: "Guardados" },
    { id: "postulaciones", texto: "Postulaciones" },
];

function BusquedaOferta(){
    const { state } = useDashboardCliente();
    const [menuActive, setMenuActive] = useState("oportunidades");
    const [openFilter, setOpenFilter] = useState<boolean>(true);
    const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);
    const [ofertasFiltrados, setOfertasFiltrados] = useState<IOfertaBack[]>([]);
    const [filtroServicio, setFiltroServicio] = useState<number | null>(null);
    const [filtroEspecialidad, setFiltroEspecialidad] = useState<number | null>(null);
    const [filtroIndustria, setFiltroIndustria] = useState<number | null>(null);

    const handleFilter = () => {
        setOpenFilter(!openFilter);
    };

    const inviteProyect = (abogadoId: number = 0) => {
        console.log(abogadoId)
    };

    async function fetchOfertas() {
        try {
          const data = await ofertaservice.obtenerTodos();
          setOfertas(data);
          setOfertasFiltrados(data)
          console.log(data)
        } catch (error) {
          console.error("Error al obtener el detalle:", error);
        }
      }
    
    useEffect(()=> {
        fetchOfertas();
    }, []);

    const handleServicioChangue = (newValue: string) => {
        setFiltroServicio(Number(newValue));
        filtrarOfertas(filtroEspecialidad, Number(newValue), filtroIndustria);
      };
    
      const handleEspecialidadChange = (selectedValue: string) => {
        setFiltroEspecialidad(Number(selectedValue));
        filtrarOfertas(Number(selectedValue), filtroServicio, filtroIndustria);
      };
    
      const handleIndustriaChange = (selectedValue: string) => {
        setFiltroIndustria(Number(selectedValue));
        filtrarOfertas(filtroEspecialidad, filtroServicio, Number(selectedValue));
      };
    
      const filtrarOfertas = (especialidadId: number | null, servicioId: number | null, industriaId: number | null ) => {
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
        setOfertasFiltrados(filtrados);
    };

    return(
        <div className="mt-8">
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
                        {/* <AccordionItem value="item-3">
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
                        </AccordionItem> */}
                        {/* <AccordionItem value="item-4">
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
                        </AccordionItem> */}
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
                        {/* <AccordionItem value="item-6">
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
                        </AccordionItem> */}
                        </Accordion>
                    </div>
                    </div>
                )}

                <div className="flex flex-col gap-8 flex-1">
                    {
                        ofertasFiltrados.map((oferta)=>
                            <ResumeProyect oferta={oferta} inviteProyect={inviteProyect} />
                        )
                    }
                    {/* <ResumeProyect />
                    <ResumeProyect />
                    <ResumeProyect />
                    <ResumeProyect /> */}
                </div>
                </div>
            </div>
            )}

            {/* {menuActive === "publicadas" && (
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
            )} */}
        </div>
    );
}

export default BusquedaOferta;