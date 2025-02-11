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
import dataEspecialidades from "@/data/especialidades";

const FormAbogado = ({abogadoId}:{abogadoId: number}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);
  const [industriasSeleccionadas, setIndustriasSeleccionadas] = useState<number[]>([]);
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState<number[]>([]);

  useEffect(() => {
    const fetchAbogado = async () => {
      setLoading(true);
      try {
        const response: IAbogadoBack = await abogadoService.getAbogadoByID(Number(abogadoId));
        setAbogado(response);
        if (response.industriasAbogado.length > 0) {
          const industriasIds = response.industriasAbogado
            .map((item) => item.industria.id)
            .filter((id): id is number => id !== undefined); // Filtramos `undefined` de manera segura
          console.log(industriasIds)
          setIndustriasSeleccionadas(industriasIds);
        }
        
        form.setFieldsValue({
          ...response,
          fecha_nacimiento: dayjs(response.fecha_nacimiento),
        });
      } catch (error) {
        console.error("Error al obtener los datos del abogado:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbogado();
  }, [abogadoId, form]);

  const handleFinish = async (values: any) => {
    console.log("Datos actualizados:", values);
    try {
      setLoading(true);
      await abogadoService.getAbogadoByID(Number(abogadoId));
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
  const handleChangeIndustrias = (values: number[]) => {
    console.log(values)
    setIndustriasSeleccionadas(values);
  };

  const handleChangeEspecialidades = (values: number[]) => {
    console.log(values)
    setEspecialidadesSeleccionadas(values);
  };

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
        <Form.Item label="Industria" name="industria">
          <Select
            mode="multiple"
            placeholder="Selecciona industrias"
            value={industriasSeleccionadas}
            onChange={handleChangeIndustrias}
            allowClear
            options={industriasData.map((industria) => ({
              label: industria.nombre,
              value: industria.id,
            }))}
          />
        </Form.Item><Form.Item label="Especialidades" name="especialidad">
          <Select
            mode="multiple"
            placeholder="Selecciona especialidades"
            value={especialidadesSeleccionadas}
            onChange={handleChangeEspecialidades}
            allowClear
            options={dataEspecialidades.map((especialidad) => ({
              label: especialidad.nombre,
              value: especialidad.id,
            }))}
          />
        </Form.Item>
        <Form.Item label="CV (PDF)" name="pdf_cv">
          <Upload>
            <Button icon={<UploadOutlined />}>Subir CV</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Foto URL" name="foto_url">
          <Input />
        </Form.Item>
        <Form.Item label="Video URL" name="video_url">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAbogado;