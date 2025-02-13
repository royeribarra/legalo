"use client";

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
import TrabajoItem from "@/components/dashboard/TrabajoItem";
import { useLoader } from "@/contexts/loaderContext";

  function TrabajosAbogado ()
  {
    const { setLoading } = useLoader();
    const { abogado } = useAuth();
    const [trabajos, setTrabajos] = useState<ITrabajoBack[]>([]);

    async function getTrabajos(){
      setLoading(true);
      try {
        if(abogado){
          const data = {
            abogadoId: abogado.id
          }
          const response = await abogadoService.getTrabajos(data);
          setTrabajos(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    useEffect(()=>{
      getTrabajos();
    }, [abogado?.id]);

    return(
      <div className="flex flex-col gap-8 flex-1 mt-12">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTriggerBig className="text-2xl font-bold">
              Trabajos ({trabajos.length})
            </AccordionTriggerBig>
            <AccordionContent className="flex flex-col gap-4">
              {
                trabajos.map((trabajo)=>
                  <TrabajoItem
                    tipe="cotizacionAceptada"
                    trabajo={trabajo}
                    persona='abogado'
                  />
                )
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  
  export default TrabajosAbogado;