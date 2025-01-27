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
import { useLoader } from "@/contexts/loaderContext";
  
  function Postulaciones ()
  {
    const { setLoading } = useLoader();
    const { token } = useAuth();
    const [aplicacionesCreadas, setAplicacionesCreadas] = useState<IAplicacionBack[]>([]);
    const [aplicacionesAceptadas, setAplicacionesAceptadas] = useState<IAplicacionBack[]>([]);
  
    async function getAplicacionesCreadas(){
      setLoading(true);
      if(token?.abogado?.id){
        try {
          const data = {
            abogadoId: token.abogado.id,
            estado: 'aceptada'
          }
          const response = await abogadoService.getAplicaciones(data);
          setAplicacionesCreadas(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
    }
  
    async function getAplicacionesAceptadas(){
      setLoading(true);
      if(token?.abogado?.id){
        try {
          const statusAceptado = 2; 
          const data = {
            abogadoId: token.abogado.id,
            estado: 'pendiente'
          }
          const response = await abogadoService.getAplicaciones(data);
          setAplicacionesAceptadas(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  
  export default Postulaciones;