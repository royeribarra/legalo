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
// import { IServicio } from "@/interfaces/Servicio.interface";
import axios from "axios";

interface ISelectableService {
  id: number;   // ID del servicio
  nombre: string; // Nombre del servicio
}

type ServiceSelectProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function ServiceSelectAbogado({
  updateStateAbogado,
  stateAbogado,
}: ServiceSelectProps) {
  const [selectedServices, setSelectedServices] = useState<number[]>(stateAbogado.servicios); // Solo guardamos los IDs
  const [availableServices, setAvailableServices] = useState<ISelectableService[]>([]); // Servicios disponibles

  // Efecto para obtener los servicios disponibles desde la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_APP_API_URL}/servicios/all`);
        // La respuesta es un array de objetos {id, nombre}
        setAvailableServices(response.data);
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  const handleSelect = (value: number) => {
    // Si el servicio no está ya seleccionado
    if (!selectedServices.includes(value)) {
      const updatedServices = [...selectedServices, value];
      setSelectedServices(updatedServices);
      updateStateAbogado({ servicios: updatedServices });  // Guardamos solo los IDs
    }
  };

  const handleRemove = (value: number) => {
    const updatedServices = selectedServices.filter((service) => service !== value);
    setSelectedServices(updatedServices);
    updateStateAbogado({ servicios: updatedServices });  // Guardamos solo los IDs
  };

  // Servicios seleccionados, para mostrar sus nombres
  const selectedServiceNames = availableServices.filter((service) =>
    selectedServices.includes(service.id) // Comparamos con los IDs seleccionados
  );

  return (
    <div className="w-full lg:w-1/2">
      <p className="text-sm my-2">¿Cuáles son los servicios que ofreces?*</p>
      <Select onValueChange={(value) => handleSelect(Number(value))}> {/* Aquí convertimos el valor a número */}
        <SelectTrigger className="flex flex-wrap items-center">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Servicios</SelectLabel>
            {availableServices
              .filter(
                (service) =>
                  !selectedServices.includes(service.id) // Filtramos los servicios ya seleccionados
              )
              .map((service) => (
                <SelectItem key={service.id} value={String(service.id)}> {/* Usamos el ID como string */}
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

export default ServiceSelectAbogado;
