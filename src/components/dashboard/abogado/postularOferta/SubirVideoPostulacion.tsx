import { Play as PlayIcon, Trash } from "lucide-react";
import { useRef, useState } from "react";

type FileUploadProps = {
  uploadFileVideo: (fileData: { nombre: string; tipo: string; contenido: File }) => void;
  campo: "aplicacion_video";
  archivoVideo?: { nombre: string; tipo: string; contenido: File } | null;
  removeFileVideo: () => void;
};

function SubirVideoPostulacion({ campo, uploadFileVideo, archivoVideo, removeFileVideo }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<{
    nombre: string;
    tipo: string;
    contenido: File;
  } | null>(archivoVideo || null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ["video/mp4", "video/avi", "video/mov"];
    const fileSizeLimit = 10 * 1024 * 1024; // 10 MB
    const videoUrl = URL.createObjectURL(selectedFile);
    const video = document.createElement("video");

    video.src = videoUrl;
    video.onloadedmetadata = () => {
      if (!validTypes.includes(selectedFile.type)) {
        alert("Formato no válido. Solo se permiten: MP4, AVI, MOV.");
        return;
      }

      if (selectedFile.size > fileSizeLimit) {
        alert("El video debe pesar menos de 10 MB.");
        return;
      }

      if (video.duration > 60) {
        alert("El video no puede durar más de 1 minuto.");
        return;
      }

      setUploadedVideo({
        nombre: selectedFile.name,
        tipo: selectedFile.type,
        contenido: selectedFile
      });

      uploadFileVideo({
        nombre: selectedFile.name,
        tipo: selectedFile.type,
        contenido: selectedFile,
      }); // Subir el archivo aquí
    };
  };

  const handleRemoveVideo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Evita que el click en el botón de eliminar dispare el onClick del div
    setUploadedVideo(null);
    removeFileVideo(); // Asegurar que también limpie el estado padre si es necesario
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-0 lg:p-8 flex flex-col gap-3 overflow-hidden">
      <h3 className="font-bold text-2xl">Sube un video de tu postulación</h3>
      <p>Graba un video de 1 minuto sobre quién eres y por qué eres ideal para el puesto.</p>
      <div className="border border-black border-dashed p-2 flex flex-col items-center cursor-pointer rounded-lg" onClick={handleClick}>
        <input type="file" ref={fileInputRef} className="hidden" accept="video/mp4, video/avi, video/mov" onChange={handleVideoChange} />
        {!uploadedVideo ? (
          <>
            <div className="flex justify-center items-center border border-black w-16 h-16 rounded-full">
              <PlayIcon />
            </div>
            <p>Agregar un video</p>
            <p className="text-xs text-gray-500">MP4, MOV, AVI (máx. 10 MB)</p>
          </>
        ) : (
          <>
            <p className="mt-2 text-gray-700">{uploadedVideo.nombre}</p>
            <button
              onClick={handleRemoveVideo}
              className="mt-3 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              aria-label="Eliminar video"
            >
              <Trash className="w-4 h-4 text-red-500" />
              <span>Eliminar</span>
            </button>
          </>
        )}
      </div>
      <div>
        <h3>Recomendaciones:</h3>
        <ul className="list-disc list-outside ml-5">
          <li><b>Claridad y Simplicidad: </b> El contenido debe ser claro y conciso.</li>
          <li><b>Empatía: </b> Sé natural y amigable en tu video.</li>
          <li><b>Anticipar problemas: </b> Asegúrate de que el video se suba sin errores.</li>
        </ul>
      </div>
    </div>
  );
}

export default SubirVideoPostulacion;