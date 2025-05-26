'use client';

import { Form, Input, Button, message as antdMessage } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usuarioService } from '@/services';

export default function RecuperarContrasenaPage() {
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const onFinish = async (values: { correo: string }) => {
    setLoading(true);
    try {
      const body = { correo: values.correo.toLowerCase() };
      const response = await usuarioService.solicitudCambioContrasena(body);
      if (response.status == 200) {
        setInfoMessage('Te enviamos un correo electrónico para recuperar tu contraseña.');
      }
    } catch (error) {
      antdMessage.error('Ocurrió un error al solicitar recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header igual al de Login */}
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

      {/* Contenido principal */}
      <main className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Recuperar Contraseña <span className="inline-block">🔐</span>
          </h2>

          {infoMessage && (
            <div className="mb-4 text-green-600 font-semibold text-center">
              {infoMessage}
            </div>
          )}

          <Form name="recuperar" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Correo electrónico"
              name="correo"
              rules={[
                { required: true, message: 'Por favor ingresa tu correo' },
                { type: 'email', message: 'Correo no válido' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Correo"
                className="font-bold border-gray-300"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-black text-white font-bold hover:bg-gray-800"
                loading={loading}
              >
                Enviar enlace de recuperación
              </Button>
            </Form.Item>

            <Form.Item>
              <div className="text-center">
                <Link href="/login" className="text-sm text-blue-600 hover:underline">
                  Volver al inicio de sesión
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </main>
    </div>
  );
}