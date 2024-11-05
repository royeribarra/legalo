import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const HomeFaq = () => {
  return (
    <div className="max-w-[1920px] mx-auto p-4 lg:px-16  flex gap-4  items-center lg:py-28 3xl:py-36 w-full flex-col lg:flex-row">
      <div className="w-full lg:w-[40%] flex flex-col gap-4 items-center lg:items-start my-8 lg:my-auto">
        <h2 className="text-3xl lg:text-5xl max-w-[400px] text-center lg:text-left font-tiempos">
          Respondemos a tus <span className="italic">preguntas</span>
        </h2>
        <p className="text-[18px]">¿Tienes más preguntas?</p>
        <Button
          variant="outline"
          className="w-fit border border-black rounded-full text-xl px-6 "
        >
          Contáctanos
        </Button>
      </div>

      <div className="w-full lg:w-[60%] mb-8 lg:mb-auto">
        <Accordion
          type="single"
          collapsible
          className="text-lg 3xl:text-2xl no-underline"
        >
          <AccordionItem
            value="item-1"
            className="border-b-black border-t border-t-black "
          >
            <AccordionTrigger className="my-2">
              ¿Cómo puedo asegurarme de que el abogado que estoy contratando sea
              confiable y competente?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-black">
            <AccordionTrigger className="my-2">
              ¿Cómo funciona el proceso de publicación de un proyecto en la
              plataforma?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-black">
            <AccordionTrigger className="my-2">
              ¿Cómo se maneja la seguridad de los pagos en la plataforma?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b-black">
            <AccordionTrigger className="my-2">
              ¿Qué debo hacer si no estoy satisfecho con el trabajo del abogado?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-b-black">
            <AccordionTrigger className="my-2">
              ¿Puedo contratar abogados para proyectos a largo plazo o solo para
              tareas específicas?
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default HomeFaq;
