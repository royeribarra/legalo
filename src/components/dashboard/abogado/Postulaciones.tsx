import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerBig,
} from "@/components/ui/accordion";
import ProyectItem from "@/components/dashboard/ProyectItem";
import { useEffect, useState } from "react";
import { aplicacionService } from "@/services";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";

function Postulaciones (abogado: {abogado: IAbogadoBack | undefined | null})
{
  const [aplicaciones, setAplicaciones] = useState([]);

  async function getAplicaciones(){
    console.log(abogado)
    if(abogado){
      const response = await aplicacionService.getAplicacionesByAbogadoId(Number(abogado.abogado?.id));
      setAplicaciones(response);
    }
  }

  useEffect(()=>{
    getAplicaciones();
  }, []);

  return(
    <div className="flex flex-col gap-8 flex-1 mt-12">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTriggerBig className="text-2xl font-bold">
            Cotización aceptada (5)
          </AccordionTriggerBig>
          <AccordionContent className="flex flex-col gap-4">
            <ProyectItem tipe="cotizacionAceptada" />
            <ProyectItem tipe="cotizacionPorExpirar" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTriggerBig className="text-2xl font-bold">
            Cotización enviada (5)
          </AccordionTriggerBig>
          <AccordionContent className="flex flex-col gap-4">
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
            <ProyectItem tipe="postulacionEnviada" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Postulaciones;