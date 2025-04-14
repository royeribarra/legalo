"use client";

import Header from "@/components/Header";

import React, { useState } from "react";

import Footer from "@/components/Footer";
import Link from "next/link";

const PoliticaPrivacidad = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("lawyer");

  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };
  return (
    <div>
      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      <div>
        <div className="p-8 max-w-[1300px] mx-auto">
          <h1 className="text-4xl lg:text-6xl font-nimbus my-8">
          Política de Privacidad de LEGALO
          </h1>
          <p>LEGALO, operado por LEGALO S.A.C., con RUC 20611584220 y domicilio en: Jirón Bartolomé de las Casas 422, Surco, valora la privacidad de sus usuarios y se compromete a proteger sus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos la información en cumplimiento con la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, y su Reglamento, aprobado por el Decreto Supremo N° 016-2024-JUS y modificaciones.</p>

          <h2 className="font-bold mb-5 mt-5">I. Definiciones</h2>
          <p>Para fines de esta política:</p>
          <ol className="list-decimal ml-5">
              <li><strong className="font-bold">Datos personales:</strong> Información que permite identificar a una persona de manera directa o indirecta.</li>
              <li><strong className="font-bold">Titular de los datos:</strong> Persona natural cuyos datos son tratados por LEGALO.</li>
              <li><strong className="font-bold">Tratamiento de datos:</strong> Cualquier operación sobre datos personales, como recolección, almacenamiento, uso, transferencia o eliminación.</li>
              <li><strong className="font-bold">Responsable del Tratamiento:</strong> LEGALO, como titular de la base de datos personales.</li>
          </ol>

          <h2 className="font-bold mb-5 mt-5">II. Información que recopilamos</h2>
          <p>Se recopilan los siguientes tipos de datos personales:</p>
          <ol className="list-decimal ml-5">
              <li><strong className="font-bold">Datos de registro:</strong> Nombre completo, apellidos, DNI, correo electrónico, número de teléfono, ciudad o provincia.</li>
              <li><strong className="font-bold">Datos financieros:</strong> Información bancaria o de tarjetas de pago necesaria para procesar transacciones para la contratación del servicio.</li>
              <li><strong className="font-bold">Datos de uso:</strong> Información recopilada automáticamente, como dirección IP, páginas visitadas, tiempo de sesión y preferencias de navegación.</li>
              <li><strong className="font-bold">Datos sensibles:</strong> LEGALO no recopila, almacena ni trata datos sensibles, definidos conforme a la Ley N.º 29733, solo lo hará en casos estrictamente necesarios y con el consentimiento expreso e informado del titular.</li>
          </ol>
          <p>Toda información proporcionada debe ser verdadera, completa y exacta. LEGALO no se responsabiliza por inexactitudes en la información ingresada por los usuarios.</p>
          
          <h2 className="font-bold mb-5 mt-5">III. Veracidad de los Datos Personales</h2>
          <p>Los usuarios garantizan que los datos personales proporcionados son veraces, completos, exactos y actualizados. LEGALO no se hace responsable por la veracidad de los datos suministrados por los usuarios.</p>
          
          <h2 className="font-bold mb-5 mt-5">IV. Finalidad del Tratamiento de Datos</h2>
          <p>Tus datos personales serán tratados para las siguientes finalidades:</p>
          <ol className="list-decimal ml-5">
              <li><span className="font-bold">Provisión de servicios:</span> Facilitar la conexión entre clientes y abogados.</li>
              <li><span className="font-bold">Gestiones administrativas y contractuales:</span> Emisión de comprobantes, procesamiento de pagos y cumplimiento de nuestras obligaciones legales.</li>
              <li><span className="font-bold">Comunicaciones:</span> Enviar notificaciones, promociones, y encuestas para mejorar nuestros servicios.</li>
              <li><span className="font-bold">Análisis y mejora:</span> Evaluar y optimizar nuestra plataforma mediante el análisis de datos de uso.</li>
              <li><span className="font-bold">Cumplimiento normativo:</span> Atender requerimientos de las autoridades regulatorias.</li>
          </ol>
          
          <h2 className="font-bold mb-5 mt-5">V. Base Legal para el Tratamiento</h2>
          <ol className="list-decimal ml-5">
              <li><span className="font-bold">Consentimiento:</span> Otorgado al registrarte y aceptar los Términos y Condiciones del Servicio y la presente política.</li>
              <li><span className="font-bold">Relación contractual:</span> Para ejecutar y mantener los servicios ofrecidos.</li>
              <li><span className="font-bold">Obligaciones legales:</span> Cumplimiento de normativas aplicables.</li>
          </ol>
          
          <h2 className="font-bold mb-5 mt-5">VI. Plazo de Conservación de Datos</h2>
          <p>Conservaremos tus datos personales mientras:</p>
          <ol className="list-decimal ml-5">
              <li>Sea necesario para la prestación de nuestros servicios.</li>
              <li>Exista una relación contractual vigente.</li>
              <li>Estemos obligados a conservarlos por motivos legales o regulatorios.</li>
          </ol>
          
          <h2 className="font-bold mb-5 mt-5">VII. Medidas de Seguridad</h2>
          <p>Adoptamos medidas técnicas, administrativas y organizativas adecuadas para garantizar la seguridad de tus datos personales y prevenir accesos no autorizados, pérdida, alteración o divulgación.</p>
          
          <h2 className="font-bold">VIII. Derechos de los Titulares</h2>
          <ol className="list-decimal ml-5">
              <li><span className="font-bold">Acceso:</span> Conocer los datos personales que tratamos.</li>
              <li><span className="font-bold">Rectificación:</span> Solicitar la corrección de datos inexactos.</li>
              <li><span className="font-bold">Cancelación:</span> Solicitar la eliminación de tus datos cuando corresponda.</li>
              <li><span className="font-bold">Oposición:</span> Negarte al tratamiento de tus datos por motivos legítimos.</li>
              <li><span className="font-bold">Portabilidad:</span> Solicitar copia de tus datos en un formato estructurado y de uso común.</li>
          </ol>
          <p>Para ejercer tus derechos, contáctanos a: <a href="mailto:privacidad@legalo.pe">privacidad@legalo.pe</a></p>
          
          <h2 className="font-bold mb-5 mt-5">IX. Transferencia y Compartición de Datos</h2>
          <p>Tus datos podrán ser compartidos con:</p>
          <ol className="list-decimal ml-5">
              <li>Abogados, bachilleres o estudiantes registrados en LEGALO.</li>
              <li>Proveedores de servicios.</li>
              <li>Autoridades competentes.</li>
          </ol>
          
          <h2 className="font-bold mb-5 mt-5">X. Uso de Cookies y Tecnologías similares</h2>
          <p>LEGALO utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. Los usuarios pueden configurar sus navegadores para bloquear o eliminar cookies en cualquier momento.</p>
          
          <h2 className="font-bold mb-5 mt-5">XI. Actualizaciones de esta Política</h2>
          <p>LEGALO se reserva expresamente el derecho a modificar, actualizar o completar en cualquier momento la presente Política.</p>
          
          <h2 className="font-bold mb-5 mt-5">XII. Contacto</h2>
          <p>Si tienes preguntas o inquietudes, contáctanos al correo: <a href="mailto:privacidad@legalo.pe">privacidad@legalo.pe</a></p>
          
          <p className="mb-10"><strong>Fecha de última actualización:</strong> Febrero, 2025.</p>
          <Link href="https://legalo.s3.us-east-1.amazonaws.com/Legalo+-+Pol%C3%ADtica+de+Privacidad+2025.pdf" target="_blank">
            Descarga aquí.
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;
