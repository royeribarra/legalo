import React, { useRef, useState } from "react";
import { Button, message } from "antd";
import { UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { IFileBack } from "@/interfaces/File.interface";
import { fileService } from "@/services";
import { useToast } from "@/contexts/toastContext";

const S3_FILE_ROUTE = "https://legalo.s3.us-east-1.amazonaws.com/";

interface DocumentoAbogadoProps {
  archivo: IFileBack | null;
  abogadoId: number;
  titulo: string;
  nombreArchivo: string;
}

const DocumentoAbogado: React.FC<DocumentoAbogadoProps> = ({ archivo, abogadoId, titulo, nombreArchivo }) => {
  const { showToast } = useToast();
  const [file, setFile] = useState<IFileBack | null>(archivo);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    // Si no hay archivo previo, permitimos cualquier tipo
    // const nombreArchivo = archivo?.nombreArchivo || nombreArchivo;

    // Validaciones solo si `archivo` existe
    if (nombreArchivo === "archivo_imagen" && !file.type.startsWith("image/")) {
      message.error("Solo puedes subir imágenes.");
      return;
    }
    if (nombreArchivo === "archivo_cul" && !file.type.includes("pdf") && !file.type.includes("doc")) {
      message.error("Solo puedes subir documentos.");
      return;
    }
    if (nombreArchivo === "archivo_video" && !file.type.startsWith("video/")) {
      message.error("Solo puedes subir videos.");
      return;
    }
    if (nombreArchivo === "archivo_cv" && !file.type.includes("pdf") && !file.type.includes("doc")) {
      message.error("Solo puedes subir archivos CV.");
      return;
    }

    const body = {
      nombreArchivo,
      abogadoId,
      file,
      folder: "abogados",
    };

    try {
      const response = await fileService.uploadFile(body);
      if (response.state) {
        showToast("success", "Archivo actualizado correctamente", "");
        setFile({
          ...body,
          filePath: response.path,
          id: new Date().getTime()
        }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFile = () => {
    message.success("Archivo eliminado");
    setFile(null);
  };

  return (
    <div className="grid grid-cols-3 items-center gap-4 py-2 w-full border-b pb-2">
      {/* Columna 1: Título */}
      <h3 className="text-lg font-semibold">{titulo}</h3>

      {/* Columna 2: Link de descarga */}
      <div>
        {file ? (
          <a
            href={`${S3_FILE_ROUTE}${file.filePath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Ver archivo
          </a>
        ) : (
          <span className="text-red-500 flex items-center space-x-2">
            <ExclamationCircleOutlined className="text-lg" />
            <span>No hay archivo subido</span>
          </span>
        )}
      </div>

      {/* Columna 3: Botones */}
      <div className="flex space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          className="hidden"
          accept={
            archivo?.nombreArchivo === "archivo_imagen"
              ? ".jpg,.jpeg,.png,.gif"
              : archivo?.nombreArchivo === "archivo_cul" || archivo?.nombreArchivo === "archivo_cv"
              ? ".pdf,.doc,.docx"
              : archivo?.nombreArchivo === "archivo_video"
              ? ".mp4,.mkv,.avi"
              : "*/*"
          }
        />
        <Button icon={<UploadOutlined />} onClick={() => fileInputRef.current?.click()}>
          Subir Archivo
        </Button>

        {file && (
          <Button onClick={handleRemoveFile} className="text-red-500" icon={<DeleteOutlined />} />
        )}
      </div>
    </div>
  );
};

export default DocumentoAbogado;
