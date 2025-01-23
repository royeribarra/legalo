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
import { ITrabajoBack } from "@/interfaces/Trabajo.interface";
import TrabajoItem from "../TrabajoItem";
  
  function TrabajosAbogado ()
  {
    const { token } = useAuth();
    const [trabajos, setTrabajos] = useState<ITrabajoBack[]>([]);
  
    async function getTrabajos(){
      if(token?.abogado?.id){
        const data = {
          abogadoId: token.abogado.id
        }
        const response = await abogadoService.getTrabajos(data);
        setTrabajos(response);
      }
    }
  
    useEffect(()=>{
        getTrabajos();
    }, []);
  
    return(
      <div className="flex flex-col gap-8 flex-1 mt-12">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTriggerBig className="text-2xl font-bold">
              Cotización enviada ({trabajos.length})
            </AccordionTriggerBig>
            <AccordionContent className="flex flex-col gap-4">
              {
                trabajos.map((trabajo)=>
                  <TrabajoItem tipe="cotizacionAceptada" trabajo={trabajo} />
                )
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  
  export default TrabajosAbogado;