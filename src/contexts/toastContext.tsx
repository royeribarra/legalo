"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";
import { clsx } from "clsx";

type ToastType = "info" | "success" | "error";

type ToastContextType = {
  showToast: (type: ToastType, title: string, description: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState({
    type: "info" as ToastType,
    title: "",
    description: "",
  });

  const showToast = (type: ToastType, title: string, description: string) => {
    setToastData({ type, title, description });
    setOpen(true); // Activa el Toast
  };

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
          onOpenChange={setOpen}
          className={clsx(
            "flex items-center gap-4 p-4 rounded-lg shadow-lg w-96 animate-slide-in-up",
            typeStyles[toastData.type]
          )}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white">
            {toastData.type === "info" && <span className="text-blue-500">ℹ️</span>}
            {toastData.type === "success" && <span className="text-green-500">✔️</span>}
            {toastData.type === "error" && <span className="text-red-500">❌</span>}
          </div>
          <div className="flex-1">
            <Toast.Title className="font-semibold text-lg">{toastData.title}</Toast.Title>
            <Toast.Description className="text-sm">{toastData.description}</Toast.Description>
          </div>
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
