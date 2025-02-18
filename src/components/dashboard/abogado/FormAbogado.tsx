"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form, Input, DatePicker, Select, Checkbox, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { abogadoService } from "@/services";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import ExperienciaAbogadoForm from "@/components/dashboard/admin/ExperienciaAbogado";
import { IExperienciaBack } from "@/interfaces/Experiencia.interface";
import { Row, Col } from "antd";
import EstudioAbogadoForm from "../admin/EstudioAbogado";
import { IIndustriaAbogado } from "@/interfaces/Industria.interface";
import industriasData from "@/data/industrias";
import dataServicios from "@/data/servicios";
import dataEspecialidades from "@/data/especialidades";
import DocumentosAbogado from "./DocumentosAbogado";



const FormAbogado = ({abogado}:{abogado: IAbogadoBack}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const serviciosDisponibles = dataServicios;
  const especialidadesDisponibles = dataEspecialidades;

  useEffect(() => {
    if (abogado) {
      form.setFieldsValue({
        ...abogado,
        serviciosAbogado: abogado.serviciosAbogado.map((item) => item.servicio.id),
        especialidadesAbogado: abogado.especialidadesAbogado.map((item) => item.especialidad.id),
      });
    }
  }, [abogado, form]);

  const handleFinish = async (values: any) => {
    console.log("Datos actualizados:", values);
    try {
      setLoading(true);
      await abogadoService.getAbogadoByID(Number(abogado.id));
      console.log("Abogado actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el abogado:", error);
    } finally {
      setLoading(false);
    }
  };

  const [experiencias, setExperiencias] = useState<IExperienciaBack[]>([
    {
      id: 1,
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      fecha_fin: "",
      fecha_inicio: "",
      descripcion: "",
      institucion: "",
      titulo: "",
    },
  ]);

  const handleAddExperiencia = () => {
    const nuevaExperiencia: IExperienciaBack = {
      id: Date.now(),
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      fecha_fin: "",
      fecha_inicio: "",
      descripcion: "",
      institucion: "",
      titulo: "",
    };
    setExperiencias([...experiencias, nuevaExperiencia]);
  };

  const handleUpdateExperiencia = (index: number, updatedExperiencia: IExperienciaBack) => {
    const nuevasExperiencias = [...experiencias];
    nuevasExperiencias[index] = updatedExperiencia;
    setExperiencias(nuevasExperiencias);
  };

  const handleRemoveExperiencia = (index: number) => {
    const nuevasExperiencias = experiencias.filter((_, i) => i !== index);
    setExperiencias(nuevasExperiencias);
  };

  if (!abogado) {
    return <p>Cargando detalles del abogado...</p>;
  }
  // const handleChangeIndustrias = (values: number[]) => {
  //   console.log(values)
  //   setIndustriasSeleccionadas(values);
  // };

  // const handleChangeEspecialidades = (values: number[]) => {
  //   console.log(values)
  //   setEspecialidadesSeleccionadas(values);
  // };

  return (
    <div className="mt-4">
      <h1 className="text-xl font-semibold mb-4">Detalle del Abogado</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          ...abogado,
          fecha_nacimiento: dayjs(abogado.fecha_nacimiento),
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nombres" name="nombres" rules={[{ required: true, message: "Campo requerido" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Apellidos" name="apellidos" rules={[{ required: true, message: "Campo requerido" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="DNI" name="dni" rules={[{ required: true, message: "Campo requerido" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Fecha de nacimiento" name="fecha_nacimiento" rules={[{ required: true, message: "Campo requerido" }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Universidad" name="universidad">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Grado Académico" name="grado_academico">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Sobre Ti" name="sobre_ti">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Teléfono" name="telefono">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Dirección" name="direccion">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Especialidades"
          name="especialidadesAbogado"
          rules={[{ required: true, message: "Por favor selecciona al menos una especialidad" }]}
        >
          <Select
            mode="multiple"
            placeholder="Selecciona las especialidades"
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
        <Form.Item
          label="Servicios"
          name="serviciosAbogado"
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar Cambios
          </Button>
        </Form.Item>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Experiencias</h2>
            <Button type="primary" onClick={handleAddExperiencia}>
              Agregar Experiencia
            </Button>
          </div>
          {abogado.experiencias.map((exp, index) => (
            <ExperienciaAbogadoForm
              key={exp.id}
              experiencia={exp}
              onChange={(updatedExp) => handleUpdateExperiencia(index, updatedExp)}
              onRemove={() => handleRemoveExperiencia(index)}
            />
          ))}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Estudios</h2>
            <Button type="primary" onClick={handleAddExperiencia}>
              Agregar Estudio
            </Button>
          </div>
          {abogado.educaciones.map((edc, index) => (
            <EstudioAbogadoForm
              key={edc.id}
              educacion={edc}
              onChange={(updatedExp) => handleUpdateExperiencia(index, updatedExp)}
              onRemove={() => handleRemoveExperiencia(index)}
            />
          ))}
        </div>
        <DocumentosAbogado archivos={abogado.files} />
      </Form>
    </div>
  );
};

export default FormAbogado;