import { useState, useEffect } from "react";
import { Check as CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";
import axios from "axios";

type ModalAgregarEspecialidadProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function ModalAgregarEspecialidad({
  showModal,
  setShowModal,
  stateAbogado,
  updateStateAbogado,
}: ModalAgregarEspecialidadProps) {
  const [selectServices, setSelectServices] = useState<number[]>([]); // Solo guardamos IDs
  const [serviceList, setServiceList] = useState<
    { id: number; nombre: string; imagen: string }[]
  >([]); // Lista de especialidades obtenidas desde la API

  // Efecto para obtener las especialidades desde la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_APP_API_URL}/especialidades/all`);
        setServiceList(response.data); // Seteamos la lista de especialidades obtenidas
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  // Sincronizamos el estado inicial con las especialidades de `stateAbogado`
  useEffect(() => {
    setSelectServices(stateAbogado.especialidades || []);
  }, [stateAbogado.especialidades]);

  // Función para seleccionar o deseleccionar una especialidad
  const selectEspecialidad = (item: { id: number; nombre: string; imagen: string }) => {
    const exists = selectServices.includes(item.id); // Verificamos si el ID ya está seleccionado

    if (selectServices.length >= 5 && !exists) {
      console.log("No se puede agregar más de 5 especialidades");
      return;
    }

    if (exists) {
      // Si ya está seleccionada, la eliminamos del array de IDs
      setSelectServices(selectServices.filter((id) => id !== item.id));
    } else {
      // Si no está seleccionada y hay espacio, la agregamos
      setSelectServices([...selectServices, item.id]);
    }
  };

  // Función para guardar las especialidades seleccionadas
  const guardarEspecialidad = () => {
    // Solo pasamos los IDs al backend
    updateStateAbogado({ especialidades: selectServices });
    setShowModal(false);
  };

  const dataServices = [
    {
      id: 1,
      nombre: "Abogado Civil",
      descripcion: "¿Necesitas revisar o firmar un contrato, asegurar la compra o alquiler de una propiedad o con el trámite de una herencia familiar?",
      imagen: "/civil.svg"
    },
    {
      id: 2,
      nombre: "Abogado Penalista",
      descripcion: "¿Te enfrentas a un juicio penal, necesitas asesoría en una investigación policial o quieres conocer tus derechos ante una detención?",
      imagen: "/penalista.svg"
    },
    {
      id: 3,
      nombre: "Abogado Laboral",
      descripcion: "¿Tienes problemas con un contrato de trabajo, fuiste despedido injustamente, necesitas asesoría en una inspección de SUNAFIL o sobre derechos laborales, como maternidad o acoso?",
      imagen: "/laboral.svg"
    },
    {
      id: 4,
      nombre: "Abogado Procesalista",
      descripcion: "¿Quieres presentar una demanda, necesitas ayuda para defenderte en un proceso judicial, o necesitas orientación en el seguimiento de tu caso judicial?",
      imagen: "/procesalista.svg"
    },
    {
      id: 5,
      nombre: "Abogado Administrativo",
      descripcion: "¿Necesitas apoyo para gestionar trámites con entidades públicas, defenderte de una sanción o multa o resolver problemas con permisos y licencias?",
      imagen: "/administrativo.svg"
    },
    {
      id: 6,
      nombre: "Abogado de Familia",
      descripcion: "¿Estás atravesando un divorcio, buscas custodia compartida, o necesitas asesoría sobre pensiones alimenticias y acuerdos familiares?",
      imagen: "/familia.svg"
    },
    {
      id: 7,
      nombre: "Abogado Tributario",
      descripcion: "¿Necesitas ayuda con la declaración de impuestos, o defensa en fiscalización de SUNAT o en un litigio tributario?",
      imagen: "/tributario.svg"
    },
    {
      id: 8,
      nombre: "Abogado de Migraciones",
      descripcion: "¿Necesitas ayuda con trámites de residencia, permisos de trabajo, o enfrentas problemas de inmigración?",
      imagen: "/migraciones.svg"
    },
    {
      id: 9,
      nombre: "Abogado de Protección al Consumidor",
      descripcion: "¿Te vendieron un producto defectuoso, no cumplieron con la garantía o te han hecho cobros indebidos?",
      imagen: "/proteccion-al-consumidor.svg"
    },
    {
      id: 10,
      nombre: "Abogado Empresarial",
      descripcion: "¿Planeas constituir una empresa, necesitas revisar contratos comerciales o estás involucrado en una fusión o disputa entre socios?",
      imagen: "/empresarial.svg"
    },
    {
      id: 11,
      nombre: "Abogado Ambiental",
      descripcion: "¿Necesitas asesoría sobre normativa ambiental, enfrentas problemas de permisos, o necesitas defensa en casos de contaminación?",
      imagen: "/ambiental.svg"
    },
    {
      id: 12,
      nombre: "Abogado de Arbitraje y Resolución de Conflicto",
      descripcion: "¿Tu contrato requiere resolver un conflicto ante un árbitro o tribunal arbitral o estás considerando iniciar una mediación o demanda arbitral?",
      imagen: "/arbitraje-resolucion-conflictos.svg"
    },
    {
      id: 13,
      nombre: "Abogado de la Competencia",
      descripcion: "¿Te han denunciado por prácticas anticompetitivas, o buscas cumplir con las normativas de competencia y evitar sanciones?",
      imagen: "/competencia.svg"
    },
    {
      id: 14,
      nombre: "Abogado de Competencia Desleal",
      descripcion: "¿Necesitas proteger tu marca de publicidad engañosa o tu negocio enfrenta prácticas desleales?",
      imagen: "/competencia-desleal.svg"
    },
    {
      id: 15,
      nombre: "Abogado de Compliance",
      descripcion: "¿Necesitas asesoría para cumplir con normativas legales, prevenir riesgos empresariales o implementar políticas de ética en tu organización?",
      imagen: "/compliance.svg"
    },
    {
      id: 16,
      nombre: "Abogado de Propiedad Intelectual",
      descripcion: "¿Quieres registrar una marca, proteger una invención o necesitas ayuda para defenderte de infracciones a tus derechos de autor?",
      imagen: "/propiedad-intelectual.svg"
    },
    {
      id: 17,
      nombre: "Abogado de Tecnología y Datos",
      descripcion: "¿Necesitas asesoría para proteger datos personales, negociar contratos de software, o resolver problemas de ciberseguridad?",
      imagen: "/tecnologia-de-datos.svg"
    },
    {
      id: 18,
      nombre: "Abogado de Salud",
      descripcion: "¿Enfrentas un conflicto de mala praxis médica, necesitas asesoría en seguros de salud, o buscas defender tus derechos como paciente?",
      imagen: "/salud.svg"
    }
  ];

  return showModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="relative w-full max-w-[900px] bg-white rounded-lg shadow-lg p-10 overflow-hidden">
        <h2 className="text-5xl mb-4 font-nimbus">¿Cuál es tu especialidad?</h2>
        <p className="text-lg my-4">
          Puedes escoger como mínimo 1 y como máximo 5. Esto se mostrará en tu
          perfil público*
        </p>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-3 gap-4">
            {dataServices.map((item) => {
              const isSelected = selectServices.includes(item.id); // Verificamos si el ID está seleccionado

              return (
                <div
                  key={item.id} // Usamos el ID como clave
                  className="relative p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
                  onClick={() => selectEspecialidad(item)}
                >
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full ${
                      isSelected ? "bg-[#D5F1F0]" : "bg-[#D9D9D9]"
                    }`}
                  >
                    <img
                      src={`/assets/images/especialidades/${item.imagen}`}
                      alt={item.nombre}
                      width={25}
                      height={25}
                    />
                  </div>
                  <p className="mt-2 text-center">{item.nombre}</p>
                  <div
                    className={`absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-sm ${
                      isSelected ? "bg-[#007AFF]" : "border border-black"
                    }`}
                  >
                    {isSelected && <CheckIcon className="text-white w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-6 pt-4 mt-4">
          <Button
            className="w-[190px] h-12 rounded-[10px] border border-gray-300"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>
          <Button
            className="w-[190px] h-12 rounded-[10px]"
            onClick={guardarEspecialidad}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ModalAgregarEspecialidad;
