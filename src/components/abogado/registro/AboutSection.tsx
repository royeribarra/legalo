import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ModalAgregarEspecialidad from "@/components/abogado/ModalAgregarEspecialidad";
import { Input } from "@/components/ui/input";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";
import axios from "axios";
import { especialidadService } from "@/services";

type ModalAgregarEducacionProps = {
  updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
  stateAbogado: RegistroAbogadoState;
};

function AboutSection({
  updateStateAbogado,
  stateAbogado,
}: ModalAgregarEducacionProps) {
  const [showModalAddEspecialidad, setShowModalAddEspecialidad] =
    useState(false);
  const [serviceList, setServiceList] = useState<
    { id: number; nombre: string; imagen: string }[]
  >([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<
    { id: number; nombre: string }[]
  >([]);

  // Efecto para obtener las especialidades desde la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await especialidadService.obtenerTodos();
        console.log(response);
        setServiceList(response); // Seteamos la lista de especialidades obtenidas
      } catch (error) {
        console.error("Error fetching services", error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    if (stateAbogado.especialidades.length > 0) {
      const selected = serviceList.filter((service) =>
        stateAbogado.especialidades.includes(service.id)
      );
      console.log(selected);
      setSelectedSpecialties(selected);
    }
  }, [stateAbogado.especialidades, serviceList]);

  const onChangeGrado = (value: string) => {
    updateStateAbogado({ grado: value });
  };

  const onChangeDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    updateStateAbogado({ sobre_ti: value });
  };

  const onChangeCip = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStateAbogado({ cip: e.target.value });
  };

  const onChangeColegio = (value: string) => {
    updateStateAbogado({ colegio: value });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* <p>
        Completa tu perfil con tus especialidades, nivel profesional y una breve descripción sobre ti.
      </p> */}
      <div>
        <Select onValueChange={onChangeGrado} value={stateAbogado.grado}>
          <p className="text-sm my-2">Grado*</p>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Grado académico</SelectLabel>
              <SelectItem value="estudiante">Estudiante</SelectItem>
              <SelectItem value="bachiller">Bachiller</SelectItem>
              <SelectItem value="abogado">Abogado</SelectItem>
              <SelectItem value="abogado_colegiado">
                Abogado Colegiado
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {stateAbogado.grado === "abogado_colegiado" && (
        <div>
          <p className="text-sm my-2">Número de Colegiatura*</p>
          <Input
            placeholder="Número de Colegiatura"
            type="number"
            value={stateAbogado.cip}
            onChange={onChangeCip}
          />
          {/* <p className="text-sm my-2">Colegio de Abogados*</p>
          <Input
            placeholder="Nombre del Colegio"
            value={stateAbogado.colegio}
            onChange={onChangeColegio}
          /> */}
          <Select onValueChange={onChangeColegio}>
            <p className="text-sm my-2">Colegio de Abogados*</p>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colegio</SelectLabel>
                <SelectItem value="amazonas">
                  Colegio de Abogados de Amazonas
                </SelectItem>
                <SelectItem value="ancash">
                  Colegio de Abogados de Áncash
                </SelectItem>
                <SelectItem value="apurimac">
                  Colegio de Abogados de Apurímac
                </SelectItem>
                <SelectItem value="arequipa">
                  Colegio de Abogados de Arequipa
                </SelectItem>
                <SelectItem value="ayacucho">
                  Colegio de Abogados de Ayacucho
                </SelectItem>
                <SelectItem value="cajamarca">
                  Colegio de Abogados de Cajamarca
                </SelectItem>
                <SelectItem value="callao">
                  Colegio de Abogados del Callao
                </SelectItem>
                <SelectItem value="canete">
                  Colegio de Abogados de Cañete
                </SelectItem>
                <SelectItem value="cusco">
                  Colegio de Abogados del Cusco
                </SelectItem>
                <SelectItem value="delsanta">
                  Colegio de Abogados de Del Santa
                </SelectItem>
                <SelectItem value="huancavelica">
                  Colegio de Abogados de Huancavelica
                </SelectItem>
                <SelectItem value="huanuco">
                  Colegio de Abogados de Huánuco
                </SelectItem>
                <SelectItem value="huaura">
                  Colegio de Abogados de Huaura
                </SelectItem>
                <SelectItem value="ica">Colegio de Abogados de Ica</SelectItem>
                <SelectItem value="junin">
                  Colegio de Abogados de Junín
                </SelectItem>
                <SelectItem value="lalibertad">
                  Colegio de Abogados de La Libertad
                </SelectItem>
                <SelectItem value="lambayeque">
                  Colegio de Abogados de Lambayeque
                </SelectItem>
                <SelectItem value="lima">
                  Colegio de Abogados de Lima
                </SelectItem>
                <SelectItem value="limanorte">
                  Colegio de Abogados de Lima Norte
                </SelectItem>
                <SelectItem value="limaeste">
                  Colegio de Abogados de Lima Este
                </SelectItem>
                <SelectItem value="limasur">
                  Colegio de Abogados de Lima Sur
                </SelectItem>
                <SelectItem value="loreto">
                  Colegio de Abogados de Loreto
                </SelectItem>
                <SelectItem value="madrededios">
                  Colegio de Abogados de Madre de Dios
                </SelectItem>
                <SelectItem value="moquegua">
                  Colegio de Abogados de Moquegua
                </SelectItem>
                <SelectItem value="pasco">
                  Colegio de Abogados de Pasco
                </SelectItem>
                <SelectItem value="piura">
                  Colegio de Abogados de Piura
                </SelectItem>
                <SelectItem value="puno">
                  Colegio de Abogados de Puno
                </SelectItem>
                <SelectItem value="sanmartin">
                  Colegio de Abogados de San Martín
                </SelectItem>
                <SelectItem value="selvacentral">
                  Colegio de Abogados de Selva Central
                </SelectItem>
                <SelectItem value="sullana">
                  Colegio de Abogados de Sullana
                </SelectItem>
                <SelectItem value="tacna">
                  Colegio de Abogados de Tacna
                </SelectItem>
                <SelectItem value="tumbes">
                  Colegio de Abogados de Tumbes
                </SelectItem>
                <SelectItem value="ucayali">
                  Colegio de Abogados de Ucayali
                </SelectItem>
                <SelectItem value="ventanilla">
                  Colegio de Abogados de Ventanilla
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <p className="text-sm my-2">Especialidad*</p>
        <div
          className="border border-gray-300 rounded-lg p-2 flex items-center flex-wrap gap-2 cursor-pointer"
          onClick={() => setShowModalAddEspecialidad(true)}
        >
          {selectedSpecialties.length > 0 ? (
            selectedSpecialties.map((especialidad) => (
              <div
                style={{ backgroundColor: "#e5e7eb", color: '#020817'}}
                key={especialidad.id}
                className="rounded-full px-3 py-1 text-sm flex items-center"
              >
                {especialidad.nombre}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Seleccionar especialidad</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-sm my-2">Sobre ti*</p>
        <Textarea
          placeholder="Una pequeña descripción"
          value={stateAbogado.sobre_ti}
          onChange={onChangeDescripcion}
        />
      </div>

      {showModalAddEspecialidad && (
        <ModalAgregarEspecialidad
          showModal={showModalAddEspecialidad}
          setShowModal={setShowModalAddEspecialidad}
          stateAbogado={stateAbogado}
          updateStateAbogado={updateStateAbogado}
        />
      )}
    </div>
  );
}

export default AboutSection;
