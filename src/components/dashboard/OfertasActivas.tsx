"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/authContext";
import { AxiosError } from "axios";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import Link from "next/link";
import { Table, Modal, Form, Input, Select } from "antd"; // Importar Modal y Form
import { ColumnsType } from "antd/es/table"; // Para tipado de las columnas
import { clienteService, ofertaservice } from "@/services";
import { IFileBack } from "@/interfaces/File.interface";
import { IServicioOferta } from "@/interfaces/Servicio.interface";
import { useLoader } from "@/contexts/loaderContext";
import EditOfertaModal from "./Cliente/ModalDetalleOferta";
import { useToast } from "@/contexts/toastContext";

const OfertasActivas = () => {
  const [proyectos, setProyectos] = useState<IOfertaBack[]>([]);
  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // Para controlar la página actual
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar el modal
  const [currentOferta, setCurrentOferta] = useState<IOfertaBack | null>(null); // Estado para la oferta que se va a editar

  const fetchProyectos = async () => {
    setLoading(true);
    try {
      if(user?.cliente?.id){
        const filter = {
          clienteId: user?.cliente?.id,
          estado: 'creado'
        };
        const response = await clienteService.getOfertas(filter);
        setProyectos(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, [user?.cliente?.id]);

  // if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Función para mostrar el modal con la oferta a editar
  const showModal = (oferta: IOfertaBack) => {
    setCurrentOferta(oferta);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Lógica para actualizar la oferta (puedes hacer una solicitud a tu API aquí)
    console.log('Oferta editada:', currentOferta);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Definir las columnas de la tabla
  const columns: ColumnsType<IOfertaBack> = [
    {
      title: "Fecha",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        const fecha = new Date(createdAt);
        const fechaFormateada = fecha.toLocaleDateString();
        return <span>{fechaFormateada}</span>;
      },
    },
    {
      title: "Título del proyecto",
      dataIndex: "titulo",
      key: "titulo",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tipo de servicio",
      dataIndex: "serviciosOferta",
      key: "serviciosOferta",
      render: (serviciosOferta: IServicioOferta[]) => (
        <div>
          <ul>
            {serviciosOferta.map((servicio) => (
              <li key={servicio.id}>{servicio.servicio.nombre}</li>
            ))}
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
          {files.map((file) => (
            <Link href={`${process.env.S3_FILE_ROUTE}/${file.filePath}`} target="_blank" key={file.id}>
              <Button>Ver documento</Button>
            </Link>
          ))}
        </div>
      ),
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (text) => <span>{text}</span>,
    },
    // Columna de acciones (Editar)
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Button onClick={() => showModal(record)}>Editar</Button>
      ),
    },
  ];

  // Paginación de la tabla (10 elementos por página)
  const pagination = {
    current: currentPage,
    pageSize: 10,
    total: proyectos.length,
    onChange: (page: number) => setCurrentPage(page),
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentOferta(null);
  };

  const handleSave = async (updatedOferta: IOfertaBack) => {
    setLoading(true);
    // Aquí puedes hacer la solicitud para actualizar la oferta en el backend
    console.log("Oferta actualizada:", updatedOferta);
    const especialidades = updatedOferta.especialidadesOferta.map((especialidad) => especialidad.especialidad.id);
    const servicios = updatedOferta.serviciosOferta.map((servicio) => servicio.servicio.id);

    try {
      const data = {
        ...updatedOferta,
        especialidades,
        servicios
      };
      const response = await ofertaservice.updateOferta(updatedOferta.id, data);
      console.log(response)
      if(response.state){
        showToast("success", response.message, "");
        const updatedProyectos = proyectos.map((proyecto) =>
          proyecto.id === updatedOferta.id ? updatedOferta : proyecto
        );
        setProyectos(updatedProyectos);
      }
    } catch (error) {
      showToast("error", "Hubo un error al actualizar la oferta", "");
      console.log(error)
    } finally{
      setLoading(false);
    }
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

      <EditOfertaModal
        visible={isModalVisible}
        oferta={currentOferta}
        onClose={handleModalClose}
        onSave={handleSave}
      />
    </div>
  );
};

export default OfertasActivas;
