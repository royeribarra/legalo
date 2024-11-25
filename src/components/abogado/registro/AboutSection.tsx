import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ModalagregarEspecialidad from "@/components/abogado/ModalAgregarEspecialidad";
import { Input } from "@/components/ui/input";
import { RegistroAbogadoState } from "@/contexts/registroAbogadoContext";

type ModalAgregarEducacionProps = {
    updateStateAbogado: (newState: Partial<RegistroAbogadoState>) => void;
    stateAbogado: RegistroAbogadoState;
};

function AboutSection({
    updateStateAbogado,
    stateAbogado
  }: ModalAgregarEducacionProps) {
    const [showModalAddEspecialidad, setShowModalAddEspecialidad] = useState(false);

    const onChangeGrado = (value: string) => {
        updateStateAbogado({grado: value});
    };

    const onChangeDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        updateStateAbogado({sobre_ti: value});
    };

    const onChangeCip = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateStateAbogado({cip: e.target.value});
    };

    const onChangeColegio = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateStateAbogado({colegio: e.target.value});
    };

    return (
        <div className="flex flex-col gap-2">
            <p>Completa tu perfil con tus especialidades, nivel profesional y una breve descripción sobre ti.</p>
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
                            <SelectItem value="abogado_colegiado">Abogado Colegiado</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {stateAbogado.grado === "abogado_colegiado" && (
                <div>
                    <p className="text-sm my-2">CIP*</p>
                    <Input
                        placeholder="Número de CIP"
                        type="number"
                        value={stateAbogado.cip}
                        onChange={onChangeCip}
                    />
                    <p className="text-sm my-2">Colegio*</p>
                    <Input
                        placeholder="Nombre del Colegio"
                        value={stateAbogado.colegio}
                        onChange={onChangeColegio}
                    />
                </div>
            )}

            <div>
                <p className="text-sm my-2">Especialidad*</p>
                <div
                    className="border border-gray-300 rounded-lg p-2 flex items-center flex-wrap gap-2 cursor-pointer"
                    onClick={() => setShowModalAddEspecialidad(true)}
                >
                    {stateAbogado.especialidades.length > 0 ? (
                        stateAbogado.especialidades.map((especialidad, index) => (
                            <div
                                key={index}
                                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm flex items-center"
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
                <ModalagregarEspecialidad
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
