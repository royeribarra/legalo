'use client';

import React from 'react';
import { Card, Row, Col, Typography, Tag, Button, Avatar, Divider } from 'antd';
import { ClockCircleOutlined, DollarOutlined, UserOutlined, EnvironmentOutlined, BankOutlined, CalendarOutlined, TeamOutlined, FileTextOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import JobOpportunitiesCarousel from '@/components/admin/CarouselOportunity';

const { Title, Text, Paragraph } = Typography;

// Mock data for the job opportunities
const jobOpportunities = [
  {
    id: '1',
    title: 'Consultoría Legal para Startup',
    description: 'Se busca abogado especializado en derecho corporativo para asesorar a una startup tecnológica en temas de propiedad intelectual, contratos y regulaciones del sector. El candidato ideal debe tener experiencia en el manejo de asuntos legales para empresas emergentes y conocimiento del ecosistema tecnológico.',
    budget: 5000,
    postedDate: '2023-05-15',
    deadline: '2023-06-15',
    skills: ['Derecho Corporativo', 'Propiedad Intelectual', 'Contratos'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'mid',
    tipo_trabajo: 'Proyecto',
    duracion_estimada: '3 meses',
    client: {
      name: 'TechStart Inc.',
      description: 'Startup innovadora en el sector de inteligencia artificial',
      employees: '11-50',
      location: 'Ciudad de México, México',
      founded: '2020',
      website: 'https://techstart.com',
    }
  },
  {
    id: '2',
    title: 'Consultoría Legal para Startup',
    description: 'Se busca abogado especializado en derecho corporativo para asesorar a una startup tecnológica en temas de propiedad intelectual, contratos y regulaciones del sector. El candidato ideal debe tener experiencia en el manejo de asuntos legales para empresas emergentes y conocimiento del ecosistema tecnológico.',
    budget: 5000,
    postedDate: '2023-05-15',
    deadline: '2023-06-15',
    skills: ['Derecho Corporativo', 'Propiedad Intelectual', 'Contratos'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'mid',
    tipo_trabajo: 'Proyecto',
    duracion_estimada: '3 meses',
    client: {
      name: 'TechStart Inc.',
      description: 'Startup innovadora en el sector de inteligencia artificial',
      employees: '11-50',
      location: 'Ciudad de México, México',
      founded: '2020',
      website: 'https://techstart.com',
    }
  },
  {
    id: '3',
    title: 'Consultoría Legal para Startup',
    description: 'Se busca abogado especializado en derecho corporativo para asesorar a una startup tecnológica en temas de propiedad intelectual, contratos y regulaciones del sector. El candidato ideal debe tener experiencia en el manejo de asuntos legales para empresas emergentes y conocimiento del ecosistema tecnológico.',
    budget: 5000,
    postedDate: '2023-05-15',
    deadline: '2023-06-15',
    skills: ['Derecho Corporativo', 'Propiedad Intelectual', 'Contratos'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'mid',
    tipo_trabajo: 'Proyecto',
    duracion_estimada: '3 meses',
    client: {
      name: 'TechStart Inc.',
      description: 'Startup innovadora en el sector de inteligencia artificial',
      employees: '11-50',
      location: 'Ciudad de México, México',
      founded: '2020',
      website: 'https://techstart.com',
    }
  },
  {
    id: '4',
    title: 'Consultoría Legal para Startup',
    description: 'Se busca abogado especializado en derecho corporativo para asesorar a una startup tecnológica en temas de propiedad intelectual, contratos y regulaciones del sector. El candidato ideal debe tener experiencia en el manejo de asuntos legales para empresas emergentes y conocimiento del ecosistema tecnológico.',
    budget: 5000,
    postedDate: '2023-05-15',
    deadline: '2023-06-15',
    skills: ['Derecho Corporativo', 'Propiedad Intelectual', 'Contratos'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'mid',
    tipo_trabajo: 'Proyecto',
    duracion_estimada: '3 meses',
    client: {
      name: 'TechStart Inc.',
      description: 'Startup innovadora en el sector de inteligencia artificial',
      employees: '11-50',
      location: 'Ciudad de México, México',
      founded: '2020',
      website: 'https://techstart.com',
    }
  },
  {
    id: '5',
    title: 'Consultoría Legal para Startup',
    description: 'Se busca abogado especializado en derecho corporativo para asesorar a una startup tecnológica en temas de propiedad intelectual, contratos y regulaciones del sector. El candidato ideal debe tener experiencia en el manejo de asuntos legales para empresas emergentes y conocimiento del ecosistema tecnológico.',
    budget: 5000,
    postedDate: '2023-05-15',
    deadline: '2023-06-15',
    skills: ['Derecho Corporativo', 'Propiedad Intelectual', 'Contratos'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'mid',
    tipo_trabajo: 'Proyecto',
    duracion_estimada: '3 meses',
    client: {
      name: 'TechStart Inc.',
      description: 'Startup innovadora en el sector de inteligencia artificial',
      employees: '11-50',
      location: 'Ciudad de México, México',
      founded: '2020',
      website: 'https://techstart.com',
    }
  },
  // Add more job opportunities here...
];

export default function OportunidadDetallePage() {
  const params = useParams();
  const id = params.id as string;
  const jobOpportunity = jobOpportunities.find(job => job.id === id);

  if (!jobOpportunity) {
    return <div>Oportunidad no encontrada</div>;
  }

  const daysAgo = Math.floor((new Date().getTime() - new Date(jobOpportunity.postedDate).getTime()) / (1000 * 3600 * 24));
  const daysLeft = Math.floor((new Date(jobOpportunity.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={16}>
          <Title level={2}>{jobOpportunity.title}</Title>
          <Paragraph>
            <Text strong>Especialidad:</Text> {jobOpportunity.especialidad}
          </Paragraph>
          <Paragraph>
            <Text strong>Descripción:</Text> {jobOpportunity.description}
          </Paragraph>
          <Paragraph>
            <Text strong>Habilidades requeridas:</Text>
          </Paragraph>
          <div>
            {jobOpportunity.skills.map((skill) => (
              <Tag key={skill} color="blue" style={{ marginRight: 8, marginBottom: 8 }}>
                {skill}
              </Tag>
            ))}
          </div>
          <Divider />
          <Paragraph>
            <Text strong>Tipo de trabajo:</Text> {jobOpportunity.tipo_trabajo}
          </Paragraph>
          <Paragraph>
            <Text strong>Duración estimada:</Text> {jobOpportunity.duracion_estimada}
          </Paragraph>
          <Paragraph>
            <Text strong>Experiencia requerida:</Text> {jobOpportunity.experiencia_requerida}
          </Paragraph>
        </Col>
        <Col span={8}>
          <Card>
            <Paragraph>
              <DollarOutlined /> Presupuesto: ${jobOpportunity.budget}
            </Paragraph>
            <Paragraph>
              <ClockCircleOutlined /> Publicado hace {daysAgo} días
            </Paragraph>
            <Paragraph>
              <CalendarOutlined /> {daysLeft} días restantes para aplicar
            </Paragraph>
            <Paragraph>
              <EnvironmentOutlined /> {jobOpportunity.ubicacion}
            </Paragraph>
            <Paragraph>
              <BankOutlined /> {jobOpportunity.industria}
            </Paragraph>
            <Button type="primary" block style={{ marginTop: 16 }}>
              Aplicar ahora
            </Button>
          </Card>
          <Card style={{ marginTop: 16 }}>
            <Title level={4}>Acerca del cliente</Title>
            <Paragraph>
              <Avatar size={64} icon={<UserOutlined />} />
              <Text strong style={{ marginLeft: 8 }}>{jobOpportunity.client.name}</Text>
            </Paragraph>
            <Paragraph>{jobOpportunity.client.description}</Paragraph>
            <Paragraph>
              <TeamOutlined /> {jobOpportunity.client.employees} empleados
            </Paragraph>
            <Paragraph>
              <EnvironmentOutlined /> {jobOpportunity.client.location}
            </Paragraph>
            <Paragraph>
              <CalendarOutlined /> Fundada en {jobOpportunity.client.founded}
            </Paragraph>
            <Paragraph>
              <a href={jobOpportunity.client.website} target="_blank" rel="noopener noreferrer">
                <FileTextOutlined /> Sitio web
              </a>
            </Paragraph>
          </Card>
        </Col>
      </Row>
      <JobOpportunitiesCarousel></JobOpportunitiesCarousel>
    </Card>
  );
}