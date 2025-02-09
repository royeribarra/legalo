'use client';

import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoader } from '@/contexts/loaderContext';
import { useAuth } from '@/contexts/authContext';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card title="Login" className="w-96">
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="correo" rules={[{ required: true, message: 'Ingresa tu correo' }]}>
            <Input prefix={<UserOutlined />} placeholder="Correo" />
          </Form.Item>
          <Form.Item name="contrasena" rules={[{ required: true, message: 'Ingresa tu contraseña' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
