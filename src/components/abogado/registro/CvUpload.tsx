import { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import { Eye, Trash, Check } from "lucide-react";
import Image from "next/image";

function CvUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Cargar el archivo desde localStorage al cargar el componente
  useEffect(() => {
    const storedFile = localStorage.getItem("cvFile");
    const storedFileName = localStorage.getItem("uploadedCvFileName");

    if (storedFile && storedFileName) {
      const blob = new Blob([atob(storedFile)], { type: "application/octet-stream" });
      const restoredFile = new File([blob], storedFileName);
      setFile(restoredFile);
      setUploadSuccess(true);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/msword"];
      if (!validTypes.includes(selectedFile.type)) {
        alert("Por favor, sube un archivo PDF o DOC/DOCX.");
        return;
      }

      const fileSizeLimit = 4.5 * 1024 * 1024;
      if (selectedFile.size > fileSizeLimit) {
        alert("El archivo debe pesar menos de 5 MB.");
        return;
      }

      setFile(selectedFile);
      setUploadSuccess(true);

      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result?.toString().split(",")[1];
        if (base64File) {
          localStorage.setItem("cvFile", base64File);
          localStorage.setItem("uploadedCvFileName", selectedFile.name);
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
    localStorage.removeItem("cvFile");
    localStorage.removeItem("uploadedCvFileName");
  };

  const handleViewFile = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl);
    }
  };

  return (
    <div>
      <p className="font-bold text-lg">CV*</p>
      <div
        className="border border-black border-dashed p-2 flex flex-col items-center cursor-pointer"
        onClick={handleButtonClick}
      >
        <Image src="/assets/images/ico-upload.png" alt="ico-cv" width={64} height={64} />
        <p>Sube tu Curriculum Vitae (CV)</p>
        <p className="text-xs text-gray-500">{file ? file.name : "DOC, DOCX, PDF (5 MB máximo)"}</p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf, .doc, .docx"
      />

      {file && (
        <div className="flex mt-2 space-x-2">
          <Button onClick={handleViewFile}><Eye /> Ver Archivo</Button>
          <Button onClick={handleRemoveFile}><Trash /> Eliminar</Button>
          {uploadSuccess && <Check className="text-green-500" />}
        </div>
      )}
    </div>
  );
}

export default CvUpload;
