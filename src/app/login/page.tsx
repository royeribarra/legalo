'use client';

import { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { abogadoService } from '@/services';
import { useLoader } from '@/contexts/loaderContext';

export default function LoginPage() {
   const { loading, setLoading } = useLoader();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const whatsappNumber = "51939784580";

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const onFinish = async (values: { correo: string; contrasena: string }) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.BASE_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok && data.status == 200) {
        message.success('Login successful');
        
        if (data.jwt?.user?.abogado) {
          localStorage.setItem('userRole', 'abogado');
          const abogado = await abogadoService.getAbogadoByID(data.jwt?.user?.abogado?.id);
          const data1 = data.jwt.user;
          data1.abogado = abogado;
          localStorage.setItem('token', JSON.stringify(data1));
          router.push('/dashboard/abogado');
          setLoading(false);

        } else if (data.jwt?.user?.cliente) {
          localStorage.setItem('userRole', 'cliente');
          localStorage.setItem('token', JSON.stringify(data.jwt.user));
          router.push('/dashboard/cliente');
          setLoading(false);
        }
       
      } else {
        message.error(data.message || 'Credenciales inválidas');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      message.error('Ocurrió un error en el intento de login.');
    }
  };

  return (
    <div>
      <header
        className={`bg-black lg:sticky lg:top-0 lg:z-20 transition-all duration-300 ${
          isScrolled ? 'h-[60px] lg:h-[100px]' : 'h-[80px] lg:h-[160px]'
        }`}
      >
        <div className="mx-auto max-w-[1920px] px-4 lg:px-16 flex justify-between items-center h-full">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/assets/logo-legalo-white.png"
                alt="logo"
                width={473}
                height={89}
                className={`max-w-[120px] lg:max-w-[213px] ${
                  isScrolled ? 'max-w-[100px] lg:max-w-[180px]' : ''
                }`}
              />
            </Link>
            <div className="hidden lg:block w-[1px] h-10 bg-white mx-6"></div>
            <Link href="/nosotros" className="hidden lg:block text-white">
              Nosotros
            </Link>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card title="Login" className="w-96">
          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name="correo"
              rules={[{ required: true, message: 'Ingresa tu correo' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Correo" />
            </Form.Item>
            <Form.Item
              name="contrasena"
              rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-[#1E1E1E]">
        <div className="max-w-[1920px] mx-auto flex flex-col justify-center overflow-hidden lg:pb-10 p-4 lg:px-16">
          <div className="w-full flex flex-col lg:flex-row items-start lg:justify-between lg:items-center border-b border-white mx-auto lg:h-[180px] gap-4">
            <Image
              src="/assets/legalo-logo-white.webp"
              alt="img"
              width={160}
              height={30}
              className="my-8"
            />
            <div className="text-white flex gap-8 flex-col lg:flex-row">
              <Link href="/nosotros">Nosotros</Link>
              <Link href="/contacto">Contacto</Link>
              <Link href={`https://wa.me/${whatsappNumber}`} passHref target="_blank">
                Ayuda Online
              </Link>
            </div>
            <div className="flex space-x-4 my-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icos/icon_facebook.webp"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icos/icon_instagram.webp"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Image src="/icos/icon_x.webp" alt="X" width={24} height={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/icos/icon_linkedin.webp"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
          <div className="w-full flex flex-col-reverse lg:flex-wrap gap-8 justify-center text-white my-8 lg:flex-row">
            <p>© 2024 Legalo. Todos los derechos reservados</p>
            <Link href="#" className="underline">
              Política de privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="underline">
              Términos y Condiciones
            </Link>
            <Link href="#" className="underline">
              Libro de Reclamaciones
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}