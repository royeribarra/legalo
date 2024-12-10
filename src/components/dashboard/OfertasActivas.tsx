"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { AxiosError } from "axios";
import { IOfertaBack } from "@/interfaces/Oferta.interface";

const OfertasActivas = () => {
  const [expandedProyectoId, setExpandedProyectoId] = useState<number | null>(
    null
  );
  const [proyectos, setProyectos] = useState<IOfertaBack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProyectos = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.BASE_APP_API_URL;
        const clienteId = token?.cliente?.id;
        const response = await axios.get(
          `${apiUrl}/clientes/${clienteId}/ofertas`
        );
        setProyectos(response.data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response) {
          setError(
            `Error al cargar los proyectos: ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          setError("Error de conexión: No se pudo contactar al servidor");
        } else {
          setError(error.message || "Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [token?.cliente?.id]);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-8 overflow-x-auto">
      {/* Cabecera de tabla */}
      <div className="grid grid-cols-5 bg-gray-200 p-4 font-bold text-center">
        <div>Título del proyecto</div>
        <div>Tipo de servicio</div>
        <div>Documento URL</div>
        <div>Descripción</div>
        <div>Acciones</div>
      </div>

      {proyectos.map((proyecto) => (
        <div
          key={proyecto.id}
          className="border border-black p-4 flex flex-nowrap justify-between my-8"
        >
          <div className="grid grid-cols-4 min-w-[720px] max-w-[720px] gap-2">
            <div className="flex items-center">
              <span>{proyecto.titulo}</span>
            </div>
            <div className="flex items-center">
              <span>{proyecto.titulo}</span>
            </div>
            <div className="flex items-center">
              <span>{proyecto.documento_url}</span>
            </div>
            <div className="flex items-center">
              <span>{proyecto.descripcion}</span>
            </div>
          </div>
          <div className="flex flex-nowrap gap-2">
            <Button
              onClick={() =>
                setExpandedProyectoId(
                  expandedProyectoId === proyecto.id ? null : proyecto.id
                )
              }
            >
              {expandedProyectoId === proyecto.id ? "Ocultar" : "Ver más"}{" "}
              <ChevronDown />
            </Button>
            <Button variant={"outline"}>Pago realizado</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfertasActivas;
