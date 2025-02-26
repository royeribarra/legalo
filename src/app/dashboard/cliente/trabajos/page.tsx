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
  import { abogadoService, aplicacionService, clienteService, ofertaservice } from "@/services";
  import { IAbogadoBack } from "@/interfaces/Abogado.interface";
  import { useAuth } from "@/contexts/authContext";
  import { IAplicacionBack } from "@/interfaces/Aplicacion.interface";
import { ITrabajoBack } from "@/interfaces/Trabajo.interface";
import TrabajoItem from "@/components/dashboard/TrabajoItem";
import { useLoader } from "@/contexts/loaderContext";

function TrabajosCliente(){
const { user, cliente } = useAuth();
const { setLoading } = useLoader();
const [trabajos, setTrabajos] = useState<ITrabajoBack[]>([]);

async function getTrabajos(){
    setLoading(true);
    try {
      if(user?.cliente?.id){
        const data = {
          clienteId: user.cliente.id
        }
        const response = await clienteService.getTrabajos(data);
        setTrabajos(response.data);
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getTrabajos();
  }, [user?.cliente?.id]);

  return(
    <div className="flex flex-col gap-8 flex-1 mt-12">
      <h2 className="text-2xl font-bold">Trabajos ({trabajos.length})</h2>
      <Accordion type="multiple">
      {
        trabajos.map((trabajo, index)=> (
        <AccordionItem key={trabajo.id} value={trabajo.id.toString()}>
          <AccordionTriggerBig className="text-2xl font-bold">
          {trabajo.aplicacion.oferta.titulo} - {trabajo.estado}
          </AccordionTriggerBig>
          <AccordionContent className="flex flex-col gap-4">
            <TrabajoItem
              key={index}
              tipe="cotizacionAceptada"
              trabajo={trabajo}
              persona="cliente"
              cliente={cliente}
            />
          </AccordionContent>
        </AccordionItem>)
      )}
      </Accordion>
    </div>
  )
}

export default TrabajosCliente;