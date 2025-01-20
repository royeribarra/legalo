import { useEffect, useState } from "react";
import ProyectItem from "../ProyectItem";
import { ofertaservice } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";

function PublicacionesRecientes(){
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);

  async function getOfertas() {
    const params = {
      daysAgo: 5
    };
    const response = await ofertaservice.obtenerTodos(params);
    setOfertas(response);
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

export default PublicacionesRecientes;