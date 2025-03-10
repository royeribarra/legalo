"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, Descriptions, Table, Typography, Spin } from "antd";
import {  ofertaservice } from "@/services";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { Collapse, Tag, List } from "antd";

const { Panel } = Collapse;

const { Title } = Typography;

const OfertaDetalle = () => {
  const router = useRouter();
  const { ofertaId } = useParams();
  const [oferta, setOferta] = useState<IOfertaBack | null>(null);
  const [loading, setLoading] = useState(true);

  const getOfertas = async () => {
    if(ofertaId){
      const response = await ofertaservice.getOfertaByID(Number(ofertaId));
      if(response.state){
        setOferta(response.data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getOfertas();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />;
  }

  if (!oferta) {
    return <Title level={3} style={{ textAlign: "center", marginTop: 50 }}>Trabajo no encontrado</Title>;
  }

  return (
    <Card title={`Oferta: ${oferta.titulo}`} bordered={false} style={{ width: "100%" }}>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Información General" key="1">
          <p><strong>ID:</strong> {oferta.id}</p>
          <p><strong>Descripción:</strong> {oferta.descripcion}</p>
          <p><strong>Fecha de Publicación:</strong> {oferta.createdAt}</p>
        </Panel>
        
        <Panel header="Industrias" key="2">
          {oferta.industriasOferta.length > 0 ? (
            oferta.industriasOferta.map((industria) => (
              <Tag key={industria.id}>{industria.industria.nombre}</Tag>
            ))
          ) : (
            <p>No hay industrias asociadas</p>
          )}
        </Panel>
        
        <Panel header="Servicios" key="3">
          {oferta.serviciosOferta.length > 0 ? (
            oferta.serviciosOferta.map((servicio) => (
              <Tag key={servicio.id}>{servicio.servicio.nombre}</Tag>
            ))
          ) : (
            <p>No hay servicios asociados</p>
          )}
        </Panel>

        <Panel header="Especialidades" key="4">
          {oferta.especialidadesOferta.length > 0 ? (
            oferta.especialidadesOferta.map((especialidad) => (
              <Tag key={especialidad.id}>{especialidad.especialidad.nombre}</Tag>
            ))
          ) : (
            <p>No hay especialidades asociadas</p>
          )}
        </Panel>

        <Panel header="Cliente" key="5">
          <p><strong>Nombre:</strong> {oferta.cliente.nombres}</p>
          <p><strong>Email:</strong> {oferta.cliente.correo}</p>
        </Panel>

        <Panel header="Aplicaciones" key="6">
          <List
            dataSource={oferta.aplicaciones}
            renderItem={(aplicacion) => (
              <List.Item>
                <strong>{aplicacion.abogado.nombres + ' ' + aplicacion.abogado.apellidos}</strong> - {aplicacion.status}
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
    </Card>
  );
};

export default OfertaDetalle;
