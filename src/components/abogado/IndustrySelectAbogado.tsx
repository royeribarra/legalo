import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";
import { IIndustria } from "@/interfaces/Industria.interface";

type IndustrySelectProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function IndustrySelectAbogado({
  updateStateAbogado,
  stateAbogado
}: IndustrySelectProps) {
  const [selectedServices, setSelectedServices] = useState<IIndustria[]>(stateAbogado.industrias);

  // Función para manejar la selección de una industria
  const handleSelect = (value: string) => {
    if (!selectedServices.includes(value)) {
      const updatedServices = [...selectedServices, value];
      setSelectedServices(updatedServices);
    }
  };

  const handleRemove = (value: string) => {
    const updatedServices = selectedServices.filter((service) => service !== value);
    setSelectedServices(updatedServices);
  };

  // Función para eliminar todas las industrias seleccionadas
  const handleRemoveAll = () => {
    setSelectedServices([]);
  };

  // Definición de las industrias disponibles
  const services = [
    { value: "banca", label: "Banca" },
    { value: "academico", label: "Académico" },
    { value: "juicios", label: "Juicios" },
  ];

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
              .filter((service) => !selectedServices.includes(service.value))
              .map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
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
}

export default IndustrySelectAbogado;
