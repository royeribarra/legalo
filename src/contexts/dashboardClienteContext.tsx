import { IEspecialidad } from "@/interfaces/Especialidad.interface";
import { IIndustria } from "@/interfaces/Industria.interface";
import { IServicio } from "@/interfaces/Servicio.interface";
import { especialidadService, industriaService, ofertaservice, servicioService, trabajoService } from "@/services";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./authContext";

type DashboardClienteState = {
  servicios: IServicio[];
  industrias: IIndustria[];
  especialidades: IEspecialidad[];
  totalEncargos: number;
  totalTrabajos: number;
};

type DashboardClienteContextType = {
  state: DashboardClienteState;
  updateState: (newState: Partial<DashboardClienteState>) => void; // Permite actualizar solo propiedades específicas
};

const DashboardClienteContext = createContext<DashboardClienteContextType | undefined>(undefined);

type DashboardClienteProviderProps = {
  children: ReactNode;
};

export const DashboardClienteProvider = ({ children }: DashboardClienteProviderProps) => {
  const [state, setState] = useState<DashboardClienteState>({
    industrias: [],
    servicios: [],
    especialidades: [],
    totalEncargos: 0,
    totalTrabajos: 0
  });

  const updateState = (newState: Partial<DashboardClienteState>) => {
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
    <DashboardClienteContext.Provider value={{ state, updateState }}>
      {children}
    </DashboardClienteContext.Provider>
  );
};

export const useDashboardCliente = (): DashboardClienteContextType => {
  const context = useContext(DashboardClienteContext);
  if (!context) {
    throw new Error("useOferta debe usarse dentro de un OfertaProvider");
  }
  return context;
};
