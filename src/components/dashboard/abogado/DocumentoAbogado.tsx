import React, { useRef, useState } from "react";
import { Button, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { IFileBack } from "@/interfaces/File.interface";
import { fileService } from "@/services";
import { useToast } from "@/contexts/toastContext";

const S3_FILE_ROUTE = "https://legalo.s3.us-east-1.amazonaws.com/";

interface DocumentoAbogadoProps {
  archivo: IFileBack;
  abogadoId: number;
}

const DocumentoAbogado: React.FC<DocumentoAbogadoProps> = ({ archivo, abogadoId }) => {
  const { showToast } = useToast();
  const [file, setFile] = useState<IFileBack>(archivo);

  // Refs para manejar los input de archivo
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    // Validación según el tipo de archivo
    if (archivo.nombreArchivo === "archivo_imagen" && !file.type.startsWith("image/")) {
      message.error("Solo puedes subir imágenes.");
      return;
    }
    if (archivo.nombreArchivo === "archivo_cul" && !file.type.includes("pdf") && !file.type.includes("doc")) {
      message.error("Solo puedes subir documentos.");
      return;
    }
    if (archivo.nombreArchivo === "archivo_video" && !file.type.startsWith("video/")) {
      message.error("Solo puedes subir videos.");
      return;
    }
    if (archivo.nombreArchivo === "archivo_cv" && !file.type.includes("pdf") && !file.type.includes("doc")) {
      message.error("Solo puedes subir archivos CV.");
      return;
    }

    const body = {
      nombreArchivo: archivo.nombreArchivo,
      abogadoId,
      file: file,
      folder: "abogados",
    };

    try {
      const response = await fileService.uploadFile(body);
      if(response.state){
        showToast("success", "Archivo actualizado correctamente", '')
      }
    } catch (error) {
      console.log(error);
    }

    const newFile = {
      ...archivo,
      filePath: URL.createObjectURL(file), // Vista previa local
      file,
    };

    setFile(newFile);
  };

  const handleRemoveFile = () => {
    message.success("Archivo eliminado");

    // Actualizar el estado para reflejar la eliminación
    setFile((prevFile) => ({
      ...prevFile,
      filePath: "", // Limpiar la URL
      file: null, // Eliminar el archivo
    }));
  };

  return (
    <div className="flex items-center space-x-4 py-2">
      <a
        href={`${S3_FILE_ROUTE}${file.filePath}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {archivo.nombreArchivo === "archivo_imagen"
          ? "Imagen"
          : archivo.nombreArchivo === "archivo_cul"
          ? "Documento CUL"
          : archivo.nombreArchivo === "archivo_cv"
          ? "Documento CV"
          : archivo.nombreArchivo === "archivo_video"
          ? "Video"
          : ""}
      </a>

      {/* Subir/Reemplazar archivo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        className="hidden"
        accept={
          archivo.nombreArchivo === "archivo_imagen"
            ? ".jpg,.jpeg,.png,.gif"
            : archivo.nombreArchivo === "archivo_cul" || archivo.nombreArchivo === "archivo_cv"
            ? ".pdf,.doc,.docx"
            : archivo.nombreArchivo === "archivo_video"
            ? ".mp4,.mkv,.avi"
            : ""
        }
      />
      <Button
        icon={<UploadOutlined />}
        onClick={() => fileInputRef.current?.click()}
      >
        Reemplazar
      </Button>

      {/* Eliminar archivo */}
      <Button
        onClick={handleRemoveFile}
        className="text-red-500"
        icon={<DeleteOutlined />}
      />
    </div>
  );
};

export default DocumentoAbogado;
