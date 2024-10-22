import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X as IconX } from "lucide-react";
import { useEffect, useState } from "react";

const formSchema = z.object({
    desde_mes: z.string().min(2, {
      message: "Complete el mes",
    }),
    desde_ano: z.string().min(2, {
      message: "Complet el año",
    }),
    hasta_ano: z.string().min(2, {
      message: "Complete el año",
    }),
    hasta_mes: z.string().min(2, {
      message: "Complete el mes",
    }),
    titulo: z.string().min(2, {
      message: "Debe completar el título",
    }),
    empresa: z.string().min(2, {
      message: "Debe completar la institución",
    }),
    descripcion: z.string(),
});

type ModalAgregarEducacionProps = {
    showModal: boolean;
    // setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowModal: any;
    experienciaSelected: any;
    setExperienciaSelected: any;
};

function ModalAgregarExperiencia({
    showModal, setShowModal, experienciaSelected, setExperienciaSelected
}:ModalAgregarEducacionProps){
    const [trabajoActualmente, setTrabajoActualmente] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('es-ES', { month: 'long' });
    const currentYear = currentDate.getFullYear().toString();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            desde_mes: "",
            desde_ano: "",
            hasta_mes: "",
            hasta_ano: "",
            titulo: "",
            empresa: "",
            descripcion: ""
        },
    });

    // Efecto para setear el mes y año actual si el checkbox está marca
    useEffect(() => {
        if (trabajoActualmente) {
            form.setValue("hasta_mes", currentMonth);
            form.setValue("hasta_ano", currentYear);
        }else{
            form.setValue("hasta_mes", "");
            form.setValue("hasta_ano", "");
        }
    }, [trabajoActualmente, form, currentMonth, currentYear]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        const estudiosString = localStorage.getItem("listaExperiencia");
        let estudios = [];
        if (estudiosString) {
            estudios = JSON.parse(estudiosString);
        }
        const nuevoEstudio  = {
            id: (estudios.length === 0 ? 1 : experienciaSelected.id ),
            desde_mes: values.desde_mes,
            desde_ano: values.desde_ano,
            hasta_mes: values.hasta_mes,
            hasta_ano: values.hasta_ano,
            titulo: values.titulo,
            empresa: values.empresa,
            descripcion: values.descripcion,
        };
        if(experienciaSelected){
            const indexSelected = estudios.findIndex((estudio: any)=>estudio.id === experienciaSelected.id)
            estudios[indexSelected] = nuevoEstudio;
        }else{
            estudios.push(nuevoEstudio);
        }

        localStorage.setItem("listaExperiencia", JSON.stringify(estudios));
        setShowModal(false);
        setExperienciaSelected(null);
        form.reset();
    }

    function onError(errors: any) {
        console.log("Errores de validación", errors);
    }

    const cancelar = () => {
        setShowModal(false);
        setExperienciaSelected(null);
        form.reset();
    };

    useEffect(()=> {
        const estudiosString = localStorage.getItem("listaExperiencia");
        if(estudiosString){
            const experiencia = JSON.parse(estudiosString);
            const experienciaSeleccionada = experiencia[experienciaSelected - 1];
            if (experienciaSelected) {
                form.setValue("desde_mes", experienciaSelected.desde_mes);
                form.setValue("desde_ano", experienciaSelected.desde_ano);
                form.setValue("hasta_mes", experienciaSelected.hasta_mes);
                form.setValue("hasta_ano", experienciaSelected.hasta_ano);
                form.setValue("titulo", experienciaSelected.titulo);
                form.setValue("empresa", experienciaSelected.empresa);
                form.setValue("descripcion", experienciaSelected.descripcion);
              }
        }
    }, [experienciaSelected]);

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 ">
          <div className="bg-white p-16 rounded-lg shadow-lg lg:min-w-[970px] relative">
            <h2 className="text-2xl font-bold mb-4 border-b-[1px] border-[#AFB1B6] pb-2">
              Agregar experiencia laboral
            </h2>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormLabel>Desde*</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name="desde_mes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  className="border border-black rounded-[10px] h-12"
                                  placeholder="Enero"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="desde_ano"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  className="border border-black rounded-[10px] h-12"
                                  placeholder="2024"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div>
                      <FormLabel>Hasta*</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        <FormField
                          control={form.control}
                          name="hasta_mes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  className="border border-black rounded-[10px] h-12"
                                  placeholder="Set. 2024"
                                  {...field}
                                  disabled={trabajoActualmente ? true : false}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="hasta_ano"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel></FormLabel>
                              <FormControl>
                                <Input
                                  className="border border-black rounded-[10px] h-12"
                                  placeholder="2024"
                                  {...field}
                                  disabled={trabajoActualmente ? true : false}
                                />
                              </FormControl>
                              <FormDescription>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={trabajoActualmente}
                                        onCheckedChange={(checked) => setTrabajoActualmente(!!checked)}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Actualmente trabajo aquí
                                    </label>
                                </div>
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titulo*</FormLabel>
                        <FormControl>
                          <Input
                            className="border border-black rounded-[10px] h-12"
                            placeholder="Certificado Porfesional en Legal Tech en la Era Digital"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="empresa"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Empresa*</FormLabel>
                          <FormControl>
                            <Input
                              className="border border-black rounded-[10px] h-12"
                              placeholder="Massachusetts Institute of tecnology"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea
                            className="border border-black rounded-[10px]"
                            placeholder="Pequeña descripción..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-6 border-t-[1px] border-black pt-4">
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-[190px] h-12 rounded-[10px]"
                      onClick={cancelar}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="w-[190px] h-12 rounded-[10px]"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div
              className="absolute top-8 right-8 w-5 h-5 bg-black flex  justify-center items-center rounded-full cursor-pointer"
              onClick={cancelar}
            >
              <IconX className="text-white w-4 h-4" />
            </div>
          </div>
        </div>
    )
}

export default ModalAgregarExperiencia;