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
            itemLayout="vertical"
            renderItem={(aplicacion) => (
              <List.Item>
                <div style={{ width: '100%', border: '1px solid black' }}>
                  {/* Información del Abogado */}
                  <div style={{ marginBottom: '8px' }}>
                    <h4>Información del Abogado</h4>
                    <p><strong>Nombre:</strong> {aplicacion.abogado.nombres} {aplicacion.abogado.apellidos}</p>
                    <p><strong>DNI:</strong> {aplicacion.abogado.dni}</p>
                    <p><strong>Correo:</strong> {aplicacion.abogado.correo}</p>
                    <p><strong>Teléfono:</strong> {aplicacion.abogado.telefono}</p>
                    <p><strong>CIP:</strong> {aplicacion.abogado.cip}</p>
                    <p><strong>Grado Académico:</strong> {aplicacion.abogado.grado_academico}</p>
                    <p><strong>Objetivo:</strong> {aplicacion.abogado.objetivo}</p>
                    <p><strong>Sobre mí:</strong> {aplicacion.abogado.sobre_ti}</p>
                  </div>

                  {/* Información de la Aplicación */}
                  <div>
                    <h4>Detalles de la Aplicación</h4>
                    <p><strong>Estado:</strong> {aplicacion.estado}</p>
                    <p><strong>Fecha de Aplicación:</strong> {new Date(aplicacion.fecha_aplicacion).toLocaleDateString()}</p>
                    <p><strong>Salario Esperado:</strong> S/. {aplicacion.salarioEsperado}</p>
                    <p><strong>N° Cuenta:</strong> {aplicacion.numeroCuenta}</p>
                    <p><strong>CCI:</strong> {aplicacion.numeroCuentaCci}</p>
                    <p><strong>Banco:</strong> {aplicacion.selectedBanco}</p>
                    {/* {aplicacion.documentoExtraUrl && (
                      <p>
                        <strong>Documento Extra:</strong>{' '}
                        <a href={aplicacion.documentoExtraUrl} target="_blank" rel="noopener noreferrer">
                          Ver documento
                        </a>
                      </p>
                    )}
                    {aplicacion.videoExtraUrl && (
                      <p>
                        <strong>Video Extra:</strong>{' '}
                        <a href={aplicacion.videoExtraUrl} target="_blank" rel="noopener noreferrer">
                          Ver video
                        </a>
                      </p>
                    )} */}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Panel>

      </Collapse>
    </Card>
  );
};

export default OfertaDetalle;
