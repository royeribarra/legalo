import specialtiesItems from "@/data/specialtiesItems";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Check as CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Especialidad {
    CardTitle: string,
    CardDescription: string,
    ImageSrc: string,
}

type ModalAgregarEspecialidadProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEspecialidades: React.Dispatch<React.SetStateAction<string[]>>;
};

function ModalagregarEspecialidad({ showModal, setShowModal, setEspecialidades }: ModalAgregarEspecialidadProps) {
    const [selectServices, setSelectServices] = useState<string[]>([]);

    const selectEspecialidad = (item: Especialidad) => {
        if (selectServices.length >= 5 && !selectServices.includes(item.CardTitle)) {
            console.log("No se puede agregar más de 5 especialidades");
            return;
        }
        if (selectServices.includes(item.CardTitle)) {
            setSelectServices(selectServices.filter((service) => service !== item.CardTitle));
        } else {
            setSelectServices([...selectServices, item.CardTitle]);
        }
    };

    const guardarEspecialidad = () => {
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
            const experiencia = JSON.parse(especialidadString);
            experiencia.listaEspecialidades = selectServices;
            localStorage.setItem("especialidad", JSON.stringify(experiencia));
        }
        // Actualiza las especialidades en el componente padre
        setEspecialidades(selectServices);
        setShowModal(false);
    };

    useEffect(() => {
        const especialidadString = localStorage.getItem("especialidad");
        if (especialidadString) {
            const experiencia = JSON.parse(especialidadString);
            setSelectServices(experiencia.listaEspecialidades || []);
        }
    }, []);

    return showModal ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="relative w-full max-w-[900px] bg-white rounded-lg shadow-lg p-10 overflow-hidden">
                <h2 className="text-5xl mb-4 font-tiempos">¿Cuál es tu especialidad?</h2>
                <p className="text-lg my-4">
                    Puedes escoger como mínimo 1 y como máximo 5. Esto se mostrará en tu perfil público*
                </p>
                <div className="max-h-[400px] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-4">
                        {specialtiesItems.map((item) => (
                            <div
                                key={item.CardTitle}
                                className="relative p-5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer"
                                onClick={() => selectEspecialidad(item)}
                            >
                                <div
                                    className={`w-12 h-12 flex justify-center items-center rounded-full ${selectServices.includes(item.CardTitle) ? "bg-[#D5F1F0]" : "bg-[#D9D9D9]"}`}
                                >
                                    <Image
                                        src={item.ImageSrc}
                                        alt={item.CardTitle}
                                        width={25}
                                        height={25}
                                    />
                                </div>
                                <p className="mt-2 text-center">{item.CardTitle}</p>
                                <div
                                    className={`absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-sm ${selectServices.includes(item.CardTitle) ? "bg-[#007AFF]" : "border border-black"}`}
                                >
                                    {selectServices.includes(item.CardTitle) && <CheckIcon className="text-white w-4 h-4" />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-6 pt-4 mt-4">
                    <Button className="w-[190px] h-12 rounded-[10px]" onClick={guardarEspecialidad}>
                        Aceptar
                    </Button>
                    <Button className="w-[190px] h-12 rounded-[10px] border border-gray-300" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    ) : null;
}

export default ModalagregarEspecialidad;
