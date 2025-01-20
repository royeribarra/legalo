import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Upload, Eye, Trash, Check } from "lucide-react";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";

type CvUploadProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
  campo: "archivo_cul" | "archivo_cv" | "archivo_imagen";
};

function FileUpload({ campo, stateAbogado, updateStateAbogado }: CvUploadProps) {
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  console.log(uploadSuccess)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
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
        const base64File = reader.result?.toString();
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
    <div className="border border-black p-5 border-dashed">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-4/5">
          <p><strong>Adjunta tu Certificado único Laboral (CUL)</strong></p>
          <p>Este documento lo puedes obtener en el siguiente link: <a href="https://www.empleosperu.gob.pe/" style={{ color: 'blue'}} target="_blank">www.empleosperu.gob.pe</a>.
          En formato PDF, DOC o DOCX.
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
      {archivo && (
        <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full mr-3">
              <Check size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-lg">Certificado único laboral subido con éxito</p>
              <p className="font-bold text-gray-700">{archivo.nombre}</p>
            </div>
          </div>
          <div className="flex items-center">
            {/* <Button variant="link" onClick={handleViewFile}>
              <Eye size={24} />
            </Button> */}
            <Button variant="link" onClick={handleRemoveFile} className="ml-2">
              <Trash size={24} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;