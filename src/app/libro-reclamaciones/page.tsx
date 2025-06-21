'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useLoader } from '@/contexts/loaderContext';
import { reclamoService } from '@/services';
import { useToast } from '@/contexts/toastContext';



const schema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  domicilio: z.string().min(5, 'El domicilio debe tener al menos 5 caracteres'),
  dni: z.string().length(8, 'El DNI debe tener 8 dígitos'),
  email: z.string().email('Correo electrónico inválido'),
  telefono: z.string().min(9, 'Número inválido').max(9, 'Número inválido'),
  tipo: z.enum(['Reclamo', 'Queja']),
  descripcion: z.string().min(10, 'Debe contener al menos 10 caracteres'),
  pedido: z.string().min(5, 'Debe indicar el pedido del solicitante'),
});

type FormData = z.infer<typeof schema>;

function LibroReclamaciones() {
  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const [serviceTipe, setServiceTipe] = useState<string>('lawyer');

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: '',
      domicilio: '',
      dni: '',
      email: '',
      telefono: '',
      tipo: 'Reclamo',
      descripcion: '',
      pedido: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await reclamoService.createReclamo(data);
      if (response.state) {
        form.reset();
        showToast('success', response.message, '');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Hubo un problema al enviar el formulario', '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6">
      <Header serviceTipe={serviceTipe} updateServiceTipe={setServiceTipe} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg p-6 max-w-screen-lg mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6">Libro de Reclamaciones</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos y Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domicilio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domicilio</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Av. Los Olivos 123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input type="text" maxLength={8} placeholder="Ej: 12345678" {...field} />
                  </FormControl>
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
                    <Input type="text" maxLength={9} placeholder="Ej: 987654321" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Ej: correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
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
              )}
            />
          </div>

          {/* Campos de texto en ancho completo */}
          <div className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción del Reclamo</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe tu reclamo o queja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pedido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pedido del Solicitante</FormLabel>
                  <FormControl>
                    <Textarea placeholder="¿Qué solución espera el usuario?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full md:w-auto">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
      <Footer />
    </div>
  );
}

export default LibroReclamaciones;
