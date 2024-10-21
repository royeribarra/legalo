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

function IndustrySelectAbogado(){
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
      { value: "banca", label: "Banca" },
      { value: "academico", label: "Académico" },
      { value: "juicios", label: "Juicios" },
    ];
  
    const handleRemoveAll = () => {
      setSelectedServices([]);
    };
  
    return (
      <div className="w-full lg:w-1/2">
        <p className="text-sm my-2">Industria</p>
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
              {/* Opción "Quitar todos" solo si todos están seleccionados */}
              {selectedServices.length === services.length && (
                <SelectItem value="remove-all" onClick={handleRemoveAll}>
                  Quitar todos
                </SelectItem>
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
};

export default IndustrySelectAbogado;