import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function ImageUpload(){
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
  
    // Cargar la imagen guardada en localStorage cuando se monta el componente
    console.log(selectedImage);
    useEffect(() => {
      const storedImage = localStorage.getItem("profileImg");
      if (storedImage) {
        setImageBase64(storedImage);
      }
    }, []);
  
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedImage(file);
  
        // Convertir la imagen a base64 para almacenarla en localStorage
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImageBase64(base64String);
          localStorage.setItem("profileImg", base64String); // Guardar en localStorage
        };
      }
    };
  
    const handleButtonClick = () => {
      const input = document.getElementById("image-upload") as HTMLInputElement;
      input.click();
    };
  
    return (
      <div className="w-full lg:w-1/6 flex flex-col items-center gap-2">
        <Image
          src={
            imageBase64
              ? imageBase64
              : "/assets/images/ico-photo-perfil.png"
          }
          alt="Imagen subida"
          width={96}
          height={96}
          className="rounded-full"
          style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
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
      </div>
    );
};

export default ImageUpload;