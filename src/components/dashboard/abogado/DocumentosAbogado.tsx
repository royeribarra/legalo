import React, { useRef, useState } from "react";
import { Button, List, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { IFileBack } from "@/interfaces/File.interface";

const S3_FILE_ROUTE = "https://legalo.s3.us-east-1.amazonaws.com/";

interface DocumentosAbogadoProps {
  archivos: IFileBack[];
}

const DocumentosAbogado: React.FC<DocumentosAbogadoProps> = ({ archivos }) => {
  const [files, setFiles] = useState<IFileBack[]>(archivos);

  // Corrección: Definir el tipo de useRef correctamente
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  const handleUpload = (file: File, fileItem: IFileBack) => {
    const newFile = {
      ...fileItem,
      filePath: URL.createObjectURL(file), // Vista previa local
      file,
    };

    setFiles((prev) =>
      prev.map((f) => (f.id === fileItem.id ? newFile : f))
    );
    return false;
  };

  const handleRemoveFile = (fileId: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    message.success("Archivo eliminado");
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">Archivos</h3>
      <List
        dataSource={files}
        renderItem={(file) => (
          <List.Item className="flex items-center space-x-4">
            {/* Link del archivo */}
            <a
              href={`${S3_FILE_ROUTE}${file.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.nombreArchivo}
            </a>

            {/* Subir/Reemplazar archivo */}
            <input
              type="file"
              ref={(el) => { fileInputRefs.current[file.id] = el; }} // Cambié la función para que no devuelva un valor
              onChange={(e) =>
                e.target.files?.[0] && handleUpload(e.target.files[0], file)
              }
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.mp4"
            />
            <Button
              icon={<UploadOutlined />}
              onClick={() => fileInputRefs.current[file.id]?.click()}
            >
              Reemplazar
            </Button>

            {/* Eliminar archivo */}
            <Button
              onClick={() => handleRemoveFile(file.id)}
              className="text-red-500"
              icon={<DeleteOutlined />}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default DocumentosAbogado;
