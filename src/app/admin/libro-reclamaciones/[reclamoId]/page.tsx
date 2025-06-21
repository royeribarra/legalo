'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { reclamoService } from '@/services';
import { Descriptions, Button, Input, Modal, message } from 'antd';

const { TextArea } = Input;

function DetalleReclamo() {
  const { reclamoId } = useParams();
  const [reclamo, setReclamo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [respuestaVisible, setRespuestaVisible] = useState(false);
  const [respuestaText, setRespuestaText] = useState('');

  useEffect(() => {
    if (!reclamoId) return;
    const fetchDetalle = async () => {
      try {
        const data = await reclamoService.obtenerPorId(Number(reclamoId));
        setReclamo(data);
      } catch (error) {
        message.error('Error al obtener el detalle del reclamo');
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [reclamoId]);

  const handleResponder = async () => {
    try {
      await reclamoService.responderReclamo(Number(reclamoId), respuestaText);
      message.success('Respuesta enviada correctamente');
      setReclamo({ ...reclamo, respuesta: respuestaText });
      setRespuestaVisible(false);
    } catch (error) {
      message.error('Error al enviar la respuesta');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!reclamo) return <p>No se encontró el reclamo</p>;

  return (
    <div>
      <Descriptions title="Detalle del Reclamo" bordered column={1}>
        <Descriptions.Item label="Creación">{reclamo.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Estado">{reclamo.fueRespondido? 'Respondido' : ' Por Responder'}</Descriptions.Item>
        <Descriptions.Item label="Nombre">{reclamo.nombre}</Descriptions.Item>
        <Descriptions.Item label="DNI">{reclamo.dni}</Descriptions.Item>
        <Descriptions.Item label="Email">{reclamo.email}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{reclamo.telefono}</Descriptions.Item>
        <Descriptions.Item label="Tipo">{reclamo.tipo}</Descriptions.Item>
        <Descriptions.Item label="Descripción">{reclamo.descripcion}</Descriptions.Item>
        <Descriptions.Item label="Pedido">{reclamo.pedido}</Descriptions.Item>
        <Descriptions.Item label="Respuesta">{reclamo.respuesta || "Sin respuesta"}</Descriptions.Item>
      </Descriptions>

      {!reclamo.respuesta && (
        <Button type="primary" style={{ marginTop: 16 }} onClick={() => setRespuestaVisible(true)}>
          Responder
        </Button>
      )}

      <Modal
        title="Responder Reclamo"
        visible={respuestaVisible}
        onOk={handleResponder}
        onCancel={() => setRespuestaVisible(false)}
        okText="Enviar Respuesta"
      >
        <TextArea
          rows={4}
          placeholder="Escribe tu respuesta aquí..."
          value={respuestaText}
          onChange={(e) => setRespuestaText(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default DetalleReclamo;
