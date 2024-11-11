import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  desde_fecha: string;
  hasta_fecha: string;
  titulo: string;
  institucion: string;
  ubicacion: string;
  descripcion: string;
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
  const [trabajoActualmente] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desde_fecha: "",
      hasta_fecha: "",
      titulo: "",
      institucion: "",
      ubicacion: "",
      descripcion: "",
    },
  });

  // Efecto para setear el mes y año actual si el checkbox está marcado
  useEffect(() => {
    if (trabajoActualmente) {
      const currentMonthYear = new Date().toISOString().slice(0, 7);
      form.setValue("hasta_fecha", currentMonthYear);
    }
  }, [trabajoActualmente, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { desde_fecha, hasta_fecha } = values;
  
    // Validar que 'desde_fecha' no sea mayor que el mes actual
    if (desde_fecha > new Date().toISOString().slice(0, 7)) {
      form.setError("desde_fecha", {
        type: "manual",
        message: "La fecha 'Desde' no puede ser mayor al mes actual.",
      });
      return;
    }

    // Validar que 'hasta_fecha' no sea menor que 'desde_fecha'
    if (hasta_fecha < desde_fecha) {
      form.setError("hasta_fecha", {
        type: "manual",
        message: "La fecha 'Hasta' no puede ser anterior a la fecha 'Desde'.",
      });
      return;
    }

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
      desde_fecha: values.desde_fecha,
      hasta_fecha: values.hasta_fecha,
      titulo: values.titulo,
      institucion: values.institucion,
      ubicacion: values.ubicacion,
      descripcion: values.descripcion,
    };
    if (educacionSelected) {
      const indexSelected = estudios.findIndex(
        (estudio: Educacion) => estudio.id === educacionSelected.id
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

  function onError(errors: FieldValues) {
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
      // const experiencia = JSON.parse(estudiosString);
      if (educacionSelected) {
        form.setValue("desde_fecha", educacionSelected.desde_fecha);
        form.setValue("hasta_fecha", educacionSelected.hasta_fecha);
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
                      name="desde_fecha"
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
                              max={new Date().toISOString().slice(0, 7)}  // Limita la fecha al mes actual
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
                              max={new Date().toISOString().slice(0, 7)}  // Limita la fecha al mes actual
                              min={form.watch('desde_fecha')}  // Asegura que 'hasta_fecha' no sea menor que 'desde_fecha'
                            />
                          </FormControl>
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
