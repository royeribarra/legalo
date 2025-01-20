import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerBig,
} from "@/components/ui/accordion";
import ProyectItem from "@/components/dashboard/ProyectItem";
import { useEffect, useState } from "react";
import { abogadoService, aplicacionService } from "@/services";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import { useAuth } from "@/contexts/authContext";
import { IAplicacionBack } from "@/interfaces/Aplicacion.interface";




function Postulaciones ()
{
  const { token } = useAuth();
  const [aplicacionesCreadas, setAplicacionesCreadas] = useState<IAplicacionBack[]>([]);
  const [aplicacionesAceptadas, setAplicacionesAceptadas] = useState<IAplicacionBack[]>([]);

  async function getAplicacionesCreadas(){
    if(token?.abogado?.id){
      const statusCreado = 1; 
      const response = await abogadoService.getAplicaciones(token.abogado.id, statusCreado);
      setAplicacionesCreadas(response.data);
    }
  }

  async function getAplicacionesAceptadas(){
    if(token?.abogado?.id){
      const statusAceptado = 2; 
      const response = await abogadoService.getAplicaciones(token.abogado.id, statusAceptado);
      setAplicacionesAceptadas(response.data);
    }
  }

  useEffect(()=>{
    getAplicacionesCreadas();
    getAplicacionesAceptadas();
  }, []);

  return(
    <div className="flex flex-col gap-8 flex-1 mt-12">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTriggerBig className="text-2xl font-bold">
            Cotización aceptada ({aplicacionesCreadas.length})
          </AccordionTriggerBig>
          <AccordionContent className="flex flex-col gap-4">
            {
              aplicacionesCreadas.map((aplicacion)=>
                <ProyectItem tipe="cotizacionAceptada" oferta={aplicacion.oferta} />
              )
            }
            {/* <ProyectItem tipe="cotizacionAceptada" />
            <ProyectItem tipe="cotizacionPorExpirar" /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTriggerBig className="text-2xl font-bold">
            Cotización enviada ({aplicacionesAceptadas.length})
          </AccordionTriggerBig>
          <AccordionContent className="flex flex-col gap-4">
            {
              aplicacionesAceptadas.map((aplicacion)=>
                <ProyectItem tipe="cotizacionAceptada" oferta={aplicacion.oferta} />
              )
            }
            {/* <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Postulaciones;