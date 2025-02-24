import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Row, Col, message } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { IEducacionBack } from "@/interfaces/Estudio.interface";
import { abogadoService } from "@/services";
import { useToast } from "@/contexts/toastContext";

interface EstudioFormProps {
  educacion: IEducacionBack;
  onChange?: (updatedEducacion: IEducacionBack) => void;
  onRemove?: () => void;
}

const EstudioAbogadoForm: React.FC<EstudioFormProps> = ({ educacion, onChange, onRemove }) => {
  const [visible, setVisible] = useState(true);
  const { showToast } = useToast();
  // Función para manejar cambios de campos
  // const handleFieldChange = (field: keyof IEducacionBack, value: any) => {
  //   onChange({ ...educacion, [field]: value });
  // };

  // Función para manejar el envío del formulario
  const handleFinish = async (values: IEducacionBack) => {
    // Validación: Asegurarse de que las fechas no estén vacías
    if (!values.fecha_inicio || !values.fecha_fin) {
      message.error("Por favor, ingrese tanto la fecha de inicio como la fecha de fin.");
      return;
    }

    // Asegurarse de que la fecha de inicio no sea posterior a la fecha de fin
    if (dayjs(values.fecha_inicio).isAfter(dayjs(values.fecha_fin))) {
      message.error("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }

    // Convertir las fechas al formato YYYY-MM-DD
    const updatedValues = {
      ...values,
      fecha_inicio: dayjs(values.fecha_inicio).format("YYYY-MM-DD"),
      fecha_fin: dayjs(values.fecha_fin).format("YYYY-MM-DD"),
    };

    console.log("Formulario enviado:", updatedValues);

    // Aquí iría tu lógica para enviar los datos al backend
    try {
      // Simulación de envío de datos
      console.log("Enviando datos al backend...");
      const response = await abogadoService.updateEstudioAbogado(educacion.id, updatedValues);
      if(response.state){
        showToast("success", response.message, '');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Función para manejar errores de validación
  const handleFinishFailed = (errorInfo: any) => {
    console.log("Error en la validación:", errorInfo);
    message.error("Por favor, complete todos los campos correctamente.");
  };

  const deleteEstudio = async () => {
    try {
      const response = await abogadoService.deleteEstudioAbogado(educacion.id);
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
      <div className="flex justify-between items-center mb-2">
        <div className="space-x-2">
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
          {onRemove && (
            <Button danger onClick={onRemove}>
              Eliminar Estudio
            </Button>
          )}
        </div>
        <Button type="default" icon={visible ? <UpOutlined /> : <DownOutlined />} onClick={() => setVisible(!visible)} />
      </div>

      {visible && (
        <div className="transition-opacity duration-300 opacity-100">
          <Form
            layout="vertical"
            initialValues={{
              ...educacion,
              fecha_inicio: dayjs(educacion.fecha_inicio), // Convertir fecha_inicio a dayjs
              fecha_fin: dayjs(educacion.fecha_fin), // Convertir fecha_fin a dayjs
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
              <Col span={8}>
                <Form.Item label="Ubicación" name="ubicacion" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Fecha de Inicio" name="fecha_inicio" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={8}>
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
            <Button danger onClick={deleteEstudio}>
              Eliminar Estudio
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default EstudioAbogadoForm;
