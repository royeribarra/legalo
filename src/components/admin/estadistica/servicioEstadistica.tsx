import { useState, useEffect } from "react";
import { Bar } from "@ant-design/charts";
import { servicioService } from "@/services";

function ServicioEstadistica(){
  const [servicios, setServicios] = useState([]);

  async function fetchData() {
    try {
      const response = await servicioService.getEstadistica();
      if (response?.data?.serviciosEstadisticas) {
        const formattedData = response.data.serviciosEstadisticas.flatMap(
          (servicio: any) => [
            {
              servicio: servicio.nombre,
              value: Number(servicio.total_ofertas), // Convertir a número
              categoria: "Ofertas",
            },
            {
              servicio: servicio.nombre,
              value: Number(servicio.total_abogados),
              categoria: "Abogados",
            },
          ]
        );
        setServicios(formattedData);
      }
    } catch (error) {
      console.error("Error cargando estadísticas", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const config = {
    data: servicios,
    isGroup: true, // Agrupado por categoría
    xField: "servicio", // Nombre del servicio en eje X
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
      <h3>Comparación de Servicios: Ofertas vs Abogados Registrados</h3>
      <Bar {...config} />
    </div>
  );
}

export default ServicioEstadistica;