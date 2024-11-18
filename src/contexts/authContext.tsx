import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '@/interfaces/User.interface';

type TokenType = IUser | null;

interface AuthContextType {
  token: TokenType;
  userRole: string | null;
  setToken: (token: TokenType) => void;
  setUserRole: (role: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<TokenType>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  // Cargar token y rol desde localStorage al cargar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserRole = localStorage.getItem('userRole');

    if (storedToken) {
      const parsedToken: IUser = JSON.parse(storedToken); // Deserializar el token
      setToken(parsedToken);
    }

    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  // Lógica de redirección según el estado del token y el rol de usuario
  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else if (userRole === 'abogado') {
      router.push('/dashboard/abogado');
    } else if (userRole !== 'cliente') {
      router.push('/login');
    }
  }, [token, userRole, router]);

  return (
    <AuthContext.Provider value={{ token, userRole, setToken, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
