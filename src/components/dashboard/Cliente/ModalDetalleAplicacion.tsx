import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IOfertaBack } from "@/interfaces/Oferta.interface";
import { X } from "lucide-react"; // Ícono de cierre
import Link from "next/link";
import { IAplicacionBack } from "@/interfaces/Aplicacion.interface";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  aplicacion: IAplicacionBack;
  oferta: IOfertaBack;
}
function AbogadoModal({ isOpen, onClose, aplicacion, oferta }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full relative">
            {/* Botón de cierre en la esquina */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de la aplicación</h3>
            <div className="space-y-2">
              <p><strong>Nombre:</strong> {aplicacion.abogado.nombres} {aplicacion.abogado.apellidos}</p>
              {/* <p><strong>Correo:</strong> {aplicacion.abogado.correo}</p>
              <p><strong>Teléfono:</strong> {aplicacion.abogado.telefono}</p> */}
              <p><strong>Salario Esperado:</strong> S/ {aplicacion.salarioEsperado}</p>
            </div>
            <div className="mt-2">
              <Link href={`${process.env.S3_FILE_ROUTE}/${aplicacion?.files.find((file)=>file.nombreArchivo==='aplicacion_documento')?.filePath}`} target="_blank">
                <Button variant={"secondary"}>Ver documento de la aplicación</Button>
              </Link>
            </div>
            <div className="mt-2">
              <Link href={`${process.env.S3_FILE_ROUTE}/${aplicacion?.files.find((file)=>file.nombreArchivo==='aplicacion_video')?.filePath}`} target="_blank">
                <Button variant={"secondary"}>Ver video de la aplicación</Button>
              </Link>
            </div>
            {/* Preguntas y Respuestas */}
            <Card className="mt-6">
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-800">Preguntas y Respuestas</h3>
                <ul className="space-y-2 mt-2">
                  {oferta.preguntas_oferta.map((pregunta) => (
                    <li key={pregunta.id} className="border p-3 rounded-md shadow-sm">
                      <p className="font-medium">{pregunta.pregunta}</p>
                      <p className="text-gray-600">{pregunta.respuesta}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Botón de cierre */}
            <div className="mt-6 flex justify-end">
              <Button onClick={onClose} variant="outline">Cerrar</Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AbogadoModal;