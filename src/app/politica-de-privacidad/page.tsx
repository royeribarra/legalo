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
          <p>LEGALO, operado por LEGALO S.A.C., con RUC 20611584220 y domicilio en: Jirón Bartolomé de
          las Casas 422, Surco, valora la privacidad de sus usuarios y se compromete a proteger sus datos
          personales. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y
          protegemos la información en cumplimiento con la Ley N.º 29733, Ley de Protección de Datos
          Personales del Perú, y su Reglamento, aprobado por el Decreto Supremo N° 003-2013-JUS y
          modificaciones.</p>
          
          <h2>I. Definiciones: Para fines de esta política:</h2>
          <ul>
              <li><strong>Datos personales:</strong> Información que permite identificar a una persona de manera directa o indirecta.</li>
              <li><strong>Titular de los datos:</strong> Persona natural cuyos datos son tratados por LEGALO.</li>
              <li><strong>Tratamiento de datos:</strong> Cualquier operación sobre datos personales, como recolección,
              almacenamiento, uso, transferencia o eliminación.</li>
              <li><strong>Responsable del Tratamiento:</strong> LEGALO, como titular de la base de datos personales.</li>
          </ul>
          
          <h2>II. Información que recopilamos: Se recopilan los siguientes tipos de datos personales:</h2>
          <ul>
              <li><strong>Datos de registro:</strong>Nombre completo, apellidos, DNI, correo electrónico, número de
              teléfono, ciudad o provincia.</li>
              <li><strong>Datos financieros:</strong>  Información bancaria o de tarjetas de pago necesaria para procesar
              transacciones para la contratación del servicio.</li>
              <li><strong>Datos de uso:</strong>  Información recopilada automáticamente, como dirección IP, páginas
              visitadas, tiempo de sesión y preferencias de navegación.</li>
              <li><strong>Datos sensibles:</strong> LEGALO no recopila, almacena ni trata datos sensibles, definidos
conforme a la Ley N.º 29733, solo lo hará en casos estrictamente necesarios y con el
consentimiento expreso e informado del titular. En caso de requerirse por razones legales
o contractuales, se implementarán medidas de seguridad adecuadas para garantizar su
confidencialidad y protección.</li>
          </ul>
          
          <p>Toda información proporcionada debe ser verdadera, completa y exacta. LEGALO no se
          responsabiliza por inexactitudes en la información ingresada por los usuarios.</p>

          <h2>III. Veracidad de los Datos Personales</h2>
          <p>Los usuarios garantizan que los datos personales proporcionados son veraces, completos,
exactos y actualizados. LEGALO no se hace responsable por la veracidad de los datos
suministrados por los usuarios. En caso de detectarse información falsa, inexacta o
desactualizada, LEGALO podrá proceder con la suspensión o cancelación de la cuenta del
usuario y, si corresponde, notificar a las autoridades competentes.</p>
          
          <h2>IV. Finalidad del Tratamiento de Datos: Tus datos personales serán tratados para las siguientes
          finalidades:</h2>
          <ul>
              <li>Provisión de servicios: Facilitar la conexión entre clientes y abogados.</li>
              <li>Gestiones administrativas y contractuales: Emisión de comprobantes, procesamiento
              de pagos y cumplimiento de nuestras obligaciones legales.</li>
              <li>Comunicaciones: Enviar notificaciones, promociones, y encuestas para mejorar
              nuestros servicios</li>
              <li>Análisis y mejora: Evaluar y optimizar nuestra plataforma mediante el análisis de datos
              de uso.</li>
              <li>Cumplimiento normativo: Atender requerimientos de las autoridades regulatorias.</li>
          </ul>
          
          <h2>V. Base Legal para el Tratamiento:  El tratamiento de tus datos se sustenta en las siguientes
          bases legales:</h2>
          <ul>
              <li>Consentimiento: Otorgado al registrarte y aceptar los Términos y Condiciones del
              Servicio y la presente política.</li>
              <li>Relación contractual:  Para ejecutar y mantener los servicios ofrecidos.</li>
              <li>Obligaciones legales: Cumplimiento de normativas aplicables.</li>
          </ul>
          
          <h2>VI. Plazo de Conservación de Datos: Conservaremos tus datos personales mientras:</h2>
          <p>Conservaremos tus datos personales mientras...</p>
          <ol>
            <li>Sea necesario para la prestación de nuestros servicios.</li>
            <li>Exista una relación contractual vigente.</li>
            <li>Estemos obligados a conservarlos por motivos legales o regulatorios</li>
          </ol>
          
          <h2>VII. Medidas de Seguridad</h2>
          <p>Adoptamos medidas técnicas, administrativas y organizativas
adecuadas para garantizar la seguridad de tus datos personales y prevenir accesos no
autorizados, pérdida, alteración o divulgación. Los datos serán almacenados durante el
tiempo necesario para la prestación del servicio y cumplimiento normativo. Posteriormente,
serán eliminados conforme a la legislación vigente.</p>
          
          <h2>VIII. Derechos de los Titulares: De acuerdo con la normativa vigente, tienes los siguientes
          derechos:</h2>
          <ul>
              <li>Acceso: Conocer los datos personales que tratamos.</li>
              <li>Rectificación: Solicitar la corrección de datos inexactos.</li>
              <li>Cancelación: Solicitar la eliminación de tus datos cuando corresponda.</li>
              <li>Oposición: Negarte al tratamiento de tus datos por motivos legítimos.</li>
              <li>Portabilidad: Solicitar copia de tus datos en un formato estructurado y de uso común.</li>
          </ul>
          <p>Para ejercer tus derechos, contáctanos a: <a href="mailto:privacidad@legalo.pe">privacidad@legalo.pe</a></p>
          
          <h2>IX. Transferencia y Compartición de Datos: Tus datos podrán ser compartidos con:</h2>
          <ul>
              <li>Abogados y usuarios registrados en LEGALO: Para la gestión y
prestación de los servicios legales solicitados a través de la plataforma. La información
compartida se limitará a lo estrictamente necesario para el desarrollo del encargo legal.</li>
              <li>Proveedores de servicios: Para procesar pagos, alojar datos o brindar soporte técnico.</li>
              <li>Autoridades competentes: En cumplimiento de obligaciones legales.</li>
          </ul>

          <p>En caso de transferencias internacionales, garantizamos que se efectúen conforme a los
          requisitos legales aplicables.</p>
          
          <h2>X. Uso de Cookies y Tecnologías similares</h2>
          <p>LEGALO utiliza cookies y tecnologías similares para
mejorar la experiencia del usuario, personalizar el contenido y realizar análisis estadísticos
sobre el uso de la plataforma. Entre los tipos de cookies utilizadas se incluyen:</p>

          <ol>
            <li>Cookies esenciales: Necesarias para el funcionamiento básico de la plataforma.</li>
            <li>Cookies de análisis y rendimiento: Permiten evaluar el uso de la plataforma y mejorar la
            experiencia del usuario.</li>
            <li>Cookies de publicidad: Pueden utilizarse para mostrar anuncios personalizados en
            función de los intereses del usuario.</li>
          </ol>
          
          <p>Los usuarios pueden configurar sus navegadores para bloquear o eliminar cookies en
          cualquier momento; sin embargo, esto podría afectar el acceso a ciertas funcionalidades de
          LEGALO.</p>

          <h2>XI. Actualizaciones de esta Política</h2>
          <p> Legalo se reserva expresamente el derecho a modificar,
actualizar o completar en cualquier momento la presente Política. Cualquier modificación,
actualización o ampliación producida en la presente Política será inmediatamente publicada
en la plataforma de Legalo.</p>
          
          <h2>XII. Contacto</h2>
          <p>Si tienes preguntas o inquietudes, contáctanos al correo: <a href="mailto:privacidad@legalo.pe">privacidad@legalo.pe</a></p>
          
          <p><strong>Fecha de última actualización:</strong> Febrero, 2025.</p>
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
