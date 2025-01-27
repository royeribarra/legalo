"use client";

import { useEffect, useState } from "react";
import { ofertaservice } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import ProyectItem from "@/components/dashboard/ProyectItem";
import { useLoader } from "@/contexts/loaderContext";

function PublicacionesRecientes() {
  const { setLoading } = useLoader();
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);

  async function getOfertas() {
    setLoading(true);
    const params = {
      daysAgo: 5,
    };
    try {
      const response = await ofertaservice.obtenerTodos(params);
      setOfertas(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error al obtener publicaciones recientes:", error);
    }
  }

  useEffect(() => {
    getOfertas();
  }, []);

  return (
    <div className="flex flex-col gap-8 flex-1 mt-12">
      {ofertas.length > 0 ? (
        ofertas.map((oferta) => (
          <ProyectItem key={oferta.id} tipe="sinPostular" oferta={oferta} />
        ))
      ) : (
        <p className="text-center text-gray-500">No hay publicaciones recientes.</p>
      )}
    </div>
  );
}

export default PublicacionesRecientes;
