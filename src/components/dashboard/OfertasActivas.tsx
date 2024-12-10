"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, Clock, Key } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { IOfertaBack } from "@/interfaces/Oferta.interface";

const OfertasActivas = () => {
  const [openProyecto, setOpenProyecto] = useState<number | null>(null); // Almacena el ID del proyecto abierto
  const [proyectos, setProyectos] = useState<IOfertaBack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProyectos = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.BASE_APP_API_URL;
        const clienteId = token?.cliente?.id; // Reemplazar con el ID del cliente dinámico si es necesario
        const response = await axios.get(
          `${apiUrl}/clientes/${clienteId}/ofertas`
        );
        setProyectos(response.data);
      } catch (err: any) {
        setError(err.message || "Error al cargar los proyectos");
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, []);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-8 overflow-x-auto">
      {/* Cabecera de tabla */}
      <div className="grid grid-cols-5 bg-gray-200 p-4 font-bold text-center">
        <div>Título del proyecto</div>
        <div>Tipo de servicio</div>
        <div>Abogado</div>
        <div>Fecha de publicación</div>
        <div>Acciones</div>
      </div>

      {/* Filas de proyectos */}
      {proyectos.map((proyecto) => (
        <div
          key={proyecto.id}
          className="grid grid-cols-5 border-b border-gray-300 p-4"
        >
          {/* Resumen del proyecto */}
          <div>{proyecto.titulo}</div>
          <div>
          {
            proyecto.serviciosOferta.map((servicio)=>
              <div>{servicio.servicio.nombre}</div>
            )
          }
          </div>
          <div>"abogado?"</div>
          <div>{proyecto.createdAt}</div>
          <div className="flex justify-center">
            <Button
              onClick={() =>
                setOpenProyecto(openProyecto === proyecto.id ? null : proyecto.id)
              }
              variant="outline"
              className="flex items-center"
            >
              {openProyecto === proyecto.id ? (
                <>
                  Ver menos <ChevronUp className="ml-2" />
                </>
              ) : (
                <>
                  Ver más <ChevronDown className="ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Detalles del proyecto */}
          {openProyecto === proyecto.id && (
            <div className="col-span-5 mt-4">
              <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[40px]"
                  >
                    <Clock size={28} />
                    <p className="ml-2 text-sm lg:text-lg">3 meses</p>
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[40px]"
                  >
                    <Key size={28} />
                    <div>
                    {
                      proyecto.serviciosOferta.map((servicio)=>
                        
                        <p className="ml-2 text-sm lg:text-lg">
                          {servicio.servicio.nombre}
                        </p>
                      )
                    }
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-black rounded-full h-[40px]"
                  >
                    <p className="ml-2 text-sm lg:text-lg">
                      Inicio: {proyecto.createdAt}
                    </p>
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/assets/images/face-6.jpeg"
                    alt="img-abogado"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-2xl font-bold">""</p>
                    <p className="text-2xl font-bold">
                      S/ {proyecto.salario_maximo} pago realizado
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-black">
                    Ver perfil completo
                  </Button>
                  <Button variant="outline" className="border-black">
                    Contactar abogado
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OfertasActivas;
