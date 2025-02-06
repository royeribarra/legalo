import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { pagoService } from "@/services";
import { useToast } from "@/contexts/toastContext";
import { useLoader } from "@/contexts/loaderContext";

const checkoutSchema = z.object({
  tipoPago: z.string().min(1, "Selecciona un método de pago"),
  monto: z.number().min(1, "El monto debe ser mayor a 0"),
  tipoComprobante: z.string().min(1, "Selecciona un tipo de comprobante"),
  nombreFactura: z.string().optional(),
  ruc: z.string().optional(),
  direccionFactura: z.string().optional(),
  confirmacionTransferencia: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean().optional()
  ),  
  operacion: z.string().min(1, "El número de operación es obligatorio"),
  });
  // .refine((data) => {
  //   if (data.tipoPago === "transferencia" && !data.confirmacionTransferencia) {
  //     return false;
  //   }
  //   return true;
  // }, {
  //   message: "Debes confirmar la transferencia",
  //   path: ["confirmacionTransferencia"],
  // });

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  ofertaId?: number;
  monto?: number;
  clienteId?: number;
  aplicacionId: number;
  trabajoId?: number;
}

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const ModalPago: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  ofertaId,
  monto,
  clienteId,
  aplicacionId,
  trabajoId
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      tipoPago: "transferencia",
      monto: monto || 0,
      tipoComprobante: "",
      nombreFactura: "",
      ruc: "",
      direccionFactura: "",
      confirmacionTransferencia: false,
      operacion: ""
    },
  });

  const tipoPago = watch("tipoPago");
  const tipoComprobante = watch("tipoComprobante");
  const confirmacionTransferencia = watch("confirmacionTransferencia");
  const { showToast } = useToast();
  const { setLoading } = useLoader();

  async function onSubmit(data: CheckoutFormData) {
    console.log("Datos enviados:", data);
    setLoading(true);
    try {
      const pagoData = {
        ...data,
        clienteId: clienteId,
        ofertaId: ofertaId,
        aplicacionId: aplicacionId,
        trabajoId: trabajoId
      };
      const response = await pagoService.crearPago(pagoData);
      if (response.state) {
        showToast("success", response.message, "");
        onClose();
      }
      console.log(response);
      
    } catch (error) {
      console.error("Error al pagar la oferta:", error);
    } finally{
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold">
              Confirmar Pago
            </Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
              {/* Tipo de Pago */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Pago</label>
                  <Select onValueChange={(value) => setValue("tipoPago", value)} defaultValue="transferencia">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tipoPago && <p className="text-red-500 text-sm">{errors.tipoPago.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Monto</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-500">S/</span>
                    <Input type="number" {...register("monto", { valueAsNumber: true })} className="pl-8" />
                  </div>
                  {errors.monto && <p className="text-red-500 text-sm">{errors.monto.message}</p>}
                </div>
              </div>

              {tipoPago === "transferencia" && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm font-medium">Datos Bancarios:</p>
                  <p className="text-sm">Banco: <strong>Interbank</strong></p>
                  <p className="text-sm">CCI: <strong>1322134234</strong></p>
                </div>
              )}
              {/* Número de operación */}
              <div>
                <label className="block text-sm font-medium mb-2">Número de operación</label>
                <Input type="text" {...register("operacion")} />
                {errors.operacion && <p className="text-red-500 text-sm">{errors.operacion.message}</p>}
              </div>

              {watch("tipoPago") === "transferencia" && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("confirmacionTransferencia")}
                    id="confirmacionTransferencia"
                    className="h-5 w-5"
                  />
                  <label htmlFor="confirmacionTransferencia" className="text-sm">
                    Confirmo que la transferencia ha sido realizada
                  </label>
                </div>
              )}

              {/* Tipo de Comprobante */}
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Comprobante</label>
                <Select onValueChange={(value) => setValue("tipoComprobante", value)} defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo de comprobante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boleta">Boleta</SelectItem>
                    <SelectItem value="factura">Factura</SelectItem>
                  </SelectContent>
                </Select>
                {errors.tipoComprobante && <p className="text-red-500 text-sm">{errors.tipoComprobante.message}</p>}
              </div>

              {/* Campos adicionales si se elige factura */}
              {watch("tipoComprobante") === "factura" && (
                <>
                  <div>
                    <label className="block text-sm font-medium">Nombre en la Factura</label>
                    <Input type="text" {...register("nombreFactura")} />
                    {errors.nombreFactura && <p className="text-red-500 text-sm">{errors.nombreFactura.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">RUC</label>
                    <Input type="text" {...register("ruc")} />
                    {errors.ruc && <p className="text-red-500 text-sm">{errors.ruc.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Dirección</label>
                    <Input type="text" {...register("direccionFactura")} />
                    {errors.direccionFactura && <p className="text-red-500 text-sm">{errors.direccionFactura.message}</p>}
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">Confirmar Pago</Button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalPago;
