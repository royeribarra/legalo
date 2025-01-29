"use client";

import ProyectosActivos from "@/components/dashboard/OfertasActivas";
import ProyectosPorAceptar from "@/components/dashboard/AplicacionesPorAceptar";
import ProyectosFinalizados from "@/components/dashboard/ProyectosFinalizados";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

function EncargosCliente(){
  const [subMenuActive, setSubMenuActive] = useState("ofertas-activas");
  const subMenuItems = [
    { id: "ofertas-activas", texto: "Ofertas Activas" },
    { id: "ofertas-por-aceptar", texto: "Ofertas con aplicación" },
    // { id: "trabajos-activos", texto: "Trabajos activos" },
    // { id: "trabajos-finalizados", texto: "Trabajos finalizados" },
  ];

  return(
    <div className="mt-8 overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex w-full overflow-auto lg:overflow-auto">
          {subMenuItems.map((boton) => (
            <Button
              key={boton.id}
              variant={
                subMenuActive === boton.id
                  ? "dashActive"
                  : "dashInActive"
              }
              onClick={() => setSubMenuActive(boton.id)}
            >
              {boton.texto}
            </Button>
          ))}
        </div>
        <Link href="/dashboard/cliente/nueva-oferta">
          <Button>Publicar proyecto</Button>
        </Link>
      </div>

      {subMenuActive === "ofertas-activas" && (
        <ProyectosActivos></ProyectosActivos>
      )}
      {subMenuActive === "ofertas-por-aceptar" && (
        <ProyectosPorAceptar></ProyectosPorAceptar>
      )}
      {subMenuActive === "trabajos-activos" && (
        <ProyectosFinalizados></ProyectosFinalizados>
      )}
    </div>
  )
}

export default EncargosCliente;