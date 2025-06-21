'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { ofertaservice } from '@/services';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { IAplicacionBack } from '@/interfaces/Aplicacion.interface';
import { IOfertaBack } from '@/interfaces/Oferta.interface';
import { IIndustriaOferta } from '@/interfaces/Industria.interface';
import { IEspecialidadOferta } from '@/interfaces/Especialidad.interface';
import { IFileBack } from '@/interfaces/File.interface';
import Link from 'next/link';

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

function Ofertas() {
  const [filteredData, setFilteredData] = useState<IOfertaBack[]>([]);
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
    // setFilteredData(newData); // Establecer los datos filtrados
  };

  async function fetchOfertas() {
    try {
      const data = await ofertaservice.obtenerTodos();
      setFilteredData(data);
    } catch (error) {
      console.error("Error al obtener las ofertas:", error);
    }
  }

  useEffect(()=> {
    fetchOfertas();
  }, []);

  const columns = [
    {
      title: 'Creación',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (createdAt: string) => {
        if (!createdAt) return "-";
        const fecha = new Date(createdAt);
        return <p>{fecha.toLocaleDateString("es-ES")}</p>;
      }
    },
    {
      title: 'Título',
      dataIndex: 'titulo',
      key: 'titulo'
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (cliente: IClienteBack) => (
        <p>{cliente?.nombres + ' ' + cliente?.apellidos}</p>
      )
    },
    {
      title: 'Aplicaciones',
      dataIndex: 'aplicaciones',
      key: 'aplicaciones',
      render: (aplicaciones: IAplicacionBack[]) => (
        <Space>
          {aplicaciones.map((aplicacion, idx) => (
            <Tag color="blue" key={idx}>
              {aplicacion?.abogado?.nombres + ' ' + aplicacion?.abogado?.apellidos}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Presupuesto',
      key: 'presupuesto',
      render: (_: any, record: IOfertaBack) => (
        <p>{record.salario_minimo} - {record.salario_maximo}</p>
      ),
    },
    {
      title: 'Industria',
      dataIndex: 'industriasOferta',
      key: 'industria',
      render: (industriasOferta: IIndustriaOferta[]) => (
        <div>
          {industriasOferta.map((industria)=>
            <p key={industria.id}>{industria.industria.nombre}</p>
          )}
        </div>
      ),
    },
    {
      title: 'Especialidad',
      dataIndex: 'especialidadesOferta',
      key: 'industria',
      render: (especialidadesOferta: IEspecialidadOferta[]) => (
        <div>
          {especialidadesOferta.map((especialidad)=>
            <p key={especialidad.id}>{especialidad.especialidad.nombre}</p>
          )}
        </div>
      ),
    },
    {
      title: 'Uso',
      dataIndex: 'uso',
      key: 'uso',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Documento',
      dataIndex: 'files',
      key: 'files',
      render: (files: IFileBack[]) =>  {
        const file = files.find((file)=>file.nombreArchivo === 'oferta_documento')
        return(
          <Link href={`${process.env.S3_FILE_ROUTE}/${file?.filePath}`} target='_blank'>
            <Button>Ver</Button>
          </Link>
        )
      }
    },
    {
      title: 'Ver detalle',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => (
        <Link href={`/admin/ofertas/${id}`}>
          <Button type="primary">
            Ver Detalle
          </Button>
        </Link>
      ),
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

export default Ofertas;
