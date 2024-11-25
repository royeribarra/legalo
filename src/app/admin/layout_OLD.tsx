"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Card, Row, Col } from "antd";
// import {
//   EditOutlined,
//   LogoutOutlined,
// } from '@ant-design/icons';
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderAdmin from "@/components/admin/HeaderAdmin";
import type { GetProps } from "antd";

const { Content, Footer } = Layout;

interface MenuItem {
  key: string;
  label: JSX.Element;
}

export default function AdminLayoutOld({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    console.log(userRole)
    if (
      pathname?.includes("/admin/client") ||
      pathname?.includes("/admin/lawyer") ||
      pathname?.includes("/admin/oportunidades")
    ) {
      setMenuItems([
        {
          key: "oportunidades",
          label: <Link href="/admin/oportunidades">Oportunidades para ti</Link>,
        },
        {
          key: "recientes",
          label: <Link href="/admin/recientes">Publicadas recientemente</Link>,
        },
        {
          key: "invitaciones",
          label: <Link href="/admin/invitaciones">Invitaciones</Link>,
        },
        {
          key: "guardado",
          label: <Link href="/admin/guardado">Guardados</Link>,
        },
        {
          key: "postulaciones",
          label: <Link href="/admin/postulaciones">Postulaciones</Link>,
        },
      ]);
    } else if (pathname?.includes("/admin/master")) {
      setMenuItems([
        {
          key: "dashboard",
          label: <Link href="/admin/master/dashboard">Dashboard</Link>,
        },
        {
          key: "users",
          label: <Link href="/admin/master/users">User Management</Link>,
        },
        {
          key: "settings",
          label: <Link href="/admin/master/settings">System Settings</Link>,
        },
      ]);
    }
  }, [pathname]);

  // const userMenu = (
  //   <Menu>
  //     <Menu.Item key="1" icon={<EditOutlined />}>
  //       Edit Profile
  //     </Menu.Item>
  //     <Menu.Item key="2" icon={<LogoutOutlined />}>
  //       Logout
  //     </Menu.Item>
  //   </Menu>
  // );
  type SearchProps = GetProps<typeof Input.Search>;

  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);



  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderAdmin></HeaderAdmin>
      <Layout style={{ padding: "24px", background: "#fff" }}>
        <div style={{ padding: "12px" }}>
          <Row>
            <Col span={12} style={{ display: "flex", alignItems: "center" }}>
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ maxWidth: 400 }}
              />
            </Col>
            <Col span={12}>
              <Card style={{ backgroundColor: "#e7c8c8" }}>
                <p>Postulaciones: 5</p>
                <p>Tipo de membresía: Gratuita</p>
                <Link href="#" style={{ color: "blue" }}>
                  Aumenta tus chances
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
        <Content style={{ padding: "0 24px" }}>
          <Menu
            mode="horizontal"
            selectedKeys={[pathname?.split("/").pop() || ""]}
            style={{ marginBottom: "24px" }}
            items={menuItems}
          />
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {children}
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        ©2023 Legal Services Platform. All rights reserved.
      </Footer>
    </Layout>
  );
}
