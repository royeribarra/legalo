import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Eye, Trash, Check } from "lucide-react";

function FileUpload(){
    const [file, setFile] = useState<File | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
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
  
        setFile(selectedFile);
        setUploadSuccess(true);
      }
    };
  
    const handleCloseMessage = () => {
      setUploadSuccess(false);
    };
  
    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
  
    const handleRemoveFile = () => {
      setFile(null);
      setUploadSuccess(false);
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
            <p>Importa tu CUL para poder validar tu experiencia y educación en formato PDF, Doc, Dox.</p>
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
              {" "}
              Importa tu CUL <Upload size={18} color="white" className="ml-2" />
            </Button>
          </div>
        </div>
        {file && ( // Estructura del archivo subido
          <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-4">
            <div className="flex items-center">
              {/* Check dentro de un círculo */}
              <div className="flex items-center justify-center w-8 h-8 border-2 border-gray-400 rounded-full mr-3">
                <Check size={24}></Check>
              </div>
              <div className="flex flex-col">
                <p className="text-lg">Certificado único laboral subido con éxito</p>
                <p className="font-bold text-gray-700">{file.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="link" onClick={handleViewFile}>
                <Eye size={24}></Eye>
              </Button>
              <Button variant="link" onClick={handleRemoveFile} className="ml-2">
                <Trash size={24} />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
};

export default FileUpload;