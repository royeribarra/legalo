"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerBig,
} from "@/components/ui/accordion";
import TrabajoItem from "@/components/dashboard/TrabajoItem";
import { useEffect, useState } from "react";
import { abogadoService } from "@/services";
import { useAuth } from "@/contexts/authContext";
import { ITrabajoBack } from "@/interfaces/Trabajo.interface";
import { useLoader } from "@/contexts/loaderContext";

function TrabajosAbogado() {
  const { setLoading } = useLoader();
  const { abogado } = useAuth();
  const [trabajos, setTrabajos] = useState<ITrabajoBack[]>([]);

  async function getTrabajos() {
    setLoading(true);
    try {
      if (abogado) {
        const data = { abogadoId: abogado.id };
        const response = await abogadoService.getTrabajos(data);
        setTrabajos(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTrabajos();
  }, [abogado?.id]);

  return (
    <div className="flex flex-col gap-8 flex-1 mt-12">
      <h2 className="text-2xl font-bold">Trabajos ({trabajos.length})</h2>
      <Accordion type="multiple"> {/* Permite abrir más de un item */}
        {trabajos.map((trabajo) => (
          <AccordionItem key={trabajo.id} value={trabajo.id.toString()}>
            <AccordionTriggerBig>{trabajo.aplicacion.oferta.titulo}</AccordionTriggerBig>
            <AccordionContent>
              <TrabajoItem tipe="cotizacionAceptada" trabajo={trabajo} persona="abogado" />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default TrabajosAbogado;
