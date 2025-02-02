import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";

type FileUploadProps = {
  uploadFileVideo: (fileData: { nombre: string; tipo: string; contenido: File }) => void;
  campo: "archivo_cul" | "archivo_cv" | "archivo_imagen";
  archivoVideo?: { nombre: string; tipo: string; contenido: File } | null;
  removeFileVideo: () => void;
};

function UploadVideo({ campo, uploadFileVideo, archivoVideo, removeFileVideo }: FileUploadProps) {
  const [file, setFile] = useState<{ nombre: string; tipo: string; contenido: File } | null>(archivoVideo || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (archivoVideo) {
      setFile(archivoVideo);
    }
  }, [archivoVideo]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      // Verificar duración y tamaño del video
      const videoUrl = URL.createObjectURL(selectedFile);
      const video = document.createElement("video");

      video.src = videoUrl;
      video.onloadedmetadata = () => {
        const duration = video.duration;
        const sizeInMB = selectedFile.size / (1024 * 1024);

        if (duration > 60) {
          setError("El video debe ser de máximo 1 minuto de duración.");
          setFile(null);
        } else if (sizeInMB > 10) {
          setError("El tamaño del video debe ser menor a 10 MB.");
          setFile(null);
        } else {
          setError(null);
          setFile({
            nombre: selectedFile.name,
            tipo: selectedFile.type,
            contenido: selectedFile,
          });
          uploadFileVideo({
            nombre: selectedFile.name,
            tipo: selectedFile.type,
            contenido: selectedFile,
          }); // Subir el archivo aquí
        }
      };
    }
  };

  const handleButtonClick = () => {
    const input = document.getElementById("video-upload") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleRemoveVideo = () => {
    setFile(null);
    removeFileVideo();
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Resetear el valor del input
    }
  };

  return (
    <div className="w-full lg:w-1/6 flex flex-col flex-center justify-center items-center gap-2">
      <Image
        src="/assets/images/ico-camera.png"
        alt="ico-camera"
        width={64}
        height={64}
        className="block"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        style={{ display: "none" }}
        id="video-upload"
      />
      <Button variant="secondary" onClick={handleButtonClick}>
        Sube un video tuyo
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {file && (
        <div className="flex flex-col items-center mt-2">
          <p className="text-sm text-gray-700">Video subido: {file.nombre}</p>
          <Button variant="outline" size="sm" onClick={handleRemoveVideo}>
            Eliminar video
          </Button>
        </div>
      )}
    </div>
  );
}

export default UploadVideo;
