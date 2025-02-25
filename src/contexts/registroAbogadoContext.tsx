import { IArchivo } from "@/interfaces/Archivo.interface";
// import { IEspecialidad } from "@/interfaces/Especialidad.interface";
import { IEstudio } from "@/interfaces/Estudio.interface";
import { IExperiencia } from "@/interfaces/Experiencia.interface";
import { IHabilidad } from "@/interfaces/Habilidad.interface";
import { IIndustria } from "@/interfaces/Industria.interface";
// import { IServicio } from "@/interfaces/Servicio.interface";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define la estructura del estado
export type RegistroAbogadoState = {
  nombres: string;
  apellidos: string;
  email: string;
  ubicacion: string;
  contrasena: string;
  terms: boolean;
  dni: string;
  telefono: string;
  grado: string;
  cip: string;
  colegio: string;
  sobre_ti: string;
  archivo_cul: IArchivo | null;
  archivo_imagen: IArchivo | null;
  archivo_cv: IArchivo | null;
  archivo_video: IArchivo | null;
  habilidades_duras: IHabilidad[];
  habilidades_blandas: IHabilidad[];
  experiencias: IExperiencia[];
  servicios: number[];
  industrias: number[];
  estudios: IEstudio[];
  especialidades: number[];
  objetivo: string;
};

type RegistroAbogadoContextType = {
  stateAbogado: RegistroAbogadoState;
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
};

const RegistroAbogadoContext = createContext<RegistroAbogadoContextType | undefined>(undefined);

type OfertaProviderProps = {
  children: ReactNode;
};

const defaultState: RegistroAbogadoState & { caducidad?: number } = {
  nombres: "",
  apellidos: "",
  email: "",
  ubicacion: "",
  contrasena: "",
  terms: false,
  dni: "",
  telefono: "",
  grado: "",
  cip: "",
  colegio: "",
  sobre_ti: "",
  habilidades_duras: [],
  habilidades_blandas: [],
  experiencias: [],
  servicios: [],
  estudios: [],
  especialidades: [],
  industrias: [],
  archivo_cul: null,
  archivo_imagen: null,
  archivo_cv: null,
  archivo_video: null,
  objetivo: "",
  caducidad: Date.now() + 12 * 60 * 60 * 1000, // 12 horas en milisegundos
};

const isValidState = (state: any): state is RegistroAbogadoState & { caducidad?: number } => {
  try {
    return (
      typeof state === "object" &&
      state !== null &&
      typeof state.caducidad === "number" &&
      state.caducidad > Date.now() && // Verifica si la caducidad no ha expirado
      typeof state.nombres === "string" &&
      typeof state.apellidos === "string" &&
      typeof state.email === "string" &&
      typeof state.ubicacion === "string" &&
      typeof state.contrasena === "string" &&
      typeof state.terms === "boolean" &&
      typeof state.dni === "string" &&
      typeof state.telefono === "string" &&
      typeof state.grado === "string" &&
      typeof state.cip === "string" &&
      typeof state.colegio === "string" &&
      typeof state.sobre_ti === "string" &&
      typeof state.objetivo === "string" &&
      Array.isArray(state.habilidades_duras) &&
      Array.isArray(state.habilidades_blandas) &&
      Array.isArray(state.experiencias) &&
      Array.isArray(state.servicios) &&
      Array.isArray(state.industrias) &&
      Array.isArray(state.estudios) &&
      Array.isArray(state.especialidades) &&
      (state.archivo_cul === null || typeof state.archivo_cul === "object") &&
      (state.archivo_imagen === null || typeof state.archivo_imagen === "object") &&
      (state.archivo_cv === null || typeof state.archivo_cv === "object")
    );
  } catch {
    return false;
  }
};

export const RegistroAbogadoProvider = ({ children }: OfertaProviderProps) => {
  const [stateAbogado, setStateAbogado] = useState<RegistroAbogadoState>(defaultState);

  useEffect(() => {
    const savedState = localStorage.getItem("abogadoState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (isValidState(parsedState)) {
        setStateAbogado(parsedState);
      } else {
        console.warn("Estado inválido o caducado en localStorage. Restableciendo valores por defecto.");
        localStorage.setItem("abogadoState", JSON.stringify(defaultState));
        setStateAbogado(defaultState);
      }
    }
  }, []);

  const updateStateAbogado = (newState: Partial<RegistroAbogadoState>) => {
    setStateAbogado((prevState) => {
      const updatedState = {
        ...prevState,
        ...newState,
        caducidad: Date.now() + 12 * 60 * 60 * 1000, // Renueva la caducidad a 12 horas
      };
      localStorage.setItem("abogadoState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  return (
    <RegistroAbogadoContext.Provider value={{ stateAbogado, updateStateAbogado }}>
      {children}
    </RegistroAbogadoContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useRegistroAbogado = (): RegistroAbogadoContextType => {
  const context = useContext(RegistroAbogadoContext);
  if (!context) {
    throw new Error("useRegistroAbogado debe usarse dentro de un RegistroAbogadoProvider");
  }
  return context;
};
