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
import { IServicio } from "@/interfaces/Servicio.interface";

interface ISelectableService {
  value: string;
  label: string;
}

type ServiceSelectProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function ServiceSelectAbogado({
  updateStateAbogado,
  stateAbogado,
}: ServiceSelectProps) {
  const [selectedServices, setSelectedServices] = useState<IServicio[]>(stateAbogado.servicios);

  // Servicios para visualización
  const selectableServices: ISelectableService[] = [
    { value: "consultoria", label: "Consultoría" },
    { value: "investigacion", label: "Investigación" },
    { value: "litigios", label: "Litigios" },
  ];

  const handleSelect = (value: string) => {
    if (!selectedServices.some((service) => service.nombre === value)) {
      const selectedService = selectableServices.find(
        (s) => s.value === value
      );
      if (selectedService) {
        const newService: IServicio = {
          nombre: selectedService.label,
        };
        const updatedServices = [...selectedServices, newService];
        setSelectedServices(updatedServices);
        updateStateAbogado({ servicios: updatedServices });
      }
    }
  };

  const handleRemove = (value: string) => {
    const updatedServices = selectedServices.filter(
      (service) => service.nombre !== value
    );
    setSelectedServices(updatedServices);
    updateStateAbogado({ servicios: updatedServices });
  };

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
            {selectableServices
              .filter(
                (service) =>
                  !selectedServices.some(
                    (selected) => selected.nombre === service.value
                  )
              )
              .map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-wrap mt-2">
        {selectedServices.map((service) => (
          <span
            key={service.nombre}
            className="bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
          >
            {service.nombre}
            <button
              onClick={() => handleRemove(service.nombre)}
              className="ml-2 text-white focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default ServiceSelectAbogado;
