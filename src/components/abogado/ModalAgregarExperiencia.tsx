import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";

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
  desde_fecha: z.string().min(2, {
    message: "Complete el mes",
  }),
  hasta_fecha: z.string().min(2, {
    message: "Complete el año",
  }),
  titulo: z.string().min(2, {
    message: "Debe completar el título",
  }),
  empresa: z.string().min(2, {
    message: "Debe completar la institución",
  }),
  descripcion: z.string(),
});

interface Experiencia {
  id: number;
  desde_fecha: string;
  hasta_fecha: string;
  descripcion: string;
  empresa: string;
  titulo: string;
}

type ModalAgregarEducacionProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  experienciaSelected: Experiencia | null;
  setExperienciaSelected: React.Dispatch<React.SetStateAction<Experiencia | null>>;
};

function ModalAgregarExperiencia({
  showModal,
  setShowModal,
  experienciaSelected,
  setExperienciaSelected,
}: ModalAgregarEducacionProps) {
  const [trabajoActualmente, setTrabajoActualmente] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desde_fecha: "",
      hasta_fecha: "",
      titulo: "",
      empresa: "",
      descripcion: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const estudiosString = localStorage.getItem("listaExperiencia");
    let estudios = [];
    if (estudiosString) {
      estudios = JSON.parse(estudiosString);
    }
    const nuevoEstudio = {
      id:
        estudios.length === 0
          ? 1
          : experienciaSelected
            ? experienciaSelected.id
            : estudios.length + 1,
      desde_fecha: values.desde_fecha,
      hasta_fecha: values.hasta_fecha,
      titulo: values.titulo,
      empresa: values.empresa,
      descripcion: values.descripcion,
    };
    if (experienciaSelected) {
      const indexSelected = estudios.findIndex(
        (estudio: Experiencia) => estudio.id === experienciaSelected.id
      );
      estudios[indexSelected] = nuevoEstudio;
    } else {
      estudios.push(nuevoEstudio);
    }

    localStorage.setItem("listaExperiencia", JSON.stringify(estudios));
    setShowModal(false);
    setExperienciaSelected(null);
    form.reset();
  }

  function onError(errors: FieldValues) {
    console.log("Errores de validación", errors);
  }

  const cancelar = () => {
    setShowModal(false);
    setExperienciaSelected(null);
    form.reset();
  };

  useEffect(() => {
    const estudiosString = localStorage.getItem("listaExperiencia");
    if (estudiosString) {
      if (experienciaSelected) {
        form.setValue("desde_fecha", experienciaSelected.desde_fecha);
        form.setValue("hasta_fecha", experienciaSelected.hasta_fecha);
        form.setValue("titulo", experienciaSelected.titulo);
        form.setValue("empresa", experienciaSelected.empresa);
        form.setValue("descripcion", experienciaSelected.descripcion);
      }
    }
  }, [experienciaSelected]);

  useEffect(() => {
    if (trabajoActualmente) {
      const currentMonthYear = new Date().toISOString().slice(0, 7);
      form.setValue("hasta_fecha", currentMonthYear);
    }
  }, [trabajoActualmente, form]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 ">
      <div className="bg-white px-6 py-12 lg:p-16 lg:rounded-lg shadow-lg lg:min-w-[970px] relative w-full h-full lg:w-auto lg:h-auto overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b-[1px] border-[#AFB1B6] pb-2">
          Agregar experiencia laboral
        </h2>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-4"
            >
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <FormLabel>Desde*</FormLabel>
                  <div className="grid lg:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="desde_fecha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <Input
                              type="month"
                              className="border border-black rounded-[10px] h-12"
                              placeholder="Mes y Año"
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
                  <div className="grid lg:grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="hasta_fecha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel></FormLabel>
                          <FormControl>
                            <Input
                              type="month"
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
                                onCheckedChange={(checked) =>
                                  setTrabajoActualmente(!!checked)
                                }
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
              <div className="grid lg:grid-cols-2 gap-4">
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
                <Button className="w-[190px] h-12 rounded-[10px]" type="submit">
                  Guardar
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div
          className="absolute top-4 right-4 lg:top-8 lg:right-8 w-5 h-5 bg-black flex  justify-center items-center rounded-full cursor-pointer"
          onClick={cancelar}
        >
          <IconX className="text-white w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarExperiencia;
