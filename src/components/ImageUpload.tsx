import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";

type CvUploadProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
  campo: "archivo_imagen" | "archivo_cv" | "archivo_cul";
};

function ImageUpload({ campo, stateAbogado, updateStateAbogado }: CvUploadProps) {
  const [preview, setPreview] = useState<string | null>(null); // Para manejar la previsualización
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Formato de archivo no válido. Solo se aceptan PDF, JPG y PNG.");
        return;
      }

      const fileSizeLimit = 5 * 1024 * 1024;
      if (selectedFile.size > fileSizeLimit) {
        alert("El archivo debe pesar menos de 5 MB.");
        return;
      }

      // Crear una URL para previsualización
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

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
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    updateStateAbogado({ [campo]: null });
    setPreview(null); // Limpiar la previsualización
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input oculto al hacer clic en el botón
    }
  };

  const archivo = stateAbogado[campo];

  return (
    <div className="w-full lg:w-1/6 flex flex-col items-center gap-2">
      <Image
        src={
          preview || // Mostrar previsualización si existe
          (archivo ? `data:${archivo.tipo};base64,${archivo.contenido}` : "/assets/images/ico-photo-perfil.png")
        }
        alt="Imagen subida"
        width={96}
        height={96}
        className="rounded-full"
        style={{
          width: "96px",
          height: "96px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        size="sm"
        variant="outline"
        className="rounded-full"
        onClick={handleClick}
      >
        Sube una imagen*
      </Button>
      {preview && (
        <Button
          size="sm"
          variant="outline"
          className="rounded-full mt-2"
          onClick={handleRemoveFile}
        >
          Eliminar imagen
        </Button>
      )}
    </div>
  );
}

export default ImageUpload;
