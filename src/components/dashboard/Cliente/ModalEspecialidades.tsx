import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa"; // Importamos el ícono de WhatsApp

interface ContentProps {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ContentProps[];
}

const ModalEspecialidades: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  const whatsappNumber = "51939784580";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[80%] max-w-3xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-lg font-bold text-gray-500">
            X
          </button>
        </div>
        <div className="mt-4 max-h-[400px] overflow-y-auto bg-gray-100 rounded-lg p-4">
          {content.map((item, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{item.nombre}</h3>
              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
        <p className="font-semibold pt-5">Estamos listos para ayudarte:</p>
        <p className="font-semibold">Si tienes alguna duda o necesitas ayuda, contáctanos por:</p>
        <Link href={`https://wa.me/${whatsappNumber}`} passHref target="_blank">
          <div className="flex items-center space-x-2">
            <FaWhatsapp className="text-green-500" />
            <span>{whatsappNumber}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ModalEspecialidades;
