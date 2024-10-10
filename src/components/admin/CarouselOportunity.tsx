import React from 'react';
import { Carousel, Card, Button, Row, Col, Tag, List } from 'antd';
import { DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const opportunities = [
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
  {
    id: 6,
    title: 'Asesoría en Derecho Corporativo',
    description: 'Se requiere abogado con experiencia en derecho corporativo para asesorar a empresa en constitución.',
    budget: 5000,
    postedDate: '2023-06-10',
    skills: ['Derecho Corporativo', 'Negociación', 'Constitución de Empresas'],
    industria: 'Tecnología',
    ubicacion: 'Ciudad de México',
    especialidad: 'Derecho Corporativo',
    experiencia_requerida: 'junior',
  },
  {
    id: 7,
    title: 'Abogado de Derecho Penal',
    description: 'Se necesita abogado especializado en derecho penal para representar a cliente en juicio penal.',
    budget: 4500,
    postedDate: '2023-07-01',
    skills: ['Derecho Penal', 'Litigios', 'Defensa Penal'],
    industria: 'Servicios Legales',
    ubicacion: 'Monterrey',
    especialidad: 'Derecho Penal',
    experiencia_requerida: 'intermedio',
  },
  // Puedes agregar más oportunidades aquí
];

const JobOpportunitiesCarousel = () => {
  return (
    <div>
        <h3>OPORTUNIDADES SIMILARES</h3>
        <Carousel
        autoplay
        dots={false}
        slidesToShow={3}
        slidesToScroll={1}
        style={{ width: '100%' }}
        >
        {opportunities.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Card
                key={item.id}
                title={<Link href={`/admin/oportunidad/${item.id}`}>{item.title}</Link>}
                extra={
                <>
                    <Button type="primary" style={{ marginRight: 8 }}>
                    Guardar
                    </Button>
                    <Button type="default">Ver Proyecto</Button>
                </>
                }
                style={{ width: '100%', margin: '0 8px' }}
            >
                <List.Item.Meta description={item.description} />
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
            </div>
        ))}
        </Carousel>
    </div>
  );
};

export default JobOpportunitiesCarousel;
