import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";

interface SugerenciaBlanda {
  label: string;
  value: string;
}

const SugerenciasBlandasIniciales: SugerenciaBlanda[] = [
  { label: "Liderazgo", value: "liderazgo" },
  { label: "Eficiencia", value: "eficiencia" },
  { label: "Responsabilidad", value: "responsabilidad" },
];

type SkillSectionProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function SkillSection({ updateStateAbogado, stateAbogado }: SkillSectionProps) {
  const [habilidadDura, setHabilidadDura] = useState("");
  const [habilidadBlanda, setHabilidadBlanda] = useState("");
  const [sugerenciasBlandas, setSugerenciasBlandas] = useState<SugerenciaBlanda[]>([]);

  // Sincronizar sugerencias con el estado global
  useEffect(() => {
    setSugerenciasBlandas(
      SugerenciasBlandasIniciales.filter(
        (sugerencia) =>
          !stateAbogado.habilidades_blandas.some(
            (habilidad) => habilidad.nombre === sugerencia.value
          )
      )
    );
  }, [stateAbogado.habilidades_blandas]);

  const agregarHabilidadDura = () => {
    if (
      stateAbogado.habilidades_duras.length >= 5 ||
      habilidadDura === "" ||
      stateAbogado.habilidades_duras.some((item) => item.nombre === habilidadDura) ||
      stateAbogado.habilidades_blandas.some((item) => item.nombre === habilidadDura)
    ) {
      return;
    }

    const nuevasHabilidadesDuras = [
      ...stateAbogado.habilidades_duras,
      { id: Date.now(), nombre: habilidadDura },
    ];

    updateStateAbogado({ habilidades_duras: nuevasHabilidadesDuras });
    setHabilidadDura("");
  };

  const agregarHabilidadBlanda = () => {
    if (
      stateAbogado.habilidades_blandas.length >= 5 ||
      habilidadBlanda === "" ||
      stateAbogado.habilidades_blandas.some((item) => item.nombre === habilidadBlanda) ||
      stateAbogado.habilidades_duras.some((item) => item.nombre === habilidadBlanda)
    ) {
      return;
    }

    const nuevasHabilidadesBlandas = [
      ...stateAbogado.habilidades_blandas,
      { id: Date.now(), nombre: habilidadBlanda },
    ];

    updateStateAbogado({ habilidades_blandas: nuevasHabilidadesBlandas });
    setHabilidadBlanda("");
  };

  const eliminarHabilidadDura = (id: number) => {
    const nuevasHabilidadesDuras = stateAbogado.habilidades_duras.filter((item) => item.id !== id);
    updateStateAbogado({ habilidades_duras: nuevasHabilidadesDuras });
  };

  const eliminarHabilidadBlanda = (id: number) => {
    const habilidadEliminada = stateAbogado.habilidades_blandas.find((item) => item.id === id);
    const nuevasHabilidadesBlandas = stateAbogado.habilidades_blandas.filter(
      (item) => item.id !== id
    );

    updateStateAbogado({ habilidades_blandas: nuevasHabilidadesBlandas });

    if (habilidadEliminada) {
      setSugerenciasBlandas([
        ...sugerenciasBlandas,
        SugerenciasBlandasIniciales.find((s) => s.value === habilidadEliminada.nombre)!,
      ]);
    }
  };

  const agregarSugerenciaBlanda = (sugerencia: SugerenciaBlanda) => {
    if (
      stateAbogado.habilidades_blandas.length >= 5 ||
      stateAbogado.habilidades_duras.some((item) => item.nombre === sugerencia.value)
    ) {
      return;
    }

    const nuevasHabilidadesBlandas = [
      ...stateAbogado.habilidades_blandas,
      { id: Date.now(), nombre: sugerencia.value },
    ];

    updateStateAbogado({ habilidades_blandas: nuevasHabilidadesBlandas });
    setSugerenciasBlandas(sugerenciasBlandas.filter((s) => s.value !== sugerencia.value));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Habilidades duras */}
      <div className="border-b pb-2">
        <p className="text-sm mb-2">Tus skills o habilidades duras:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={habilidadDura}
            onChange={(e) => setHabilidadDura(e.target.value)}
            placeholder="Escribe tu habilidad dura"
            className="border p-2 rounded-md flex-grow"
          />
          <Button onClick={agregarHabilidadDura}>Agregar</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {stateAbogado.habilidades_duras.map((habilidad) => (
            <div key={habilidad.id} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
              {habilidad.nombre}
              <button onClick={() => eliminarHabilidadDura(habilidad.id!)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Habilidades blandas */}
      <div className="border-b pb-2">
        <p className="text-sm mb-2">Tus skills o habilidades blandas:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={habilidadBlanda}
            onChange={(e) => setHabilidadBlanda(e.target.value)}
            placeholder="Escribe tu habilidad blanda"
            className="border p-2 rounded-md flex-grow"
          />
          <Button onClick={agregarHabilidadBlanda}>Agregar</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {stateAbogado.habilidades_blandas.map((habilidad) => (
            <div key={habilidad.id} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
              {habilidad.nombre}
              <button onClick={() => eliminarHabilidadBlanda(habilidad.id!)}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sugerencias */}
      <div>
        <p className="text-sm mb-2">Sugerencias de habilidades blandas:</p>
        <div className="flex flex-wrap gap-2">
          {sugerenciasBlandas.map((sugerencia) => (
            <Button
              key={sugerencia.value}
              variant="outline"
              className="rounded-full"
              onClick={() => agregarSugerenciaBlanda(sugerencia)}
            >
              {sugerencia.label}
              <Plus size={16} />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillSection;
