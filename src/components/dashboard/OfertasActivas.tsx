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
import { clienteService } from "@/services";
import { IFileBack } from "@/interfaces/File.interface";
import { IServicioOferta } from "@/interfaces/Servicio.interface";
import { useLoader } from "@/contexts/loaderContext";

const OfertasActivas = () => {
  const [proyectos, setProyectos] = useState<IOfertaBack[]>([]);
  const { setLoading } = useLoader();
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Para controlar la página actual
  const { token } = useAuth();


  const fetchProyectos = async () => {
    setLoading(true);
    try {
      if(token?.cliente?.id){
        const filter = {
          clienteId: token?.cliente?.id,
          estado: 'creado'
        };
        const response = await clienteService.getOfertas(filter);
        setProyectos(response.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  // if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Definir las columnas de la tabla
  const columns: ColumnsType<IOfertaBack> = [
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const fecha = new Date(createdAt);
        const fechaFormateada = fecha.toLocaleDateString();
        return(
        <span>{fechaFormateada}</span>
      )},
    },
    {
      title: "Título del proyecto",
      dataIndex: "titulo",
      key: "titulo",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tipo de servicio",
      dataIndex: "serviciosOferta", // Asegúrate de que este campo esté disponible en tus datos
      key: "serviciosOferta",
      render: (serviciosOferta: IServicioOferta[]) => (
        <div>
          <ul>
          {
            serviciosOferta.map((servicio)=>
              <li key={servicio.id}>{servicio.servicio.nombre}</li>
            )
          }
          </ul>
        </div>
      ),
    },
    {
      title: "Documento URL",
      dataIndex: "files",
      key: "files",
      render: (files: IFileBack[]) => (
        <div>
          {
            files.map((file)=>
              <Link href={`${process.env.S3_FILE_ROUTE}/${file.filePath}`} target="_blank">
                <Button>Ver documento</Button>
              </Link>
            )
          }
        </div>
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
