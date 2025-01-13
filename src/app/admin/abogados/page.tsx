'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Key } from 'antd/lib/table/interface';
import { abogadoService, clienteService, ofertaservice } from '@/services';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { IAplicacionBack } from '@/interfaces/Aplicacion.interface';
import { IOfertaBack } from '@/interfaces/Oferta.interface';
import { IIndustriaAbogado, IIndustriaOferta } from '@/interfaces/Industria.interface';
import { IAbogadoBack } from '@/interfaces/Abogado.interface';
import { IEspecialidadAbogado } from '@/interfaces/Especialidad.interface';
import { IServicioAbogado } from '@/interfaces/Servicio.interface';
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

function Abogados() {
  const [filteredData, setFilteredData] = useState<IAbogadoBack[]>([]);
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
      const params = { validado_admin: true };
      const data = await abogadoService.obtenerTodos(params);
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
      title: 'Nombre',
      key: 'nombre',
      // sorter: (a: IOfertaBack, b: IOfertaBack) => a.salario_minimo - b.salario_minimo,
      render: (_: any, record: IAbogadoBack) => (
        <p>{record.nombres} - {record.apellidos}</p>
      ),
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
      render: (correo: string) => (
        <p>{correo}</p>
      )
    },
    {
      title: 'Teléfono',
      dataIndex: 'telefono_contacto',
      key: 'telefono',
      render: (telefono: string) => (
        <p>{telefono}</p>
      )
    },
    {
      title: 'Especialidades',
      dataIndex: 'especialidadesAbogado',
      key: 'especialidades',
      render: (especialidades: IEspecialidadAbogado[]) => (
        <div>
          {
            especialidades.map((especialidad)=>
              <p key={especialidad.id}>{especialidad.especialidad.nombre}</p>
            )
          }
        </div>
      )
    },
    {
      title: 'Servicios',
      dataIndex: 'serviciosAbogado',
      key: 'servicios',
      render: (servicios: IServicioAbogado[]) => (
        <div>
          {
            servicios.map((servicio)=>
              <p>{servicio.servicio.nombre}</p>
            )
          }
        </div>
      )
    },
    {
      title: 'Industrias',
      dataIndex: 'industriasAbogado',
      key: 'industrias',
      render: (industrias: IIndustriaAbogado[]) => (
        <div>
          {
            industrias.map((industria)=>
              <p>{industria.industria.nombre}</p>
            )
          }
        </div>
      )
    },
    {
      title: 'Imagen',
      dataIndex: 'foto_url',
      key: 'foto_url',
      render: (foto_url: string) =>  (
        <Link href={`${process.env.S3_FILE_ROUTE}/${foto_url}`} target='_blank'>
          <Button>Ver</Button>
        </Link>
      )
    },
    {
      title: 'CV',
      dataIndex: 'cv_url',
      key: 'cv_url',
      render: (cv_url: string) =>  (
        <Link href={`${process.env.S3_FILE_ROUTE}/${cv_url}`} target='_blank'>
          <Button>Ver</Button>
        </Link>
      )
    },
    {
      title: 'CUL',
      dataIndex: 'cul_url',
      key: 'cul_url',
      render: (cul_url: string) =>  (
        <Link href={`${process.env.S3_FILE_ROUTE}/${cul_url}`} target='_blank'>
          <Button>Ver</Button>
        </Link>
      )
    },
    {
      title: 'Estado',
      dataIndex: 'validado_admin',
      key: 'validado_admin',
      render: (validado: boolean, record: IAbogadoBack) => (
        <Button
          type="primary"
          danger={!validado}
          onClick={async () => {
            try {
              const nuevoEstado = !validado;
              await abogadoService.updateStateAdmin(record.id, nuevoEstado);
              record.validado_admin = nuevoEstado; // Actualiza el estado local si es necesario.
            } catch (error) {
              console.error('Error al actualizar el estado:', error);
            }
          }}
        >
          {validado ? 'Activado' : 'Desactivado'}
        </Button>
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
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
};

export default Abogados;
