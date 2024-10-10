import React from 'react';
import { Layout, Row, Col, Input, Dropdown, Menu, Avatar, Select } from 'antd';
import { UserOutlined, SearchOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

const menuItems: MenuItem[] = [
  {
    key: 'edit-profile',
    icon: <EditOutlined />,
    label: 'Editar perfil',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: 'Cerrar sesión',
  },
];

const AppHeader: React.FC = () => {
  // Función para manejar la acción de los ítems del menú
  const handleMenuClick = (e: { key: string }) => {
    switch (e.key) {
      case 'edit-profile':
        console.log('Editar perfil clickeado');
        break;
      case 'logout':
        console.log('Cerrar sesión clickeado');
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Header style={{ background: "#D5F1F0", padding: '0 24px' }}>
      <Row align="middle" justify="space-between">
        <Col span={12}>
          <p>LEGALO</p>
        </Col>
        <Col span={12} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Input
            placeholder="Buscar..."
            prefix={<SearchOutlined />}
            style={{ maxWidth: '600px', padding: '10px', height: '40px' }} // Ajuste de altura
          />
          <Select
            defaultValue="ver-oportunidades"
            style={{ width: 200, height: '40px' }} // Ajuste de altura
          >
            <Select.Option value="ver-oportunidades">Ver oportunidades</Select.Option>
            <Select.Option value="ver-talentos">Ver talentos</Select.Option>
          </Select>

          <Dropdown overlay={menu} trigger={['click']}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined />} />
            </a>
          </Dropdown>
        </Col>

      </Row>
    </Header>
  );
};

export default AppHeader;