export function getStateColor(estado: string): string {
  switch (estado) {
    case "creado":
    case "verificar_postulaciones":
      return "bg-blue-500 text-white";
    case "asignado":
      return "bg-yellow-500 text-white";
    case "cerrado":
      return "bg-gray-500 text-white";
    case "cancelado":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-300 text-black"; // Por si no tiene estado
  }
}

export function getFriendlyStateName(estado: string): string {
  switch (estado) {
    case "creado":
      return "Disponible";
    case "verificar_postulaciones":
      return "En revisión";
    case "asignado":
      return "Asignado";
    case "cerrado":
      return "Cerrado";
    case "cancelado":
      return "Cancelado";
    default:
      return "Desconocido"; // Valor por defecto
  }
}
  