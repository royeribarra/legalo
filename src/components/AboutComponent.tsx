import Image from "next/image";
import React from "react";

const AboutComponent = () => {
  return (
    <div className="">
      <div className="flex border-y border-black flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-[68%]  p-4 lg:pl-16 lg:py-20 py-10 3xl:py-28 lg:pr-20 3xl:pr-28 flex flex-col justify-center gap-4 lg:gap-8  border-r border-black">
          <div className="">
            <h2 className="font-tiempos text-3xl lg:text-5xl leading-[1.2]">
              Tu abogado de confianza:{" "}
            </h2>
            <h2 className="font-tiempos text-3xl lg:text-5xl leading-[1.2]">
              La historia de <span className="italic"> Legalo</span>
            </h2>
          </div>
          <p className="block text-lg 3xl:text-2xl">
            Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte. Encuentra al profesional ideal
            para tus necesidades legales y resuelve tu situación con confianza y
            rapidez. Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte.
          </p>
          <p className="block text-lg 3xl:text-2xl">
            Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte. Encuentra al profesional ideal
            para tus necesidades legales y resuelve tu situación con confianza y
            rapidez. Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte.
          </p>
        </div>

        <div className="w-full lg:w-[32%] ">
          <Image
            src="/assets/img-legalo-history.jpg"
            alt="img"
            width={459}
            height={484}
            className="w-full h-[200px] lg:h-full object-cover object-top"
          />
        </div>
      </div>
      <div className="flex border-b border-black bg-lg-client">
        <div className="w-[50%] lg:w-[68%]  border-r border-black py-8 p-4 lg:px-16 3xl:pr-28 flex flex-col justify-center">
          {" "}
          <h2 className="font-tiempos lg:text-4xl 3xl:text-5xl leading-[1.2] italic">
            “Publica tu caso hoy mismo y accede a una red de abogados
            especializados listos para ayudarte.”
          </h2>
        </div>
        <div className="w-[50%] lg:w-[32%] p-8 ">
          <div>
            <Image
              src="/assets/images/firma-evelyn.png"
              alt="img"
              width={130}
              height={60}
              className=""
            />
          </div>
          <div className="flex flex-col justify-center">
            <p>Evelyn Castro, </p>
            <p>Fundadora de Legalo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
