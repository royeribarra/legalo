"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FormAbogado from "@/components/dashboard/abogado/FormAbogado";
import { useAuth } from "@/contexts/authContext";
import { useLoader } from "@/contexts/loaderContext";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import { abogadoService } from "@/services";
import Link from "next/link";

function PerfilAbogado() {
  const { user } = useAuth();
  const { setLoading } = useLoader();
  const { abogadoId } = useParams();
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);

  useEffect(() => {
    if (!abogadoId) return;

    const fetchAbogado = async () => {
      setLoading(true);
      try {
        const response: IAbogadoBack = await abogadoService.getAbogadoByID(Number(abogadoId));
        setAbogado(response);
      } catch (error) {
        console.error("Error al obtener los datos del abogado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbogado();
  }, [abogadoId]);

  return (
    <div>
      <Link href="/admin/abogados">
        <button
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom: "15px"
          }}
        >
          ← Volver
        </button>
      </Link>

      {abogado && <FormAbogado abogado={abogado} />}
    </div>
  );
}

export default PerfilAbogado;
