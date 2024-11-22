"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { clsx } from "clsx"; // Úsalo para manejar clases condicionalmente

type ToastType = "info" | "success" | "error";

type ToastContextType = {
  showToast: (type: ToastType, title: string, description: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ToastType>("info");

  const showToast = (type: ToastType, title: string, description: string) => {
    
    setType(type);
    setTitle(title);
    setDescription(description);
    setOpen(true);
  };

  // Estilo basado en el tipo de toast
  const typeStyles = {
    info: "bg-blue-500 text-white",
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider>
        <Toast.Root
          open={open}
          // duration={Infinity}
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
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe ser usado dentro de un ToastProvider");
  }
  return context;
};
