"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { ArrowLeft, Info as IcoInfo } from "lucide-react";
import { ArrowRight } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useOferta } from "@/contexts/ofertaContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";

const PublicarPageSeven = () => {
  const route = useRouter();
  const { state, updateState } = useOferta();
  const { showToast } = useToast();
  const [selected, setSelected] = useState<"rango" | "monto-fijo">("rango");
  const [rangoDesde, setRangoDesde] = useState<number | null>(null);
  const [rangoHasta, setRangoHasta] = useState<number | null>(null);
  const [montoFijo, setMontoFijo] = useState<number | null>(null);

  // Cargar valores iniciales si ya existen
  useEffect(() => {
    if (state.presupuesto) {
      const { salario_minimo, salario_maximo } = state.presupuesto;
      if (salario_minimo !== salario_maximo) {
        setSelected("rango");
        setRangoDesde(salario_minimo || null);
        setRangoHasta(salario_maximo || null);
      } else {
        setSelected("monto-fijo");
        setMontoFijo(salario_maximo || null);
      }
    }
  }, [state.presupuesto]);

  // Función para manejar el cambio en los inputs del presupuesto
  const handlePresupuestoUpdate = () => {
    if (selected === "rango") {
      updateState({
        presupuesto: {
          salario_minimo: rangoDesde ?? 0, // Asegurar número válido
          salario_maximo: rangoHasta ?? 0,
        },
      });
    } else if (selected === "monto-fijo") {
      updateState({
        presupuesto: {
          salario_minimo: montoFijo ?? 0,
          salario_maximo: montoFijo ?? 0,
        },
      });
    }
  };

  const nextStep = () => {
    // Validaciones
    if (selected === "rango" && (rangoDesde === null || rangoHasta === null)) {
      showToast("error", "Debes ingresar un rango válido.", "");
      return;
    }
    if (selected === "monto-fijo" && montoFijo === null) {
      showToast("error", "Debes ingresar un monto fijo válido.", "");
      return;
    }

    handlePresupuestoUpdate();
    route.push("/dashboard/cliente/nueva-oferta/preguntas");
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full mx-auto mb-8">
        <Progress value={(100 / 8) * 7} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 7/8</p>
      </div>
      <div>
        <h1 className="text-[36px] my-4 font-nimbus">
          ¿Cuánto es tu presupuesto?
        </h1>
        <p className="mb-6 border-b border-gray pb-2">
          Esto nos ayudará a mostrarte candidatos que estén dentro de tu rango.
        </p>

        <p className="mb-2 font-bold">Escoge tu modalidad de pago.</p>
        <div className="mb-4">
          <RadioGroup value={selected} className="flex">
            <div
              className={`flex flex-col justify-between w-1/2 h-[90px] border rounded-lg p-4 cursor-pointer ${
                selected === "rango" ? "bg-[#F6F8F7] border-black" : "bg-white"
              }`}
              onClick={() => setSelected("rango")}
            >
              <div className="flex justify-end">
                <RadioGroupItem value="rango" id="r1" />
              </div>
              <Label htmlFor="r1">Rango</Label>
            </div>
            <div
              className={`relative flex flex-col justify-between w-1/2 h-[90px] border rounded-lg p-4 cursor-pointer ${
                selected === "monto-fijo"
                  ? "bg-[#D9D9D9] border-black"
                  : "bg-white"
              }`}
              onClick={() => setSelected("monto-fijo")}
            >
              <div className="flex justify-end">
                <RadioGroupItem value="monto-fijo" id="r2" />
              </div>
              <Label htmlFor="r2">Monto fijo</Label>
            </div>
          </RadioGroup>
        </div>

        {selected === "rango" && (
          <>
            <div className="flex gap-2">
              <div className="w-1/2">
                <p className="mb-2 font-bold">Desde</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                    S/
                  </span>
                  <Input
                    type="number"
                    className="pl-8 border-black rounded-none h-10 focus-visible:border-none"
                    value={rangoDesde ?? ""}
                    min="0"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setRangoDesde(value >= 0 ? value : null);
                    }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <p className="mb-2 font-bold">Hasta</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                    S/
                  </span>
                  <Input
                    type="number"
                    className="pl-8 border-black rounded-none h-10 focus-visible:border-none"
                    value={rangoHasta ?? ""}
                    min="0"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setRangoHasta(value >= 0 ? value : null);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {selected === "monto-fijo" && (
          <>
            <div className="w-full">
              <p className="mb-2 font-bold">Ingrese el monto fijo</p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">
                  S/
                </span>
                <Input
                  type="number"
                  className="pl-8 border-black rounded-none h-10 focus-visible:border-none"
                  value={montoFijo ?? ""}
                  min="0"
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setMontoFijo(value >= 0 ? value : null);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 my-4">
              <IcoInfo size={16} color="#666666" />
              <p className="text-[#666666]">
                Precio incluido IGV (18%) del total.
              </p>
            </div>
          </>
        )}

        <div className="flex justify-between mt-16">
          <Link href="/dashboard/cliente/nueva-oferta/alcance">
            <Button
              variant="outline"
              className="h-12 px-10 text-base rounded-[10px]"
            >
              <ArrowLeft className="mr-2" /> Volver
            </Button>
          </Link>
          <Button
            className="h-12 px-10 px-text-base rounded-[10px]"
            onClick={nextStep}
          >
            Siguiente <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PublicarPageSeven;
