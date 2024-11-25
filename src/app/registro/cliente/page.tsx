"use client";

import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, FieldPath } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useToast } from "@/contexts/toastContext";

type PasswordFieldProps<T extends FieldValues> = {
  field: {
    name: FieldPath<T>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    value: string;
    ref: React.Ref<HTMLInputElement>;
  };
};

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
      console.log(lowerCaseRegex.test(password));
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
    .max(30)
    .email({ message: "Debe ser un correo electrónico válido" }),
  company: z
    .string()
    .min(2, { message: "El campo debe ser rellenado" })
    .max(30),
  phone: z.string().min(1, { message: "El campo debe ser rellenado" }).max(15),
  howDiscover: z.string().min(2).max(100).optional(),
  rsocial: z.enum(["natural", "juridica"], {
    required_error: "Necesitas seleccionar alguno",
  }),
  documento: z
    .string()
    .min(2, { message: "El campo debe ser rellenado" })
    .max(30),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(30, { message: "La contraseña no debe exceder los 30 caracteres." })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula." })
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula." })
    .regex(/\d/, { message: "Debe contener al menos un número." }),
});

const RegisterClient = () => {
  const { showToast } = useToast();
  const router = useRouter();
  const [tipoPersona, setTipoPersona] = useState("natural");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: "",
      lastNames: "",
      email: "",
      documento: "",
      password: "",
      rsocial: "natural",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      nombres: values.names,
      apellidos: values.lastNames,
      correo: values.email,
      documento: values.documento,
      tipoPersona: values.rsocial,
      telefono: values.phone,
      empresa: values.company,
      opinion: values.howDiscover,
      contrasena: values.password,
    };
    fetch(`${process.env.BASE_APP_API_URL}/clientes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.state) {
          localStorage.clear();
          router.push("/registro/cliente/email-verify");
        }else {
          showToast("error", "Error", data.message || "Ocurrió un error.");
        }
      })
      .catch((err) => 
        {
          console.log(err);
          showToast("error",
            "Error",
            "Ocurrió un error al momento del registro."
          );
        }
      );
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
            <h2 className="text-3xl lg:text-5xl font-nimbus mt-4">
              Bienvenido a <span className="italic">Legalo</span> 👋
            </h2>
            <h3 className=" lg:text-[28px]">Datos personales</h3>
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
                          <Input
                            placeholder="Nombres"
                            {...field}
                            className="border-black focus-visible:border-none rounded-[10px] h-12"
                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                              const input = e.currentTarget;
                              input.value = input.value.replace(
                                /[^A-Za-z\s]/g,
                                ""
                              );
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
                            className="border-black focus-visible:border-none rounded-[10px] h-12"
                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                              const input = e.currentTarget;
                              input.value = input.value.replace(
                                /[^A-Za-z\s]/g,
                                ""
                              );
                            }}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Email */}

                {/* Razon social */}
                <FormField
                  control={form.control}
                  name="rsocial"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>¿Cuál te describe mejor?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setTipoPersona(value);
                          }}
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
                <FormField
                  control={form.control}
                  name="documento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {tipoPersona === "natural" ? "DNI" : "RUC"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            tipoPersona === "natural"
                              ? "Ingrese DNI"
                              : "Ingrese RUC"
                          }
                          {...field}
                          className="border-black focus-visible:border-none rounded-[10px] h-12"
                          maxLength={tipoPersona === "natural" ? 8 : 11}
                          onInput={(e: React.FormEvent<HTMLInputElement>) => {
                            const input = e.currentTarget;
                            input.value = input.value
                              .replace(/\D/g, "")
                              .slice(0, tipoPersona === "natural" ? 8 : 11);
                            field.onChange(input.value);
                          }}
                        />
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
                      <FormLabel>
                        {tipoPersona === "juridica"
                          ? "Email de empresa"
                          : "Email"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@domain.com"
                          {...field}
                          className="border-black focus-visible:border-none rounded-[10px] h-12"
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" grid grid-cols-2 gap-4">
                  {tipoPersona === "juridica" && (
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
                              className="border-black focus-visible:border-none rounded-[10px] h-12"
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
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
                            className="border-black focus-visible:border-none rounded-[10px] h-12"
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
                  name="howDiscover"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>¿Cómo oíste de nosotros? (OPCIONAL)</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            {/* Aquí puedes colocar un texto de placeholder si lo necesitas */}
                            <span>Selecciona una opción</span>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="whatsapp">Whatsapp</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="h-12 w-[110px] rounded-[10px]"
                  >
                    Siguiente
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block degrade-client"></div>
    </div>
  );
};

export default RegisterClient;
