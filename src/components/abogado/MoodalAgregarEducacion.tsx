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
  institucion: z.string().min(2, {
    message: "Debe completar la institución",
  }),
  ubicacion: z.string().min(2, {
    message: "Complete una ubicación",
  }),
  descripcion: z.string(),
});

interface Educacion {
  id: number,
  desde_mes: string;   // o puede ser un número, dependiendo de cómo manejes los meses
  desde_ano: string;   // año como número
  hasta_mes: string;   // o puede ser un número
  hasta_ano: string;   // año como número
  titulo: string;      // título del curso o grado
  institucion: string; // nombre de la institución
  ubicacion: string;
  descripcion: string;   // ubicación de la institución
}

type ModalAgregarEducacionProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  educacionSelected: Educacion | null;
  setEducacionSelected: React.Dispatch<React.SetStateAction<Educacion | null>>;
};

function ModalAgregarEducacion({
  showModal,
  setShowModal,
  setEducacionSelected,
  educacionSelected,
}: ModalAgregarEducacionProps) {
  console.log(showModal);
  const [trabajoActualmente, setTrabajoActualmente] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("es-ES", { month: "long" });
  const currentYear = currentDate.getFullYear().toString();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desde_mes: "",
      desde_ano: "",
      hasta_mes: "",
      hasta_ano: "",
      titulo: "",
      institucion: "",
      ubicacion: "",
      descripcion: "",
    },
  });

  // Efecto para setear el mes y año actual si el checkbox está marcado
  useEffect(() => {
    if (trabajoActualmente) {
      form.setValue("hasta_mes", currentMonth);
      form.setValue("hasta_ano", currentYear);
    } else {
      form.setValue("hasta_mes", "");
      form.setValue("hasta_ano", "");
    }
  }, [trabajoActualmente, form, currentMonth, currentYear]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const estudiosString = localStorage.getItem("listaEstudios");
    let estudios = [];
    if (estudiosString) {
      estudios = JSON.parse(estudiosString);
    }
    console.log(estudios);
    console.log(estudiosString);
    const nuevoEstudio = {
      id:
        estudios.length === 0
          ? 1
          : educacionSelected
            ? educacionSelected.id
            : estudios.length + 1,
      desde_mes: values.desde_mes,
      desde_ano: values.desde_ano,
      hasta_mes: values.hasta_mes,
      hasta_ano: values.hasta_ano,
      titulo: values.titulo,
      institucion: values.institucion,
      ubicacion: values.ubicacion,
      descripcion: values.descripcion,
    };
    if (educacionSelected) {
      const indexSelected = estudios.findIndex(
        (estudio: any) => estudio.id === educacionSelected.id
      );
      estudios[indexSelected] = nuevoEstudio;
    } else {
      estudios.push(nuevoEstudio);
    }
    localStorage.setItem("listaEstudios", JSON.stringify(estudios));

    setShowModal(false);
    setEducacionSelected(null);
    form.reset();
  }

  function onError(errors: any) {
    console.log("Errores de validación", errors);
  }

  const cancelar = () => {
    setShowModal(false);
    setEducacionSelected(null);
    form.reset();
  };

  useEffect(() => {
    const estudiosString = localStorage.getItem("listaEstudios");
    if (estudiosString) {
      const experiencia = JSON.parse(estudiosString);
      if (educacionSelected) {
        form.setValue("desde_mes", educacionSelected.desde_mes);
        form.setValue("desde_ano", educacionSelected.desde_ano);
        form.setValue("hasta_mes", educacionSelected.hasta_mes);
        form.setValue("hasta_ano", educacionSelected.hasta_ano);
        form.setValue("titulo", educacionSelected.titulo);
        form.setValue("institucion", educacionSelected.institucion);
        form.setValue("ubicacion", educacionSelected.ubicacion);
        form.setValue("descripcion", educacionSelected.descripcion);
      }
    }
  }, [educacionSelected]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 ">
      <div className="bg-white px-6 py-12 lg:p-16 lg:rounded-lg shadow-lg lg:min-w-[970px] relative w-full h-full lg:w-auto lg:h-auto overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b-[1px] border-[#AFB1B6] pb-2">
          Agregar educación
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
                  <div className="grid lg:grid-cols-2 gap-2">
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
                  name="institucion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institución o escuela*</FormLabel>
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
                <FormField
                  control={form.control}
                  name="ubicacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicacion*</FormLabel>
                      <FormControl>
                        <Input
                          className="border border-black rounded-[10px] h-12"
                          placeholder="Lima,Peru"
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

export default ModalAgregarEducacion;
