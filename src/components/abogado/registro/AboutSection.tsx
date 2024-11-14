import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ModalagregarEspecialidad from "@/components/abogado/ModalAgregarEspecialidad";
import { Input } from "@/components/ui/input";

function AboutSection() {
    const [showModalAddEspecialidad, setShowModalAddEspecialidad] = useState(false);
    const [especialidades, setEspecialidades] = useState<string[]>([]);
    const [grado, setGrado] = useState<string | undefined>(undefined);
    const [sobreTi, setSobreTi] = useState<string>('');
    const [cip, setCip] = useState<string>(''); // Estado para CIP
    const [colegio, setColegio] = useState<string>(''); // Estado para colegio

    const onChangeGrado = (value: string) => {
        setGrado(value);
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
            const especialidad = JSON.parse(especialidadString);
            especialidad.grado = value;
            localStorage.setItem("especialidad", JSON.stringify(especialidad));
        }
    };

    const onChangeDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSobreTi(value);
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
            const especialidad = JSON.parse(especialidadString);
            especialidad.sobre_ti = value;
            localStorage.setItem("especialidad", JSON.stringify(especialidad));
        }
    };

    const onChangeCip = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCip(e.target.value);
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
        const especialidad = JSON.parse(especialidadString);
        especialidad.cip = e.target.value; // Actualizar el valor de 'sobre_ti'

        // Guardar el objeto actualizado de vuelta en localStorage
        localStorage.setItem("especialidad", JSON.stringify(especialidad));
        }
    };

    const onChangeColegio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColegio(e.target.value);
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
        const especialidad = JSON.parse(especialidadString);
        especialidad.colegio = e.target.value; // Actualizar el valor de 'sobre_ti'

        // Guardar el objeto actualizado de vuelta en localStorage
        localStorage.setItem("especialidad", JSON.stringify(especialidad));
        }
    };

    useEffect(() => {
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
            const especialidad = JSON.parse(especialidadString);
            setGrado(especialidad.grado);
            setSobreTi(especialidad.sobre_ti);
            setCip(especialidad.cip);
            setColegio(especialidad.colegio);
            setEspecialidades(especialidad.listaEspecialidades);
        }else{
            localStorage.setItem("especialidad", JSON.stringify({
                listaEspecialidades: [],
                grado: '',
                sobre_ti: '',
                cip: '',
                colegio: ','
            }));
        }
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div>
                <Select onValueChange={onChangeGrado} value={grado}>
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

            {grado === "abogado_colegiado" && (
                <div>
                    <p className="text-sm my-2">CIP*</p>
                    <Input
                        placeholder="Número de CIP"
                        type="number"
                        value={cip}
                        onChange={onChangeCip}
                    />
                    <p className="text-sm my-2">Colegio*</p>
                    <Input
                        placeholder="Nombre del Colegio"
                        value={colegio}
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
                    {especialidades.length > 0 ? (
                        especialidades.map((especialidad, index) => (
                            <div
                                key={index}
                                className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm flex items-center"
                            >
                                {especialidad}
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
                    value={sobreTi}
                    onChange={onChangeDescripcion}
                />
            </div>
            {showModalAddEspecialidad && (
                <ModalagregarEspecialidad
                    showModal={showModalAddEspecialidad}
                    setShowModal={setShowModalAddEspecialidad}
                    setEspecialidades={setEspecialidades}
                />
            )}
        </div>
    );
}

export default AboutSection;
