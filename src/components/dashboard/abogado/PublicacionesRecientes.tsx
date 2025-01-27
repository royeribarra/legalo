import { useEffect, useState } from "react";
import ProyectItem from "../ProyectItem";
import { ofertaservice } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";

function PublicacionesRecientes() {
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga opcional

  async function getOfertas() {
    const params = {
      daysAgo: 5,
    };
    try {
      const response = await ofertaservice.obtenerTodos(params);
      setOfertas(response);
    } catch (error) {
      console.error("Error al obtener publicaciones recientes:", error);
    } finally {
      setLoading(false); // Cambiamos el estado de carga
    }
  }

  useEffect(() => {
    getOfertas();
  }, []);

  return (
    <div className="flex flex-col gap-8 flex-1 mt-12">
      {loading ? (
        <p className="text-center text-gray-500">Cargando publicaciones...</p>
      ) : ofertas.length > 0 ? (
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
