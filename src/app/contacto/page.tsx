"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLoader } from "@/contexts/loaderContext";
import { mailService } from "@/services";
import { useToast } from "@/contexts/toastContext";

const schema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Ingresa un correo válido"),
  servicio: z.string().min(1, "Selecciona una opción"),
  tipoServicio: z.string().min(1, "Selecciona un tipo de servicio"),
  message: z.string().min(1, "El mensaje no puede estar vacío"),
});

const ContactoPage = () => {
  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const [serviceTipe, setServiceTipe] = useState<string>("lawyer");

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      servicio: "",
      tipoServicio: "",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await mailService.enviarFormularioContacto(data);
      if(response.state){
        showToast("success", response.message, '');
      }
    } catch (error) {
      showToast("error", "No se pudo envíar el mail.", '');
    } finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      <div className="lg:flex p-4 max-w-[1250px] mx-auto gap-8">
        <div className="flex-1 p-4 max-w-[1250px] font-tiempos mt-8">
          <h2 className="text-6xl mb-4">
            <i>Conversa</i> con nosotros
          </h2>
          <p>
            ¿Tienes alguna pregunta o quieres saber más sobre nuestros
            servicios? Nos encantaría ayudarte. Completa el formulario o
            escríbenos directamente, y te responderemos lo antes posible.
            ¡Estamos aquí para expandir tus oportunidades!
          </p>
          <h3 className="text-3xl mb-4 my-8">Escríbenos</h3>
          <p>contacto@legalo.com</p>
          <h3 className="text-3xl mb-4 my-8">Síguenos</h3>
          <div className="flex flex-col underline gap-2">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Facebook</a>
          </div>
        </div>
        <div className="flex-1 p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-[600px] mx-auto space-y-6"
            >
              {/* Nombre */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu nombre completo"
                        {...field}
                        className="border-black rounded-[10px] focus:border-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="tucorreo@ejemplo.com"
                        type="email"
                        className="border-black rounded-[10px] focus:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ¿Quieres contratar o trabajar? */}
              <FormField
                control={form.control}
                name="servicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Quieres contratar o trabajar?</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="border-black rounded-[10px] focus:border-none">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contratar">Contratar</SelectItem>
                          <SelectItem value="trabajar">Trabajar</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ¿Qué tipo de servicio te interesa? */}
              <FormField
                control={form.control}
                name="tipoServicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Qué tipo de servicio te interesa?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Abogado Civil"
                        type="text"
                        className="border-black rounded-[10px] focus:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mensaje */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escribe tu mensaje aquí"
                        className="border-black rounded-[10px] focus:border-none"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botón */}
              <div className="text-center">
                <Button type="submit" className="w-full rounded-[10px]">
                  Enviar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactoPage;
