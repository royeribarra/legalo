import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

function ServiceSelectAbogado(){
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    
    const handleSelect = (value: string) => {
        // Verifica si el servicio ya está seleccionado
        if (!selectedServices.includes(value)) {
        setSelectedServices([...selectedServices, value]);
        }
    };
    
    const handleRemove = (value: string) => {
        setSelectedServices(
        selectedServices.filter((service) => service !== value)
        );
    };
    
    const services = [
        { value: "consultoria", label: "Consultoría" },
        { value: "investigacion", label: "Investigación" },
        { value: "litigios", label: "Litigios" },
    ];
    
    return (
        <div className="w-full lg:w-1/2">
        <p className="text-sm my-2">¿Cuáles son los servicios que ofreces?*</p>
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="flex flex-wrap items-center">
            <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>Servicios</SelectLabel>
                {services
                .filter((service) => !selectedServices.includes(service.value)) // Filtra los servicios seleccionados
                .map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                    {service.label}
                    </SelectItem>
                ))}
                {selectedServices.length === services.length && (
                <div className="p-2 text-green-500 text-sm">
                    Todos fueron seleccionados
                </div>
                )}
            </SelectGroup>
            </SelectContent>
        </Select>
        <div className="flex flex-wrap mt-2">
            {selectedServices.map((service) => (
            <span
                key={service}
                className="bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
            >
                {services.find((s) => s.value === service)?.label}
                <button
                onClick={() => handleRemove(service)}
                className="ml-2 text-white focus:outline-none"
                >
                &times; {/* Icono de cierre */}
                </button>
            </span>
            ))}
        </div>
        </div>
    );
}

export default ServiceSelectAbogado;