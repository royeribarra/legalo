import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { IServicio } from "@/interfaces/Servicio.interface";
import { PlusOutlined } from "@ant-design/icons";
import dataServicios from "@/data/servicios";
import dataEspecialidades from "@/data/especialidades";

interface EditOfertaModalProps {
  visible: boolean;
  oferta: IOfertaBack | null;
  onClose: () => void;
  onSave: (updatedOferta: IOfertaBack) => void;
}

const EditOfertaModal: React.FC<EditOfertaModalProps> = ({ visible, oferta, onClose, onSave }) => {
  const [form] = Form.useForm();

  // Lista de servicios disponibles
  const serviciosDisponibles = dataServicios;
  const especialidadesDisponibles = dataEspecialidades;

  useEffect(() => {
    if (oferta) {
      form.setFieldsValue({
        ...oferta,
        serviciosOferta: oferta.serviciosOferta.map((item) => item.servicio.id),
        especialidadesOferta: oferta.especialidadesOferta.map((item) => item.especialidad.id),
      });
    }
  }, [oferta, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Actualiza la oferta con los nuevos valores del formulario
        const updatedOferta = {
          ...oferta,
          ...values,
          serviciosOferta: values.serviciosOferta.map((servicioId: number) => ({
            servicio: serviciosDisponibles.find((servicio) => servicio.id === servicioId),
          })),
          especialidadesOferta: values.especialidadesOferta.map((especialidadId: number) => ({
            especialidad: especialidadesDisponibles.find((especialidad) => especialidad.id === especialidadId),
          })),
        };
        onSave(updatedOferta); // Guarda los cambios de la oferta
        onClose(); // Cierra el modal
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <Modal
      title="Editar Oferta"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Guardar"
      cancelText="Cancelar"
    >
      {oferta && (
        <Form form={form} layout="vertical">
          <Form.Item label="Título" name="titulo" rules={[{ required: true, message: "Por favor ingresa el título" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Descripción" name="descripcion" rules={[{ required: true, message: "Por favor ingresa la descripción" }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Salario Mínimo" name="salario_minimo" rules={[{ required: true, message: "Por favor ingresa el salario mínimo" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Salario Máximo" name="salario_maximo" rules={[{ required: true, message: "Por favor ingresa el salario máximo" }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Duración" name="duracion" rules={[{ required: true, message: "Por favor ingresa la duración" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Experiencia" name="experiencia_abogado" rules={[{ required: true, message: "Por favor ingresa la experiencia" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Estado" name="estado" rules={[{ required: true, message: "Por favor selecciona el estado" }]}>
            <Input />
          </Form.Item>

          {/* Select múltiple para los servicios */}
          <Form.Item
            label="Servicios"
            name="serviciosOferta"
            rules={[{ required: true, message: "Por favor selecciona al menos un servicio" }]}
          >
            <Select
              mode="multiple"
              placeholder="Selecciona los servicios"
              optionLabelProp="label"
              style={{ width: "100%" }}
            >
              {serviciosDisponibles.map((servicio) => (
                <Select.Option key={servicio.id} value={servicio.id} label={servicio.nombre}>
                  {servicio.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Especialidades"
            name="especialidadesOferta"
            rules={[{ required: true, message: "Por favor selecciona al menos una especialidad" }]}
          >
            <Select
              mode="multiple"
              placeholder="Selecciona los servicios"
              optionLabelProp="label"
              style={{ width: "100%" }}
            >
              {especialidadesDisponibles.map((especialidad) => (
                <Select.Option key={especialidad.id} value={especialidad.id} label={especialidad.nombre}>
                  {especialidad.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditOfertaModal;
