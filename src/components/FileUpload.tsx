import { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Upload, Eye, Trash, Check } from "lucide-react";

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Verifica si hay un archivo en localStorage al cargar el componente
    const storedFile = localStorage.getItem("culFile");
    const storedFileName = localStorage.getItem("uploadedCulFileName");

    if (storedFile && storedFileName) {
      // Crear un blob y mostrarlo como archivo
      const blob = new Blob([atob(storedFile)], { type: "application/octet-stream" });
      const restoredFile = new File([blob], storedFileName);
      setFile(restoredFile);
      setUploadSuccess(true);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
      ];

      if (!validTypes.includes(selectedFile.type)) {
        alert("Por favor, sube un archivo PDF o DOC/DOCX.");
        return;
      }

      // Verificar tamaño del archivo (5 MB)
      const fileSizeLimit = 5 * 1024 * 1024; // 5 MB en bytes
      if (selectedFile.size > fileSizeLimit) {
        alert("El archivo debe pesar menos de 5 MB.");
        return;
      }

      setFile(selectedFile);
      setUploadSuccess(true);

      // Convertir archivo a base64 y guardar en localStorage
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result?.toString().split(",")[1]; // Remueve el encabezado "data:..."
        if (base64File) {
          localStorage.setItem("culFile", base64File);
          localStorage.setItem("uploadedCulFileName", selectedFile.name);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadSuccess(false);
    localStorage.removeItem("culFile");
    localStorage.removeItem("uploadedCulFileName");
  };

  const handleViewFile = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl);
    }
  };

  return (
    <div className="border border-black p-5 border-dashed">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-4/5">
          <p><b>Adjunta tu Certificado único Laboral (CUL)</b></p>
          <p>Importa tu CUL para poder validar tu experiencia y educación en formato PDF, DOC, DOCX.</p>
        </div>
        <div className="w-full flex items-center justify-end lg:w-1/5">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Button onClick={handleButtonClick}>
            Importa tu CUL <Upload size={18} color="white" className="ml-2" />
          </Button>
        </div>
      </div>
      {file && (
        <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full mr-3">
              <Check size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-lg">Certificado único laboral subido con éxito</p>
              <p className="font-bold text-gray-700">{file.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="link" onClick={handleViewFile}>
              <Eye size={24} />
            </Button>
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