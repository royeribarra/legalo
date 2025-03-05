"use client";

import EspecialidadEstadistica from "@/components/admin/estadistica/especialidadEstadistica";
import ServicioEstadistica from "@/components/admin/estadistica/servicioEstadistica";

const EstadisticasPage = () => {

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <ServicioEstadistica />
      <EspecialidadEstadistica />
    </div>
  );
};

export default EstadisticasPage;
