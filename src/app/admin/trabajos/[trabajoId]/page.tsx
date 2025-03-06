"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, Descriptions, Table, Typography, Spin } from "antd";
import { servicioService, trabajoService } from "@/services";
import { ITrabajoBack } from "@/interfaces/Trabajo.interface";

const { Title } = Typography;

const TrabajoDetalle = () => {
  const router = useRouter();
  const { trabajoId } = useParams();
  const [trabajo, setTrabajo] = useState<ITrabajoBack | null>(null);
  const [loading, setLoading] = useState(true);

  const getTrabajos = async () => {
    const response = await trabajoService.getTrabajoById(Number(trabajoId));
    if(response.state){
      setTrabajo(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrabajos();
  }, [trabajoId]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />;
  }

  if (!trabajo) {
    return <Title level={3} style={{ textAlign: "center", marginTop: 50 }}>Trabajo no encontrado</Title>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>Detalles del Trabajo</Title>
      <Card title="Información General" bordered>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Estado">{trabajo.estado}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Inicio">{trabajo.fecha_inicio}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Fin">{trabajo.fecha_fin}</Descriptions.Item>
          <Descriptions.Item label="Progreso">{trabajo.progreso}%</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Cliente" bordered style={{ marginTop: 20 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Nombre">{trabajo.cliente.nombres} {trabajo.cliente.apellidos}</Descriptions.Item>
          <Descriptions.Item label="Correo">{trabajo.cliente.correo}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">{trabajo.cliente.telefono_contacto}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Abogado" bordered style={{ marginTop: 20 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Nombre">{trabajo.abogado.nombres} {trabajo.abogado.apellidos}</Descriptions.Item>
          <Descriptions.Item label="Correo">{trabajo.abogado.correo}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">{trabajo.abogado.telefono}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Pagos" bordered style={{ marginTop: 20 }}>
        <Table
          dataSource={trabajo.pagos}
          rowKey="id"
          pagination={false}
          columns={[
            { title: "Monto", dataIndex: "monto_total", key: "monto_total" },
            { title: "Operación", dataIndex: "operacion", key: "operacion" },
            { title: "Estado", dataIndex: "estado", key: "estado" },
          ]}
        />
      </Card>

      <Card title="Progresos" bordered style={{ marginTop: 20 }}>
        <Table
          dataSource={trabajo.progresos}
          rowKey="id"
          pagination={false}
          columns={[
            { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
            { title: "Progreso", dataIndex: "progreso", key: "progreso" },
            { title: "Fecha", dataIndex: "createdAt", key: "createdAt" },
          ]}
        />
      </Card>
    </div>
  );
};

export default TrabajoDetalle;
