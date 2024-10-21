import specialtiesItems from "@/data/specialtiesItems";
import Image from "next/image";
import { useState } from "react";
import { Check as CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ModalAgregarEspecialidadProps = {
    showModal: boolean;
    // setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: any;
};

function ModalagregarEspecialidad({showModal, setShowModal}:ModalAgregarEspecialidadProps){
    const [selectServices, setSelectServices] = useState<string[]>([]);
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="relative w-full max-w-[900px] bg-white rounded-lg shadow-lg p-10 overflow-hidden">
                <h2 className="text-5xl mb-4 font-tiempos">¿Cuál es tu especialidad?</h2>
                <p className="text-lg my-4">
                Puedes escoger como mínimo de 1 y como máximo 5. Esto se mostrará en tu perfil público*
                </p>
                {/* Contenedor con scroll */}
                <div className="max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-3 gap-4">
                    {specialtiesItems.map((item) => (
                    <div key={item.CardTitle} className="relative p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div
                        className={`w-12 h-12 flex justify-center items-center rounded-full ${
                            selectServices.includes(item.CardTitle) ? "bg-[#D5F1F0]" : "bg-[#D9D9D9]"
                        }`}
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
                        className={`absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-sm cursor-pointer ${
                            selectServices.includes(item.CardTitle) ? "bg-[#007AFF]" : "border border-black"
                        }`}
                        onClick={() => {
                            if (selectServices.includes(item.CardTitle)) {
                            setSelectServices(selectServices.filter((service) => service !== item.CardTitle));
                            } else {
                            setSelectServices([...selectServices, item.CardTitle]);
                            }
                        }}
                        >
                        {selectServices.includes(item.CardTitle) && <CheckIcon className="text-white w-4 h-4" />}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
                <div className="flex justify-end gap-6 pt-4 mt-4">
                <Button
                    className="w-[190px] h-12 rounded-[10px]"
                    onClick={() => {
                    // Manejo de lógica para guardar especialidades
                    console.log("Especialidades seleccionadas:", selectServices);
                    setShowModal(false); // Cierra el modal después de guardar
                    }}
                >
                    Aceptar
                </Button>
                <Button
                    className="w-[190px] h-12 rounded-[10px] border border-gray-300"
                    onClick={() => setShowModal(false)} // Cierra el modal
                >
                    Cancelar
                </Button>
                </div>
            </div>
        </div>
    )
}

export default ModalagregarEspecialidad;