"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Check as IconCheck, Info as IcoInfo } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChangeEvent, useState } from "react";
import { pagoService } from "@/services";
import { useAuth } from "@/contexts/authContext";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = useParams();
  const { token, userRole } = useAuth();
  const [payoutState, setPayoutState] = useState("not-paid");
  const [valueOperation, setValueOperation] = useState<string>("");

  // Parámetros de consulta (query strings)
  const monto = searchParams.get("monto");
  const clienteId = searchParams.get("clienteId");

  async function fetchPagarOferta() {
    try {
      const parsedId = Number(id);
      if (isNaN(parsedId) || isNaN(Number(clienteId)) || isNaN(Number(monto))) {
        console.error("El id no es un número válido:", id);
        return;
      }

      if(token?.cliente.id){
        const pagoData = {
          clienteId: Number(clienteId),
          monto: Number(monto),
          ofertaId: id,
          operacion: valueOperation
        };
        const response = await pagoService.realizarPago(pagoData);
        if(response.state){
          setPayoutState("paid")
        }
        console.log(response)
      }
    } catch (error) {
      console.error("Error al pagar la oferta:", error);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValueOperation(event.target.value);
  };

  const cerrarPago = () => {
    router.push("/dashboard/cliente")
  };

  return (
    <div className="h-screen grid grid-cols-2 ">
      <div className="col-span-2 lg:col-span-1">
        <main className=" p-4 mx-auto max-w-[520px]">
          <div className="lg:mt-[10%]">
            {payoutState === "not-paid" && (
              <div className="border border-black rounded-[10px] p-6">
                <h1 className="text-2xl font-bold text-center mb-4">
                  Transfiere a Legalo
                </h1>
                <p className="text-[#61646B] pb-2 border-b border-[#61646B] mb-4 text-sm">
                  Utiliza tu banco de preferencia y te notificaremos...
                </p>
                <p className="text-sm text-[#61646B] mb-2">
                  Datos de operación
                </p>
                <div className="flex flex-nowrap gap-2 items-center mb-4">
                  <Textarea className="text-[#666666] border-black" onChange={handleChange} value={valueOperation}>
                   
                  </Textarea>
                  <Button className="h-12 w-36 rounded-none">Copiar</Button>
                </div>
                <p className="text-sm text-[#61646B] mb-2">
                  Datos de la cuenta
                </p>
                <p className="text-sm text-[#61646B] mb-8">
                  Legalo SAC - 98398239498
                </p>
                <p className="mb-2">Monto a transferir</p>
                <p>🔘 S/ {monto} </p>

                <div className="my-4">
                  <span className="flex items-top lg:items-center gap-2">
                    <IcoInfo size={16} color="#61646B" className="flex-none" />
                    <p className="text-sm text-[#61646B]">
                      Al realizar la transferencia me comprometo a concluir el
                      servicio.
                    </p>
                  </span>
                </div>
                <div className="flex items-top lg:items-center gap-2">
                  <Checkbox />
                  <p>Confirmo haber realizado la transferencia</p>
                </div>
                <div className="mt-8 flex justify-between gap-2">
                  <Button
                    variant={"outline"}
                    className="border-black w-full rounded-none"
                    onClick={cerrarPago}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-full rounded-none"
                    onClick={fetchPagarOferta}
                  >
                    Confirmar
                  </Button>
                </div>
              </div>
            )}

            {payoutState === "paid" && (
              <div className="border border-black rounded-[10px] p-6">
                <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center ">
                  <IconCheck size={32} color="white" />
                </div>
                <h1 className="text-bold text-3xl font-nimbus my-4">
                  ¡Gracias por confiar en Legalo!
                </h1>

                <p className="text-2xl my-4 text-slate-600">
                  Verificaremos que el pago se haya realizado con éxito
                </p>

                <p className="my-4">Datos de la operación #84747</p>

                <p className="mb-2">Monto transferido</p>
                <p>🔘 S/ {monto} </p>

                <div className="my-4">
                  <span className="flex items-top lg:items-center gap-2">
                    <IcoInfo size={16} color="#61646B" className="flex-none" />
                    <p className="text-sm text-[#61646B]">
                      En 24 horas tu abogado elegido se comunicará con usted.
                    </p>
                  </span>
                </div>
                <div className="mt-8 flex justify-between gap-2">
                  <Button className="w-full rounded-none bg-[#5E5E5E]" onClick={cerrarPago}>
                    Cerrar
                  </Button>
                  <Button className="w-full rounded-none bg-[#5E5E5E]">
                    Ayuda
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <div className="lg:col-span-1 overflow-hidden hidden lg:block degrade-client"></div>
    </div>
  );
};

export default CheckoutPage;
