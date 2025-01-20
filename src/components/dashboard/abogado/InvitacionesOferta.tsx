import { useEffect, useState } from "react";
import ProyectItem from "../ProyectItem";
import { abogadoService } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { useAuth } from "@/contexts/authContext";

function InvitacionesOferta(){
  const { token } = useAuth();
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);

  async function getOfertas() {
    if(token?.abogado?.id){
      const data = {
        abogadoId: token?.abogado?.id
      };
      const response = await abogadoService.getInvitacionesAOfertas(data);
      setOfertas(response.data);
    }
  }

  useEffect(()=>{
    getOfertas();
  }, []);

  return(
    <div className="flex flex-col gap-8 flex-1 mt-12">
      {
        ofertas.map((oferta)=>
          <ProyectItem tipe="sinPostular" oferta={oferta} />
        )
      }
    </div>
  );
}

export default InvitacionesOferta;