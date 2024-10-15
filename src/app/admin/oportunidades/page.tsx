'use client'
import React, { useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

// Definimos los tipos de datos para las oportunidades de trabajo
interface Opportunity {
  key: string;
  title: string;
  cliente: string;
  abogados: string[];
  presupuesto: number;
  estado: 'Activo' | 'Inactivo';
  fechaPublicacion: string;
  industria: string;
  ubicacion: string;
}

// Datos de ejemplo
const data: Opportunity[] = [
  {
    key: '1',
    title: 'Representación en Caso Laboral',
    cliente: 'Empresa ABC',
    abogados: ['Juan Pérez', 'María Gómez'],
    presupuesto: 3000,
    estado: 'Activo',
    fechaPublicacion: '2023-05-14',
    industria: 'Recursos Humanos',
    ubicacion: 'Ciudad de México',
  },
  {
    key: '2',
    title: 'Asesoría en Derecho Corporativo',
    cliente: 'Startup XYZ',
    abogados: ['Pedro López', 'Ana Martínez'],
    presupuesto: 5000,
    estado: 'Inactivo',
    fechaPublicacion: '2023-06-10',
    industria: 'Tecnología',
    ubicacion: 'Guadalajara',
  },
];

// Filtros disponibles
const estados: ('Activo' | 'Inactivo')[] = ['Activo', 'Inactivo'];
const industrias: string[] = ['Tecnología', 'Recursos Humanos', 'Derecho Penal'];

const AdminDashboard: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Opportunity[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [estadoFilter, setEstadoFilter] = useState<'Activo' | 'Inactivo' | null>(null);
  const [industriaFilter, setIndustriaFilter] = useState<string | null>(null);
  // const [fechaFilter, setFechaFilter] = useState<[Dayjs, Dayjs] | null>(null);

  // Filtros aplicados por el usuario
  const applyFilters = () => {
    let newData = data;

    // Filtrado por término de búsqueda (por título de la oferta)
    if (searchTerm) {
      newData = newData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filtrado por estado
    if (estadoFilter) {
      newData = newData.filter((item) => item.estado === estadoFilter);
    }

    // Filtrado por industria
    if (industriaFilter) {
      newData = newData.filter((item) => item.industria === industriaFilter);
    }

    // Filtrado por rango de fecha
    // if (fechaFilter && fechaFilter.length > 0) {
    //   const [startDate, endDate] = fechaFilter;
    //   newData = newData.filter((item) => {
    //     const itemDate = dayjs(item.fechaPublicacion);
    //     return itemDate.isSameOrAfter(startDate) && itemDate.isSameOrBefore(endDate);
    //   });
    // }

    setFilteredData(newData); // Establecer los datos filtrados
  };

  // Columnas de la tabla
  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: Opportunity, b: Opportunity) => a.title.localeCompare(b.title),
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
    },
    {
      title: 'Abogados postulados',
      dataIndex: 'abogados',
      key: 'abogados',
      render: (abogados: string[]) => (
        <Space>
          {abogados.map((abogado, idx) => (
            <Tag color="blue" key={idx}>
              {abogado}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Presupuesto',
      dataIndex: 'presupuesto',
      key: 'presupuesto',
      sorter: (a: Opportunity, b: Opportunity) => a.presupuesto - b.presupuesto,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      filters: estados.map((estado) => ({ text: estado, value: estado })),
      onFilter: (value: any, record: Opportunity) => {
        return record.estado === (value as string);
      },
      render: (estado: 'Activo' | 'Inactivo') => (
        <Tag color={estado === 'Activo' ? 'green' : 'red'}>{estado}</Tag>
      ),
    },
    {
      title: 'Industria',
      dataIndex: 'industria',
      key: 'industria',
      filters: industrias.map((industria) => ({ text: industria, value: industria })),
      onFilter: (value: any, record: Opportunity) => record.industria.includes(value),
      render: (industria: string) => (
        <span>{industria}</span>
      ),
    },
    {
      title: 'Ubicación',
      dataIndex: 'ubicacion',
      key: 'ubicacion',
    },
    {
      title: 'Fecha de publicación',
      dataIndex: 'fechaPublicacion',
      key: 'fechaPublicacion',
      sorter: (a: Opportunity, b: Opportunity) => dayjs(a.fechaPublicacion).unix() - dayjs(b.fechaPublicacion).unix(),
      render: (fecha: string) => <span>{dayjs(fecha).format('DD/MM/YYYY')}</span>,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
        <Input
          placeholder="Buscar ofertas..."
          style={{ width: '250px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={applyFilters}
        />
        <Select
          placeholder="Filtrar por estado"
          style={{ width: '200px' }}
          onChange={(value) => setEstadoFilter(value as 'Activo' | 'Inactivo')}
          allowClear
        >
          {estados.map((estado) => (
            <Option key={estado} value={estado}>
              {estado}
            </Option>
          ))}
        </Select>
        <Select
          placeholder="Filtrar por industria"
          style={{ width: '200px' }}
          onChange={(value) => setIndustriaFilter(value as string)}
          allowClear
        >
          {industrias.map((industria) => (
            <Option key={industria} value={industria}>
              {industria}
            </Option>
          ))}
        </Select>
        <RangePicker
          style={{ width: '250px' }}
          format="DD/MM/YYYY"  // Formato de fecha consistente
        //   onChange={(dates: [Dayjs, Dayjs] | null) => setFechaFilter(dates)}
          placeholder={['Fecha inicio', 'Fecha fin']}
        />
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={applyFilters}
        >
          Aplicar filtros
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default AdminDashboard;
