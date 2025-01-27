"use client";

import { Spin } from "antd";
import { useLoader } from "@/contexts/loaderContext"; // Importa el hook

const LoaderComponent: React.FC = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black z-50">
      <Spin tip="Cargando..." size="large" />
    </div>
  );
};

export default LoaderComponent;
