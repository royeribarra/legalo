'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Form, Input, Button, message as antdMessage } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { usuarioService } from '@/services';

function CambiarContrasenaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const codeParam = searchParams.get('code');
    const emailParam = searchParams.get('email');

    if (codeParam && emailParam) {
      setCode(codeParam);
      form.setFieldsValue({ email: emailParam });
    } else {
      antdMessage.error('Enlace inválido o incompleto');
      router.push('/recuperar');
    }
  }, [searchParams, router, form]);

  const onFinish = async (values: { email: string; nuevaContrasena: string }) => {
    setLoading(true);
    try {
      const response = await usuarioService.confirmarCambioContrasena({
        codigo: code,
        correo: values.email.toLowerCase(),
        nuevaContrasena: values.nuevaContrasena,
      });

      if (response?.state) {
        setSuccessMessage('Tu contraseña ha sido actualizada correctamente. Ya puedes iniciar sesión.');
      } else {
        antdMessage.error(response?.message || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      antdMessage.error('Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="w-full px-4 lg:px-8 flex justify-between items-center h-[72px] bg-background">
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
          <p className="text-sm font-bold">¿Buscas Trabajo?</p>
          <Link href="/busqueda" className="underline text-sm font-bold">
            Ir a Oportunidades
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Cambiar Contraseña <span className="inline-block">🔒</span>
          </h2>

          {successMessage ? (
            <div className="text-green-600 text-center font-semibold mb-4">
              {successMessage}
              <div className="mt-4">
                <Link href="/login" className="text-blue-600 hover:underline">
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          ) : (
            <Form form={form} name="cambiar" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Correo electrónico"
                name="email"
                rules={[
                  { required: true, message: 'Por favor ingresa tu correo' },
                  { type: 'email', message: 'Correo inválido' },
                ]}
              >
                <Input placeholder="Ej. royer@repo.com.pe" disabled />
              </Form.Item>

              <Form.Item
                label="Nueva contraseña"
                name="nuevaContrasena"
                rules={[
                  { required: true, message: 'Por favor ingresa tu nueva contraseña' },
                  { min: 6, message: 'Debe tener al menos 6 caracteres' },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Nueva contraseña" />
              </Form.Item>

              <Form.Item
                label="Confirmar contraseña"
                name="confirmarContrasena"
                dependencies={['nuevaContrasena']}
                hasFeedback
                rules={[
                  { required: true, message: 'Confirma tu contraseña' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('nuevaContrasena') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Las contraseñas no coinciden'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Repite la contraseña" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-black text-white font-bold hover:bg-gray-800"
                  loading={loading}
                >
                  Cambiar contraseña
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
}

export default function Page() {
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <CambiarContrasenaPage />
      </Suspense>
    );
  }