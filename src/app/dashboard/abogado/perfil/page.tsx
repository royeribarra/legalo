"use client";

import FormAbogado from "@/components/dashboard/abogado/FormAbogado";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";

function PerfilAbogado(){
  const { user } = useAuth();
  const [abogadoId, setAbogadoId] = useState(1);

  useEffect(()=>{
    if(user?.abogado?.id){
      setAbogadoId(abogadoId);
    }
  }, [user?.abogado?.id]);

  return(
    <FormAbogado abogadoId={abogadoId}></FormAbogado>
  );
};

export default PerfilAbogado;