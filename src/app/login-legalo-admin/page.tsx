'use client';

import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoader } from '@/contexts/loaderContext';
import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const { setLoading } = useLoader();
  const { login } = useAuth();

  const onFinish = async (values: { correo: string; contrasena: string }) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.BASE_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok && data.status === 200) {
        message.success('Login exitoso');
        login(data.jwt.user, data.jwt.accessToken);
      } else {
        message.error(data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      message.error('Error en el login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header fijo con width 100% */}
      <header className="w-full px-4 lg:px-8 flex justify-between items-center h-[72px] bg-background ">
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

      {/* Contenedor para centrar solo el formulario */}
      <main className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md p-6">
          {/* Título con icono 👋 */}
          <h2 className="text-2xl font-bold text-center mb-6">
            Bienvenido a LEGALO <span className="inline-block">👋</span>
          </h2>

          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} className="space-y-4" layout='vertical'>
            {/* Input con label para el correo */}
            <Form.Item label="Correo" name="correo" rules={[{ required: true, message: 'Ingresa tu correo' }]}>
              <Input prefix={<UserOutlined />} placeholder="Correo" className="font-bold border-gray-300" />
            </Form.Item>

            {/* Input con label para la contraseña */}
            <Form.Item label="Contraseña" name="contrasena" rules={[{ required: true, message: 'Ingresa tu contraseña' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" className="font-bold border-gray-300" />
            </Form.Item>

            {/* Botón de inicio de sesión */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full bg-black text-white font-bold hover:bg-gray-800">
                Iniciar Sesión
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="text-center mt-2">
                <Link href="/recuperar-contrasena" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </main>
    </div>
  );
}