'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { IUsuarioBack } from '@/interfaces/User.interface';
import { IAbogadoBack } from '@/interfaces/Abogado.interface';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { abogadoService, clienteService } from '@/services';

type AuthContextType = {
  user: IUsuarioBack | null;
  abogado: IAbogadoBack | null;
  cliente: IClienteBack | null;
  login: (userData: IUsuarioBack, jwt: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUsuarioBack | null>(null);
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);
  const [cliente, setCliente] = useState<IClienteBack | null>(null);
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
        }

        // Si el usuario es cliente, obtener más detalles
        if (userData.user.rol === 'cliente' && userData.user.cliente?.id) {
          fetchClienteData(userData.user.cliente.id);
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

  const fetchClienteData = async (clienteId: number) => {
    try {
      const clienteData = await clienteService.getDetalleCliente(clienteId);
      setCliente(clienteData);
    } catch (error) {
      console.error('Error fetching cliente data:', error);
    }
  };

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
    <AuthContext.Provider value={{ user, abogado, cliente, login, logout }}>
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
