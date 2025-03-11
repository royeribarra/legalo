'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { IUsuarioBack } from '@/interfaces/User.interface';
import { IAbogadoBack } from '@/interfaces/Abogado.interface';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { abogadoService, aplicacionService, clienteService, ofertaservice, trabajoService } from '@/services';

type AuthContextType = {
  user: IUsuarioBack | null;
  abogado: IAbogadoBack | null;
  cliente: IClienteBack | null;
  login: (userData: IUsuarioBack, jwt: string) => void;
  logout: () => void;
  totalTrabajosCliente: number;
  totalOfertasCliente: number;
  totalInvitacionesAbogado: number;
  totalPostulacionesAbogado: number;
  totalTrabajosAbogado: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUsuarioBack | null>(null);
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);
  const [cliente, setCliente] = useState<IClienteBack | null>(null);
  const [totalTrabajosCliente, setTotalTrabajosCliente] = useState<number>(0);
  const [totalOfertasCliente, setTotalOfertasCliente] = useState<number>(0);
  const [totalInvitacionesAbogado, setTotalInvitacionesAbogado] = useState<number>(0);
  const [totalPostulacionesAbogado, setTotalPostulacionesAbogado] = useState<number>(0);
  const [totalTrabajosAbogado, setTotalTrabajosAbogado] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
        setUser(userData.user);

        // Si el usuario es abogado, obtener más detalles
        if (userData.user.rol === 'abogado' && userData.user.abogado?.id) {
          fetchAbogadoData(userData.user.abogado.id);
          fetchTotalTrabajosAbogado(userData.user.abogado.id);
          fetchTotalAplicacionesAbogado(userData.user.abogado.id);
          fetchTotalInvitacionesAbogado(userData.user.abogado.id);
        }

        // Si el usuario es cliente, obtener más detalles
        if (userData.user.rol === 'cliente' && userData.user.cliente?.id) {
          fetchClienteData(userData.user.cliente.id);
          fetchTotalTrabajosCliente(userData.user.cliente.id);
          fetchTotalOfertasCliente(userData.user.cliente.id);
        }
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }
  }, []);

  const fetchAbogadoData = async (abogadoId: number) => {
    try {
      const abogadoData = await abogadoService.getAbogadoByID(abogadoId);
      setAbogado(abogadoData);
    } catch (error) {
      console.error('Error fetching abogado data:', error);
    }
  };

  async function fetchTotalTrabajosAbogado(abogadoId: number) {
    try {
      const data = {
        abogadoId: abogadoId
      }
      const response = await trabajoService.obtenerTotalTrabajosPorAbogado(data);
      if(response.state){
        setTotalTrabajosAbogado(response.data.totalTrabajosAbogado);
      }
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  async function fetchTotalAplicacionesAbogado(abogadoId: number) {
    try {
      const data = {
        abogadoId: abogadoId
      }
      const response = await aplicacionService.obtenerTotalAplicacionesPorAbogado(data);
      if(response.state){
        setTotalPostulacionesAbogado(response.data.totalTrabajosAbogado);
      }
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  async function fetchTotalInvitacionesAbogado(abogadoId: number) {
    try {
      const data = {
        abogadoId: abogadoId
      }
      const response = await ofertaservice.obtenerTotalInvitacionesPorAbogado(data);
      if(response.state){
        setTotalInvitacionesAbogado(response.data.totalTrabajosAbogado);
      }
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  const fetchClienteData = async (clienteId: number) => {
    try {
      const clienteData = await clienteService.getDetalleCliente(clienteId);
      setCliente(clienteData);
    } catch (error) {
      console.error('Error fetching cliente data:', error);
    }
  };

  async function fetchTotalTrabajosCliente(clienteId: number) {
    try {
      const data = {
        clienteId: clienteId
      }
      const response = await trabajoService.obtenerTotalTrabajosPorCliente(data);
      setTotalTrabajosCliente(response.total)
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  async function fetchTotalOfertasCliente(clienteId: number) {
    try {
      const data = {
        clienteId: clienteId,
        estado: 'sin_asignar'
      }
      const response = await ofertaservice.obtenerTotalOfertasPorCliente(data);
      setTotalOfertasCliente(response.total)
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
    }
  }

  const login = (userData: IUsuarioBack, jwt: string) => {
    Cookies.set('token', jwt, { secure: true, sameSite: 'Strict' });
    setUser(userData);

    // Obtener detalles adicionales según el rol
    if (userData.rol === 'abogado' && userData.abogado?.id) {
      fetchAbogadoData(userData.abogado.id);
    } else if (userData.rol === 'cliente' && userData.cliente?.id) {
      fetchClienteData(userData.cliente.id);
    }

    router.push(userData.rol === 'abogado' ? '/dashboard/abogado' : '/dashboard/cliente');
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setAbogado(null);
    setCliente(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user, abogado, cliente, login, logout, totalOfertasCliente, totalTrabajosCliente, totalInvitacionesAbogado, totalPostulacionesAbogado, totalTrabajosAbogado
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe estar dentro de un AuthProvider');
  }
  return context;
};
