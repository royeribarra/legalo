import { useToast } from '@/contexts/toastContext';
import { IAplicacionBack } from '@/interfaces/Aplicacion.interface';
import { pagoAbogadoService } from '@/services';
import { Modal, Input, Button, Form } from 'antd';
import { useState } from 'react';

type propsModal = {
    visible: boolean;
    onClose: () => void;
    aplicacion: IAplicacionBack;
    trabajoId: number;
};

const ModalRegistrarPago = ({ visible, onClose, aplicacion, trabajoId }: propsModal) => {
  const { showToast } = useToast();
  const [monto, setMonto] = useState(0);
  const [operacion, setOperacion] = useState('');

  const handlePago = async () => {
    if (monto <= 0) {
      return alert("Ingrese un monto válido");
    }
    // onSubmit(monto);
    try {
      const data = {
        trabajoId,
        monto,
        operacion
      };
      const response = await pagoAbogadoService.registrarPago(data);
      if(response.state){
        showToast("success", response.message, '');
      }
    } catch (error) {
      console.log(error)
      showToast("error", 'Hubo un error al registrar el pago', '');
    }
    setMonto(0);
    setOperacion('');
    onClose();
  };

  return (
    <Modal title="Registrar Pago" open={visible} onCancel={onClose} footer={null}>
      {aplicacion && (
        <Form layout="vertical">
          <p><strong>Monto:</strong> {aplicacion.salarioEsperado}</p>
          <p><strong>Número de Cuenta:</strong> {aplicacion.numeroCuenta}</p>
          <p><strong>CCI:</strong> {aplicacion.numeroCuentaCci}</p>
          <p><strong>Banco:</strong> {aplicacion.selectedBanco}</p>
          <p><strong>Salario:</strong> {aplicacion.salarioReal}</p>
          <p><strong>Impuesto:</strong> {aplicacion.impuesto}</p>
          <p><strong>Comisión:</strong> {aplicacion.comision}</p>
          <Form.Item label="Monto a Registrar" required>
            <Input
              type="text"
              placeholder="Ingrese la operación"
              value={operacion}
              onChange={(e) => setOperacion(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Monto a Registrar" required>
            <Input
              type="number"
              placeholder="Ingrese el monto"
              value={monto}
              onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
            />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button onClick={onClose}>Cancelar</Button>
            <Button type="primary" onClick={handlePago}>Realizar Pago</Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ModalRegistrarPago;