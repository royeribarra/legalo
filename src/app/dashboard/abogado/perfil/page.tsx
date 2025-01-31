"use client";

import FormAbogado from "@/components/dashboard/abogado/FormAbogado";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";

function PerfilAbogado(){
  const { token } = useAuth();
  const [abogadoId, setAbogadoId] = useState(1);

  useEffect(()=>{
    if(token?.abogado?.id){
      setAbogadoId(abogadoId);
    }
  }, [token?.abogado?.id]);

  return(
    <FormAbogado abogadoId={abogadoId}></FormAbogado>
  );
};

export default PerfilAbogado;