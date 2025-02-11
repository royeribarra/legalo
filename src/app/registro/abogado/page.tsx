"use client";

import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, FieldPath, Controller } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRegistroAbogado } from "@/contexts/registroAbogadoContext";
import departamentosPeru from "@/data/departamentos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type PasswordFieldProps<T extends FieldValues> = {
  field: {
    name: FieldPath<T>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    value: string;
    ref: React.Ref<HTMLInputElement>;
  };
};

const formSchema = z.object({
  names: z
    .string()
    .min(2, { message: "El campo nombres debe tener al menos 2 caracteres" })
    .max(30, {
      message: "El campo nombres no debe tener más de 30 caracteres",
    }),
  lastNames: z
    .string()
    .min(2, { message: "El campo apellidos debe tener al menos 5 caracteres" })
    .max(30, {
      message: "El campo apellidos no debe tener más de 30 caracteres",
    }),
  email: z
    .string()
    .min(2, { message: "El campo email debe tener al menos 2 caracteres" })
    .email({ message: "Debe ser un correo electrónico válido" }),
  location: z
    .string()
    .min(2, { message: "El campo email debe tener al menos 2 caracteres" })
    .max(30),
  dni: z
    .string()
    .min(8, { message: "El campo dni debe tener 8 dígitos" })
    .max(8),
  telefono: z
    .string()
    .min(2, { message: "El campo teléfono debe tener al menos 6 caracteres" })
    .max(30),
  password: z.string().min(1).max(15),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

const PasswordField = <T extends FieldValues>({
  field,
}: PasswordFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [validations, setValidations] = useState({
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const password = field.value || ""; // Obtener la contraseña del field

  useEffect(() => {
    if (password.length > 0) {
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const numberRegex = /\d/;
      setValidations({
        hasLowerCase: lowerCaseRegex.test(password),
        hasUpperCase: upperCaseRegex.test(password),
        hasNumber: numberRegex.test(password),
        hasMinLength: password.length >= 8,
      });
    } else {
      setValidations({
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasMinLength: false,
      });
    }
  }, [password]);

  return (
    <>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          {...field}
          onChange={(event) => field.onChange(event)}
        />
        <button
          type="button"
          className="absolute right-2 top-2"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex gap-2 items-center">
          <Check
            size={20}
            color={validations.hasLowerCase ? "green" : "gray"}
          />
          <p>Letras minúsculas</p>
        </div>
        <div className="flex gap-2 items-center">
          <Check
            size={20}
            color={validations.hasUpperCase ? "green" : "gray"}
          />
          <p>Letras mayúsculas</p>
        </div>
        <div className="flex gap-2 items-center">
          <Check size={20} color={validations.hasNumber ? "green" : "gray"} />
          <p>Números</p>
        </div>
        <div className="flex gap-2 items-center">
          <Check
            size={20}
            color={validations.hasMinLength ? "green" : "gray"}
          />
          <p>8 caracteres mínimo</p>
        </div>
      </div>
    </>
  );
};

function RegisterLawyer() {
  const router = useRouter();
  const { stateAbogado, updateStateAbogado } = useRegistroAbogado();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: "",
      lastNames: "",
      email: "",
      location: "",
      password: "",
      terms: false,
      dni: "",
      telefono: "",
    },
  });
  const { setValue } = form;
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateStateAbogado({
      nombres: values.names,
      apellidos: values.lastNames,
      email: values.email,
      ubicacion: values.location,
      contrasena: values.password,
      terms: values.terms,
      dni: values.dni,
      telefono: values.telefono,
    });
    router.push("/registro/abogado/objetivos");
  }

  useEffect(() => {
    setValue("names", stateAbogado.nombres || "");
    setValue("lastNames", stateAbogado.apellidos || "");
    setValue("email", stateAbogado.email || "");
    setValue("location", stateAbogado.ubicacion || "");
    setValue("password", stateAbogado.contrasena || "");
    setValue("dni", stateAbogado.dni || "");
    setValue("telefono", stateAbogado.telefono || "");
    setValue("terms", stateAbogado.terms || false);
  }, [setValue, stateAbogado]);

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
            <Link href="/busqueda" className="underline text-sm">
              Ir a Oportunidades
            </Link>
          </div>
        </header>
        <main>
          <div className="container p-4 lg:p-8 mx-auto flex flex-col gap-4 lg:gap-4 mt-8 max-w-[860px]">
            <div className="w-full lg:max-w-[480px] m-auto">
              <Progress value={33} className="mx-auto mb-4 h-2" />
              <p className="text-left">Paso 1/3</p>
            </div>
            <h2 className="text-3xl lg:text-5xl font-nimbus mt-4 text-center">
              Bienvenido a Legalo 👋
            </h2>
            <p className="text-center">
              Conecta con clientes y haz crecer tu práctica legal.
            </p>
            <h3 className="lg:text-[16px] font-b">Datos personales</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  {/* Nombres */}
                  <FormField
                    control={form.control}
                    name="names"
                    rules={{
                      required: "Este campo es obligatorio",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Solo se permiten letras y espacios",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombres</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nombres"
                            {...field}
                            onKeyDown={(e) => {
                              if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
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
                          <Input
                            placeholder="Apellidos"
                            {...field}
                            onKeyDown={(e) => {
                              if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DNI</FormLabel>
                        <FormControl>
                          <Input maxLength={8} placeholder="DNI" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={20}
                            placeholder="Teléfono"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value} // Conecta el valor actual al formulario
                          onValueChange={(value) => field.onChange(value)} // Maneja el cambio de valor
                        >
                          <SelectTrigger>
                            {field.value ? (
                              <span>
                                {
                                  departamentosPeru.find(
                                    (departamento) =>
                                      departamento.nombre === field.value
                                  )?.nombre
                                }
                              </span>
                            ) : (
                              <span className="text-gray-400">
                                Ingresa tu ciudad
                              </span>
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {departamentosPeru.map(({ id, nombre }) => (
                              <SelectItem key={id} value={nombre}>
                                {nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <PasswordField field={field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={() => (
                    <div className="flex items-center space-x-2 justify-center py-4">
                      <Controller
                        name="terms"
                        control={form.control}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            id="terms2"
                            checked={value} // Utiliza `checked` en lugar de `value`
                            onCheckedChange={onChange} // Cambia de `onChange` a `onCheckedChange`
                            ref={ref} // Mantén la referencia
                          />
                        )}
                      />
                      <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto los{" "}
                        <Link href="/terminos-y-condiciones" className="underline" target="_blank">
                          Términos y Condiciones{" "}
                        </Link>
                      </label>
                      <FormMessage />
                    </div>
                  )}
                />

                <Button type="submit" className="w-full">
                  Continuar con mi registro
                </Button>
              </form>
            </Form>
          </div>
        </main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block degrade-lawyer"></div>
    </div>
  );
}

export default RegisterLawyer;
