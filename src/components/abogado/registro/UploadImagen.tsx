import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";

type FileUploadProps = {
  uploadFileImagen: (fileData: { nombre: string; tipo: string; contenido: File }) => void;
  campo: "archivo_cul" | "archivo_cv" | "archivo_imagen";
  archivoImagen?: { nombre: string; tipo: string; contenido: File } | null;
  removeFileImagen: () => void;
};

function UploadImagen({
  campo,
  uploadFileImagen,
  archivoImagen,
  removeFileImagen,
}: FileUploadProps) {
  const [file, setFile] = useState<{ nombre: string; tipo: string; contenido: File } | null>(
    archivoImagen || null
  );
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Si el archivo ya está presente (como archivoImagen), se carga al estado
    if (archivoImagen) {
      setFile(archivoImagen);
    }
  }, [archivoImagen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Verificar el tipo y el tamaño del archivo
      const validTypes = ["image/jpeg", "image/png"];
      const fileSizeLimit = 6 * 1024 * 1024; // 5 MB

      if (!validTypes.includes(selectedFile.type)) {
        setError("Solo se aceptan archivos JPG y PNG.");
        setFile(null);
        return;
      }

      if (selectedFile.size > fileSizeLimit) {
        setError("El archivo debe pesar menos de 5 MB.");
        setFile(null);
        return;
      }

      setError(null);
      setFile({
        nombre: selectedFile.name,
        tipo: selectedFile.type,
        contenido: selectedFile,
      });

      // Llamar a la función para subir el archivo
      uploadFileImagen({
        nombre: selectedFile.name,
        tipo: selectedFile.type,
        contenido: selectedFile,
      });
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abre el input de archivo cuando se hace clic en el botón
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    removeFileImagen();
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Resetear el valor del input
    }
  };

  return (
    <div className="w-full lg:w-1/6 flex flex-col items-center gap-2">
      <Image
        src={
          file
            ? URL.createObjectURL(file.contenido) // Usar la URL del archivo para la previsualización
            : "/assets/images/ico-photo-perfil.png"
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
        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/bmp" // Excluyendo SVG
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Button
        size="sm"
        variant="outline"
        className="rounded-full"
        onClick={handleButtonClick}
      >
        Sube una imagen*
      </Button>

      {file && (
        <Button
          size="sm"
          variant="outline"
          className="rounded-full mt-2"
          onClick={handleRemoveFile}
        >
          Eliminar imagen
        </Button>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mostrar errores */}
    </div>
  );
}

export default UploadImagen;
