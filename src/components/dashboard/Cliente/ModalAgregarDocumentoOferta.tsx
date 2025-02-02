import { useRef, useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOferta } from "@/contexts/ofertaContext";
import * as Dialog from "@radix-ui/react-dialog";

interface UploadDocumentModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalAgregarDocumentoOferta: React.FC<UploadDocumentModalProps> = ({ open, onClose }) => {
  const { state, updateState } = useOferta();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB

    if (!selectedFile) return;
    if (!validTypes.includes(selectedFile.type) || selectedFile.size > fileSizeLimit) {
      alert("Formato no válido o tamaño excedido (máx. 5MB). Usa PDF, DOC o DOCX.");
      return;
    }

    setFile(selectedFile);  // Sólo almacenamos el archivo temporalmente
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirm = () => {
    if (file) {
      const fileData = {
        nombre: file.name,
        tipo: file.type,
        contenido: file,
      };
      updateState({ documento: fileData });  // Solo actualizamos el estado al confirmar
    }
    onClose();  // Cerrar el modal
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Subir archivo</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <Dialog.Title className="text-xl font-semibold">Sube el documento de tu caso</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Formatos permitidos: PDF, DOC, DOCX (máx. 5MB)
          </Dialog.Description>

          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf, .doc, .docx"
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Subir archivo</Button>

            {file ? (
              <div className="flex items-center space-x-4 mt-4">
                <p className="text-gray-500">{file.name}</p>
                <Button variant="destructive" size="sm" onClick={handleRemoveFile}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-4">No se ha seleccionado ningún archivo.</p>
            )}

            <div className="flex justify-end mt-4 space-x-4">
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button onClick={handleConfirm} disabled={!file}>Confirmar</Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalAgregarDocumentoOferta;
