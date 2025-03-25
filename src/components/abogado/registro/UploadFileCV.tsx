import { useRef, useState } from "react";
import { Trash } from "lucide-react";

type CvUploadProps = {
  uploadFileCV: (fileData: { nombre: string; tipo: string; contenido: File }) => void;
  campo: "archivo_cul" | "archivo_cv" | "archivo_imagen";
  archivoCv?: { nombre: string; tipo: string; contenido: File } | null;
  removeFileCv: () => void;
};

function UploadFileCV({ uploadFileCV, campo, archivoCv, removeFileCv }: CvUploadProps) {
  const [file, setFile] = useState<{ nombre: string; tipo: string; contenido: File } | null>(archivoCv || null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const fileSizeLimit = 6 * 1024 * 1024;

    if (!selectedFile) return;

    // Validar tipo y tamaño del archivo
    if (!validTypes.includes(selectedFile.type)) {
      alert(`Formato de archivo no válido. Solo se permiten: ${validTypes.join(", ")}.`);
      return;
    }

    if (selectedFile.size > fileSizeLimit) {
      alert(`El archivo debe pesar menos de ${(fileSizeLimit / 1024 / 1024).toFixed(2)} MB.`);
      return;
    }

    // Guardamos el archivo en el estado
    setFile({
      nombre: selectedFile.name,
      tipo: selectedFile.type,
      contenido: selectedFile, // Guardamos el archivo directamente en 'contenido'
    });

    // Enviar el archivo al componente padre
    uploadFileCV({
      nombre: selectedFile.name,
      tipo: selectedFile.type,
      contenido: selectedFile, // Pasamos el archivo como 'contenido'
    });

    setUploadSuccess(true);
  };

  const handleRemoveFile = () => {
    setFile(null); // Limpiar el archivo en el estado
    setUploadSuccess(false); // Limpiar el estado de éxito
    removeFileCv();
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Resetear el valor del input
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activar input al hacer clic
    }
  };

  return (
    <div>
      <p className="font-bold text-lg pb-2">Archivo CV</p>
      <div
        className="bg-[#f1f5f9] p-4 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200"
        onClick={handleClick} // Activar input al hacer clic
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={".pdf, .doc, .docx"}
        />
        <span className="text-black">Subir archivo</span>
      </div>

      {file ? (
        <div className="flex items-center space-x-4 mt-4">
          <p className="text-gray-500">Archivo subido: {file.nombre}</p>
          <button
            onClick={handleRemoveFile}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            <Trash className="w-4 h-4 text-red-500" />
            <span>Eliminar</span>
          </button>
        </div>
      ) : (
        <p className="mt-4">Sube tu archivo en PDF, DOC, DOCX. (máx. 5mb)</p>
      )}
    </div>
  );
}

export default UploadFileCV;
