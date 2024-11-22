"use client";

import React, { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { clsx } from "clsx";

const PageWithToast = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"info" | "success" | "error">("info");

  // Estilo basado en el tipo de toast
  const typeStyles = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  const showToast = (type: "info" | "success" | "error", title: string, description: string) => {
    setType(type);
    setTitle(title);
    setDescription(description);
    setOpen(true);
  };

  return (
    <>
      {/* Botón para mostrar el Toast */}
      <div className="p-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => showToast("success", "¡Éxito!", "El formulario fue enviado correctamente.")}
        >
          Mostrar Toast
        </button>
        <button
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() => showToast("error", "Error", "Hubo un problema con tu solicitud.")}
        >
          Mostrar Error
        </button>
      </div>

      {/* Radix Toast */}
      <Toast.Provider>
        <Toast.Root
          open={open}
          duration={5000}
          onOpenChange={setOpen}
          className={clsx(
            "flex items-center gap-4 p-4 rounded-lg shadow-lg w-96 animate-slide-in-up",
            typeStyles[type]
          )}
        >
          {/* Icono */}
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
            {type === "info" && <span className="text-blue-500">ℹ️</span>}
            {type === "success" && <span className="text-green-500">✔️</span>}
            {type === "error" && <span className="text-red-500">❌</span>}
          </div>
          {/* Contenido del Toast */}
          <div className="flex-1">
            <Toast.Title className="font-semibold text-lg">{title}</Toast.Title>
            <Toast.Description className="text-sm">{description}</Toast.Description>
          </div>
          {/* Botón para cerrar */}
          <button
            onClick={() => setOpen(false)}
            className="text-white font-bold text-lg"
            aria-label="Close"
          >
            ×
          </button>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
      </Toast.Provider>
    </>
  );
};

export default PageWithToast;
