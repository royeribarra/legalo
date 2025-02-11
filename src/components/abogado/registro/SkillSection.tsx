import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";

interface Sugerencia {
  label: string;
  value: string;
}

const SugerenciasBlandasIniciales: Sugerencia[] = [
  { label: "Comunicación efectiva", value: "Comunicación efectiva" },
  { label: "Resolución de problemas", value: "Resolución de problemas" },
  { label: "Trabajo en equipo", value: "Trabajo en equipo" },
  { label: "Capacidad de negociación", value: "Capacidad de negociación" },
  { label: "Empatía", value: "Empatía" },
  { label: "Pensamiento crítico", value: "Pensamiento crítico" },
  { label: "Adaptabilidad", value: "Adaptabilidad" },
  { label: "Organización y gestión del tiempo", value: "Organización y gestión del tiempo" },
  { label: "Toma de decisiones bajo presión", value: "Toma de decisiones bajo presión" },
  { label: "Ética profesional", value: "Ética profesional" },
];

const SugerenciasTecnicasIniciales: Sugerencia[] = [
  { label: "Redacción de documentos legales", value: "Redacción de documentos legales" },
  { label: "Análisis de casos legales", value: "Análisis de casos legales" },
  { label: "Diseño de estrategias legales", value: "Diseño de estrategias legales" },
  { label: "Gestión y organización documental", value: "Gestión y organización documental" },
  { label: "Análisis de jurisprudencia", value: "Análisis de jurisprudencia" },
  { label: "Investigación normativa y legislativa", value: "Investigación normativa y legislativa" },
  { label: "Redacción de informes legales", value: "Redacción de informes legales" },
  { label: "Preparación para audiencias", value: "Preparación para audiencias" },
  { label: "Manejo de bases de datos jurídicas", value: "Manejo de bases de datos jurídicas" },
  { label: "Revisión de documentos legales", value: "Revisión de documentos legales" },
];

type SkillSectionProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function SkillSection({ updateStateAbogado, stateAbogado }: SkillSectionProps) {
  const [habilidadDura, setHabilidadDura] = useState("");
  const [habilidadBlanda, setHabilidadBlanda] = useState("");
  const [sugerenciasBlandas, setSugerenciasBlandas] = useState<Sugerencia[]>([]);
  const [sugerenciasTecnicas, setSugerenciasTecnicas] = useState<Sugerencia[]>([]);

  useEffect(() => {
    setSugerenciasBlandas(
      SugerenciasBlandasIniciales.filter(
        (s) => !stateAbogado.habilidades_blandas.some((h) => h.nombre === s.value)
      )
    );
    setSugerenciasTecnicas(
      SugerenciasTecnicasIniciales.filter(
        (s) => !stateAbogado.habilidades_duras.some((h) => h.nombre === s.value)
      )
    );
  }, [stateAbogado.habilidades_blandas, stateAbogado.habilidades_duras]);

  const agregarHabilidad = (habilidad: string, tipo: "duras" | "blandas") => {
    if (!habilidad || stateAbogado[`habilidades_${tipo}`].length >= 5) return;

    if (stateAbogado[`habilidades_${tipo}`].some((item) => item.nombre === habilidad)) return;

    const nuevasHabilidades = [
      ...stateAbogado[`habilidades_${tipo}`],
      { id: Date.now(), nombre: habilidad },
    ];

    updateStateAbogado({ [`habilidades_${tipo}`]: nuevasHabilidades });
    tipo === "duras" ? setHabilidadDura("") : setHabilidadBlanda("");
  };

  const eliminarHabilidad = (id: number, tipo: "duras" | "blandas") => {
    const nuevasHabilidades = stateAbogado[`habilidades_${tipo}`].filter((item) => item.id !== id);
    updateStateAbogado({ [`habilidades_${tipo}`]: nuevasHabilidades });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Habilidades técnicas */}
      <div className="border-b pb-2">
        <p className="text-sm mb-2">Tus habilidades técnicas:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={habilidadDura}
            onChange={(e) => setHabilidadDura(e.target.value)}
            placeholder="Escribe tu habilidad técnica"
            className="border p-2 rounded-md flex-grow"
          />
          <Button onClick={() => agregarHabilidad(habilidadDura, "duras")}>Agregar</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {stateAbogado.habilidades_duras.map((habilidad) => (
            <div key={habilidad.id} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
              {habilidad.nombre}
              <button onClick={() => eliminarHabilidad(habilidad.id, "duras")}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sugerencias técnicas */}
      <div>
        <p className="text-sm mb-2">Sugerencias de habilidades técnicas:</p>
        <div className="flex flex-wrap gap-2">
          {sugerenciasTecnicas.map((sugerencia) => (
            <Button
              key={sugerencia.value}
              variant="outline"
              className="rounded-full"
              onClick={() => agregarHabilidad(sugerencia.value, "duras")}
            >
              {sugerencia.label}
              <Plus size={16} />
            </Button>
          ))}
        </div>
      </div>

      {/* Habilidades blandas */}
      <div className="border-b pb-2">
        <p className="text-sm mb-2">Tus habilidades blandas:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={habilidadBlanda}
            onChange={(e) => setHabilidadBlanda(e.target.value)}
            placeholder="Escribe tu habilidad blanda"
            className="border p-2 rounded-md flex-grow"
          />
          <Button onClick={() => agregarHabilidad(habilidadBlanda, "blandas")}>Agregar</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {stateAbogado.habilidades_blandas.map((habilidad) => (
            <div key={habilidad.id} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
              {habilidad.nombre}
              <button onClick={() => eliminarHabilidad(habilidad.id, "blandas")}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sugerencias técnicas */}
      <div>
        <p className="text-sm mb-2">Sugerencias de habilidades blandas:</p>
        <div className="flex flex-wrap gap-2">
          {sugerenciasBlandas.map((sugerencia) => (
            <Button
              key={sugerencia.value}
              variant="outline"
              className="rounded-full"
              onClick={() => agregarHabilidad(sugerencia.value, "blandas")}
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
