'use client'
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Space, Tag, DatePicker } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Key } from 'antd/lib/table/interface';
import { abogadoService, clienteService, ofertaservice, trabajoService } from '@/services';
import { IClienteBack } from '@/interfaces/Cliente.interface';
import { IAplicacionBack } from '@/interfaces/Aplicacion.interface';
import { IOfertaBack } from '@/interfaces/Oferta.interface';
import { IIndustriaAbogado, IIndustriaOferta } from '@/interfaces/Industria.interface';
import { IAbogadoBack } from '@/interfaces/Abogado.interface';
import { IEspecialidadAbogado } from '@/interfaces/Especialidad.interface';
import { IServicioAbogado } from '@/interfaces/Servicio.interface';
import Link from 'next/link';
import { useToast } from '@/contexts/toastContext';
import { IPagoAbogadoBack, IPagoBack, IProgresoBack, ITrabajoBack } from '@/interfaces/Trabajo.interface';
import ModalRegistrarPago from '@/components/admin/trabajos/ModalRegistrarPago';

const { Option } = Select;
const { RangePicker } = DatePicker;


// Filtros disponibles
const estados: ('Activo' | 'Inactivo')[] = ['Activo', 'Inactivo'];
const industrias: string[] = ['Tecnología', 'Recursos Humanos', 'Derecho Penal'];

function Trabajos() {
  const { showToast } = useToast();
  const [filteredData, setFilteredData] = useState<ITrabajoBack[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [estadoFilter, setEstadoFilter] = useState<'Activo' | 'Inactivo' | null>(null);
  const [industriaFilter, setIndustriaFilter] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrabajo, setSelectedTrabajo] = useState<ITrabajoBack | null>(null);
  // const [fechaFilter, setFechaFilter] = useState<[Dayjs, Dayjs] | null>(null);

  async function fetchTrabajos() {
    try {
      const data = await trabajoService.obtenerTodos();
      setFilteredData(data);
    } catch (error) {
      console.error("Error al obtener las ofertas:", error);
    }
  }

  const handleOpenModal = (trabajo: ITrabajoBack) => {
    setSelectedTrabajo(trabajo);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTrabajo(null);
  };

  useEffect(()=> {
    fetchTrabajos();
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
      title: 'Abogado',
      dataIndex: 'abogado',
      key: 'abogado',
      render: (abogado: IAbogadoBack) => (
        <p>{abogado?.nombres + " " + abogado?.apellidos}</p>
      ),
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (cliente: IClienteBack) => (
        <p>{cliente?.nombres + " " + cliente?.apellidos}</p>
      )
    },
    {
      title: 'Fecha de aceptación',
      dataIndex: 'aplicacion',
      key: 'aplicacion',
      render: (aplicacion: IAplicacionBack) => {
        if (!aplicacion.createdAt) return "-";
        const fecha = new Date(aplicacion.createdAt);
        return <p>{fecha.toLocaleDateString("es-ES")}</p>;
      }
    },
    {
      title: 'Pagos Cliente',
      dataIndex: 'pagos',
      key: 'pagos',
      width: 250,
      render: (pagos: IPagoBack[]) => (
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {pagos.map((pago, index) => (
            <li key={index}>
              <strong>Monto:</strong> S/ {pago.monto_total} <br />
              <strong>Operación:</strong> {pago.operacion}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Pagos Abogado',
      dataIndex: 'pagosAbogado',
      key: 'pagosAbogado',
      width: 250,
      render: (pagosAbogado: IPagoAbogadoBack[]) => (
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {pagosAbogado.map((pagoAbogado, index) => (
            <li key={index}>
              <strong>Operación:</strong> {pagoAbogado.operacion} <br />
              <strong>Monto:</strong> S/ {pagoAbogado.monto}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Progreso Abogado',
      dataIndex: 'progresos',
      key: 'progresos',
      width: 250,
      render: (progresos: IProgresoBack[]) => (
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {progresos.map((progreso, index) => (
            <li key={index}>
              <strong>{progreso.progreso} %</strong>: {progreso.descripcion}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Registrar Pago',
      key: 'registrarPago',
      render: (_: any, record: ITrabajoBack) => (
        <Button type="primary" onClick={() => handleOpenModal(record)}>
          Registrar Pago
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
      {
        selectedTrabajo &&
        <ModalRegistrarPago
          visible={modalVisible}
          onClose={handleCloseModal}
          aplicacion={selectedTrabajo?.aplicacion}
          trabajoId={selectedTrabajo.id}
        />
      }
    </div>
  );
};

export default Trabajos;
