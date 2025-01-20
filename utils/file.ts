export const handleFileUpload = (
  event: React.ChangeEvent<HTMLInputElement>,
  onFileUploaded: (fileData: {
    name: string;
    type: string;
    content: string;
  }) => void,
  validTypes: string[], // Tipos de archivo permitidos
  maxSize: number // Tamaño máximo permitido en bytes
) => {
  const selectedFile = event.target.files?.[0];

  if (!selectedFile) return;

  // Validar tipo de archivo
  if (!validTypes.includes(selectedFile.type)) {
    alert(`Formato de archivo no válido. Solo se permiten: ${validTypes.join(", ")}.`);
    return;
  }

  // Validar tamaño del archivo
  if (selectedFile.size > maxSize) {
    alert(`El archivo debe pesar menos de ${(maxSize / 1024 / 1024).toFixed(2)} MB.`);
    return;
  }

  // Leer archivo como Base64
  const reader = new FileReader();
  reader.onload = () => {
    const base64File = reader.result?.toString();
    if (base64File) {
      onFileUploaded({
        name: selectedFile.name,
        type: selectedFile.type,
        content: base64File,
      });
    }
  };
  reader.readAsDataURL(selectedFile);
};

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = Array.from(byteCharacters).map((char) =>
    char.charCodeAt(0)
  );
  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
}