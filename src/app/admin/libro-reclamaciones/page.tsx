'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { reclamoService } from '@/services';
import { useToast } from '@/contexts/toastContext';

const { RangePicker } = DatePicker;

function LibroReclamaciones() {
  const { showToast } = useToast();
  const [filteredData, setFilteredData] = useState([]);

  async function fetchReclamos() {
    try {
      const data = await reclamoService.obtenerTodos();
      console.log("Datos recibidos:", data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
      // showToast("Error al obtener los reclamos", "error");
    }
  }

  useEffect(() => {
    fetchReclamos();
  }, []);

  const columns = [
    {
      title: 'Creación',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: string) => {
        if (!createdAt) return "-";
        return <p>{dayjs(createdAt).format("DD/MM/YYYY")}</p>;
      }
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre', // Se agregó dataIndex
      key: 'nombre',
      render: (nombre: string) => <p>{nombre || "-"}</p>,
    },
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
      render: (dni: string) => <p>{dni || "-"}</p>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <p>{email || "-"}</p>
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono',
      key: 'telefono',
      render: (telefono: string) => <p>{telefono || "-"}</p>
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
      render: (tipo: string) => <p>{tipo || "-"}</p>
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: any) => (
        <Button
          type="link"
          onClick={() => window.location.href = `/admin/libro-reclamaciones/${record.id}`}
        >
          Ver Detalle
        </Button>
      ),
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
        <RangePicker
          style={{ width: '250px' }}
          format="DD/MM/YYYY"
          placeholder={['Fecha inicio', 'Fecha fin']}
        />
        <Button type="primary" icon={<FilterOutlined />}>
          Aplicar filtros
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id" // Usamos "id" en lugar de "key"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
}

export default LibroReclamaciones;
