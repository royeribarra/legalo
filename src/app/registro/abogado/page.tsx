"use client";

import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

const formSchema = z.object({
  names: z.string().min(2).max(30).regex(/^[A-Za-z\s]+$/, "Debe contener solo letras"),
  lastNames: z.string().min(2).max(30),
  email: z.string().min(2).max(30),
  location: z.string().min(2).max(30),
  password: z.string().min(1).max(15),
});

const RegisterLawyer = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: "",
      lastNames: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    router.push("/registro/abogado/objetivos");
  }

  return (
    <div className="h-screen grid grid-cols-4 gap-4">
      <div className="col-span-4 lg:col-span-3">
        <header className="container mx-auto px-4 lg:px-8 flex justify-between items-center align h-[72px] bg-background">
          <Link href="/">
            <Image
              src="/assets/legalo-logo.png"
              alt="logo"
              width={160}
              height={30}
              className="max-w-[100px] md:max-w-none"
            />
          </Link>

          <div className="flex gap-2 p-2 flex-col md:flex-row">
            <p className="text-sm">¿Buscas Trabajo?</p>
            <Link href="/registro" className="underline text-sm">
              Ir a Oportunidades
            </Link>
          </div>
        </header>
        <main>
          <div className="container p-4 lg:p-8 mx-auto flex flex-col gap-4 lg:gap-8 mt-8 max-w-[860px]">
            <div>
              <Progress value={33} className="mx-auto mb-4" />
              <p className="text-center">Paso 1/3</p>
            </div>
            <h2 className="font-bold text-3xl lg:text-5xl">
              Bienvenido a Legalo 👋
            </h2>
            <h3 className="lg:text-lg ">Facilita tu búsqueda de proyectos</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div className=" grid grid-cols-2 gap-2">
                  {/* Nombres */}
                  <FormField
                    control={form.control}
                    name="names"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombres" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Apellidos */}
                  <FormField
                    control={form.control}
                    name="lastNames"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellidos</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellidos" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Ubicacion */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ubicacion</FormLabel>
                      <FormControl>
                        <Input placeholder="Ubicación" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
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
                          type="email"
                          placeholder="example@domain.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex gap-2 items-center">
                    <Check size={20} color="gray" /> <p>Letras minúsculas</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Check size={20} color="gray" /> <p>Letras mayúsculas</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Check size={20} color="gray" /> <p>Números</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Check size={20} color="gray" /> <p>8 caracteres mínimo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 justify-center py-4">
                  <Checkbox id="terms2" />
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Acepto los Términos y condiciones
                  </label>
                </div>

                <Button type="submit" className="w-full">
                  Crear mi cuenta
                </Button>
              </form>
            </Form>
          </div>
        </main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block degrade-blue"></div>
    </div>
  );
};

export default RegisterLawyer;
