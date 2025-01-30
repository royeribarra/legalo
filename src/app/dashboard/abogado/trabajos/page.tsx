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
    const { token } = useAuth();
    const [trabajos, setTrabajos] = useState<ITrabajoBack[]>([]);
  
    async function getTrabajos(){
      setLoading(true);
      if(token?.abogado?.id){
        try {
          const data = {
            abogadoId: token.abogado.id
          }
          const response = await abogadoService.getTrabajos(data);
          setTrabajos(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false)
        }
      }
    }
  
    useEffect(()=>{
      getTrabajos();
    }, []);
  
    const ejemploTrabajo = {
      id: 1,
      estado: 2, // Supongamos que 2 significa "En progreso"
      fecha_fin: "2024-12-31",
      fecha_inicio: "2024-01-15",
      progreso: 75, // Porcentaje de progreso del trabajo
      cliente: {
        id: 101,
        user: { id: 1001, email: "cliente@example.com" },
        nombres: "Carlos",
        apellidos: "Pérez",
        tipo_persona_id: 1,
        razon_social: "Estudio Pérez Abogados",
        persona_contacto: "Carlos Pérez",
        dni_contacto: "12345678",
        ruc: "20123456789",
        industria: "Legal",
        direccion: "Av. Principal 123, Lima",
        telefono_contacto: "999888777",
        validado_admin: true,
        trabajos: [],
      },
      abogado: {
        id: 202,
        user: { id: 2001, email: "abogado@example.com" },
        nombres: "Andrea",
        apellidos: "Ramírez",
        dni: "87654321",
        fecha_nacimiento: "1990-06-15",
        universidad: "Universidad Nacional de Derecho",
        grado_academico: "Magíster en Derecho Penal",
        sobre_ti: "Especialista en derecho penal con más de 10 años de experiencia.",
        telefono: "998877665",
        direccion: "Calle Justicia 45, Lima",
        especializacion: "Derecho Penal",
        experiencia: "Ha trabajado en casos de alto perfil.",
        experiencia_anos: "10",
        pdf_cv: "cv_andrea.pdf",
        cul_url: "https://example.com/cul",
        cv_url: "https://example.com/cv",
        foto_url: "https://example.com/foto",
        video_url: "https://example.com/video",
      },
      aplicacion: {
        id: 303,
        fecha_aplicacion: "2024-01-10",
        status: 1, // 1 = Aceptado
        salarioEsperado: 5000,
        abogado: {
          id: 202,
          nombres: "Andrea",
          apellidos: "Ramírez",
          dni: "87654321",
          fecha_nacimiento: "1990-06-15",
          universidad: "Universidad Nacional de Derecho",
          grado_academico: "Magíster en Derecho Penal",
          sobre_ti: "Especialista en derecho penal con más de 10 años de experiencia.",
          telefono: "998877665",
          direccion: "Calle Justicia 45, Lima",
          especializacion: "Derecho Penal",
          experiencia: "Ha trabajado en casos de alto perfil.",
          experiencia_anos: "10",
          pdf_cv: "cv_andrea.pdf",
          cul_url: "https://example.com/cul",
          cv_url: "https://example.com/cv",
          foto_url: "https://example.com/foto",
          video_url: "https://example.com/video",
        },
        trabajo: null as any, // Evitamos la referencia circular
      },
      pagos: [
        { operacion: "Anticipo", monto: 1500 },
        { operacion: "Segundo pago", monto: 2000 },
        { operacion: "Pago final", monto: 1500 },
      ],
    };
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
                  <TrabajoItem tipe="cotizacionAceptada" trabajo={trabajo} />
                )
              }
              <TrabajoItem tipe="cotizacionAceptada" trabajo={ejemploTrabajo} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
  
  export default TrabajosAbogado;