'use client';

import React, { useState } from 'react';
import { Card, List, Tag, Button, Row, Col, Select, Input, Typography, Pagination, Divider } from 'antd';
import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Option } = Select;
const { Title } = Typography;

const opportunities = [
  {
    id: 1,
    title: 'Consultoría Legal para Startup',
    description: 'Se busca abogado especializado en derecho corporativo para asesorar a una startup tecnológica.',
    budget: 5000,
    postedDate: '2023-05-15',
    skills: ['Derecho Corporativo', 'Propiedad Intelectual', 'Contratos'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'mid',
  },
  {
    id: 2,
    title: 'Representación en Caso Laboral',
    description: 'Necesitamos un abogado laboral para representar a un empleado en un caso de discriminación.',
    budget: 3000,
    postedDate: '2023-05-14',
    skills: ['Derecho Laboral', 'Litigios', 'Negociación'],
    industria: 'Recursos Humanos',
    ubicacion: 'Guadalajara',
    especialidad: 'Derecho Laboral',
    experiencia_requerida: 'senior',
  },
  {
    id: 3,
    title: 'Representación en Caso Laboral',
    description: 'Necesitamos un abogado laboral para representar a un empleado en un caso de discriminación.',
    budget: 3000,
    postedDate: '2023-05-14',
    skills: ['Derecho Laboral', 'Litigios', 'Negociación'],
    industria: 'Recursos Humanos',
    ubicacion: 'Guadalajara',
    especialidad: 'Derecho Laboral',
    experiencia_requerida: 'senior',
  },
  {
    id: 4,
    title: 'Representación en Caso Laboral',
    description: 'Necesitamos un abogado laboral para representar a un empleado en un caso de discriminación.',
    budget: 3000,
    postedDate: '2023-05-14',
    skills: ['Derecho Laboral', 'Litigios', 'Negociación'],
    industria: 'Recursos Humanos',
    ubicacion: 'Guadalajara',
    especialidad: 'Derecho Laboral',
    experiencia_requerida: 'senior',
  },
  {
    id: 5,
    title: 'Representación en Caso Laboral',
    description: 'Necesitamos un abogado laboral para representar a un empleado en un caso de discriminación.',
    budget: 3000,
    postedDate: '2023-05-14',
    skills: ['Derecho Laboral', 'Litigios', 'Negociación'],
    industria: 'Recursos Humanos',
    ubicacion: 'Guadalajara',
    especialidad: 'Derecho Laboral',
    experiencia_requerida: 'senior',
  },
  // Add more opportunities here to have at least 10 items
];

export default function ClientPage() {
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const handleFilter = (value: string, type: string) => {
    if (value === 'all') {
      setFilteredOpportunities(opportunities);
    } else {
      const filtered = opportunities.filter(opp => opp[type as keyof typeof opp] === value);
      setFilteredOpportunities(filtered);
    }
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    const filtered = opportunities.filter(opp => 
      opp.title.toLowerCase().includes(value.toLowerCase()) ||
      opp.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOpportunities(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Row gutter={24}>
      <Col span={6} style={{ padding: 0 }}>
        <Card 
          title="Filtros"
          bordered={false} // Elimina el borde del card
          style={{ height: '100%' }} // Hace que el card ocupe todo el espacio disponible
        >
          {/* Filtro de Industria */}
          <Title level={5}>Industria</Title>
          <Select 
            defaultValue="all" 
            style={{ width: '100%', marginBottom: 16 }}
            onChange={(value) => handleFilter(value, 'industria')}
          >
            <Option value="all">Todas las industrias</Option>
            <Option value="Tecnología">Tecnología</Option>
            <Option value="Recursos Humanos">Recursos Humanos</Option>
            {/* Add more industry options */}
          </Select>
          <Divider ></Divider>
          {/* Filtro de Ubicación */}
          <Title level={5}>Ubicación</Title>
          <Select 
            defaultValue="all" 
            style={{ width: '100%', marginBottom: 16 }}
            onChange={(value) => handleFilter(value, 'ubicacion')}
          >
            <Option value="all">Todas las ubicaciones</Option>
            <Option value="Ciudad de México">Ciudad de México</Option>
            <Option value="Guadalajara">Guadalajara</Option>
            {/* Add more location options */}
          </Select>

          {/* Filtro de Especialidad */}
          <Title level={5}>Especialidad</Title>
          <Select 
            defaultValue="all" 
            style={{ width: '100%', marginBottom: 16 }}
            onChange={(value) => handleFilter(value, 'especialidad')}
          >
            <Option value="all">Todas las especialidades</Option>
            <Option value="Derecho Corporativo">Derecho Corporativo</Option>
            <Option value="Derecho Laboral">Derecho Laboral</Option>
            {/* Add more specialty options */}
          </Select>

          {/* Filtro de Búsqueda */}
          <Title level={5}>Buscar</Title>
          <Input.Search 
            placeholder="Buscar oportunidades" 
            onSearch={handleSearch}
            style={{ marginBottom: 16 }} // Añadimos un margen por si hay más espacio
          />
        </Card>
      </Col>
      <Col span={18}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={paginatedOpportunities}
          renderItem={(item) => (
            <List.Item
              key={item.id}
            >
              <Card
                key={item.id}
                title={<Link href={`/admin/oportunidad/${item.id}`}>{item.title}</Link>}
                extra={<><Button type="primary">Guardar</Button> <Button type="primary">Ver Proyecto</Button></>}
                style={{ marginBottom: 16 }}
              >
                <List.Item.Meta
                  description={item.description}
                />
                <Row gutter={16}>
                  <Col span={12}>
                    <p><DollarOutlined /> Presupuesto: ${item.budget}</p>
                    <p><ClockCircleOutlined /> Publicado: {item.postedDate}</p>
                    <p>Industria: {item.industria}</p>
                  </Col>
                  <Col span={12}>
                    <p>Ubicación: {item.ubicacion}</p>
                    <p>Especialidad: {item.especialidad}</p>
                    <p>Experiencia: {item.experiencia_requerida}</p>
                  </Col>
                </Row>
                <div style={{ marginTop: 8 }}>
                  {item.skills.map((skill) => (
                    <Tag key={skill} color="blue" style={{ marginRight: 8, marginBottom: 8 }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Card>
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          total={filteredOpportunities.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          style={{ marginTop: 16, textAlign: 'right' }}
        />
      </Col>
    </Row>
  );
}