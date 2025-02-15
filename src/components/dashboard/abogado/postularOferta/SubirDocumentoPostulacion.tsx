import { useRef, useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

type DocumentoUploadProps = {
  uploadFileDocumento: (fileData: { nombre: string; tipo: string; contenido: File }) => void;
  campo: "aplicacion_documento";
  archivoDocumento?: { nombre: string; tipo: string; contenido: File } | null;
  removeFileDocumento: () => void;
};

function SubirDocumentoPostulacion({ uploadFileDocumento, campo, archivoDocumento, removeFileDocumento }: DocumentoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ nombre: string; tipo: string; contenido: File } | null>(archivoDocumento ||null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    const fileSizeLimit = 6 * 1024 * 1024;

    if (!validTypes.includes(selectedFile.type)) {
      alert(`Formato no válido. Solo se permiten: PDF, DOC, DOCX.`);
      return;
    }

    if (selectedFile.size > fileSizeLimit) {
      alert(`El archivo debe pesar menos de 2 MB.`);
      return;
    }

    setUploadedFile({
      nombre: selectedFile.name,
      tipo: selectedFile.type,
      contenido: selectedFile,
    });

    uploadFileDocumento({
      nombre: selectedFile.name,
      tipo: selectedFile.type,
      contenido: selectedFile, // Pasamos el archivo como 'contenido'
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setUploadedFile(null);
    removeFileDocumento();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="my-2">
      <p className="font-bold text-lg mb-4">¿Consideras necesario enviar algún documento extra para potenciar tu postulación?</p>
      <div
        className="border border-black border-dashed p-4 flex flex-col items-center cursor-pointer rounded-lg"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf, .doc, .docx"
        />

        {uploadedFile ? (
          <div className="flex flex-col items-center">
            <Image src="/assets/images/ico-upload.png" alt="Archivo subido" width={64} height={64} />
            <p className="mt-2 text-gray-700 text-center">{uploadedFile.nombre}</p>
            <button
              onClick={handleRemoveFile}
              className="mt-3 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              aria-label="Eliminar archivo"
            >
              <Trash className="w-4 h-4 text-red-500" />
              <span>Eliminar</span>
            </button>
          </div>
        ) : (
          <>
            <Image src="/assets/images/ico-upload.png" alt="Subir archivo" width={64} height={64} />
            <p className="text-center">Clic aquí o arrastra el documento a adjuntar</p>
            <p className="text-xs text-gray-500">Formatos permitidos: DOC, DOCX, PDF (máx. 2 MB)</p>
          </>
        )}
      </div>
    </div>
  );
}

export default SubirDocumentoPostulacion;