"use client";

import FormAbogado from "@/components/dashboard/abogado/FormAbogado";
import { useAuth } from "@/contexts/authContext";
import { useLoader } from "@/contexts/loaderContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import { abogadoService } from "@/services";
import { useEffect, useState } from "react";

function PerfilAbogado(){
  const { abogado } = useAuth();
  const { setLoading} = useLoader();
  const [abogadoId, setAbogadoId] = useState();
  const [abogadoBody, setAbogadoBody] = useState<IAbogadoBack>();

  const fetchAbogado = async () => {
    setLoading(true);
    try {
      if(abogado?.id)
      {
        const response: IAbogadoBack = await abogadoService.getAbogadoByID(abogado?.id);
        setAbogadoBody(response);
      }
    } catch (error) {
      console.error("Error al obtener los datos del abogado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbogado();
  }, [abogado?.id]);

  return(
    <>
      {
        abogadoBody &&
        <FormAbogado abogado={abogadoBody}></FormAbogado>
      }
    </>
  );
};

export default PerfilAbogado;