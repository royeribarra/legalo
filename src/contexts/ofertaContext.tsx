import { IArchivo } from "@/interfaces/Archivo.interface";
import { IPregunta } from "@/interfaces/Pregunta.interface";
import { IPresupuesto } from "@/interfaces/Presupuesto.interface";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define la estructura del estado
type OfertaState = {
  selected: number | null;
  uso: string;
  titulo: string;
  especialidades: number[];
  descripcion: string;
  documento: IArchivo | null;
  servicios: number[];
  duracion: string;
  nivelExperiencia: string;
  presupuesto: IPresupuesto | null | undefined;
  preguntas: IPregunta[];
  timestamp: number; // Propiedad adicional para almacenar el tiempo de guardado
};

type OfertaContextType = {
  state: OfertaState;
  updateState: (newState: Partial<OfertaState>) => void;
  setDefaultValues: () => void;
};

const OfertaContext = createContext<OfertaContextType | undefined>(undefined);

type OfertaProviderProps = {
  children: ReactNode;
};

export const OfertaProvider = ({ children }: OfertaProviderProps) => {
  const initialState: OfertaState = {
    selected: null,
    uso: "1",
    titulo: "",
    especialidades: [],
    descripcion: "",
    documento: null,
    servicios: [],
    duracion: "",
    nivelExperiencia: "",
    presupuesto: null,
    preguntas: [],
    timestamp: Date.now(), // Inicializa el timestamp
  };

  const [state, setState] = useState<OfertaState>(initialState);

  useEffect(() => {
    const savedState = localStorage.getItem("ofertaState");

    if (savedState) {
      const parsedState: OfertaState = JSON.parse(savedState);

      // Verifica si han pasado más de 12 horas
      const now = Date.now();
      const twelveHours = 12 * 60 * 60 * 1000; // 12 horas en milisegundos

      if (now - parsedState.timestamp > twelveHours) {
        // Si el estado ha expirado, restablece el estado inicial
        localStorage.removeItem("ofertaState");
        setState(initialState);
      } else {
        setState(parsedState);
      }
    }
  }, []); // Este efecto solo se ejecutará en el cliente, después del montaje

  const updateState = (newState: Partial<OfertaState>) => {
    setState((prevState) => {
      const updatedState = {
        ...prevState,
        ...newState,
        timestamp: Date.now(), // Actualiza el timestamp cada vez que se actualiza el estado
      };

      // Guardar el estado actualizado en localStorage
      localStorage.setItem("ofertaState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const setDefaultValues = () => {
    setState(initialState);
    localStorage.setItem("ofertaState", JSON.stringify(initialState)); // Opcional: también puedes borrar el item de localStorage si lo prefieres
  };

  return (
    <OfertaContext.Provider value={{ state, updateState, setDefaultValues }}>
      {children}
    </OfertaContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useOferta = (): OfertaContextType => {
  const context = useContext(OfertaContext);
  if (!context) {
    throw new Error("useOferta debe usarse dentro de un OfertaProvider");
  }
  return context;
};
