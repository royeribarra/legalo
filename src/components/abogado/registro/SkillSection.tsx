import { useEffect, useState } from "react";
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
  const [habilidadDura, setHabilidadDura] = useState("");
  const [habilidadesDuras, setHabilidadesDuras] = useState<string[]>(() => {
    const savedData = localStorage.getItem("habilidades");
    return savedData ? JSON.parse(savedData).habilidades_duras : [];
  });

  const [habilidadBlanda, setHabilidadBlanda] = useState("");
  const [habilidadesBlandas, setHabilidadesBlandas] = useState<string[]>(() => {
    const savedData = localStorage.getItem("habilidades");
    return savedData ? JSON.parse(savedData).habilidades_blandas : [];
  });

  const [sugerenciasBlandas, setSugerenciasBlandas] = useState(
    SugerenciasBlandasIniciales.filter(
      (sugerencia) =>
        !habilidadesBlandas.includes(sugerencia.value) // No mostrar sugerencias ya seleccionadas
    )
  );

  const guardarEnLocalStorage = (habilidadesDuras: string[], habilidadesBlandas: string[]) => {
    localStorage.setItem(
      "habilidades",
      JSON.stringify({
        habilidades_duras: habilidadesDuras,
        habilidades_blandas: habilidadesBlandas,
      })
    );
  };

  const agregarHabilidadDura = () => {
    if (habilidadesDuras.length >= 5) {
      console.log("No se admite más de 5 habilidades duras");
      return;
    }
    if (habilidadDura && !habilidadesDuras.includes(habilidadDura)) {
      const nuevasHabilidadesDuras = [...habilidadesDuras, habilidadDura];
      setHabilidadesDuras(nuevasHabilidadesDuras);
      guardarEnLocalStorage(nuevasHabilidadesDuras, habilidadesBlandas);
      setHabilidadDura("");
    }
  };

  const agregarHabilidadBlanda = () => {
    if (habilidadesBlandas.length >= 5) {
      console.log("No se admite más de 5 habilidades blandas");
      return;
    }
    if (habilidadBlanda && !habilidadesBlandas.includes(habilidadBlanda)) {
      const nuevasHabilidadesBlandas = [...habilidadesBlandas, habilidadBlanda];
      setHabilidadesBlandas(nuevasHabilidadesBlandas);
      guardarEnLocalStorage(habilidadesDuras, nuevasHabilidadesBlandas);
      setHabilidadBlanda("");
    }
  };

  const eliminarHabilidadDura = (habilidad: string) => {
    const nuevasHabilidadesDuras = habilidadesDuras.filter((item) => item !== habilidad);
    setHabilidadesDuras(nuevasHabilidadesDuras);
    guardarEnLocalStorage(nuevasHabilidadesDuras, habilidadesBlandas);
  };

  const eliminarHabilidadBlanda = (habilidad: string) => {
    const nuevasHabilidadesBlandas = habilidadesBlandas.filter((item) => item !== habilidad);
    setHabilidadesBlandas(nuevasHabilidadesBlandas);
    guardarEnLocalStorage(habilidadesDuras, nuevasHabilidadesBlandas);

    const sugerenciaEliminada = SugerenciasBlandasIniciales.find((s) => s.value === habilidad);
    if (sugerenciaEliminada) {
      setSugerenciasBlandas([...sugerenciasBlandas, sugerenciaEliminada]);
    }
  };

  const agregarSugerenciaBlanda = (sugerencia: any) => {
    if (habilidadesBlandas.length >= 5) {
      console.log("No se admite más de 5 habilidades blandas");
      return;
    }
    if (!habilidadesBlandas.includes(sugerencia.value)) {
      const nuevasHabilidadesBlandas = [...habilidadesBlandas, sugerencia.value];
      setHabilidadesBlandas(nuevasHabilidadesBlandas);
      guardarEnLocalStorage(habilidadesDuras, nuevasHabilidadesBlandas);
      setSugerenciasBlandas(sugerenciasBlandas.filter((s) => s.value !== sugerencia.value));
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
