import { IExperienciaBack } from "@/interfaces/Experiencia.interface";
import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Row, Col, message } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { abogadoService } from "@/services";
import { useToast } from "@/contexts/toastContext";

interface ExperienciaFormProps {
  experiencia: IExperienciaBack;
  onChange?: (updatedExperiencia: IExperienciaBack) => void;
  onRemove?: () => void;
}

const ExperienciaAbogadoForm: React.FC<ExperienciaFormProps> = ({ experiencia, onChange, onRemove }) => {
  const [visible, setVisible] = useState(true);
  const { showToast } = useToast();

  const handleFinish = async (values: IExperienciaBack) => {
    const updatedValues = {
      ...values,
      fecha_inicio: dayjs(values.fecha_inicio).format("YYYY-MM-DD"), // Convertir y formatear fecha_inicio
      fecha_fin: dayjs(values.fecha_fin).format("YYYY-MM-DD"), // Convertir y formatear fecha_fin
    };

    console.log("Formulario enviado:", updatedValues);
    // onChange(updatedValues); // Actualizar los valores antes de enviar

    try {
      const response = await abogadoService.updateExperienciaAbogado(experiencia.id, updatedValues);
      console.log(response);
      if(response.state){
        showToast("success", response.message, '');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinishFailed = (errorInfo: any) => {
    console.log("Error en la validación:", errorInfo);
    message.error("Por favor, completa todos los campos correctamente.");
  };

  const deleteExperiencia = async () => {
    try {
      const response = await abogadoService.deleteExperienciaAbogado(experiencia.id);
      if(response.state){
        showToast("success", response.message, '');
        if (onRemove) {
          onRemove();
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="border p-4 rounded-md mb-4 relative transition-all duration-300">
      {/* Header con botones alineados */}
      <div className="flex justify-between items-center mb-2">
        <div className="space-x-2">
          <h1>{experiencia.titulo}</h1>
        </div>
        <Button type="default" icon={visible ? <UpOutlined /> : <DownOutlined />} onClick={() => setVisible(!visible)} />
      </div>

      {visible && (
        <div className="transition-opacity duration-300 opacity-100">
          <Form
            layout="vertical"
            initialValues={{
              ...experiencia,
              fecha_inicio: dayjs(experiencia.fecha_inicio), // Convertir fecha_inicio a dayjs
              fecha_fin: dayjs(experiencia.fecha_fin), // Convertir fecha_fin a dayjs
            }}
            onFinish={handleFinish} // Maneja el envío del formulario
            onFinishFailed={handleFinishFailed} // Maneja los errores de validación
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Título" name="titulo" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Institución" name="institucion" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Fecha de Inicio" name="fecha_inicio" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Fecha de Fin" name="fecha_fin" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Descripción" name="descripcion" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Guardar Cambios
              </Button>
            </Form.Item>
            <Button danger onClick={deleteExperiencia}>
              Eliminar Experiencia
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ExperienciaAbogadoForm;
