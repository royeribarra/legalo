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

const AbogadoDetail = () => {
  const { abogadoId } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);

  useEffect(() => {
    // Simulación de llamada a la API para obtener detalles del abogado
    const fetchAbogado = async () => {
      setLoading(true);
      try {
        // Reemplaza con tu servicio/API para obtener detalles del abogado
        const response: IAbogadoBack = await abogadoService.getAbogadoByID(Number(abogadoId));
        setAbogado(response);
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
    // Simulación de envío de datos actualizados a la API
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
    // Datos iniciales simulados o traídos del backend
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
  return (
    <div>
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
        <Form.Item label="Nombres" name="nombres" rules={[{ required: true, message: "Campo requerido" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Apellidos" name="apellidos" rules={[{ required: true, message: "Campo requerido" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="DNI" name="dni" rules={[{ required: true, message: "Campo requerido" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Fecha de nacimiento" name="fecha_nacimiento" rules={[{ required: true, message: "Campo requerido" }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="Universidad" name="universidad">
          <Input />
        </Form.Item>
        <Form.Item label="Grado Académico" name="grado_academico">
          <Input />
        </Form.Item>
        <Form.Item label="Sobre Ti" name="sobre_ti">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Teléfono" name="telefono">
          <Input />
        </Form.Item>
        <Form.Item label="Dirección" name="direccion">
          <Input />
        </Form.Item>
        <div>
          <h2 className="text-lg font-semibold mb-2">Experiencias</h2>
          {abogado.experiencias.map((exp, index) => (
            <ExperienciaAbogadoForm
              key={exp.id}
              experiencia={exp}
              onChange={(updatedExp) => handleUpdateExperiencia(index, updatedExp)}
              onRemove={() => handleRemoveExperiencia(index)}
            />
          ))}
          <Button type="dashed" onClick={handleAddExperiencia}>
            Agregar Experiencia
          </Button>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </Form.Item>
        {/* <Form.Item label="Especialización" name="especializacion">
          <Input />
        </Form.Item> */}
        <Form.Item label="Industria" name="industria">
          <Input />
        </Form.Item>
        <Form.Item label="Años de experiencia" name="experiencia_anos">
          <Input />
        </Form.Item>
        <Form.Item label="Experiencia" name="experiencia">
          <Input.TextArea rows={4} />
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
        <Form.Item name="validado_admin" valuePropName="checked">
          <Checkbox>Validado por administrador</Checkbox>
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

export default AbogadoDetail;