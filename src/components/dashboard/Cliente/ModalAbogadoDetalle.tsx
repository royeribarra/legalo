"use client";

import { useEffect, useState } from "react";
import { abogadoService } from "@/services";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { useParams } from "next/navigation";
import { Briefcase, MapPin, Clock, ArrowLeft, X } from "lucide-react";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLoader } from "@/contexts/loaderContext";

interface ModalAbogadoDetalleProps {
  open: boolean;
  abogadoId?: number;
  onClose?: () => void;
}

export default function ModalAbogadoDetalle({ open, abogadoId, onClose }: ModalAbogadoDetalleProps) {
  const { id } = useParams();
  const { setLoading } = useLoader();
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("habilidades");

  useEffect(() => {
    fetchAbogadoDetalle();
  }, []);

  async function fetchAbogadoDetalle() {
    setLoading(true);
    if(abogadoId){
      try {
        const abogadoData = await abogadoService.getDetalleAbogado(abogadoId);
        setAbogado(abogadoData);
      } catch (error) {
        console.error("Error al obtener el detalle:", error);
        setError("No se pudo cargar el detalle del abogado");
      } finally{
        setLoading(false);
      }
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (!abogado) return <div>Cargando...</div>;

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detalles del Abogado</h2>
              <Button variant="ghost" onClick={onClose} className="p-1">
                <X size={24} />
              </Button>
            </div>
            <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <div className="flex items-center gap-4">
                <img
                  src={`${process.env.S3_FILE_ROUTE}/${abogado?.files.find((file)=>file.nombreArchivo==='archivo_imagen')?.filePath}`}
                  alt="img-abogado"
                  className="rounded-full w-20 h-20"
                />
                <div>
                  <p className="text-lg font-bold">{`${abogado.nombres} ${abogado.apellidos}`}</p>
                  <p>{abogado.direccion || "Ubicación desconocida"}</p>
                </div>
              </div>
              <Tabs.Root defaultValue="habilidades" className="mt-4" onValueChange={setSelectedTab} >
                <Tabs.List className="flex space-x-2 border-b pb-2">
                  {["documentos", "habilidades", "industrias", "servicios", "experiencias", "video"].map(tab => (
                    <Tabs.Trigger
                      key={tab}
                      value={tab}
                      className={`px-4 py-2 rounded-t-md transition-colors ${
                        selectedTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <Tabs.Content value="documentos" className="mt-4">
                  <div className="pb-2">
                    <Link href={`${process.env.S3_FILE_ROUTE}/${abogado?.files.find((file)=>file.nombreArchivo==='archivo_cv')?.filePath}`}>
                      <Button>Curriculum Vitae</Button>
                    </Link>
                  </div>
                  <div>
                    <Link href={`${process.env.S3_FILE_ROUTE}/${abogado?.files.find((file)=>file.nombreArchivo==='archivo_cul')?.filePath}`}>
                      <Button>CUL</Button>
                    </Link>
                  </div>
                </Tabs.Content>
                <Tabs.Content value="habilidades" className="mt-4">
                  <h2 className="font-bold">Habilidades Blandas</h2>
                  <ul className="list-disc list-inside">
                    {abogado.habilidadesBlandas?.map((h: any) => (
                      <li key={h.id}>{h.nombre}</li>
                    )) || <li>No hay habilidades blandas registradas.</li>}
                  </ul>
                  <h2 className="font-bold mt-4">Habilidades Duras</h2>
                  <ul className="list-disc list-inside">
                    {abogado.habilidadesDuras?.map((h: any) => (
                      <li key={h.id}>{h.nombre}</li>
                    )) || <li>No hay habilidades duras registradas.</li>}
                  </ul>
                </Tabs.Content>
                {/* Industrias */}
                <Tabs.Content value="industrias" className="mt-4">
                  <h2 className="font-bold">Industrias</h2>
                  <ul className="list-disc list-inside">
                    {abogado.industriasAbogado?.map((i) => (
                      <li key={i.id}>{i.industria.nombre}</li>
                    )) || <li>No hay industrias registradas.</li>}
                  </ul>
                </Tabs.Content>
                {/* Servicios */}
                <Tabs.Content value="servicios" className="mt-4">
                  <h2 className="font-bold">Servicios</h2>
                  <ul className="list-disc list-inside">
                    {abogado.serviciosAbogado?.map((s) => (
                      <li key={s.id}>{s.servicio.nombre}</li>
                    )) || <li>No hay servicios registrados.</li>}
                  </ul>
                </Tabs.Content>
                {/* Experiencias */}
                <Tabs.Content value="experiencias" className="mt-4">
                  <h2 className="font-bold">Experiencias</h2>
                  <ul className="list-disc list-inside">
                    {abogado.experiencias?.map((e) => (
                      <li key={e.id}>{e.descripcion}</li>
                    )) || <li>No hay experiencias registradas.</li>}
                  </ul>
                </Tabs.Content>
                <Tabs.Content value="video" className="mt-4">
                  <h2 className="font-bold">Video</h2>
                  {abogado?.files.find((file)=>file.nombreArchivo==='archivo_video') ? (
                    <div className="w-[600px] h-[400px] border border-black rounded-lg shadow-lg overflow-hidden">
                      <video
                        src={`${process.env.S3_FILE_ROUTE}/${abogado?.files.find((file)=>file.nombreArchivo==='archivo_video')?.filePath}`}
                        controls
                        className="w-full h-full object-cover"
                      >
                        Tu navegador no soporta el elemento video.
                      </video>
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay video disponible.</p>
                  )}
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}