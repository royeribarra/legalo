"use client";

import Header from "@/components/Header";
import Image from "next/image";
import React, { useState } from "react";

import specialtiesItems from "@/data/specialtiesItems";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const NosotrosPage = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("lawyer");

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };
  return (
    <div>
      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      <div className=" bg-gradient-to-b from-[#FCFEEF] to-[#EEF79C] p-8 lg:py-20 border-b border-black">
        <div className="text-center max-w-[960px] mx-auto space-y-10">
          <h1>NOSOTROS</h1>
          <h2 className="text-5xl lg:text-7xl font-tiempos ">
            Queremos presentarte a tu <i>abogado de confianza</i>
          </h2>
          <p className="text-lg lg:text-[22px]">
            LEGALO es una comunidad que impulsa el talento, fomenta conexiones
            auténticas y permite que cada interacción deje una huella. Aquí, los
            abogados pueden crecer, los estudiantes pueden aprender y los
            clientes pueden confiar en que recibirán el apoyo que necesitan.
          </p>
        </div>
      </div>
      <div className="p-8 lg:py-16">
        <div className="mx-auto max-w-[790px]">
          <p className="lg:font-lg">
            Después de más de una década en el mundo corporativo y enfrentando
            momentos de cambio profundo, comprendí que la abogacía podía ser
            diferente: más flexible, adaptada a la era digital y centrada en las
            personas. Así nació LEGALO, una plataforma creada para transformar
            cómo los abogados trabajan y cómo los clientes acceden a los
            servicios legales, de manera rápida y remota.
            <br />
            <br />
            Para asegurar la calidad de nuestro servicio, verificamos
            cuidadosamente los estudios, la experiencia y los antecedentes de
            cada abogado. Este proceso garantiza que los clientes estén en manos
            de profesionales confiables y preparados. Además, brindaremos
            herramientas digitales que potencien la asesoría, ayudando a los
            abogados a ofrecer un servicio más ágil y efectivo.
            <br />
            <br />
            Los clientes son el otro pilar de LEGALO. Ya sean empresas medianas
            y pequeñas en busca de asesoría estratégica o personas que necesitan
            apoyo en situaciones legales cotidianas, queremos que encuentren en
            nuestra plataforma un servicio accesible, rápido y adaptado a sus
            necesidades. Nos enfocamos en ofrecer soluciones prácticas y en
            construir relaciones basadas en la confianza.
          </p>
          <div className="p-8">
            <div className="flex gap-4 items-end">
              <Image
                src="/assets/img-legalo-history.jpg"
                alt="img"
                width={102}
                height={107}
              />
              <div>
                <p className="text-[30px] font-tiempos">Evelyn Castro</p>
                <p className="font-bold">Fundadora de LEGALO</p>
                <p>
                  Abogada con más de 14 años de experiencia y Máster en la
                  Universidad de Barcelona
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black p-8 lg:py-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl lg:text-[60px] text-center font-tiempos leading-[1.2]">
            Especialidades de derecho
          </h2>
          <div className="flex flex-wrap justify-center gap-10 my-16">
            {specialtiesItems.map((item) => (
              <div key={item.CardTitle} className="flex flex-col items-center">
                <div>
                  <Image
                    src={item.ImageSrc}
                    alt={item.CardTitle}
                    width={48}
                    height={48}
                  />
                </div>
                <p className="mt-2 text-center max-w-[132px]">
                  {item.CardTitle}
                </p>
              </div>
            ))}
          </div>
          <div className="my-16 flex justify-center">
            <Button>Empieza a usar Legalo</Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1340px] bg-lg-lawyer border border-black flex mb-16 flex-wrap">
        <div className="p-6 lg:p-12 lg:w-[55%]">
          <h3 className="font-tiempos text-4xl lg:text-5xl">
            Tu abogado de confianza:
          </h3>
          <h2 className="font-tiempos text-4xl lg:text-5xl italic mb-8">
            La misión de Legalo
          </h2>
          <p>
            En LEGALO, nuestra misión es clara: crear un espacio donde abogados,
            bachilleres y estudiantes puedan ejercer de manera flexible, generar
            ingresos adicionales y lograr un equilibrio entre su vida
            profesional y personal. No se trata de trabajar más, sino de
            trabajar mejor, aprovechando nuestras habilidades y conectando de
            manera auténtica con los clientes, quienes buscan más que una
            solución legal: buscan un aliado que los entienda y en quien puedan
            confiar. <br />
            <br />
            Nos enfocamos en el crecimiento de nuestra comunidad profesional
            para hacer realidad esta misión. Queremos que los abogados y futuros
            abogados tengan la libertad de explorar nuevas formas de trabajo y
            aprendizaje, fortaleciendo sus capacidades y desarrollando sus
            carreras.
          </p>
        </div>
        <div className="lg:w-[45%]">
          <Image
            src="/assets/img-nosotros-2.jpg"
            alt="img"
            width={800}
            height={450}
            className="h-full object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NosotrosPage;
