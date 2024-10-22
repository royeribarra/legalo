import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

// Sugerencias iniciales de habilidades blandas
const SugerenciasBlandasIniciales = [
  {
    label: "Liderazgo",
    value: "liderazgo",
  },
  {
    label: "Eficiencia",
    value: "eficiencia",
  },
  {
    label: "Responsabilidad",
    value: "responsabilidad",
  },
];

function SkillSection() {
  // Estado para habilidades duras
  const [habilidadDura, setHabilidadDura] = useState("");
  const [habilidadesDuras, setHabilidadesDuras] = useState<string[]>([]);

  // Estado para habilidades blandas
  const [habilidadBlanda, setHabilidadBlanda] = useState("");
  const [habilidadesBlandas, setHabilidadesBlandas] = useState<string[]>([]);

  // Estado para sugerencias de habilidades blandas
  const [sugerenciasBlandas, setSugerenciasBlandas] = useState(
    SugerenciasBlandasIniciales
  );

  // Función para agregar habilidad dura
  const agregarHabilidadDura = () => {
    if (habilidadDura && !habilidadesDuras.includes(habilidadDura)) {
      setHabilidadesDuras([...habilidadesDuras, habilidadDura]);
      setHabilidadDura(""); // Limpiar el input
    }
  };

  // Función para agregar habilidad blanda
  const agregarHabilidadBlanda = () => {
    if (habilidadBlanda && !habilidadesBlandas.includes(habilidadBlanda)) {
      setHabilidadesBlandas([...habilidadesBlandas, habilidadBlanda]);
      setHabilidadBlanda(""); // Limpiar el input
    }
  };

  // Función para eliminar una habilidad dura
  const eliminarHabilidadDura = (habilidad: string) => {
    setHabilidadesDuras(
      habilidadesDuras.filter((item) => item !== habilidad)
    );
  };

  // Función para eliminar una habilidad blanda
  const eliminarHabilidadBlanda = (habilidad: string) => {
    setHabilidadesBlandas(
      habilidadesBlandas.filter((item) => item !== habilidad)
    );
    // Si la habilidad se elimina, se regresa a las sugerencias
    const sugerenciaEliminada = SugerenciasBlandasIniciales.find(
      (s) => s.value === habilidad
    );
    if (sugerenciaEliminada) {
      setSugerenciasBlandas([...sugerenciasBlandas, sugerenciaEliminada]);
    }
  };

  // Función para agregar una sugerencia blanda
  const agregarSugerenciaBlanda = (sugerencia: any) => {
    if (!habilidadesBlandas.includes(sugerencia.value)) {
      setHabilidadesBlandas([...habilidadesBlandas, sugerencia.value]);
      // Eliminar la sugerencia de la lista de sugerencias
      setSugerenciasBlandas(
        sugerenciasBlandas.filter((s) => s.value !== sugerencia.value)
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Sección para habilidades duras */}
      <div className="border-b border-black pb-1">
        <p className="text-sm my-2">Tus skills o habilidades duras:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={habilidadDura}
            onChange={(e) => setHabilidadDura(e.target.value)}
            placeholder="Escribe tu habilidad dura"
            className="border border-black p-2 rounded-md flex-grow"
          />
          <Button onClick={agregarHabilidadDura} className="border-black px-4">
            Guardar
          </Button>
        </div>
        <p className="text-xs text-right my-1">Máximo 5</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {habilidadesDuras.map((habilidad) => (
            <div
              key={habilidad}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {habilidad}
              <button onClick={() => eliminarHabilidadDura(habilidad)}>
                <X size={16} className="text-black" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección para habilidades blandas */}
      <div className="border-b border-black pb-1">
        <p className="text-sm my-2">Tus skills o habilidades blandas:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={habilidadBlanda}
            onChange={(e) => setHabilidadBlanda(e.target.value)}
            placeholder="Escribe tu habilidad blanda"
            className="border border-black p-2 rounded-md flex-grow"
          />
          <Button onClick={agregarHabilidadBlanda} className="border-black px-4">
            Guardar
          </Button>
        </div>
        <p className="text-xs text-right my-1">Máximo 5</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {habilidadesBlandas.map((habilidad) => (
            <div
              key={habilidad}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {habilidad}
              <button onClick={() => eliminarHabilidadBlanda(habilidad)}>
                <X size={16} className="text-black" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sugerencias de habilidades blandas */}
      <div>
        <p className="text-sm my-2">Sugerencias de habilidades blandas</p>
        <div className="flex flex-row gap-2">
          {sugerenciasBlandas.map((sugerencia) => (
            <Button
              key={sugerencia.value}
              variant="outline"
              className="rounded-full border-black"
              onClick={() => agregarSugerenciaBlanda(sugerencia)}
            >
              {sugerencia.label}
              <Plus size={20} color="black" className="ml-2" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillSection;
