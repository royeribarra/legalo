"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const schema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  dni: z.string().length(8, "El DNI debe tener 8 dígitos"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(9, "Número inválido").max(9, "Número inválido"),
  tipo: z.enum(["Reclamo", "Queja"]),
  detalle: z.string().min(10, "Debe contener al menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

function LibroReclamaciones() {
  const [serviceTipe, setServiceTipe] = useState<string>("lawyer");
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      dni: "",
      email: "",
      telefono: "",
      tipo: "Reclamo",
      detalle: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Formulario enviado:", data);
  };

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };

  return (
    <div>
    <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-center">Libro de Reclamaciones</h2>

        <FormField control={form.control} name="nombre" render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre Completo</FormLabel>
            <FormControl><Input placeholder="Ej: Juan Pérez" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="dni" render={({ field }) => (
          <FormItem>
            <FormLabel>DNI</FormLabel>
            <FormControl><Input type="text" maxLength={8} placeholder="Ej: 12345678" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Correo Electrónico</FormLabel>
            <FormControl><Input type="email" placeholder="Ej: correo@ejemplo.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="telefono" render={({ field }) => (
          <FormItem>
            <FormLabel>Teléfono</FormLabel>
            <FormControl><Input type="text" maxLength={9} placeholder="Ej: 987654321" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="tipo" render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Reclamo">Reclamo</SelectItem>
                <SelectItem value="Queja">Queja</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="detalle" render={({ field }) => (
          <FormItem>
            <FormLabel>Detalle</FormLabel>
            <FormControl><Textarea placeholder="Describe tu reclamo o queja" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" className="w-full">Enviar</Button>
      </form>
    </Form>
    <Footer />
    </div>
  );
}

export default LibroReclamaciones;