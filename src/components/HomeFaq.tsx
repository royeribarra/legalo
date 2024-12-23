import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";

const HomeFaq = () => {
  return (
    <div className="max-w-[1920px] mx-auto p-4 lg:px-16  flex gap-4  items-center lg:py-28 3xl:py-36 w-full flex-col lg:flex-row">
      <div className="w-full lg:w-[40%] flex flex-col gap-4 items-center lg:items-start my-8 lg:my-auto">
        <h2 className="text-3xl lg:text-5xl max-w-[400px] text-center lg:text-left font-nimbus">
          Respondemos a tus <span className="italic">preguntas</span>
        </h2>
        <p className="text-[18px]">¿Tienes más preguntas?</p>
        <Link href={"/contacto"}>
          <Button className="w-fit border border-black rounded-[10px] text-base px-6 h-11">
            Contáctanos
          </Button>
        </Link>
      </div>

      <div className="w-full lg:w-[60%] mb-8 lg:mb-auto">
        <Accordion
          type="single"
          collapsible
          className="text-lg 3xl:text-2xl no-underline"
        >
          <AccordionItem value="item-1" className="border-t border-t-black ">
            <AccordionTrigger className="my-2">
              <p>
                ¿Cómo funciona{" "}
                <span className="font-sans font-bold">LEGALO</span>?
              </p>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              LEGALO es una plataforma que te conecta con abogados
              especializados según tus necesidades legales. Publicas tu caso,
              los abogados interesados postulan y te enviamos un listado de
              propuestas. Así, puedes comparar opciones y elegir la que mejor se
              ajuste a ti.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className="border-b-black border-t border-t-black "
          >
            <AccordionTrigger className="my-2">
              ¿Cuánto tiempo tarda en encontrar un abogado?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              En cuanto publicas tu caso, los abogados empiezan a postular.
              Puedes recibir propuestas en pocas horas y contratar a un abogado
              en menos de un día o máximo 48 horas. (Aún no cierro esta
              respuesta).
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-black">
            <AccordionTrigger className="my-2">
              <p>
                ¿Es seguro realizar pagos a través de{" "}
                <span className="font-sans font-bold">LEGALO</span>?
              </p>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Sí, LEGALO custodia tu pago y solo lo libera al abogado cuando el
              servicio ha sido completado. Esto asegura que el dinero esté
              protegido hasta que recibas el servicio acordado.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b-black">
            <AccordionTrigger className="my-2">
              <p>
                ¿Cómo elige <span className="font-sans font-bold">LEGALO</span>{" "}
                a los abogados de la plataforma?
              </p>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              Todos los abogados en LEGALO han sido verificados para asegurar
              que puedan ejercer, que su experiencia y especialidad sean reales
              y estén actualizadas. Adicionalmente, puedes ver reseñas y
              valoraciones de otros clientes para tomar una decisión informada.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b-black">
            <AccordionTrigger className="my-2">
              <p>
                ¿Qué tipo de servicios legales puedo encontrar en{" "}
                <span className="font-sans font-bold">LEGALO</span>?
              </p>
            </AccordionTrigger>
            <AccordionContent className="text-base">
              LEGALO ofrece acceso a abogados especializados en diversas áreas,
              como derecho civil, penal, laboral, corporativo, y más. Puedes
              buscar abogados por especialidad para encontrar el adecuado para
              tu caso. Adicionalmente, puedes encontrar a futuros abogados
              (bachilleres y estudiantes) para investigaciones o practicas pre y
              profesionales.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HomeFaq;
