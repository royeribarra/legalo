"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ModalCrearProyectoOk from "@/components/ModalCrearProyectoOk";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { IArchivo } from "@/interfaces/Archivo.interface";
import Link from "next/link";
import { base64ToBlob } from "utils/file";
import { clienteService, fileService, ofertaservice } from "@/services";
import { base64ToFile } from "utils/uploadFile";
import { useLoader } from "@/contexts/loaderContext";
import { useToast } from "@/contexts/toastContext";
import ModalAgregarDocumentoOferta from "@/components/dashboard/Cliente/ModalAgregarDocumentoOferta";

export interface IPregunta {
  id?: number;
  nombre: string;
}

const initialSuggestions: IPregunta[] = [
  { id: 1, nombre: "¿Cuántos años de experiencia en puestos similares tienes?" },
  { id: 2, nombre: "¿En cuánto tiempo podrías iniciar el proyecto?" },
  { id: 3, nombre: "¿Estás de acuerdo con pagos trimestrales?" },
];

const PublicarPageEight = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { setLoading } = useLoader();
  const { state, updateState, setDefaultValues } = useOferta();
  const { preguntas } = state;
  const { user } = useAuth();
  const [input, setInput] = useState<string>("");
  const [newOferta, setNewOferta] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<IPregunta[]>([...initialSuggestions]);

  const [showModalCrearProyectoOk, setModalCrearProyectoOk] = useState(false);
  const [showModalDocumentoOferta, setShowModalDocumentoOferta] = useState(false);
  
  const handleModalCrearProyectoOk = () => {
    setModalCrearProyectoOk(true);
  };
  
  const cerrarModalCrearProyecto = () => {
    setModalCrearProyectoOk(false);
    router.push("/dashboard/cliente");
  };

  const addItem = () => {
    if (preguntas.length >= 5) {
      alert("Has alcanzado el límite de 5 preguntas.");
      return;
    }
    if (!input.trim()) {
      alert("La pregunta no puede estar vacía.");
      return;
    }
    const newItem: IPregunta = { id: Date.now(), nombre: input };
    updateState({
      preguntas: [...preguntas, newItem]
    });
    setInput("");
  };

  const addFromSuggestion = (suggestion: IPregunta) => {
    if (preguntas.length >= 5) {
      alert("Has alcanzado el límite de 5 preguntas.");
      return;
    }
    
    updateState({
      preguntas: [...preguntas, suggestion]
    });
  
    setSuggestions((prev) => prev.filter((item) => item.id !== suggestion.id));
  };

  const deleteItem = (id: number) => {
    const filteredItems = preguntas.filter((item) => item.id !== id);
    const deletedItem = preguntas.find((item) => item.id === id);
  
    if (deletedItem) {
      // Solo agregar a `suggestions` si pertenece a `initialSuggestions`
      const wasInInitialSuggestions = initialSuggestions.some((s) => s.id === deletedItem.id);
      if (wasInInitialSuggestions) {
        setSuggestions((prev) => [...prev, deletedItem]);
      }
    }
  
    updateState({
      preguntas: filteredItems
    });
  };
  

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    // if (!state.documento) {
    //   setShowModalDocumentoOferta(true);
    //   return;
    // }
    setLoading(true);
    const data = {
      ...state,
      clienteId: user?.cliente?.id,
      documento: "",
    };

    try {
      const response = await ofertaservice.createOferta(data);
      if (response.state) {
        if (state.documento && user) {
          try {
            await enviarArchivo(state.documento, response.oferta.id, "oferta_documento");
          } catch (error) {
            console.error("Error al enviar el archivo", error);
            // No hacer return aquí, para que las siguientes líneas se ejecuten
          }
        }
        setModalCrearProyectoOk(true);
        localStorage.removeItem("ofertaState");
        setDefaultValues();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const enviarArchivo = async (
    archivo: IArchivo,
    ofertaId: number,
    nombreArchivo: string
  ) => {
    const body = {
      nombreArchivo,
      ofertaId,
      file: archivo.contenido,
      folder: "ofertas"
    };
    try {
      const response = await fileService.uploadFile(body);
    } catch (error) {
      console.error("Error al enviar el archivo", error);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full mx-auto mb-8">
        <Progress value={100/8*8} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 8/8</p>
      </div>
      <h1 className="text-[36px] my-4 font-nimbus">Preguntas de selección (opcional)</h1>
      <p>Esto te ayudará a identificar al candidato ideal.</p>
      <div className="flex gap-4 items-center my-8">
        <Input
          value={input}
          onChange={onChangeInput}
          placeholder="Escribe aquí..."
          className="flex-grow"
        />
        <Button
          variant="outline"
          className="flex items-center"
          onClick={addItem}
          disabled={preguntas.length >= 5}
        >
          <Plus size={16} />
        </Button>
      </div>
      <h2 className="text-lg font-bold my-4">Sugerencias</h2>
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="flex gap-4 items-center">
          <Checkbox
            id={`suggestion-${suggestion.id}`}
            onClick={() => addFromSuggestion(suggestion)}
          />
          <label htmlFor={`suggestion-${suggestion.id}`}>{suggestion.nombre}</label>
        </div>
      ))}
      <ul className="my-8">
        {preguntas.map((item) => (
          <li key={item.id} className="flex gap-4 my-2">
            <Input value={item.nombre} disabled />
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteItem(item.id!)}
            >
              <Trash size={24} />
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-16">
        <Link href="/dashboard/cliente/nueva-oferta/presupuesto">
          <Button variant="outline" className="h-12 px-10 text-base rounded-[10px]">
            <ArrowLeft className="mr-2" /> Volver
          </Button>
        </Link>

        <Button
          className="h-12 px-10 text-base rounded-[10px]"
          onClick={handleSubmit}
        >
          Publicar <ArrowRight className="ml-2" />
        </Button>
      </div>
      {showModalCrearProyectoOk && (
        <ModalCrearProyectoOk
          handleModalCrearProyectoOk={handleModalCrearProyectoOk}
          cerrarModalCrearProyecto={cerrarModalCrearProyecto}
          newOfertaId={newOferta}
        />
      )}
      {
        showModalDocumentoOferta &&
        <ModalAgregarDocumentoOferta
          open={showModalDocumentoOferta}
          onClose={()=>setShowModalDocumentoOferta(false)}
        />
      }
    </div>
  );
};

export default PublicarPageEight;
