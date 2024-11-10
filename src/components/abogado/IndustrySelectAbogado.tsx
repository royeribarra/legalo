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

function IndustrySelectAbogado() {
  // Estado para almacenar las industrias seleccionadas
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Recupera las industrias seleccionadas desde localStorage
  useEffect(() => {
    const storedServices = localStorage.getItem("industriasAbogado");
    if (storedServices) {
      setSelectedServices(JSON.parse(storedServices));
    }
  }, []);

  // Función para manejar la selección de una industria
  const handleSelect = (value: string) => {
    // Verifica si la industria ya está seleccionada
    if (!selectedServices.includes(value)) {
      const updatedServices = [...selectedServices, value];
      setSelectedServices(updatedServices);
      // Guarda la selección en localStorage
      localStorage.setItem("industriasAbogado", JSON.stringify(updatedServices));
    }
  };

  // Función para eliminar una industria de la selección
  const handleRemove = (value: string) => {
    const updatedServices = selectedServices.filter((service) => service !== value);
    setSelectedServices(updatedServices);
    // Guarda la nueva selección en localStorage
    localStorage.setItem("industriasAbogado", JSON.stringify(updatedServices));
  };

  // Función para eliminar todas las industrias seleccionadas
  const handleRemoveAll = () => {
    setSelectedServices([]);
    // Elimina las industrias del localStorage
    localStorage.removeItem("industriasAbogado");
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
              .filter((service) => !selectedServices.includes(service.value)) // Filtra las industrias seleccionadas
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
}

export default IndustrySelectAbogado;
