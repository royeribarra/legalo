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
import { industriaService } from "@/services";

interface ISelectableService {
  id: number;
  nombre: string;
}

type IndustrySelectProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function IndustrySelectAbogado({
  updateStateAbogado,
  stateAbogado,
}: IndustrySelectProps) {
  const [selectedServices, setSelectedServices] = useState<number[]>(stateAbogado.industrias);
  const [availableServices, setAvailableServices] = useState<ISelectableService[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await industriaService.obtenerTodos();
        setAvailableServices(response);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (stateAbogado.industrias && stateAbogado.industrias.length > 0) {
      setSelectedServices(stateAbogado.industrias);
    }
  }, [stateAbogado.industrias]);

  const handleSelect = (value: number) => {
    if (!selectedServices.includes(value)) {
      const updatedServices = [...selectedServices, value];
      setSelectedServices(updatedServices);
      updateStateAbogado({ industrias: updatedServices });
    }
  };

  const handleRemove = (value: number) => {
    const updatedServices = selectedServices.filter((service) => service !== value);
    setSelectedServices(updatedServices);
    updateStateAbogado({ industrias: updatedServices });
  };

  const selectedServiceNames = availableServices.filter((service) =>
    selectedServices.includes(service.id)
  );

  return (
    <div className="w-full lg:w-1/2">
      <p className="text-sm my-2">¿En qué industria tienes experiencia?</p>
      <Select onValueChange={(value) => handleSelect(Number(value))}>
        <SelectTrigger className="flex flex-wrap items-center">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Industrias</SelectLabel>
            {availableServices
              .filter(
                (service) =>
                  !selectedServices.includes(service.id)
              )
              .map((service) => (
                <SelectItem key={service.id} value={String(service.id)}>
                  {service.nombre}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-wrap mt-2">
        {selectedServiceNames.length > 0 ? (
          selectedServiceNames.map((service) => (
            <span
              key={service.id}
              className="bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
            >
              {service.nombre}
              <button
                onClick={() => handleRemove(service.id)}
                className="ml-2 text-white focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))
        ) : (
          <p className="text-gray-500">Selecciona servicios</p>
        )}
    </div>
    </div>
  );
}

export default IndustrySelectAbogado;