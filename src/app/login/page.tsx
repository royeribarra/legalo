'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
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

      if (data.status === 200) {
        console.log(data)
        message.success('Login successful');

        localStorage.setItem('token', JSON.stringify(data.jwt.user));
        
        if(data.jwt?.user?.abogado)
        {
          localStorage.setItem('userRole', "abogado");
          router.push('/dashboard/abogado');
        }
        if(data.jwt?.user?.cliente)
        {
          localStorage.setItem('userRole', "cliente");
          router.push('/dashboard/cliente');
        }
        
      } else {
        message.error(data.message || 'credenciales inválidas');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Ocurrió un error en el intento de login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Login" className="w-96">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="correo"
            rules={[{ required: true, message: 'Ingresa tu email' }]}
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
  );
}