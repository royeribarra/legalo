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
  // video_url: string;
  archivo_cul: IArchivo | null;
  archivo_imagen: IArchivo | null;
  archivo_cv: IArchivo | null;
  habilidades_duras: IHabilidad[];
  habilidades_blandas: IHabilidad[];
  experiencias: IExperiencia[];
  servicios: number[];
  industrias: number[];
  estudios: IEstudio[];
  especialidades: number[];
};

type RegistroAbogadoContextType = {
  stateAbogado: RegistroAbogadoState;
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void; // Permite actualizar solo propiedades específicas
};

const RegistroAbogadoContext = createContext<RegistroAbogadoContextType | undefined>(undefined);

type OfertaProviderProps = {
  children: ReactNode;
};

export const RegistroAbogadoProvider = ({ children }: OfertaProviderProps) => {
  const [stateAbogado, setStateAbogado] = useState<RegistroAbogadoState>({
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
    archivo_cv: null
  });

  // Usamos useEffect para acceder a localStorage solo en el cliente
  useEffect(() => {
    const savedState = localStorage.getItem("abogadoState");
    if (savedState) {
      setStateAbogado(JSON.parse(savedState));
    }
  }, []);

  const updateStateAbogado = (newState: Partial<RegistroAbogadoState>) => {
    setStateAbogado((prevState) => {
      const updatedState = { ...prevState, ...newState };
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
    throw new Error("useOferta debe usarse dentro de un OfertaProvider");
  }
  return context;
};
