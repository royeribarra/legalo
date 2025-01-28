import { IExperienciaBack } from "@/interfaces/Experiencia.interface";
import React from "react";
import { Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";

interface ExperienciaFormProps {
    experiencia: IExperienciaBack;
    onChange: (updatedExperiencia: IExperienciaBack) => void;
    onRemove?: () => void;
  }
  
  const ExperienciaAbogadoForm: React.FC<ExperienciaFormProps> = ({ experiencia, onChange, onRemove }) => {
    const handleFieldChange = (field: keyof IExperienciaBack, value: any) => {
      onChange({ ...experiencia, [field]: value });
    };
  
    return (
      <div className="border p-4 rounded-md mb-4">
        <Form.Item label="Título">
          <Input
            value={experiencia.titulo}
            onChange={(e) => handleFieldChange("titulo", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Institución">
          <Input
            value={experiencia.institucion}
            onChange={(e) => handleFieldChange("institucion", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Descripción">
          <Input.TextArea
            value={experiencia.descripcion}
            onChange={(e) => handleFieldChange("descripcion", e.target.value)}
            rows={3}
          />
        </Form.Item>
        <Form.Item label="Fecha de Inicio">
          <DatePicker
            value={dayjs(experiencia.fecha_inicio)}
            onChange={(date) => handleFieldChange("fecha_inicio", date?.format("YYYY-MM-DD"))}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item label="Fecha de Fin">
          <DatePicker
            value={dayjs(experiencia.fecha_fin)}
            onChange={(date) => handleFieldChange("fecha_fin", date?.format("YYYY-MM-DD"))}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        {onRemove && (
          <Button danger onClick={onRemove}>
            Eliminar Experiencia
          </Button>
        )}
      </div>
    );
  };
  
  export default ExperienciaAbogadoForm;