import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Row, Col } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { IEducacionBack } from "@/interfaces/Estudio.interface";

interface ExperienciaFormProps {
  educacion: IEducacionBack;
  onChange: (updatedExperiencia: IEducacionBack) => void;
  onRemove?: () => void;
}

const EstudioAbogadoForm: React.FC<ExperienciaFormProps> = ({ educacion, onChange, onRemove }) => {
  const [visible, setVisible] = useState(true);

  const handleFieldChange = (field: keyof IEducacionBack, value: any) => {
    onChange({ ...educacion, [field]: value });
  };

  return (
    <div className="border p-4 rounded-md mb-4 relative transition-all duration-300">
      {/* Header con botones alineados */}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Título">
                <Input value={educacion.titulo} onChange={(e) => handleFieldChange("titulo", e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Institución">
                <Input value={educacion.institucion} onChange={(e) => handleFieldChange("institucion", e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Ubicación">
                <Input value={educacion.institucion} onChange={(e) => handleFieldChange("ubicacion", e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Fecha de Inicio">
                <DatePicker
                  value={dayjs(educacion.fecha_inicio)}
                  onChange={(date) => handleFieldChange("fecha_inicio", date?.format("YYYY-MM-DD"))}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Fecha de Inicio">
                <DatePicker
                  value={dayjs(educacion.fecha_inicio)}
                  onChange={(date) => handleFieldChange("fecha_inicio", date?.format("YYYY-MM-DD"))}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Fecha de Fin">
                <DatePicker
                  value={dayjs(educacion.fecha_fin)}
                  onChange={(date) => handleFieldChange("fecha_fin", date?.format("YYYY-MM-DD"))}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Descripción">
            <Input.TextArea
              value={educacion.descripcion}
              onChange={(e) => handleFieldChange("descripcion", e.target.value)}
              rows={3}
            />
          </Form.Item>
        </div>
      )}
    </div>
  );
};

export default EstudioAbogadoForm;
