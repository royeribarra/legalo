import { IEspecialidad } from "@/interfaces/Especialidad.interface";
import { IIndustria } from "@/interfaces/Industria.interface";
import { IServicio } from "@/interfaces/Servicio.interface";
import { especialidadService, industriaService, servicioService } from "@/services";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type DashboardAbogadoState = {
  servicios: IServicio[];
  industrias: IIndustria[];
  especialidades: IEspecialidad[];
};

type DashboardAbogadoContextType = {
  state: DashboardAbogadoState;
  updateState: (newState: Partial<DashboardAbogadoState>) => void; // Permite actualizar solo propiedades específicas
};

const DashboardAbogadoContext = createContext<DashboardAbogadoContextType | undefined>(undefined);

type DashboardAbogadoProviderProps = {
  children: ReactNode;
};

export const DashboardAbogadoProvider = ({ children }: DashboardAbogadoProviderProps) => {
  const [state, setState] = useState<DashboardAbogadoState>({
    industrias: [],
    servicios: [],
    especialidades: []
  });

  const updateState = (newState: Partial<DashboardAbogadoState>) => {
    setState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      localStorage.setItem("ofertaState", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  async function fetchServicios() {
    try {
      const data = await servicioService.obtenerTodos();
      setState((prevState) => ({
        ...prevState,
        servicios: data || [],
      }));
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  async function fetchIndustrias() {
    try {
      const data = await industriaService.obtenerTodos();
      setState((prevState) => ({
        ...prevState,
        industrias: data || [],
      }));
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  async function fetchEspecialidades() {
    try {
      const data = await especialidadService.obtenerTodos();
      setState((prevState) => ({
        ...prevState,
        especialidades: data || [],
      }));
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  useEffect(()=>{
    fetchEspecialidades();
    fetchIndustrias();
    fetchServicios();
  }, []);

  return (
    <DashboardAbogadoContext.Provider value={{ state, updateState }}>
      {children}
    </DashboardAbogadoContext.Provider>
  );
};

export const useDashboardAbogado = (): DashboardAbogadoContextType => {
  const context = useContext(DashboardAbogadoContext);
  if (!context) {
    throw new Error("useOferta debe usarse dentro de un OfertaProvider");
  }
  return context;
};
