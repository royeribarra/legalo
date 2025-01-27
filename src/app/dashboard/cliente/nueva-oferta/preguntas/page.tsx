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

export interface IPregunta {
  id?: number;
  nombre: string;
}

const PublicarPageEight = () => {
  const router = useRouter();
  const { state, updateState, setDefaultValues } = useOferta();
  const { token } = useAuth();
  const [items, setItems] = useState<IPregunta[]>([]);
  const [input, setInput] = useState<string>("");
  const [newOferta, setNewOferta] = useState<number>(0);

  const [showModalCrearProyectoOk, setModalCrearProyectoOk] = useState(false);

  const handleModalCrearProyectoOk = () => {
    setModalCrearProyectoOk(true);
  };
  
  const cerrarModalCrearProyecto = () => {
    setModalCrearProyectoOk(false);
    router.push("/dashboard/cliente");
  };

  const [suggestions, setSuggestions] = useState<IPregunta[]>([
    { id: 1, nombre: "¿Cuántos años de experiencia en puestos similares tienes?" },
    { id: 2, nombre: "¿En cuánto tiempo podrías iniciar el proyecto?" },
    { id: 3, nombre: "¿Estás de acuerdo con pagos trimestrales?" },
  ]);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    const parsedItems: IPregunta[] = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    updateState({ preguntas: items }); // Actualizamos el contexto cada vez que cambien las preguntas.
  }, [items]);

  const addItem = () => {
    if (items.length >= 5) {
      alert("Has alcanzado el límite de 5 preguntas.");
      return;
    }
    if (!input.trim()) {
      alert("La pregunta no puede estar vacía.");
      return;
    }
    const newItem: IPregunta = { id: Date.now(), nombre: input };
    setItems([...items, newItem]);
    setInput("");
  };

  const addFromSuggestion = (suggestion: IPregunta) => {
    if (items.length >= 5) {
      alert("Has alcanzado el límite de 5 preguntas.");
      return;
    }
    setItems([...items, suggestion]);
    setSuggestions(suggestions.filter((item) => item.id !== suggestion.id)); // Quitamos de las sugerencias
  };

  const deleteItem = (id: number) => {
    const filteredItems = items.filter((item) => item.id !== id);

    // Si la pregunta eliminada estaba originalmente en la lista de sugerencias, la volvemos a agregar.
    const deletedItem = items.find((item) => item.id === id);
    if (deletedItem) {
      const wasInSuggestions = suggestions.every((s) => s.id !== deletedItem.id);
      if (wasInSuggestions) {
        setSuggestions([...suggestions, deletedItem]);
      }
    }

    setItems(filteredItems);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      ...state,
      clienteId: token?.cliente?.id,
      documento: "",
    };

    try {
      const response = await ofertaservice.createOferta(data);
      if (response.state) {
        if (state.documento && token) {
          enviarArchivo(state.documento, response.oferta.id, "oferta_documento");
        }
        localStorage.removeItem("ofertaState");
        setDefaultValues();
      }
      
    } catch (error) {
      console.log(error)
    }
  };

  const enviarArchivo = async (
    archivo: IArchivo,
    ofertaId: number,
    nombreArchivo: string
  ) => {
    const archivoBlob = base64ToFile(archivo.contenido, archivo.tipo, archivo.nombre);
    const body = {
      nombreArchivo,
      ofertaId,
      file: archivoBlob,
      folder: "ofertas"
    };

    try {
      const response = await fileService.uploadFile(body);
      if(response.state){
        setModalCrearProyectoOk(true);
      }
    } catch (error) {
      console.error("Error al enviar el archivo", error);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={100} className="mx-auto mb-4 h-2" />
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
          disabled={items.length >= 5}
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
        {items.map((item) => (
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
    </div>
  );
};

export default PublicarPageEight;
