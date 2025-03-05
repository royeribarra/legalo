import { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import { especialidadService } from "@/services";

function EspecialidadEstadistica(){
  const [especialidades, setEspecialidades] = useState([]);

  async function fetchData() {
    try {
      const response = await especialidadService.getEstadistica();
      if (response?.data?.especialidadesEstadisticas) {
        const formattedData = response.data.especialidadesEstadisticas.flatMap(
          (especialidad: any) => [
            {
              especialidad: especialidad.nombre,
              value: Number(especialidad.total_ofertas), // Convertir a número
              categoria: "Ofertas",
            },
            {
              especialidad: especialidad.nombre,
              value: Number(especialidad.total_abogados),
              categoria: "Abogados",
            },
          ]
        );
        setEspecialidades(formattedData);
      }
    } catch (error) {
      console.error("Error cargando estadísticas", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    data: especialidades,
    isGroup: true, // Agrupado por categoría
    xField: "especialidad", // Nombre del servicio en eje X
    yField: "value", // Cantidad en eje Y
    seriesField: "categoria", // Diferencia entre ofertas y abogados
    color: ["#1890ff", "#52c41a"], // Azul para ofertas, verde para abogados
    legend: { position: "top-left" },
    label: {
      position: "right",
      style: { fill: "#fff", fontSize: 12, fontWeight: "bold" },
    },
  };

  return(
    <div>
      <h3>Comparación de Especialidades: Ofertas vs Abogados Registrados</h3>
      <Bar {...config} />
    </div>
  );
}

export default EspecialidadEstadistica;