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
};

type OfertaContextType = {
  state: OfertaState;
  updateState: (newState: Partial<OfertaState>) => void; // Permite actualizar solo propiedades específicas
};

const OfertaContext = createContext<OfertaContextType | undefined>(undefined);

type OfertaProviderProps = {
  children: ReactNode;
};

export const OfertaProvider = ({ children }: OfertaProviderProps) => {
  const [state, setState] = useState<OfertaState>({
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
  });

  // Usamos useEffect para acceder a localStorage solo en el cliente
  useEffect(() => {
    const savedState = localStorage.getItem("ofertaState");
    if (savedState) {
      setState(JSON.parse(savedState));
    }
  }, []); // Este efecto solo se ejecutará en el cliente, después del montaje

  const updateState = (newState: Partial<OfertaState>) => {
    setState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      // Guardar el estado actualizado en localStorage
      localStorage.setItem("ofertaState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  return (
    <OfertaContext.Provider value={{ state, updateState }}>
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
