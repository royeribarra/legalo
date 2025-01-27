"use client";
import { useEffect, useState } from "react";
import { abogadoService } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { useAuth } from "@/contexts/authContext";
import ProyectItem from "@/components/dashboard/ProyectItem";
import { useLoader } from "@/contexts/loaderContext";

function InvitacionesOferta() {
  const { setLoading } = useLoader();
  const { token } = useAuth();
  const [ofertas, setOfertas] = useState<IOfertaBack[]>([]);

  async function getOfertas() {
    setLoading(true);
    if (token?.abogado?.id) {
      const data = {
        abogadoId: token?.abogado?.id,
      };
      try {
        const response = await abogadoService.getInvitacionesAOfertas(data);
        setOfertas(response.data);
      } catch (error) {
        console.error("Error al obtener las invitaciones a ofertas:", error);
      } finally {
        setLoading(false); // Cambiamos el estado de carga
      }
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
        <p className="text-center text-gray-500">No tienes invitaciones.</p>
      )}
    </div>
  );
}

export default InvitacionesOferta;
