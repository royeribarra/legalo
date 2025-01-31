import { useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Upload, Trash, Check } from "lucide-react";
import { handleFileUpload } from "utils/uploadFile"; // Asegúrate de que esta función esté importada

// El tipo de props cambia para incluir la función de subir archivo
type FileUploadProps = {
  uploadFileCUL: (fileData: { nombre: string; tipo: string; contenido: string }) => void;
  campo: "archivo_cul" | "archivo_cv" | "archivo_imagen";
  archivoCul?: { nombre: string; tipo: string; contenido: string } | null;
  removeFileCul: () => void;
};

const UploadFileCUL = ({ campo, uploadFileCUL, archivoCul, removeFileCul }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ nombre: string; tipo: string; contenido: string } | null>(archivoCul || null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const fileSizeLimit = 5 * 1024 * 1024; // 5MB

  // Usamos la función handleFileUpload para manejar la carga de archivos
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, (fileData) => {
      // Guardamos el archivo en el estado local
      setFile({
        nombre: fileData.name,
        tipo: fileData.type,
        contenido: fileData.content,
      });
      // Enviar el archivo al componente padre
      uploadFileCUL({
        nombre: fileData.name,
        tipo: fileData.type,
        contenido: fileData.content,
      });
      setUploadSuccess(true);
    }, validTypes, fileSizeLimit);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadSuccess(false);
    removeFileCul();
  };

  const handleClick = () => {
    fileInputRef.current?.click(); // Activa el input oculto
  };

  return (
    <div className="border border-black p-5 border-dashed">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-4/5">
          <p><strong>Adjunta tu Certificado único Laboral (CUL)</strong></p>
          <p>
            Este documento lo puedes obtener en el siguiente link: 
            <a href="https://www.empleosperu.gob.pe/" target="_blank" style={{ color: 'blue' }}>
              www.empleosperu.gob.pe
            </a> . En formato PDF, DOC o DOCX. (máx. 5mb)
          </p>
        </div>
        <div className="w-full flex items-center justify-end lg:w-1/5">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Button onClick={handleClick}>
            Importa tu CUL <Upload size={18} color="white" className="ml-2" />
          </Button>
        </div>
      </div>

      {file && uploadSuccess && (
        <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full mr-3">
              <Check size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-lg">Certificado único laboral subido con éxito</p>
              <p className="font-bold text-gray-700">{file.nombre}</p> {/* Mostrar el nombre del archivo aquí */}
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="link" onClick={handleRemoveFile} className="ml-2">
              <Trash size={24} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFileCUL;
