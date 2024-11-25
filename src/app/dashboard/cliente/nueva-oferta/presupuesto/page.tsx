"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Info as IcoInfo } from "lucide-react";
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
        <Progress value={100} className="mx-auto mb-4 h-2" />
        <p className="text-left">Paso 7/6</p>
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
              className={`flex flex-col justify-between w-1/2 h-[90px] border rounded-lg p-4 cursor-pointer ${
                selected === "monto-fijo"
                  ? "bg-[#F6F8F7] border-black"
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
        )}
        {selected === "monto-fijo" && (
          <div className="w-full">
            <p className="mb-2 font-bold">Ingrese el monto fijo</p>
            <Input
              type="text"
              className="border-black rounded-none h-10 focus-visible:border-none"
              value={montoFijo}
              onChange={(e) => setMontoFijo(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-2 my-4">
          <IcoInfo size={16} color="#61646B" />
          <p>Te mostraremos abogados acorde al rango ingresado.</p>
        </div>

        <div className="flex justify-between items-center mt-16">
          <Link href="#" className="font-bold underline">
            No estoy listo para poner un presupuesto
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
