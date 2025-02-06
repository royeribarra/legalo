import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { ITrabajoBack } from "@/interfaces/Trabajo.interface";
import ModalPago from "./Cliente/ModalPago";
import { trabajoService } from "@/services";

interface TrabajoItemProps {
  tipe: string;
  trabajo: ITrabajoBack;
  persona: 'cliente' | 'abogado';
}

const TrabajoItem: React.FC<TrabajoItemProps> = ({ tipe, trabajo, persona }) => {
  console.log(trabajo)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProgress, setNewProgress] = useState<number>(trabajo.progreso);
  const [openModalPago, setOpenModalPago] = useState(false);
  const whatsappNumber = "51939784580";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProgress = async () => {
    // Aquí iría la lógica para guardar el progreso
    console.log("Nuevo progreso guardado:", newProgress);
    try {
      const data = {
        trabajoId: trabajo.id,
        progreso: newProgress
      };
      const response = await trabajoService.updateTrabajo(data);
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    setIsModalOpen(false);
  };

  const hideModalPagoDetalle = () => {
    setOpenModalPago(false);
  };

  const showModalPagoDetalle = () => {
    setOpenModalPago(true);
  };

  return (
    <div className="p-4 lg:p-8 border border-black rounded-[20px] flex flex-col gap-4">
      {/* Sección Cliente y Abogado */}
      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Información del Cliente</h3>
        <p>{trabajo.cliente.nombres} {trabajo.cliente.apellidos}</p>
        <h3 className="text-lg font-bold mt-2">Información del Abogado</h3>
        <p>{trabajo.abogado.nombres} {trabajo.abogado.apellidos}</p>
      </div>
      
      {/* Detalles de la Aplicación */}
      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Detalles de la Aplicación</h3>
        <p><strong>Fecha Aplicación:</strong> {trabajo.aplicacion.fecha_aplicacion}</p>
        <p><strong>Estado:</strong> {trabajo.aplicacion.status}</p>
        <p><strong>Salario Esperado:</strong> ${trabajo.aplicacion.salarioEsperado}</p>
      </div>

      {/* Barra de progreso */}
      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Progreso</h3>
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-4" style={{ width: `${trabajo.progreso}%` }}></div>
        </div>
        <p>{trabajo.progreso}% Completado</p>
        {
          persona === 'abogado' &&
          <Button onClick={handleOpenModal} className="mt-2">Registrar Progreso</Button>
        }
      </div>

      {/* Tabla de Pagos */}
      {trabajo.pagos && (
        <div className="border p-4 rounded-md bg-gray-100">
          <h3 className="text-lg font-bold">Pagos</h3>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Operación</th>
                <th className="border border-gray-300 px-4 py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              {trabajo.pagos.map((pago: any, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{pago.operacion}</td>
                  <td className="border border-gray-300 px-4 py-2">${pago.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {
            persona === 'cliente' &&
            <Button onClick={showModalPagoDetalle} className="mt-2">Registrar Pago</Button>
          }
        </div>
      )}

      {/* Modal para registrar progreso */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold">Registrar Progreso de Trabajo</h3>
            <p className="mt-4">Ingrese el nuevo porcentaje de progreso del trabajo.</p>

            {/* Campo para el porcentaje de progreso */}
            <input
              type="number"
              className="mt-2 p-2 border rounded w-full"
              value={newProgress}
              onChange={(e) => setNewProgress(Number(e.target.value))}
              min={0}
              max={100}
            />

            {/* Campo para la descripción */}
            <textarea
              className="mt-4 p-2 border rounded w-full"
              placeholder="Ingrese una descripción del progreso..."
              rows={4}
              // Aquí puedes manejar el cambio de la descripción si es necesario
            />

            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={handleCloseModal} variant="outline">Cancelar</Button>
              <Button onClick={handleSaveProgress}>Aceptar</Button>
            </div>
          </div>
        </div>
      )}
      <ModalPago
        isOpen={openModalPago}
        onClose={hideModalPagoDetalle}
        aplicacionId={trabajo.aplicacion.id}
        trabajoId={trabajo.id}
      />
    </div>
  );
};

export default TrabajoItem;
