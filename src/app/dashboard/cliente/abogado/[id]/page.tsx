"use client";

import { useEffect, useState } from "react";
import { abogadoService } from "@/services";
import * as Tabs from "@radix-ui/react-tabs";
import { useParams } from "next/navigation";
import { Briefcase, MapPin, Clock, ArrowLeft } from "lucide-react";
import { IAbogadoBack } from "@/interfaces/Abogado.interface";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AbogadoDetalle() {
  const { id } = useParams();
  const [abogado, setAbogado] = useState<IAbogadoBack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("habilidades");

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        fetchAbogadoDetalle(parsedId);
      } else {
        setError("ID no válido");
      }
    }
  }, [id]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  async function fetchAbogadoDetalle(id: number) {
    try {
      const abogadoData = await abogadoService.getDetalleAbogado(id);
      setAbogado(abogadoData);
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
      setError("No se pudo cargar el detalle del abogado");
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (!abogado) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex justify-start mt-8 mb-4">
        <Link href="/dashboard/cliente">
          <Button variant="outline" className="h-12 px-8 text-base rounded-lg border-gray-400">
            <ArrowLeft className="mr-2" size={18} /> Volver
          </Button>
        </Link>
      </div>
      <div className="p-4 border border-black rounded-lg shadow-md bg-white lg:p-8">
        {/* Encabezado con información del abogado */}
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex gap-4 items-center">
            <img
              src={abogado.foto_url || "/assets/images/face-6.jpeg"}
              alt="img-abogado"
              className="rounded-full w-24 h-24"
            />
            <div>
              <p className="text-2xl font-bold">{`${abogado.nombres} ${abogado.apellidos}`}</p>
              <div>
                {
                  abogado.especialidadesAbogado.map((especialidadAbogado)=>
                    <p key={especialidadAbogado.id}>{especialidadAbogado.especialidad.nombre || "Especialidad no especificada"}</p>
                  )
                }
              </div>
              <p>{abogado.direccion || "Ubicación desconocida"}</p>
            </div>
          </div>
        </div>

        {/* Botones adicionales */}
        <div className="flex gap-4 flex-wrap mt-6">
          <button className="border border-black rounded-full flex items-center gap-2 px-4 py-2">
            <MapPin size={24} />
            <span>{abogado.direccion || "Ubicación desconocida"}</span>
          </button>
          <button className="border border-black rounded-full flex items-center gap-2 px-4 py-2">
            <Clock size={24} />
            <span>{"Disponibilidad no definida"}</span>
          </button>
        </div>

        {/* Tabs */}
        <Tabs.Root defaultValue="documentos" className="mt-8" onValueChange={handleTabChange}>
          <Tabs.List className="flex space-x-4 border-b border-gray-300 pb-2">
            <Tabs.Trigger 
              value="documentos" 
              className={`tab ${selectedTab === "documentos" ? "bg-blue-600 text-white" : "bg-transparent text-black"}`}
            >
              Documentos
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="habilidades" 
              className={`tab ${selectedTab === "habilidades" ? "bg-blue-600 text-white" : "bg-transparent text-black"}`}
            >
              Habilidades
            </Tabs.Trigger>
            <Tabs.Trigger value="industrias" className={`tab ${selectedTab === "industrias" ? "bg-blue-600 text-white" : "bg-transparent text-black"}`}>
              Industrias
            </Tabs.Trigger>
            <Tabs.Trigger value="servicios" className={`tab ${selectedTab === "servicios" ? "bg-blue-600 text-white" : "bg-transparent text-black"}`}>
              Servicios
            </Tabs.Trigger>
            <Tabs.Trigger value="experiencias" className={`tab ${selectedTab === "experiencias" ? "bg-blue-600 text-white" : "bg-transparent text-black"}`}>
              Experiencias
            </Tabs.Trigger>
            <Tabs.Trigger value="video" className={`tab ${selectedTab === "video" ? "bg-blue-600 text-white" : "bg-transparent text-black"}`}>
              Video
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="documentos" className="mt-4">
            <div className="p-2">
              <Link href={`${process.env.S3_FILE_ROUTE}/${abogado.cv_url}`}>
                <Button>Curriculum Vitae</Button>
              </Link>
            </div>
            <div className="p-2">
              <Link href={`${process.env.S3_FILE_ROUTE}/${abogado.cul_url}`}><Button>CUL</Button></Link>
            </div>
          </Tabs.Content>
          {/* Contenido de las pestañas */}
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
            <div>
              <video
                src={`${process.env.S3_FILE_ROUTE}/${abogado.video_url}` }
                controls
                width="600"
                style={{ border: '1px solid black', borderRadius: '8px' }}
              >
                Tu navegador no soporta el elemento video.
              </video>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}
