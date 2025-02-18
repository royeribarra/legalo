"use client";

import FormAbogado from "@/components/dashboard/abogado/FormAbogado";
import { useAuth } from "@/contexts/authContext";
import { useLoader } from "@/contexts/loaderContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import { abogadoService } from "@/services";
import { useEffect, useState } from "react";

function PerfilAbogado(){
  const { user } = useAuth();
  const { setLoading} = useLoader();
  const [abogadoId, setAbogadoId] = useState(1);
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);

  useEffect(()=>{
    if(user?.abogado?.id){
      setAbogadoId(abogadoId);
    }
  }, [user?.abogado?.id]);

  useEffect(() => {
    const fetchAbogado = async () => {
      setLoading(true);
      try {
        const response: IAbogadoBack = await abogadoService.getAbogadoByID(Number(abogadoId));
        setAbogado(response);
      } catch (error) {
        console.error("Error al obtener los datos del abogado:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbogado();
  }, [abogadoId]);

  return(
    <>
      {
        abogado &&
        <FormAbogado abogado={abogado}></FormAbogado>
      }
    </>
  );
};

export default PerfilAbogado;