import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";
import { useRef, useState } from "react";
import { Eye, Trash } from "lucide-react";

type CvUploadProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
  campo: "cul_url" | "foto_url" | "pdf_url";
};

function CvUpload({ campo, stateAbogado, updateStateAbogado }: CvUploadProps) {
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  console.log(uploadSuccess)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Formato de archivo no válido. Solo se aceptan PDF, JPG y PNG.");
        return;
      }

      const fileSizeLimit = 5 * 1024 * 1024;
      if (selectedFile.size > fileSizeLimit) {
        alert("El archivo debe pesar menos de 5 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result?.toString().split(",")[1];
        if (base64File) {
          updateStateAbogado({
            [campo]: {
              nombre: selectedFile.name,
              tipo: selectedFile.type,
              contenido: base64File,
            },
          });
          setUploadSuccess(true);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    updateStateAbogado({ [campo]: null });
    setUploadSuccess(false);
  };

  const handleViewFile = () => {
    const archivo = stateAbogado[campo];
    if (archivo) {
      const fileUrl = `data:${archivo.tipo};base64,${archivo.contenido}`;
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = archivo.nombre;
      link.click();
    }
  };

  const archivo = stateAbogado[campo];

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input oculto al hacer clic en el contenedor
    }
  };

  return (
    <div>
      <p className="font-bold text-lg">Archivo ({campo})</p>
      <div
        className="border border-black border-dashed p-2 flex flex-col items-center cursor-pointer"
        onClick={handleClick} // Activa el input al hacer clic aquí
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf, .jpg, .png"
        />
      </div>
      {archivo ? (
          <>
            <p className="text-gray-500">{archivo.nombre}</p>
            <div className="flex space-x-4 mt-2">
              <button
                onClick={handleViewFile}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Archivo</span>
              </button>
              <button
                onClick={handleRemoveFile}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                <Trash className="w-4 h-4 text-red-500" />
                <span>Eliminar</span>
              </button>
            </div>
          </>
        ) : (
          <p>Sube tu archivo (PDF, JPG, PNG)</p>
        )}
    </div>
  );
}

export default CvUpload;
