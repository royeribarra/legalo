"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Form, Input, DatePicker, Select, Checkbox, Button, Card, List } from "antd";
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
import { useToast } from "@/contexts/toastContext";
import { IEducacionBack } from "@/interfaces/Estudio.interface";
import DocumentoAbogado from "./DocumentoAbogado";

const FormAbogado = ({abogado}:{abogado: IAbogadoBack}) => {
  const { showToast } = useToast();
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
    setLoading(true);
    try {
      const response = await abogadoService.updateAbogado(abogado.id, values);
      if(response.state){
        showToast("success", response.message, '')
      }
      console.log(response)
      console.log("Abogado actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el abogado:", error);
    } finally {
      setLoading(false);
    }
  };

  const [experiencias, setExperiencias] = useState<IExperienciaBack[]>(abogado.experiencias);
  const [educaciones, setEducaciones] = useState<IEducacionBack[]>(abogado.educaciones);

  // const handleUpdateExperiencia = (index: number, updatedExperiencia: IExperienciaBack) => {
  //   const nuevasExperiencias = [...experiencias];
  //   nuevasExperiencias[index] = updatedExperiencia;
  //   setExperiencias(nuevasExperiencias);
  // };

  const handleRemoveExperiencia = (index: number) => {
    const nuevasExperiencias = experiencias.filter((_, i) => i !== index);
    setExperiencias(nuevasExperiencias);
  };

  const handleRemoveEducacion = (index: number) => {
    const nuevasEducaciones = educaciones.filter((_, i) => i !== index);
    setEducaciones(nuevasEducaciones);
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
        className="bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm"
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
          <Col span={6}>
            <Form.Item label="DNI" name="dni" rules={[{ required: true, message: "Campo requerido" }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Fecha de nacimiento" name="fecha_nacimiento" rules={[{ required: true, message: "Campo requerido" }]}>
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Grado Académico" name="grado_academico">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Colegio" name="colegio">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="CIP" name="cip">
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
      </Form>
      <div className="pt-10">
        <Card
          title={
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Experiencias</h2>
              <Button type="primary">
                Agregar Experiencia
              </Button>
            </div>
          }
          bordered={true} // Esto agrega un borde alrededor del Card
          className="shadow-lg" // Sombra opcional para dar profundidad
        >
          {experiencias.map((exp, index) => (
            <ExperienciaAbogadoForm
              key={exp.id}
              experiencia={exp}
              // onChange={(updatedExp) => handleUpdateExperiencia(index, updatedExp)}
              onRemove={() => handleRemoveExperiencia(index)}
            />
          ))}
        </Card>
      </div>
      <div className="pt-10">
        <Card
          title={
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Estudios</h2>
              <Button type="primary">
                Agregar Estudio
              </Button>
            </div>
          }
          bordered={true} // Agrega borde alrededor del Card
          className="shadow-lg" // Sombra para dar profundidad
        >
          {educaciones.map((edc, index) => (
            <EstudioAbogadoForm
              key={edc.id}
              educacion={edc}
              // onChange={(updatedExp) => handleUpdateExperiencia(index, updatedExp)}
              onRemove={() => handleRemoveEducacion(index)}
            />
          ))}
        </Card>
      </div>
      {/* <DocumentosAbogado archivos={abogado.files} /> */}
      <div className="pt-10">
        <Card title="Archivos" bordered={true} className="shadow-lg">
          <List
            dataSource={[
              { id: 1, nombreArchivo: "archivo_imagen", titulo: "Imagen de perfil" },
              { id: 2, nombreArchivo: "archivo_cul", titulo: "Certificado Cul" },
              { id: 3, nombreArchivo: "archivo_cv", titulo: "Currículum Vitae" },
              { id: 4, nombreArchivo: "archivo_video", titulo: "Video de presentación" },
            ]}
            renderItem={(item) => {
              // Buscar el archivo real en abogado.files por nombreArchivo
              const archivoEncontrado = abogado.files.find(
                (file) => file.nombreArchivo === item.nombreArchivo
              );

              return (
                <List.Item key={item.id}>
                  <DocumentoAbogado
                    archivo={archivoEncontrado || null}
                    abogadoId={abogado.id}
                    nombreArchivo={item.nombreArchivo}
                    titulo={item.titulo} // Pasar el título como prop
                  />
                </List.Item>
              );
            }}
          />
        </Card>
      </div>

    </div>
  );
};

export default FormAbogado;