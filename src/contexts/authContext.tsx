'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { IUsuarioBack } from '@/interfaces/User.interface';

type AuthContextType = {
  user: IUsuarioBack | null;
  login: (userData: IUsuarioBack, jwt: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUsuarioBack | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
        console.log(userData)
        setUser(userData.user);
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }
  }, []);

  const login = (userData: IUsuarioBack, jwt: string) => {
    Cookies.set('token', jwt, { secure: true, sameSite: 'Strict' });
    setUser(userData);
    router.push(userData.rol === 'abogado' ? '/dashboard/abogado' : '/dashboard/cliente');
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
