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
  const [selected, setSelected] = useState("rango");
  const [rangoDesde, setRangoDesde] = useState("");
  const [rangoHasta, setRangoHasta] = useState("");
  const [montoFijo, setMontoFijo] = useState("");

  // Cargar valores iniciales si ya existen
  useEffect(() => {
    if (state.presupuesto) {
      const { salario_minimo, salario_maximo } = state.presupuesto;
      if (salario_minimo !== salario_maximo) {
        setSelected("rango");
        setRangoDesde(salario_minimo || "");
        setRangoHasta(salario_maximo || "");
      } else {
        setSelected("monto-fijo");
        setMontoFijo(salario_maximo || "");
      }
    }
  }, [state.presupuesto]);

  // Función para manejar el cambio en los inputs del presupuesto
  const handlePresupuestoUpdate = () => {
    if (selected === "rango") {
      updateState({
        presupuesto: {
          salario_minimo: rangoDesde,
          salario_maximo: rangoHasta,
        },
      });
    } else if (selected === "monto-fijo") {
      updateState({
        presupuesto: {
          salario_minimo: montoFijo,
          salario_maximo: montoFijo,
        },
      });
    }
  };

  const nextStep = () => {
    // Validaciones
    if (selected === "rango" && (!rangoDesde || !rangoHasta)) {
      showToast("error", "Debes ingresar un rango válido.", "");
      return;
    }
    if (selected === "monto-fijo" && !montoFijo) {
      showToast("error", "Debes ingresar un monto fijo válido.", "");
      return;
    }

    handlePresupuestoUpdate();
    route.push("/dashboard/cliente/nueva-oferta/preguntas");
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 m-8 lg:w-[600px]">
      <div className="w-full max-w-[480px] mx-auto mb-8">
        <Progress value={100/8*7} className="mx-auto mb-4 h-2" />
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
              <div
                className={`absolute top-[-50px] right-[25px] lg:top-[-55px] lg:right-[-100px] w-[120px] bg-white text-[#666666] gap-2 p-2 border border-[#666666] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-none rounded-br-[10px] ${
                  selected === "monto-fijo" ? "flex" : "hidden"
                }`}
              >
                <IcoInfo size={14} color="#61646B" className="w-[36px]" />
                <p className="text-xs">Se añadirá el IGV al monto ingresado</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        {selected === "rango" && (
          <>
            <div className="flex gap-2">
              <div className="w-1/2">
                <p className="mb-2 font-bold">Desde</p>
                <Input
                  type="text"
                  className="border-black rounded-none h-10 focus-visible:border-none"
                  value={rangoDesde}
                  onChange={(e) => setRangoDesde(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <p className="mb-2 font-bold">Hasta</p>
                <Input
                  type="text"
                  className="border-black rounded-none h-10 focus-visible:border-none"
                  value={rangoHasta}
                  onChange={(e) => setRangoHasta(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="flex items-center gap-2 my-4">
              <IcoInfo size={16} color="#666666" />
              <p className="text-[#666666]">
                Te mostraremos abogados acorde al rango ingresado.
              </p>
            </div> */}
          </>
        )}
        {selected === "monto-fijo" && (
          <>
            <div className="w-full">
              <p className="mb-2 font-bold">Ingrese el monto fijo</p>
              <Input
                type="text"
                className="border-black rounded-none h-10 focus-visible:border-none"
                value={montoFijo}
                onChange={(e) => setMontoFijo(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 my-4">
              <IcoInfo size={16} color="#666666" />
              <p className="text-[#666666]">
                Precio incluido IGV (18%) del total.
              </p>
            </div>
          </>
        )}

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="include-igv"
            className="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="include-igv" className="text-base font-bold">
            Prefiero que el abogado cotice
          </label>
        </div>

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
