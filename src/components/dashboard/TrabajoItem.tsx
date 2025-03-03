import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { IPagoAbogadoBack, IPagoBack, IProgresoBack, ITrabajoBack } from "@/interfaces/Trabajo.interface";
import ModalPago from "./Cliente/ModalPago";
import { trabajoService } from "@/services";
import { IClienteBack } from "@/interfaces/Cliente.interface";
import { useToast } from "@/contexts/toastContext";

interface TrabajoItemProps {
  tipe: string;
  trabajo: ITrabajoBack;
  persona: 'cliente' | 'abogado';
  cliente?: IClienteBack | null;
}

const TrabajoItem: React.FC<TrabajoItemProps> = ({ tipe, trabajo, persona, cliente }) => {
  const { showToast } = useToast();
  const [openModalProgreso, setOpenModalProgreso] = useState(false);
  const [newProgress, setNewProgress] = useState<number>(trabajo.progreso);
  const [openModalPago, setOpenModalPago] = useState(false);
  const [showModalFinalizarTrabajo, setShowModalFinalizarTrabajo] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [trabajoState, setTrabajoState] = useState<ITrabajoBack>(trabajo); // Estado para trabajo actualizado
  const whatsappNumber = "51939784580";

  const fetchExample = () => {
    console.log("paando ejemplo")
  };

  const handleOpenModal = () => {
    setOpenModalProgreso(true);
  };

  const handleCloseModal = () => {
    setOpenModalProgreso(false);
  };

  const handleSaveProgress = async () => {
    if (newProgress >= trabajo.progreso) {
      try {
        const data = {
          trabajoId: trabajo.id,
          progreso: newProgress,
          descripcion
        };
        const response = await trabajoService.registrarProgreso(data);
        if(response.state){
          setTrabajoState((prevState) => ({
            ...prevState,
            progreso: newProgress
          }));
          setDescripcion("");
          showToast("success", response.message, '')
        }
      } catch (error) {
        console.log(error);
      }
      setOpenModalProgreso(false);
    }
  };

  const hideModalPagoDetalle = () => {
    setOpenModalPago(false);
  };

  const showModalPagoDetalle = () => {
    setOpenModalPago(true);
  };

  const handleProgressClick = (value: number) => {
    if (value >= trabajo.progreso) {
      setNewProgress(value);
    }
  };

  const showFinalizarTrabajo = () => {
    setShowModalFinalizarTrabajo(true);
  };

  const finalizarTrabajo = async() => {
    try {
      const data = {
        trabajoId: trabajo.id
      };
      const response = await trabajoService.finalizarTrabajo(data);
      if(response.state){
        showToast("success", response.message, '');
        setShowModalFinalizarTrabajo(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 lg:p-8 border border-black rounded-[20px] flex flex-col gap-4">
      {/* Sección Cliente y Abogado */}
      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Información del Cliente</h3>
        <p>{trabajoState.cliente.nombres} {trabajoState.cliente.apellidos}</p>
        <h3 className="text-lg font-bold mt-2">Información del Abogado</h3>
        <p>{trabajoState.abogado.nombres} {trabajoState.abogado.apellidos}</p>
      </div>

      {/* Detalles de la Aplicación */}
      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Detalles de la Aplicación</h3>
        <p><strong>Fecha Aplicación:</strong> {trabajoState.aplicacion.fecha_aplicacion}</p>
        <p><strong>Estado:</strong> {trabajoState.aplicacion.status}</p>
        <p><strong>Salario Esperado:</strong> S/ {trabajoState.aplicacion.salarioEsperado}</p>
      </div>

      {/* Barra de progreso */}
      <div className="border p-4 rounded-md bg-gray-100">
        <h3 className="text-lg font-bold">Progreso</h3>
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-4" style={{ width: `${trabajoState.progreso}%` }}></div>
        </div>
        <p>{trabajoState.progreso}% Completado</p>
        {
          persona === 'abogado' &&
          <Button onClick={handleOpenModal} className="mt-2 mb-2">Registrar Progreso</Button>
        }

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Avance</th>
              <th className="border border-gray-300 px-4 py-2">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {trabajoState.progresos.map((progreso: IProgresoBack, index: number) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{progreso.progreso}</td>
                <td className="border border-gray-300 px-4 py-2">{progreso.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          persona === 'cliente' && (trabajo.progreso === 100) &&
          <Button onClick={showFinalizarTrabajo} className="mt-2 mb-2" disabled={trabajo.estado === 'finalizado'}>Finalizar Trabajo</Button>
        }
      </div>

{/* Tabla de Pagos */}
      {trabajoState.pagosAbogado && persona === 'abogado' && (
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
              {trabajoState.pagosAbogado.map((pago: IPagoAbogadoBack, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{pago.operacion}</td>
                  <td className="border border-gray-300 px-4 py-2">S/ {pago.monto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabla de Pagos */}
      {trabajoState.pagos && persona === 'cliente' && (
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
              {trabajoState.pagos.map((pago: IPagoBack, index: number) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{pago.operacion}</td>
                  <td className="border border-gray-300 px-4 py-2">S/ {pago.monto_total}</td>
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
      {openModalProgreso && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold">Registrar Progreso de Trabajo</h3>
            <p className="mt-4">Ingrese el nuevo porcentaje de progreso del trabajo.</p>

            {/* Botones de progreso rápido */}
            <div className="flex justify-between mt-4">
              {[25, 50, 75, 100].map((value) => (
                <button
                  key={value}
                  className={`p-2 border rounded w-1/4 transition-all
                    ${
                      value < trabajoState.progreso
                        ? "opacity-50 cursor-not-allowed"
                        : value === newProgress
                        ? "bg-blue-600 text-white border-2 border-blue-800 shadow-lg"
                        : "bg-blue-500 text-white"
                    }`}
                  onClick={() => handleProgressClick(value)}
                  disabled={value < trabajoState.progreso}
                >
                  {value}%
                </button>
              ))}
            </div>
            {/* Campo para el porcentaje de progreso manual */}
            <input
              type="number"
              className="mt-4 p-2 border rounded w-full"
              value={newProgress}
              onChange={(e) => setNewProgress(Math.max(trabajoState.progreso, Number(e.target.value)))}
              min={trabajoState.progreso}
              max={100}
            />
            {/* Campo para la descripción */}
            <textarea
              className="mt-4 p-2 border rounded w-full"
              placeholder="Ingrese una descripción del progreso..."
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {newProgress === 100 && (
              <div className="mt-4 p-3 bg-red-100 rounded">
                <h4 className="text-red-600 font-bold">Esta acción es irreversible</h4>
                <p className="text-red-500 text-sm">
                  Una vez marques el proyecto como completado no podrás hacer cambios ni revertirlo.
                </p>
              </div>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setOpenModalProgreso(false)} className="border px-4 py-2 rounded">Cancelar</button>
              <button onClick={handleSaveProgress} className="bg-blue-500 text-white px-4 py-2 rounded">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalPago
        isOpen={openModalPago}
        onClose={hideModalPagoDetalle}
        aplicacionId={trabajoState.aplicacion.id}
        trabajoId={trabajoState.id}
        fetchOfertasConAplicaciones={fetchExample}
        clienteId={cliente?.id}
      />
      {
        showModalFinalizarTrabajo &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-bold text-center">Finalizar Trabajo</h3>
            <p className="mt-4 text-center">
              Usted está a punto de dar por finalizado o completado un trabajo.
            </p>
            <p className="mt-4 text-red-600 text-center font-semibold">
              Recuerde que si finaliza el trabajo debe asegurarse de abonar todo el monto pactado o todo el costo pactado.
            </p>
            <p className="mt-4 text-center">¿Está seguro de finalizar el trabajo?</p>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={()=>setShowModalFinalizarTrabajo(false)} className="border px-4 py-2 rounded">
                Cancelar
              </button>
              <button onClick={finalizarTrabajo} className="bg-blue-500 text-white px-4 py-2 rounded">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TrabajoItem;
