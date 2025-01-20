"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { AxiosError } from "axios";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import Link from "next/link";
import { Table } from "antd"; // Importar la tabla de Ant Design
import { ColumnsType } from "antd/es/table"; // Para tipado de las columnas

const OfertasActivas = () => {
  const [proyectos, setProyectos] = useState<IOfertaBack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Para controlar la página actual
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

  // Definir las columnas de la tabla
  const columns: ColumnsType<IOfertaBack> = [
    {
      title: "Título del proyecto",
      dataIndex: "titulo",
      key: "titulo",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tipo de servicio",
      dataIndex: "tipo_servicio", // Asegúrate de que este campo esté disponible en tus datos
      key: "tipo_servicio",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Documento URL",
      dataIndex: "documento_url",
      key: "documento_url",
      render: (url) => (
        <Link href={`${process.env.S3_FILE_ROUTE}/${url}`} target="_blank">
          <Button>Ver documento</Button>
        </Link>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (text) => <span>{text}</span>,
    },
  ];

  // Paginación de la tabla (10 elementos por página)
  const pagination = {
    current: currentPage,
    pageSize: 10,
    total: proyectos.length,
    onChange: (page: number) => setCurrentPage(page),
  };

  return (
    <div className="space-y-8 overflow-x-auto">
      {/* Tabla de proyectos */}
      <Table
        columns={columns}
        dataSource={proyectos}
        rowKey="id"
        pagination={pagination} // Agregar la paginación
      />
    </div>
  );
};

export default OfertasActivas;
