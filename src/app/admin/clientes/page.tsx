'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Key } from 'antd/lib/table/interface';
import { clienteService, ofertaservice } from '@/services';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { IAplicacionBack } from '@/interfaces/Aplicacion.interface';
import { IOfertaBack } from '@/interfaces/Oferta.interface';
import { IIndustriaOferta } from '@/interfaces/Industria.interface';
import { useToast } from '@/contexts/toastContext';

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

function Clientes() {
  const { showToast } = useToast();
  const [filteredData, setFilteredData] = useState<IClienteBack[]>([]);
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
        const data = await clienteService.obtenerTodos();
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
      title: 'Nombre',
      key: 'nombre',
      render: (_: any, record: IClienteBack) => (
        <p>{record.nombres + ' ' + record.apellidos}</p>
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
      title: 'Tipo Persona',
      dataIndex: 'tipo_persona',
      key: 'tipo_persona',
      render: (tipo_persona: string) => (
        <p>{tipo_persona}</p>
      )
    },
    {
      title: 'Documento',
      dataIndex: 'documento',
      key: 'documento',
      render: (documento: string) => (
        <p>{documento}</p>
      )
    },
    {
      title: 'Empresa',
      dataIndex: 'razon_social',
      key: 'razon_social',
      render: (razon_social: string) => (
        <p>{razon_social}</p>
      )
    },
    {
      title: 'Red Social',
      dataIndex: 'opinion',
      key: 'opinion',
      render: (opinion: string) => (
        <p>{opinion}</p>
      )
    },
    // {
    //   title: 'Estado',
    //   dataIndex: 'validado_admin',
    //   key: 'validado_admin',
    //   render: (validado: boolean, record: IClienteBack) => (
    //     <Button
    //       type="primary"
    //       danger={!record.validado_admin} // Usamos el estado actualizado
    //       onClick={async () => {
    //         try {
    //           const nuevoEstado = !record.validado_admin; // Alternar el estado
    //           const data = { validado_admin: nuevoEstado };
    //           const response = await clienteService.updateCliente(record.id, data); // Realizar la petición
    //           if(response.state){
    //             record.validado_admin = nuevoEstado;
    //             showToast("success", response.message, "");
    //             setFilteredData((prevDataSource) =>
    //               prevDataSource.map((item) =>
    //                 item.id === record.id ? { ...item, validado_admin: nuevoEstado } : item
    //               )
    //             );
    //           }
    //           // Actualizar el estado local para reflejar el cambio en la tabla
    //         } catch (error) {
    //           showToast("error", "Error al actualizar el estado", "");
    //           console.error('Error al actualizar el estado:', error);
    //         }
    //       }}
    //     >
    //       {record.validado_admin ? 'Activado' : 'Desactivado'}
    //     </Button>
    //   ),
    // }
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

export default Clientes;
