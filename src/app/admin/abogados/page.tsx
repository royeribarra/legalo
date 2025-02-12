'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Key } from 'antd/lib/table/interface';
import { abogadoService, clienteService, ofertaservice, usuarioService } from '@/services';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { IAplicacionBack } from '@/interfaces/Aplicacion.interface';
import { IOfertaBack } from '@/interfaces/Oferta.interface';
import { IIndustriaAbogado, IIndustriaOferta } from '@/interfaces/Industria.interface';
import { IAbogadoBack } from '@/interfaces/Abogado.interface';
import { IEspecialidadAbogado } from '@/interfaces/Especialidad.interface';
import { IServicioAbogado } from '@/interfaces/Servicio.interface';
import Link from 'next/link';
import { useToast } from '@/contexts/toastContext';
import { IFileBack } from '@/interfaces/File.interface';
import { useLoader } from '@/contexts/loaderContext';
import { Modal } from 'antd';

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

const OpcionesVerificacion = ({ record }: { record: IAbogadoBack }) => {
  console.log(record);
  const { showToast } = useToast();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = (value: any) => {
    setSelectedOption(value);
  };

  const handleConfirm = async () => {
    setIsModalVisible(false);
    try {
      const data = { abogadoId: record.usuario.id, action: selectedOption };
      const response = await usuarioService.enviarMailVerificacion(data);
      console.log(response);
      if (response.state) {
        showToast('success', response.message, '');
      }
    } catch (error) {
      showToast('error', 'Error al actualizar el estado', '');
      console.error('Error al enviar solicitud:', error);
    }
  };

  return (
    <>
      {record.validado_admin && record.usuario.isActive ? (
        <Tag color="green">Validado</Tag>
      ) : (
        <Tag color="orange">Por validar</Tag>
      )}
      <Select
        placeholder="Seleccione una acción"
        style={{ width: 200, marginLeft: 10 }}
        onChange={handleChange}
        value={selectedOption}
      >
        {/* <Select.Option value="validar">Validar documentos</Select.Option> */}
        <Select.Option value="rechazar">Rechazar documentos</Select.Option>
        <Select.Option value="aceptar">Aceptar documentos</Select.Option>
      </Select>
      <Button 
        type="primary" 
        onClick={() => setIsModalVisible(true)} 
        disabled={!selectedOption}
        style={{ marginLeft: 10 }}
      >
        Guardar
      </Button>

      <Modal
        title="Confirmación"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>¿Está seguro de que desea {selectedOption} los documentos?</p>
      </Modal>
    </>
  );
};

// Filtros disponibles
const estados: ('Activo' | 'Inactivo')[] = ['Activo', 'Inactivo'];
const industrias: string[] = ['Tecnología', 'Recursos Humanos', 'Derecho Penal'];

function Abogados() {
  const { setLoading } = useLoader();
  const { showToast } = useToast();
  const [filteredData, setFilteredData] = useState<IAbogadoBack[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [estadoFilter, setEstadoFilter] = useState<'Activo' | 'Inactivo' | null>(null);
  const [industriaFilter, setIndustriaFilter] = useState<string | null>(null);
  // const [fechaFilter, setFechaFilter] = useState<[Dayjs, Dayjs] | null>(null);

  async function fetchOfertas() {
    setLoading(true);
    try {
      const data = await abogadoService.obtenerTodos();
      setFilteredData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {
            especialidades.map((especialidad)=>
              <li key={especialidad.id}>{especialidad.especialidad.nombre}</li>
            )
          }
          </ul>
        </div>
      )
    },
    {
      title: 'Servicios',
      dataIndex: 'serviciosAbogado',
      key: 'servicios',
      render: (servicios: IServicioAbogado[]) => (
        <div>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {
            servicios.map((servicio)=>
              <li>{servicio.servicio.nombre}</li>
            )
          }
          </ul>
        </div>
      )
    },
    {
      title: 'Industrias',
      dataIndex: 'industriasAbogado',
      key: 'industrias',
      render: (industrias: IIndustriaAbogado[]) => (
        <div>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {
            industrias.map((industria)=>
              <li>{industria.industria.nombre}</li>
            )
          }
          </ul>
        </div>
      )
    },
    {
      title: 'Imagen',
      dataIndex: 'files',
      key: 'files',
      render: (files: IFileBack[]) =>  {
        const file = files.find((file)=>file.nombreArchivo === 'archivo_imagen')
        return(
          <Link href={`${process.env.S3_FILE_ROUTE}/${file?.filePath}`} target='_blank'>
            <Button>Ver</Button>
          </Link>
        )
      }
    },
    {
      title: 'CV',
      dataIndex: 'files',
      key: 'files',
      render: (files: IFileBack[]) =>  {
        const file = files.find((file)=>file.nombreArchivo === 'archivo_cv')
        return(
          <Link href={`${process.env.S3_FILE_ROUTE}/${file?.filePath}`} target='_blank'>
            <Button>Ver</Button>
          </Link>
        )
      }
    },
    {
      title: 'CUL',
      dataIndex: 'files',
      key: 'files',
      render: (files: IFileBack[]) =>  {
        const file = files.find((file)=>file.nombreArchivo === 'archivo_cul')
        return(
          <Link href={`${process.env.S3_FILE_ROUTE}/${file?.filePath}`} target='_blank'>
            <Button>Ver</Button>
          </Link>
        )
      }
    },
    {
      title: 'Video',
      dataIndex: 'files',
      key: 'files',
      render: (files: IFileBack[]) =>  {
        const file = files.find((file)=>file.nombreArchivo === 'archivo_video')
        return(
          <Link href={`${process.env.S3_FILE_ROUTE}/${file?.filePath}`} target='_blank'>
            <Button>Ver</Button>
          </Link>
        )
      }
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: unknown, record: IAbogadoBack) => <OpcionesVerificacion record={record} />,
    },
    {
      title: 'Envíar código de verificación',
      key: 'enviar',
      render: (_: unknown, record: IAbogadoBack) => {
        const enviarMail = async() => {
          try {
            const data = {
              abogadoId: record.usuario.id
            }
            const response = await usuarioService.enviarMailVerificacion(data);
            console.log(response)
            if(response.state){
              showToast("success", response.message, "");
              
            }
          } catch (error) {
            showToast("error", "Error al actualizar el estado", "");
            console.error('Error al enviar mail de verificación:', error);
          }
        }
        return(
          <>
            {
              record.usuario.isActive ? 
              <Button type="primary" onClick={()=>console.log("nada")}>Activado</Button> :
              <Button type="primary" onClick={enviarMail}>Envíar código de activación</Button>
            }
          </>
        )
      }
    },
    {
      title: 'Estado',
      dataIndex: 'validado_admin',
      key: 'validado_admin',
      render: (validado: boolean, record: IAbogadoBack) => (
        <Button
          type="primary"
          danger={!record.validado_admin}
          onClick={async () => {
            try {
              const nuevoEstado = !record.validado_admin;
              const data = { validado_admin: nuevoEstado };
              const response = await abogadoService.updateAbogado(record.id, data);
              if(response.state){
                record.validado_admin = nuevoEstado;
                showToast("success", response.message, "");
                setFilteredData((prevDataSource) =>
                  prevDataSource.map((item) =>
                    item.id === record.id ? { ...item, validado_admin: nuevoEstado } : item
                  )
                );
              }
            } catch (error) {
              showToast("error", "Error al actualizar el estado", "");
              console.error('Error al actualizar el estado:', error);
            }
          }}
        >
          {record.validado_admin ? 'Activado' : 'Desactivado'}
        </Button>
      ),
    },
    {
      title: 'Editar',
      key: 'editar',
      render: (_: unknown, record: IAbogadoBack) => {
        return(
        <Link href={`/admin/abogados/${record.id}`}>
          <Button type="primary">Editar</Button>
        </Link>)
      }
      ,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', gap: '10px' }}>
        <Input
          placeholder="Buscar ofertas..."
          style={{ width: '250px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
          // onPressEnter={applyFilters}
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
          // onClick={applyFilters}
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
