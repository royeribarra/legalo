"use client";

import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { Label } from "@/components/ui/label";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  names: z
    .string()
    .min(2, { message: "El campo nombres debe ser rellenado" })
    .max(30),
  lastNames: z
    .string()
    .min(2, { message: "El campo apellidos debe ser rellenado" })
    .max(30),
  email: z
    .string()
    .min(2, { message: "El campo email debe ser rellenado" })
    .max(30),
  company: z
    .string()
    .min(2, { message: "El campo debe ser rellenado" })
    .max(30),
  phone: z.string().min(1, { message: "El campo debe ser rellenado" }).max(15),
  howDiscover: z.string().min(2).max(100).optional(),
  rsocial: z.enum(["natural", "juridica"], {
    required_error: "Necesitas seleccionar alguno",
  }),
});

const RegisterClient = () => {
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
    router.push("/registro/cliente/email-verify");
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
          <div className="container p-4 lg:p-8 mx-auto flex flex-col gap-4 lg:gap-4 mt-8 max-w-[860px]">
            <div>
              <Progress value={50} className="mx-auto mb-4 h-2" />
              <p className="text-left">Paso 1/2</p>
            </div>
            <h2 className="text-3xl lg:text-5xl font-tiempos mt-4">
              Bienvenido a <span className="italic">Legalo</span> 👋
            </h2>
            <h3 className=" lg:text-2xl">Datos personales</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className=" grid grid-cols-2 gap-4">
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
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email de empresa</FormLabel>
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
                {/* Razon social */}
                <FormField
                  control={form.control}
                  name="rsocial"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>¿Cuál te describe mejor?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-1 grid grid-cols-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="natural" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Persona Natural
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="juridica" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Persona Jurídica
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" grid grid-cols-2 gap-4">
                  {/* Empresa */}
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Empresa</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nombre de la empresa"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Celular */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="987654321"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Celular */}
                <FormField
                  control={form.control}
                  name="howDiscover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Cómo oíste de nosotros? (OPCIONAL)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="..." {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  SIGUIENTE
                </Button>
              </form>
            </Form>
          </div>
        </main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block degrade-yellow"></div>
    </div>
  );
};

export default RegisterClient;
