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
  stateAbogado,
}: IndustrySelectProps) {
  const [selectedServices, setSelectedServices] = useState<IIndustria[]>(
    stateAbogado.industrias
  );

  // Función para manejar la selección de una industria
  const handleSelect = (value: string) => {
    const serviceToAdd = services.find((service) => service.value === value);
    if (serviceToAdd && !selectedServices.some((s) => s.nombre === serviceToAdd.label)) {
      const updatedServices = [
        ...selectedServices,
        { id: undefined, nombre: serviceToAdd.label },
      ];
      updateStateAbogado({industrias: updatedServices})
      setSelectedServices(updatedServices);
    }
  };

  // Función para eliminar una industria seleccionada
  const handleRemove = (value: string) => {
    const updatedServices = selectedServices.filter(
      (service) => service.nombre !== value
    );
    updateStateAbogado({industrias: updatedServices})
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

  useEffect(() => {
    if (stateAbogado.industrias) {
      setSelectedServices(stateAbogado.industrias);
    }
  }, [stateAbogado.industrias]);

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
              .filter(
                (service) =>
                  !selectedServices.some((s) => s.nombre === service.label)
              )
              .map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            {selectedServices.length > 0 && (
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

export default IndustrySelectAbogado;