import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VideoUpload(){
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [videoName, setVideoName] = useState<string | null>(null);
  
    useEffect(() => {
      const storedVideo = localStorage.getItem("profileVideo");
  
      // Si hay un video almacenado, convertirlo de base64 a Blob y crear un objeto File
      if (storedVideo) {
        const byteString = atob(storedVideo.split(",")[1]);
        const mimeType = storedVideo.split(",")[0].match(/:(.*?);/)?.[1];
        const byteArray = new Uint8Array(byteString.length);
  
        for (let i = 0; i < byteString.length; i++) {
          byteArray[i] = byteString.charCodeAt(i);
        }
  
        const blob = new Blob([byteArray], { type: mimeType });
        const file = new File([blob], "profileVideo.mp4", { type: mimeType });
        setVideoFile(file);
        setVideoName(file.name);
      }
    }, []);
  
    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
  
      if (file) {
        // Verificar duración y tamaño del video
        const videoUrl = URL.createObjectURL(file);
        const video = document.createElement("video");
  
        video.src = videoUrl;
        video.onloadedmetadata = () => {
          const duration = video.duration;
          const sizeInMB = file.size / (1024 * 1024);
  
          if (duration > 60) {
            setError("El video debe ser de máximo 1 minuto de duración.");
            setVideoFile(null);
          } else if (sizeInMB > 10) {
            setError("El tamaño del video debe ser menor a 10 MB.");
            setVideoFile(null);
          } else {
            setError(null);
            setVideoFile(file);
            setVideoName(file.name);
  
            // Convertir el video a base64 para almacenarlo en localStorage
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;
              localStorage.setItem("profileVideo", base64String);
            };
            reader.readAsDataURL(file);
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
      setVideoFile(null);
      setVideoName(null);
      localStorage.removeItem("profileVideo");
    };
  
    return (
      <div className="w-full lg:w-1/6 flex flex-col flex-center justify-center items-center">
        <Image
          src="/assets/images/ico-camera.png"
          alt="ico-camera"
          width={64}
          height={64}
          className="block"
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          style={{ display: "none" }}
          id="video-upload"
        />
        <Button variant="link" onClick={handleButtonClick}>
          Sube un video tuyo
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {videoName && (
          <div className="flex flex-col items-center mt-2">
            <p className="text-sm text-gray-700">Video subido: {videoName}</p>
            <Button variant="outline" size="sm" onClick={handleRemoveVideo}>
              Eliminar video
            </Button>
          </div>
        )}
      </div>
    );
};

export default VideoUpload;