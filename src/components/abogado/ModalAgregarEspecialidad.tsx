"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check as CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";
// import { IEspecialidad } from "@/interfaces/Especialidad.interface";

import axios from "axios"; // Asegúrate de importar axios

type ModalAgregarEspecialidadProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function ModalAgregarEspecialidad({
  showModal,
  setShowModal,
  stateAbogado,
  updateStateAbogado,
}: ModalAgregarEspecialidadProps) {
  const [selectServices, setSelectServices] = useState<number[]>([]); // Solo guardamos IDs
  const [serviceList, setServiceList] = useState<
    { id: number; nombre: string; imagen: string }[]
  >([]); // Lista de especialidades obtenidas desde la API

  // Efecto para obtener las especialidades desde la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/servicios");
        setServiceList(response.data); // Seteamos la lista de especialidades obtenidas
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  // Función para seleccionar o deseleccionar una especialidad
  const selectEspecialidad = (item: { id: number; nombre: string; imagen: string }) => {
    const exists = selectServices.includes(item.id); // Verificamos si el ID ya está seleccionado

    if (selectServices.length >= 5 && !exists) {
      console.log("No se puede agregar más de 5 especialidades");
      return;
    }

    if (exists) {
      // Si ya está seleccionada, la eliminamos del array de IDs
      setSelectServices(selectServices.filter((id) => id !== item.id));
    } else {
      // Si no está seleccionada y hay espacio, la agregamos
      setSelectServices([...selectServices, item.id]);
    }
  };

  // Función para guardar las especialidades seleccionadas
  const guardarEspecialidad = () => {
    // Solo pasamos los IDs al backend
    updateStateAbogado({ especialidades: selectServices });
    setShowModal(false);
  };

  // Sincronizamos el estado inicial con las especialidades de `stateAbogado`
  useEffect(() => {
    setSelectServices(stateAbogado.especialidades || []);
  }, [stateAbogado.especialidades]);

  return showModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="relative w-full max-w-[900px] bg-white rounded-lg shadow-lg p-10 overflow-hidden">
        <h2 className="text-5xl mb-4 font-nimbus">¿Cuál es tu especialidad?</h2>
        <p className="text-lg my-4">
          Puedes escoger como mínimo 1 y como máximo 5. Esto se mostrará en tu
          perfil público*
        </p>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {serviceList.map((item) => {
              const isSelected = selectServices.includes(item.id); // Verificamos si el ID está seleccionado

              return (
                <div
                  key={item.id} // Usamos el ID como clave
                  className="relative p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
                  onClick={() => selectEspecialidad(item)}
                >
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full ${
                      isSelected ? "bg-[#D5F1F0]" : "bg-[#D9D9D9]"
                    }`}
                  >
                    <Image
                      src={item.imagen}
                      alt={item.nombre}
                      width={25}
                      height={25}
                    />
                  </div>
                  <p className="mt-2 text-center">{item.nombre}</p>
                  <div
                    className={`absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-sm ${
                      isSelected ? "bg-[#007AFF]" : "border border-black"
                    }`}
                  >
                    {isSelected && <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-6 pt-4 mt-4">
          <Button
            className="w-[190px] h-12 rounded-[10px]"
            onClick={guardarEspecialidad}
          >
            Aceptar
          </Button>
          <Button
            className="w-[190px] h-12 rounded-[10px] border border-gray-300"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ModalAgregarEspecialidad;
