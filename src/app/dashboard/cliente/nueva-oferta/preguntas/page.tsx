"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ModalCrearProyectoOk from "@/components/ModalCrearProyectoOk";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import { IArchivo } from "@/interfaces/Archivo.interface";

// Definimos un tipo para los items
interface Item {
  id: number;
  name: string;
}

const PublicarPageEight = () => {
  const router = useRouter();
  console.log(router);
  const { state, updateState } = useOferta();
  const { token } = useAuth();
  const [items, setItems] = useState<Item[]>([{ id: 1, name: "Tu Pregunta" }]);
  const [input, setInput] = useState<string>("");

  const [showModalCrearProyectoOk, setModalCrearProyectoOk] = useState(false);

  const handleModalCrearProyectoOk = () => {
    setModalCrearProyectoOk(!showModalCrearProyectoOk);
  };

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    const parsedItems: Item[] = savedItems ? JSON.parse(savedItems) : [];
    setItems(parsedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (items.length >= 5) {
      // Puedes agregar un mensaje de advertencia o simplemente no permitir agregar más.
      alert("Has alcanzado el límite de 5 preguntas.");
      return;
    }
    const newItem: Item = { id: Date.now(), name: input };
    setItems([...items, newItem]);
    setInput("");
  };

  const updateItem = (id: number, newName: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name: newName } : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (id: number) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const newPreguntas = items.map((item) => ({ nombre: item.name }));
    updateState({ preguntas: newPreguntas });

    const data = {
      ...state,
      clienteId: token?.id,
      documento: ''
    };
    console.log(data);

    if (state.documento && token) {
      const url = `${process.env.BASE_APP_API_URL}/temp-files/upload-oferta-documento`;
      enviarArchivo(state.documento, token?.id, token.correo, 'oferta', url);
    }

    fetch(`${process.env.BASE_APP_API_URL}/ofertas/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.state) {
          localStorage.removeItem("ofertaState");
          setModalCrearProyectoOk(true);
        }
      })
      .catch((err) => console.log(err));
  };

  function base64ToBlob(base64: string, mimeType: string): Blob {
    try {
      // Verificar si la cadena tiene el prefijo esperado
      if (!base64.includes(",")) {
        throw new Error("La cadena base64 no tiene el formato esperado.");
      }
  
      const base64Content = base64.split(",")[1];
      if (!base64Content) {
        throw new Error("Contenido base64 no encontrado después de ','");
      }
  
      const byteCharacters = atob(base64Content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    } catch (error) {
      console.error("Error al convertir base64 a Blob:", error);
      throw error; // Opcional: lanzar el error para manejarlo en la llamada
    }
  }
  

  const enviarArchivo = async (archivo: IArchivo, id: number, correo: string, nombreArchivo: string, url: string) => {
    const archivoBlob = base64ToBlob(archivo.contenido, archivo.tipo);
    const formData = new FormData();
    formData.append("nombreArchivo", nombreArchivo);
    formData.append("file", archivoBlob, archivo.nombre);
    formData.append("id", `${id}`);
    formData.append("correo", correo);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Archivo enviado correctamente", data);
    } catch (error) {
      console.error("Error al enviar el archivo", error);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={100} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 8/6</p>
      </div>
      <div>
        <h1 className="text-[36px] my-4 font-nimbus ">
          Preguntas de selección <br />
          (opcional)
        </h1>
        <p className="mb-2 ">
          Esto te ayudará a identificar al candidato ideal.
        </p>
        <p className="mb-2 ">Ingresa un máximo de 5 preguntas.</p>

        <Button
          variant="outline"
          className="bg-[#EBEDF0] text-[#9F9F9F] border-black rounded-[10px] my-8"
          onClick={addItem}
          disabled={items.length >= 5}
        >
          <Plus size={16} />
          Escribe tus preguntas
        </Button>

        <div>
          <Input
            value={input}
            className="w-full border-t-0 border-l-0 border-r-0 border-b border-black rounded-none focus-visible:border-none"
            onChange={onChangeInput}
            placeholder="Escribe aqui..."
          />
        </div>
        <div>
          <h2 className="text-lg font-bold my-4">Sugerencias</h2>
          <div className="flex items-center gap-2 my-2">
            <Checkbox id="c1" />
            <label
              htmlFor="c1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ¿Cuántos años de experiencia en puestos similares tienes?
            </label>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Checkbox id="c1" />
            <label
              htmlFor="c1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ¿En cuanto tiempo podrías iniciar el proyecto?
            </label>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Checkbox id="c1" />
            <label
              htmlFor="c1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ¿Estás de acuerdo con pagos trimestrales?
            </label>
          </div>
        </div>
        <ul className="my-8">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 my-2">
              <Input
                value={item.name}
                disabled
                className="bg-[#F2F2F7]"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateItem(item.id, e.target.value)
                }
              />
              <Button
                variant="outline"
                size="icon"
                className="border-none"
                onClick={() => deleteItem(item.id)}
              >
                <Trash size={24} color="red" />
              </Button>
            </li>
          ))}
        </ul>

        <div className="flex justify-end items-center mt-16 gap-2">
          <Button
            variant="outline"
            className="h-12 px-10 px-text-base rounded-[10px] border-black"
          >
            Guardar borrador
          </Button>

          <Button
            className="h-12 px-10 px-text-base rounded-[10px]"
            onClick={() => {
              handleSubmit(); // Guardamos las preguntas antes de continuar
            }}
          >
            Publicar <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>

      {showModalCrearProyectoOk && (
        <ModalCrearProyectoOk
          handleModalCrearProyectoOk={handleModalCrearProyectoOk}
        />
      )}
    </div>
  );
};

export default PublicarPageEight;
