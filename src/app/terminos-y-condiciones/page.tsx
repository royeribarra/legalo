"use client";

import Header from "@/components/Header";

import React, { useState } from "react";

import Footer from "@/components/Footer";
import Link from "next/link";

const TerminosPage = () => {
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
            Términos y Condiciones de Uso de LEGALO
          </h1>
          <h2>Índice</h2>
          <ol className="list-decimal">
              <li>Introducción</li>
              <li>Acuerdo</li>
              <li>Identificación del Titular</li>
              <li>Definiciones</li>
              <li>Estructura y Rol de LEGALO</li>
              <li>Proceso de Registro</li>
              <li>Proceso de Encargo y Postulación</li>
              <li>Política de Facturación y Pagos</li>
              <li>Contrato entre Clientes y Abogados</li>
              <li>Resolución de Disputas</li>
              <li>Cancelación y Reembolsos</li>
              <li>Política de Privacidad</li>
              <li>Seguridad de la Información</li>
              <li>Prohibiciones y Políticas de Conducta</li>
              <li>Comentarios del Mercado y Contenido del Usuario</li>
              <li>Terminación</li>
              <li>Canal de Atención</li>
              <li>Propiedad Intelectual</li>
              <li>Impuestos</li>
              <li>Limitaciones de Responsabilidad y Exoneraciones</li>
              <li>Legislación Aplicable y Jurisdicción Competente</li>
          </ol>
          <div className="prose prose-lg text-gray-900">
            <h1 className="font-bold text-2xl">Términos y Condiciones de Uso de LEGALO</h1>
            
            <h2 className="font-bold text-xl mt-6">1. Introducción</h2>
            <p>
              Bienvenido a <strong>LEGALO</strong>. <strong>LEGALO S.A.C.</strong> es una sociedad constituida conforme a las leyes de Perú, 
              que ofrece servicios de intercambio y administración de información entre personas naturales y jurídicas que prestan servicios 
              profesionales (en adelante, los <strong>“Miembros”</strong>) y aquellas que los requieren (en adelante, los <strong>“Clientes”</strong>) 
              (en conjunto, los <strong>“Usuarios”</strong>).
            </p>
            <p>
              Además, <strong>LEGALO</strong> pone a disposición de los Usuarios herramientas tecnológicas e informáticas legales para facilitar la 
              contratación y prestación de servicios legales.
            </p>
            <p>
              <strong>Este documento establece los Términos y Condiciones de Uso (en adelante, los "TyCU"):</strong> que rigen el acceso y uso de la 
              plataforma <a href="https://www.legalo.pe" className="text-blue-600 underline">www.legalo.pe</a> (en adelante, la <strong>"Plataforma"</strong>), 
              y sus servicios asociados.
            </p>
            <p>
              <strong>LEGALO busca garantizar una experiencia confiable y profesional para todos sus Usuarios:</strong> Este compromiso se refleja en la 
              claridad y transparencia de las condiciones que regulan el uso de nuestra Plataforma.
            </p>
            <p>
              <strong>En caso de preguntas o comentarios sobre estos TyCU:</strong> puedes contactar a <strong>LEGALO</strong> a través de los canales de atención 
              establecidos.
            </p>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">2. Acuerdo</h2>
            
            <p>
              <strong>Al acceder, navegar o utilizar los servicios ofrecidos por LEGALO, aceptas y comprometes, sin reservas, a lo siguiente:</strong>
            </p>

            <ol className="list-decimal pl-6">
              <li>
                <strong>Este documento, junto con las políticas adicionales publicadas en la Plataforma, constituye un acuerdo legalmente vinculante entre tú y LEGALO.</strong> 
                Al registrarte, acceder o utilizar la Plataforma, confirmas que has leído, comprendido y aceptado cumplir con los presentes TyC.
              </li>
              <li>
                <strong>Este acuerdo aplica tanto a los Miembros como a los Clientes que utilizan la Plataforma para contratar o prestar servicios legales.</strong> 
                Si actúas en representación de una persona jurídica, declaras que cuentas con la capacidad y autorización necesarias para aceptar estos TyCU en su nombre.
              </li>
              <li>
                <strong>Los Usuarios deben tener capacidad legal para contratar, conforme a la legislación peruana.</strong> 
                Quedan excluidos aquellos que carezcan de dicha capacidad, los menores de edad y los Usuarios suspendidos o inhabilitados por LEGALO.
              </li>
              <li>
                <strong>LEGALO se reserva el derecho de actualizar estos TyCU en cualquier momento.</strong> 
                Las actualizaciones serán publicadas en la Plataforma y entrarán en vigor inmediatamente después de su difusión. 
                Tu uso continuo de los servicios de LEGALO tras dicha notificación constituye tu aceptación de las modificaciones. 
                Las modificaciones no afectarán servicios adquiridos previamente.
              </li>
              <li>
                <strong>El acceso y uso de la Plataforma están condicionados al cumplimiento de estos TyCU.</strong> 
                LEGALO se reserva el derecho de suspender o cancelar tu cuenta si incumples alguna de las disposiciones establecidas.
              </li>
              <li>
                <strong>Garantizas que toda la información proporcionada durante tu registro o uso de la Plataforma es verdadera, completa y actualizada.</strong> 
                La falsedad o inexactitud de la información será motivo para la suspensión de tu cuenta.
              </li>
              <li>
                <strong>LEGALO no garantiza la contratación de servicios entre Usuarios.</strong> 
                La aceptación de un Encargo o Proyecto depende exclusivamente de los acuerdos entre el Cliente y el Miembro.
              </li>
              <li>
                <strong>La información proporcionada en la Plataforma tiene fines exclusivamente informativos y no constituye asesoría legal.</strong> 
                LEGALO no actúa como representante legal ni garantiza los resultados de los servicios contratados entre Usuarios.
              </li>
              <li>
                <strong>Las políticas adicionales de LEGALO que se publiquen en la Plataforma forman parte integrante de este acuerdo</strong> 
                y también deben ser cumplidas por los Usuarios.
              </li>
            </ol>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">3. Identificación del Titular</h2>

            <ul className="list-disc pl-6">
              <li><strong>Titular:</strong> LEGALO S.A.C.</li>
              <li><strong>Registro Único del Contribuyente:</strong> 20611584220</li>
              <li><strong>Dirección:</strong> Jirón Bartolomé de las Casas 422, Surco.</li>
              <li><strong>Datos registrales:</strong> Partida Registral N°15406391 del Registro de Personas Jurídicas de Lima.</li>
              <li><strong>Contacto:</strong> xxxx@legalo.pe</li>
              <li><strong>Página Web:</strong> <a href="https://www.legalo.com" className="text-blue-600 underline">www.legalo.com</a></li>
            </ul>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">4. Definiciones</h2>

            <ol className="list-decimal pl-6">
              <li><strong>LEGALO:</strong> Se refiere a LEGALO S.A.C., sociedad constituida conforme a las leyes de Perú, que opera la Plataforma y actúa como intermediario entre Clientes y Miembros.</li>
              <li><strong>Plataforma:</strong> El sitio web <a href="https://www.legalo.pe" className="text-blue-600 underline">www.legalo.pe</a>, así como cualquier aplicación móvil, herramienta digital o servicio asociado que LEGALO ponga a disposición de los Usuarios.</li>
              <li><strong>Usuarios:</strong> Personas naturales o jurídicas que utilizan el Sitio Web, ya sean Clientes o Miembros.</li>
              <li><strong>Clientes:</strong> Personas naturales o jurídicas que utilizan la Plataforma para buscar, contratar y gestionar servicios legales ofrecidos por los Miembros.</li>
              <li><strong>Miembros:</strong> Abogados, bachilleres o estudiantes registrados en la Plataforma, en el caso de los abogados debidamente colegiados y habilitados, que ofrecen sus servicios profesionales a través de LEGALO.</li>
              <li><strong>Encargo o Proyecto:</strong> Solicitud específica de servicios legales publicada por un Cliente en la Plataforma, la cual puede ser aceptada por un Miembro.</li>
              <li><strong>TyCU:</strong> Los presentes Términos y Condiciones de Uso, que regulan el acceso, uso y operación de la Plataforma.</li>
              <li><strong>Cuenta:</strong> El perfil personal e intransferible creado por los Usuarios para acceder y utilizar los servicios de LEGALO.</li>
              <li><strong>Contenido del Usuario:</strong> Información, documentos o cualquier tipo de material que los Usuarios publiquen, suban o compartan a través de la Plataforma.</li>
              <li><strong>Comisión de LEGALO:</strong> Porcentaje que LEGALO retiene de los pagos realizados por los Clientes a los Miembros como contraprestación por el uso de la Plataforma.</li>
              <li><strong>Canal de Atención:</strong> Los medios proporcionados por LEGALO para la comunicación con los Usuarios, incluyendo correo electrónico, chat en línea y aplicaciones como WhatsApp.</li>
              <li><strong>Servicio de Mediación:</strong> Proceso interno gestionado por LEGALO para resolver disputas entre Clientes y Miembros, siguiendo las etapas descritas en la sección de Resolución de Disputas.</li>
              <li><strong>Propuesta o contrapropuesta:</strong> Oferta enviada por un Miembro al Cliente para resolver o asesorar en un Encargo o Proyecto.</li>
            </ol>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">5. Estructura y Rol de LEGALO</h2>
            <ol className="list-decimal ml-5">

            
            <li>LEGALO es un marketplace jurídico que conecta a Clientes con Miembros. A través de la Plataforma, los Clientes pueden buscar, contactar y contratar servicios legales de manera eficiente.</li>

            <li>LEGALO actúa exclusivamente como una plataforma digital que facilita la conexión entre Clientes y Miembros. LEGALO no presta servicios legales ni actúa como representante, asesor o abogado de los Usuarios.</li>

            <li>LEGALO pone a disposición de los Usuarios herramientas digitales para publicar, buscar, contratar y gestionar servicios legales. Estas herramientas incluyen, pero no se limitan a:</li>
            <ul className="list-disc pl-6">
              <li>Publicación de encargos o proyectos legales.</li>
              <li>Comunicación entre Clientes y Miembros.</li>
              <li>Gestión de pagos entre las partes.</li>
            </ul>

            <li>LEGALO no forma parte de la relación contractual entre Clientes y Miembros. Los términos y condiciones de cada Encargo o Proyecto son acordados directamente entre las partes.</li>

            <li>LEGALO no garantiza la calidad, idoneidad o resultados de los servicios legales prestados por los Miembros, ni la solvencia o veracidad de los Clientes. Cada Usuario es responsable de verificar la información proporcionada por la contraparte.</li>

            <li>LEGALO ofrece servicios administrativos y tecnológicos para gestionar la publicación de Proyectos, la comunicación entre las partes y la custodia de los pagos, según lo descrito en la Política de Facturación y Pagos.</li>

            <li>LEGALO ofrece un servicio de gestión administrativa que facilita la facturación y el manejo de pagos entre Miembros y Clientes. En este proceso, LEGALO brinda el servicio de facturación y gestión de pago, para lo cual se encarga de emitir las boletas o facturas por el servicio prestado por el Miembro correspondiente, actuando exclusivamente como intermediario.</li>

            <li>LEGALO no se responsabiliza por los honorarios pactados directamente entre el Cliente y el Miembro fuera de la plataforma. Además, podrá suspender o cancelar cuentas en caso de detectar intentos de evadir las comisiones gestionando pagos fuera del sistema o por cualquier tipo de fraude que se pueda efectuar.</li>

            <li>En caso de disputas entre Usuarios, LEGALO podrá actuar como mediador según los términos establecidos en la sección de Resolución de Disputas, sin que esto implique una obligación legal o judicial.</li>
            </ol>
          </div>


          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">6. Proceso de Registro</h2>

            <p>El registro en LEGALO es un paso obligatorio para acceder a los servicios de la Plataforma. A continuación, se describen los pasos y requisitos específicos para Clientes y Miembros:</p>

            <h3 className="font-bold text-lg mt-4">Paso 1: Selecciona tu perfil</h3>
            <p>Al acceder a LEGALO, deberás elegir entre las siguientes opciones según tu rol:</p>
            <ul className="list-disc pl-6">
              <li>Soy un cliente, buscando contratar abogados.</li>
              <li>Soy abogado o estudiante, buscando oportunidades.</li>
            </ul>
            <p>Esta selección es importante para personalizar tu experiencia y acceder a las funciones correspondientes.</p>

            <h3 className="font-bold text-lg mt-4">Paso 2: Completa tu información</h3>
            <p><strong>Clientes:</strong></p>
            <ul className="list-disc pl-6">
              <li>Ingresar nombre completo, correo electrónico, número de contacto, y opcionalmente RUC si eres una empresa.</li>
            </ul>
            <p><strong>Abogados o estudiantes:</strong></p>
            <ul className="list-disc pl-6">
              <li>Ingresar nombre completo, correo electrónico, información académica, especialización(es) legal, experiencia profesional, habilidades, código de colegiatura en el caso de abogados y deberán subir documentos adicionales para la verificación de su perfil (como títulos profesionales, Certificado Único Laboral y CV).</li>
            </ul>

            <h3 className="font-bold text-lg mt-4">Paso 3: Verifica tu cuenta</h3>
            <p>Recibirás un correo electrónico con un enlace para confirmar tu cuenta. En el caso de los Miembros, para habilitar su cuenta deberán esperar la verificación de su información por parte de LEGALO, que puede tardar hasta 48 horas. Una vez finalizado el proceso, los Miembros recibirán un correo de confirmación para empezar a usar la plataforma.</p>
            <p>Para Clientes, la cuenta se habilitará una vez que concluya su proceso de registro.</p>

            <h3 className="font-bold text-lg mt-4">Políticas de validación y mantenimiento</h3>
            <ul className="list-disc pl-6">
              <li>LEGALO efectuará una verificación sobre los datos y documentos cargados por los Miembros que quieran registrarse a la Plataforma. De verificarse que la información es correcta, se admitirá su registro. En caso de alguna observación subsanable, LEGALO se comunicará al número celular registrado para completar el registro y la admisión posterior. En los casos en los que no se admita el registro, le llegará un correo indicando que no ha sido posible admitirlo.</li>
              <li>LEGALO posteriormente podrá realizar validaciones periódicas de la información proporcionada por los Usuarios para garantizar su vigencia y exactitud.</li>
              <li>Las cuentas que permanezcan inactivas por más de 12 meses serán desactivadas automáticamente. Los Usuarios podrán reactivarlas mediante un proceso de verificación simplificado.</li>
              <li>LEGALO se reserva el derecho de eliminar cuentas inactivas junto con sus datos si no se solicitan dentro de un periodo adicional de 6 meses.</li>
            </ul>

            <h3 className="font-bold text-lg mt-4">Responsabilidad del Usuario</h3>
            <ul className="list-disc pl-6">
              <li>Los Usuarios son responsables de la veracidad y exactitud de la información proporcionada durante el registro.</li>
              <li>LEGALO no será responsable por los inconvenientes derivados de datos incorrectos, falsos o incompletos.</li>
              <li>En caso de acceso no autorizado, pérdida de credenciales o sospecha de uso indebido, el Usuario deberá notificarlo de inmediato a LEGALO.</li>
            </ul>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">7. Proceso de Encargo y Postulación</h2>

            <h3 className="font-semibold mt-4">Proceso para Clientes</h3>
            
            <h4 className="font-semibold mt-4">Paso 1: Publica tu encargo</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Define el servicio requerido: Selecciona entre opciones como asesoría legal, mediación, redacción de documentos legales, entre otros.</li>
              <li><strong>b)</strong> Detalla tu caso: Proporciona un título claro, una descripción completa del problema y los resultados esperados. Puedes adjuntar documentos relevantes que ayuden a explicar tu situación.</li>
              <li><strong>c)</strong> Establece tu presupuesto:
                <ul className="list-inside list-disc">
                  <li>Ingresa un monto fijo o un rango de precio que estés dispuesto a pagar. El sistema calculará automáticamente el IGV y lo incluirá en el monto final.</li>
                  <li>Si no tienes un presupuesto claro, puedes solicitar que los Miembros coticen por el encargo.</li>
                  <li>Selecciona el tipo de comprobante tributario que deseas recibir (boleta de venta o factura).</li>
                </ul>
              </li>
            </ul>
            <p>LEGALO revisará los encargos para asegurar que cumplan con los criterios mínimos de publicación, como claridad en la descripción y presupuestos realistas. Encargos que no cumplan con estas condiciones podrán ser rechazados.</p>

            <h4 className="font-semibold mt-4">Paso 2: Revisa postulaciones</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Una vez publicado el encargo, los Miembros interesados tendrán un plazo inicial de 2 días hábiles para postular. Este plazo podrá ser prorrogado por el Cliente según lo considere necesario.</li>
              <li><strong>b)</strong> Puedes revisar los perfiles de los Miembros, que incluirán:
                <ul className="list-inside list-disc">
                  <li>Información profesional (áreas de especialización, experiencia, certificaciones).</li>
                  <li>Opiniones y valoraciones de otros Clientes.</li>
                  <li>Respuestas a tu encargo, incluyendo aceptación del presupuesto, propuestas dentro del rango indicado o contrapropuestas.</li>
                  <li>Si solicitaste cotizaciones, podrás comparar precios y enfoques antes de tomar una decisión.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-4">Paso 3: Selecciona al Miembro</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Acepta la propuesta del Miembro que mejor se ajuste a tus necesidades y expectativas.</li>
              <li><strong>b)</strong> Al aceptar la propuesta, se genera automáticamente la relación contractual entre el Cliente y el Miembro. LEGALO custodiará el pago realizado por el Cliente mientras se ejecuta el servicio.</li>
            </ul>

            <h4 className="font-semibold mt-4">Paso 4: Aprueba el trabajo y libera el pago</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Una vez que el Miembro informe que ha completado el encargo, deberás revisar el trabajo entregado.</li>
              <li><strong>b)</strong> Tendrás un plazo de 5 días calendario para:
                <ul className="list-inside list-disc">
                  <li>Aprobar el trabajo, lo que liberará el pago al Miembro.</li>
                  <li>Realizar observaciones o presentar un reclamo en caso de inconformidades.</li>
                  <li>Si surgen inconvenientes, LEGALO intervendrá como mediador para resolver la disputa.</li>
                </ul>
              </li>
            </ul>

            <h3 className="font-semibold mt-6">Proceso para Miembros (Abogados o Estudiantes)</h3>

            <h4 className="font-semibold mt-4">Paso 1: Completa tu perfil profesional</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Proporciona información detallada sobre tus áreas de especialización, experiencia profesional y certificaciones.</li>
              <li><strong>b)</strong> Sube documentos como tu título profesional o certificado de colegiatura (para abogados colegiados).</li>
              <li><strong>c)</strong> Selecciona el tipo de comprobante que emitirás:
                <ul className="list-inside list-disc">
                  <li>Recibo por honorarios (máximo tres ocasiones antes de requerir factura).</li>
                  <li>Factura, obligatorio para Miembros recurrentes.</li>
                </ul>
              </li>
            </ul>
            <p>LEGALO podrá solicitar verificaciones adicionales de los documentos proporcionados, tanto al momento del registro como durante el uso de la Plataforma, para garantizar el cumplimiento de los requisitos.</p>

            <h4 className="font-semibold mt-4">Paso 2: Postula a encargos</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Explora los encargos publicados utilizando filtros como área de especialización, presupuesto y ubicación.</li>
              <li><strong>b)</strong> Postula a los proyectos que se alineen con tus habilidades. Puedes:
                <ul className="list-inside list-disc">
                  <li>Aceptar presupuestos fijos establecidos por el Cliente.</li>
                  <li>Presentar una contrapropuesta, ajustando el precio o condiciones del servicio.</li>
                  <li>Enviar una cotización personalizada en encargos sin presupuesto definido.</li>
                </ul>
              </li>
              <li><strong>c)</strong> Asegúrate de que tus propuestas incluyan:
                <ul className="list-inside list-disc">
                  <li>Detalles del enfoque que tomarás para abordar el encargo.</li>
                  <li>Un precio final que contemple el IGV.</li>
                  <li>Plazos claros para la entrega del servicio.</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold mt-4">Paso 3: Acepta el contrato y ejecuta el encargo</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Si eres seleccionado por el Cliente, recibirás una notificación en tu cuenta y correo registrado.</li>
              <li><strong>b)</strong> Deberás aceptar formalmente el encargo y el contrato generado automáticamente en la Plataforma.</li>
              <li><strong>c)</strong> Durante la ejecución del encargo, mantén comunicación constante con el Cliente para resolver dudas y compartir avances.</li>
            </ul>

            <h4 className="font-semibold mt-4">Paso 4: Recibe tu pago</h4>
            <ul className="list-disc pl-6">
              <li><strong>a)</strong> Una vez que el Cliente apruebe el trabajo entregado, LEGALO transferirá el monto correspondiente a tu cuenta registrada.</li>
              <li><strong>b)</strong> Si emites factura, recibirás el IGV correspondiente. Asegúrate de emitir tus comprobantes dentro del plazo de 5 días hábiles después de recibir el pago.</li>
            </ul>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">8. Política de Facturación y Pagos</h2>

            <h3 className="font-semibold mt-4">8.1. Introducción</h3>
            <p>LEGALO actúa como intermediario en la gestión de pagos entre Clientes y Miembros, garantizando la seguridad de las transacciones y el cumplimiento de las obligaciones fiscales que le competan.</p>

            <h3 className="font-semibold mt-4">8.2. Gestión de pagos</h3>
            
            <h4 className="font-semibold mt-4">a) Custodia de fondos</h4>
            <ul className="list-disc pl-6">
              <li>Todos los pagos realizados por los Clientes serán transferidos a la cuenta de LEGALO y custodiados hasta la finalización del servicio.</li>
              <li>Una vez que el Miembro informe a través de su dashboard que ha completado la tarea, el Cliente tendrá un plazo de 5 días calendario para confirmar que el servicio se ha cumplido.</li>
              <li>Si el Cliente hace una observación dentro de este plazo, LEGALO se comunicará tanto con el Cliente como con el Miembro para analizar la situación, resolver cualquier discrepancia y garantizar el cumplimiento del servicio.</li>
              <li>Si no hay objeciones del Cliente dentro del plazo establecido, LEGALO procederá al día siguiente hábil a transferir el monto al Miembro, descontando la comisión de LEGALO y el IGV correspondiente.</li>
            </ul>
            
            <h4 className="font-semibold mt-4">b) Pagos por hitos</h4>
            <ul className="list-disc pl-6">
              <li>Aunque la mayoría de los proyectos tendrán un único pago, en los casos de litigios, los pagos se dividirán en hasta 4 hitos definidos por el abogado.</li>
              <li>El pago por cada hito se liberará tras la confirmación del cumplimiento del trabajo asociado al hito correspondiente.</li>
            </ul>

            <h4 className="font-semibold mt-4">c) Reclamos durante la ejecución</h4>
            <ul className="list-disc pl-6">
              <li>Durante el plazo de ejecución del contrato de servicio y hasta antes de concluir el plazo de 5 días calendario para dar su conformidad por el servicio, el Cliente puede comunicarse con LEGALO para presentar cualquier reclamo relacionado con la calidad o el cumplimiento del servicio.</li>
              <li>LEGALO evaluará el reclamo y, si corresponde, iniciará el procedimiento de resolución de disputas, según lo descrito en los presentes Términos y Condiciones.</li>
            </ul>

            <h3 className="font-semibold mt-6">8.3. Comisión de LEGALO</h3>
            <p>LEGALO retendrá una comisión del 20% sobre el monto total del servicio acordado entre el Cliente y el Miembro. En un futuro, esta comisión podrá variar con la implementación de planes de suscripción. Cualquier cambio será informado previamente en la Plataforma.</p>

            <h3 className="font-semibold mt-4">8.4. Inclusión del IGV</h3>
            <p>En los montos establecidos por el Cliente se incluye el IGV correspondiente, el cual se suma al presupuesto inicial definido.</p>

            <h3 className="font-semibold mt-4">8.5. Emisión de factura</h3>
            <p>LEGALO emitirá la factura al Cliente en nombre de LEGALO como prestador del servicio de intermediación y gestión. Los Miembros serán responsables de emitir sus comprobantes (factura o recibo por honorarios) a LEGALO por los montos transferidos, incluyendo los impuestos correspondientes.</p>

            <h3 className="font-semibold mt-4">8.6. Plazo para emitir factura</h3>
            <p>Los Miembros deberán emitir facturas al momento de recibir el pago o, como máximo, dentro de los 3 días hábiles posteriores. Esto cumple con las disposiciones fiscales vigentes en Perú. Excepcionalmente, los Miembros podrán emitir recibos por honorarios en hasta tres ocasiones, después de las cuales será obligatorio emitir facturas.</p>

            <h3 className="font-semibold mt-4">8.7. Disputas de pagos</h3>
            <ul className="list-disc pl-6">
              <li>En caso de disputas relacionadas con pagos, LEGALO actuará como mediador siguiendo el procedimiento establecido en los Términos y Condiciones de Uso (TyCU).</li>
              <li>Los fondos permanecerán retenidos hasta que la disputa sea resuelta.</li>
              <li>Si no se llega a un acuerdo interno, los Usuarios podrán activar la cláusula de resolución de controversias incluida en el contrato estándar entre Cliente y Miembro.</li>
            </ul>

            <h3 className="font-semibold mt-4">8.8. Política de reembolsos</h3>
            <p><strong>Reembolsos totales y parciales:</strong></p>
            <ul className="list-disc pl-6">
              <li>Si el Cliente cancela el servicio antes de su inicio, LEGALO procesará un reembolso total del monto custodiado. Pueden existir descuentos por parte de la entidad bancaria.</li>
              <li>Si el trabajo ya ha iniciado, LEGALO verificará el porcentaje efectivamente completado. El monto correspondiente al trabajo realizado será transferido al Miembro, descontando la comisión e IGV, y el resto será reembolsado al Cliente.</li>
            </ul>
            
            <h4 className="font-semibold mt-4">Ejemplo de reembolso parcial:</h4>
            <ul className="list-disc pl-6">
              <li>Monto total pagado por el Cliente (incluye IGV): S/ 1,180 (S/ 1,000 + S/ 180 de IGV).</li>
              <li>Trabajo completado verificado: 50% (S/ 500 del monto base sin IGV).</li>
              <li>Comisión de LEGALO (20% sobre el monto trabajado): S/ 100.</li>
              <li>Monto neto transferido al abogado: S/ 400 (S/ 500 - S/ 100).</li>
              <li>Monto reembolsado al Cliente (por el trabajo no realizado): S/ 590 (proporcional al 50% no trabajado, incluye IGV: S/ 500 + S/ 90).</li>
            </ul>

            <h3 className="font-semibold mt-4">8.9. Plazo de procesamiento de reembolsos</h3>
            <p>LEGALO procesará todos los reembolsos aprobados en un plazo máximo de 10 días hábiles desde la decisión final sobre la disputa.</p>
          </div>

          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">9. Contrato entre Clientes y Abogados</h2>

            <p><strong>9.1. Contrato Estándar</strong><br />
            LEGALO pone a disposición un contrato estándar que será aplicable a todas las contrataciones realizadas a través de la Plataforma. Este contrato contiene cláusulas generales predefinidas que regulan la relación entre Clientes y Miembros, proporcionando claridad y consistencia.</p>

            <p><strong>9.2. Componentes del Contrato Estándar</strong><br />
            El contrato estándar incluye dos componentes principales:
            <ul className="list-disc pl-6">
                <li><strong>Cláusulas Estándar</strong>: Aplicables a todas las contrataciones, estableciendo derechos, obligaciones, plazos y términos generales.</li>
                <li><strong>Ficha de Contratación (Anexo)</strong>: Este documento es generado automáticamente en la Plataforma al completar el proceso de contratación. Contiene los datos específicos del encargo, tales como:
                    <ul className="list-disc pl-6">
                        <li>Identificación de las partes (Cliente y Miembro).</li>
                        <li>Descripción detallada del encargo.</li>
                        <li>Plazo para la ejecución del servicio.</li>
                        <li>Honorarios acordados (incluyendo IGV, si corresponde).</li>
                    </ul>
                </li>
            </ul>
            </p>

            <p><strong>9.3. Términos Adicionales</strong><br />
            Las partes tienen la opción de acordar términos adicionales al contrato estándar según sus necesidades específicas, los cuales no pueden contravenir las condiciones pactadas en la Plataforma. LEGALO no supervisará, revisará ni tendrá injerencia en estos términos adicionales. Las partes serán las únicas responsables de su cumplimiento y validez.</p>

            <p><strong>9.4. Transferencia de Derechos sobre los Entregables</strong><br />
            Salvo que se acuerde lo contrario entre las partes, el Miembro transferirá al Cliente los derechos sobre los entregables realizados bajo el contrato, una vez completado el servicio y recibido el pago correspondiente. La transferencia de derechos deberá estar en conformidad con las leyes aplicables y los acuerdos específicos entre las partes.</p>

            <p><strong>9.5. Rol de LEGALO en la Contratación</strong><br />
            LEGALO actúa exclusivamente como facilitador del contrato estándar y de la Ficha de Contratación, que se generan automáticamente al aceptar un encargo en la Plataforma. LEGALO no es parte en el acuerdo entre el Cliente y el Miembro.</p>

            <p><strong>9.6. Acceso al Contrato</strong><br />
            Una copia del contrato estándar, junto con la Ficha de Contratación, quedará almacenada en la Plataforma y estará disponible para consulta por ambas partes en cualquier momento.</p>

            <p><strong>9.7. Conservación de Documentos</strong><br />
            LEGALO conservará los documentos relacionados con el encargo durante el tiempo estipulado en su política de privacidad y de acuerdo con las leyes aplicables.</p>
          </div>


          <div className="prose prose-lg text-gray-900">
            <h2 className="font-bold text-xl mt-6">10. Resolución de Disputas</h2>

            <p><strong>10.1. Mediación de Disputas</strong><br />
            LEGALO asumirá la mediación de disputas como un procedimiento interno aplicable a todos los casos, sin costos adicionales para las partes involucradas. Este proceso busca resolver conflictos de manera ágil y eficiente.</p>

            <p><strong>a) Inicio de la Disputa</strong><br />
            <ul className="list-disc pl-6">
                <li><strong>Solicitud de Mediación</strong>: 
                    <ul className="list-disc pl-6">
                        <li>El Cliente deberá comunicar su solicitud de intervención a través del canal oficial de atención de LEGALO (WhatsApp).</li>
                        <li>Se proporcionará un formato en el que deberá detallar los motivos de su inconformidad y, de ser posible, adjuntar evidencia relevante, como capturas de pantalla, documentos y comunicaciones.</li>
                    </ul>
                </li>
                <li><strong>Notificación al Miembro (Abogado)</strong>: 
                    <ul className="list-disc pl-6">
                        <li>LEGALO notificará al Miembro sobre la disputa. Este tendrá un plazo de 3 días hábiles para responder, presentando sus argumentos y evidencia.</li>
                    </ul>
                </li>
                <li><strong>Revisión de la Disputa</strong>: 
                    <ul className="list-disc pl-6">
                        <li>LEGALO analizará los argumentos y pruebas presentadas por ambas partes. Podrá solicitar pruebas adicionales si lo considera necesario para una resolución justa.</li>
                        <li>LEGALO podrá revisar el contenido entregado por el Miembro para verificar el cumplimiento de los términos pactados.</li>
                    </ul>
                </li>
                <li><strong>Entrega de evidencia adicional</strong>: 
                    <ul className="list-disc pl-6">
                        <li>Ambas partes tendrán un plazo adicional de 3 días hábiles, desde la fecha de presentación del reclamo o descargos, para aportar pruebas relevantes adicionales.</li>
                    </ul>
                </li>
            </ul>
            </p>

            <p><strong>b) Resolución Final</strong><br />
            <ul className="list-disc pl-6">
                <li><strong>Decisión Final</strong>: 
                    <ul className="list-disc pl-6">
                        <li>LEGALO emitirá una decisión final dentro de un plazo máximo de 10 días hábiles desde el inicio de la disputa.</li>
                        <li>La resolución será comunicada a ambas partes a través de WhatsApp o correo electrónico registrado en la Plataforma.</li>
                    </ul>
                </li>
                <li><strong>Devoluciones de dinero</strong>: 
                    <ul className="list-disc pl-6">
                        <li>En caso de que la decisión implique la devolución de dinero al Cliente, la comisión de LEGALO será ajustada proporcionalmente al monto devuelto.</li>
                    </ul>
                </li>
                <li><strong>Carácter vinculante</strong>: 
                    <ul className="list-disc pl-6">
                        <li>Las decisiones tomadas por LEGALO serán vinculantes para ambas partes, salvo que una de ellas decida recurrir a la cláusula de solución de controversias contenida en el contrato celebrado entre ellas.</li>
                    </ul>
                </li>
            </ul>
            </p>

            <p><strong>10.2. Escalamiento a Arbitraje o Tribunales</strong><br />
            En caso de que la mediación interna no resuelva el conflicto, cualquiera de las partes podrá recurrir al arbitraje conforme a lo establecido en el Contrato de servicio. En caso de arbitraje, la jurisdicción será la del domicilio del Cliente.</p>

            <p><strong>10.3. Costos de Resolución de Disputas</strong><br />
            <ul className="list-disc pl-6">
                <li>La mediación interna realizada por LEGALO no generará costos adicionales para las partes.</li>
                <li>Los costos del arbitraje o del proceso judicial serán asumidos por la parte que recurra a ellos, salvo que el árbitro o juez disponga lo contrario.</li>
            </ul>
            </p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">11. Cancelación y Reembolsos</h2>

          <p><strong>11.1. Política de Cancelación</strong><br />
          <ul className="list-disc pl-6">
              <li>El Cliente puede cancelar un encargo antes de que el Miembro lo acepte sin penalización alguna. En este caso, se reembolsará el monto completo.</li>
              <li>Una vez aceptado, cualquier cancelación estará sujeta a las condiciones pactadas entre el Cliente y el Miembro, y siempre se cobrará por el trabajo efectivamente realizado.</li>
          </ul>
          </p>

          <p><strong>11.2. Cancelación por el Miembro</strong><br />
          <ul className="list-disc pl-6">
              <li>Si el Miembro decide no completar un encargo tras haberlo aceptado, debe notificar inmediatamente al Cliente y a LEGALO.</li>
              <li>LEGALO mediará para buscar un reemplazo adecuado, sujeto a la aceptación del Cliente.</li>
          </ul>
          </p>

          <p><strong>11.3. Cancelaciones Reiteradas</strong><br />
          LEGALO se reserva el derecho de penalizar a Clientes o Miembros que realicen cancelaciones reiteradas sin justificación válida.</p>

          <p><strong>11.4. Política de Reembolsos</strong><br />
          <ul className="list-disc pl-6">
              <li>Si el Cliente cancela el encargo antes de que el Miembro lo acepte, se reembolsará el monto completo.</li>
              <li>Si el Miembro no cumple con el servicio según lo acordado, LEGALO reembolsará al Cliente el monto correspondiente al servicio no cumplido, previa verificación.</li>
              <li>En caso de reclamos, LEGALO verificará el trabajo realizado y determinará si corresponde aplicar la comisión y en qué proporción.</li>
              <li>Se aplicará un gasto administrativo equivalente al 5% del monto aprobado para cubrir costos de gestión.</li>
              <li>LEGALO determinará el porcentaje del trabajo completado y aprobará un reembolso proporcional.</li>
              <li>Esta política no afecta el derecho del Cliente a solicitar mediación en caso de desacuerdo sobre el porcentaje de trabajo completado.</li>
              <li>LEGALO procesará todos los reembolsos aprobados dentro de un plazo máximo de 10 días hábiles desde la decisión final.</li>
              <li>Cualquier gasto adicional asociado a la transferencia bancaria para el reembolso será descontado del monto devuelto.</li>
          </ul>
          </p>

          <p><strong>11.5. Plazos de Pago</strong><br />
          <ul className="list-disc pl-6">
              <li>LEGALO realizará los pagos al Miembro dentro de los 5 días hábiles posteriores a la aprobación del encargo por parte del Cliente.</li>
              <li>Los pagos se realizarán mediante transferencia bancaria a una cuenta registrada a nombre del abogado. No se realizarán transferencias a cuentas de terceros.</li>
              <li>En casos de fuerza mayor, los plazos de pago podrán ajustarse para garantizar el cumplimiento conforme a lo establecido en los TyCU.</li>
          </ul>
          </p>

          <p><strong>11.6. Condiciones Generales de Pago</strong><br />
          LEGALO se reserva el derecho de modificar estas políticas en cualquier momento, informando a los Usuarios mediante la plataforma. Al utilizar los servicios de LEGALO, los Usuarios aceptan cumplir con estas políticas.</p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">12. Política de Privacidad</h2>

          <p><strong>12.1. Recopilación de Datos</strong><br />
          LEGALO recopila datos personales de los Usuarios para garantizar el correcto funcionamiento de la Plataforma. Esto incluye:
          <ul className="list-disc pl-6">
              <li>Información proporcionada durante el registro (nombre, correo electrónico, número de contacto, DNI o RUC, entre otros), publicación del Encargo y postulación.</li>
              <li>Datos sobre transacciones realizadas en la Plataforma.</li>
              <li>Información recopilada mediante cookies y otras tecnologías de seguimiento.</li>
          </ul>
          </p>

          <p><strong>12.2. Uso de los Datos Personales</strong><br />
          Los datos personales recopilados serán utilizados para los siguientes fines:
          <ul className="list-disc pl-6">
              <li>Facilitar la conexión entre Clientes y Miembros.</li>
              <li>Verificar la identidad y datos de los Usuarios.</li>
              <li>Administrar transacciones y pagos.</li>
              <li>Mejorar la experiencia del usuario en la Plataforma.</li>
              <li>Cumplir con obligaciones legales.</li>
          </ul>
          </p>

          <p><strong>12.3. Compartición de Información</strong><br />
          LEGALO no compartirá información personal con terceros, excepto en los siguientes casos:
          <ul className="list-disc pl-6">
              <li>Cuando sea requerido por ley o por una autoridad competente.</li>
              <li>Cuando sea necesario para completar una transacción solicitada por el Usuario.</li>
              <li>Con proveedores de servicios que respaldan las operaciones de la Plataforma, sujetos a estrictas obligaciones de confidencialidad.</li>
          </ul>
          </p>

          <p><strong>12.4. Derechos sobre los Datos</strong><br />
          De acuerdo con las leyes aplicables, los Usuarios tienen los siguientes derechos sobre sus datos:
          <ul className="list-disc pl-6">
              <li><strong>Acceso:</strong> Solicitar una copia de sus datos personales almacenados.</li>
              <li><strong>Modificación:</strong> Rectificar errores o actualizar información.</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de su información, excepto cuando LEGALO deba conservarla por obligaciones legales.</li>
              <li><strong>Oposición:</strong> Negarse al tratamiento de sus datos para fines específicos.</li>
          </ul>

          <strong>Proceso:</strong>
          <ul className="list-disc pl-6">
              <li>Las solicitudes podrán realizarse a través de un correo electrónico designado o un formulario específico en la plataforma.</li>
              <li>LEGALO responderá a las solicitudes en un plazo de 15 días hábiles, previa validación de la identidad del solicitante.</li>
          </ul>
          </p>

          <p><strong>12.5. Medidas de Seguridad</strong><br />
          LEGALO implementará las siguientes medidas para proteger la información de los Usuarios:
          <ul className="list-disc pl-6">
              <li><strong>Encriptación:</strong>
                  <ul className="list-disc pl-6">
                      <li>Uso de protocolos HTTPS para la transmisión de datos.</li>
                      <li>Cifrado de información sensible almacenada en los servidores de AWS.</li>
                  </ul>
              </li>
              <li><strong>Acceso limitado:</strong>
                  <ul className="list-disc pl-6">
                      <li>Permisos estrictos para acceder a la base de datos, restringidos al personal autorizado.</li>
                  </ul>
              </li>
              <li><strong>Contraseñas seguras:</strong>
                  <ul className="list-disc pl-6">
                      <li>Uso de algoritmos robustos como bcrypt para encriptar contraseñas.</li>
                  </ul>
              </li>
              <li><strong>Auditorías de seguridad:</strong>
                  <ul className="list-disc pl-6">
                      <li>Realización de pruebas periódicas para identificar y solucionar vulnerabilidades en la plataforma.</li>
                  </ul>
              </li>
          </ul>
          </p>

          <p><strong>12.6. Almacenamiento de Datos</strong><br />
          Los datos serán almacenados en servidores de Amazon Web Services (AWS), ubicados en regiones que cumplen con estándares internacionales de seguridad y protección de datos.</p>

          <p><strong>12.7. Uso de Cookies y Tecnologías de Seguimiento</strong><br />
          LEGALO utiliza cookies y tecnologías de seguimiento para mejorar la experiencia de los Usuarios en la Plataforma. Estas herramientas permiten personalizar los servicios y recopilar información sobre cómo se utiliza el Sitio Web. Las cookies empleadas incluyen:
          <ul className="list-disc pl-6">
              <li><strong>Cookies funcionales:</strong> Necesarias para el correcto funcionamiento de la Plataforma y la autenticación de Usuarios.</li>
              <li><strong>Cookies analíticas:</strong> Ayudan a comprender cómo los Usuarios interactúan con el Sitio Web, permitiendo mejorar su funcionalidad.</li>
              <li><strong>Cookies de personalización:</strong> Facilitan la adaptación de la experiencia según las preferencias del Usuario.</li>
          </ul>
          </p>

          <p><strong>12.8. Configuración de Cookies</strong><br />
          Los Usuarios pueden configurar su navegador para rechazar cookies o notificarlas, pero esto podría limitar ciertas funcionalidades de la Plataforma. Para obtener más información sobre cómo se utilizan las cookies, consulta la Política de Cookies disponible en la Plataforma.</p>

          <p><strong>12.9. Modificaciones de la Política de Privacidad</strong><br />
          LEGALO se reserva el derecho de actualizar esta política en cualquier momento. Los cambios serán comunicados a través de la plataforma y entrarán en vigor desde su publicación. El uso continuo de los servicios implica la aceptación de las modificaciones.</p>
        </div>

        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">13. Seguridad de la Información</h2>

          <p><strong>13.1. Medidas de Seguridad</strong><br />
          LEGALO emplea medidas de seguridad técnicas, administrativas y organizativas para proteger la información personal de los Usuarios, incluidos los datos sensibles, contra accesos no autorizados, uso indebido, pérdida o destrucción. Entre estas medidas se incluyen:
          <ul className="list-disc pl-6">
              <li>Encriptación de datos durante la transmisión y el almacenamiento.</li>
              <li>Control de acceso restringido únicamente a personal autorizado.</li>
              <li>Monitoreo constante de la plataforma para detectar y prevenir amenazas de seguridad.</li>
          </ul>
          </p>

          <p><strong>13.2. Responsabilidad de los Usuarios</strong><br />
          Los Usuarios también tienen un rol activo en garantizar la seguridad de su información:
          <ul className="list-disc pl-6">
              <li>Los Usuarios no deben compartir sus credenciales de acceso con terceros y deben mantenerlas protegidas.</li>
              <li>Los Usuarios son responsables del uso adecuado de su cuenta y deben implementar medidas adicionales, como contraseñas seguras y software actualizado, para proteger su información.</li>
              <li>Los Usuarios deberán informar inmediatamente a LEGALO cualquier acceso no autorizado o sospecha de actividad fraudulenta en sus cuentas.</li>
          </ul>
          </p>

          <p><strong>13.3. Limitaciones de Responsabilidad</strong><br />
          LEGALO realiza esfuerzos razonables para garantizar la seguridad de la Plataforma; sin embargo, no puede garantizar protección absoluta en todos los casos. LEGALO no será responsable por brechas de seguridad derivadas de:
          <ul className="list-disc pl-6">
              <li>Ataques externos: Como ciberataques o vulnerabilidades en los sistemas de terceros proveedores.</li>
              <li>Uso indebido por parte de los Usuarios: Incluyendo la divulgación de credenciales o uso de dispositivos no seguros.</li>
              <li>Factores fuera del control de LEGALO: Como desastres naturales o eventos de fuerza mayor.</li>
          </ul>
          </p>

          <p><strong>13.4. Tratamiento de Datos Sensibles</strong><br />
          LEGALO reconoce que algunos datos proporcionados por los Usuarios, como documentos legales o información personal confidencial, pueden ser de carácter sensible. Estos datos serán tratados bajo estrictas normas de confidencialidad y utilizados únicamente para los fines indicados en la plataforma, salvo autorización expresa del Usuario o requerimiento legal.</p>

          <p><strong>13.5. Protección contra Virus y Malware</strong><br />
          LEGALO implementa medidas para garantizar que el Sitio Web esté libre de virus, malware u otros elementos dañinos. Sin embargo:
          <ul className="list-disc pl-6">
              <li>LEGALO no asume responsabilidad alguna por el conocimiento que puedan obtener terceros sobre el uso del Sitio Web por parte de los Usuarios.</li>
              <li>Los Usuarios son responsables de tomar precauciones adicionales, como el uso de software antivirus y la actualización de sus dispositivos.</li>
          </ul>
          </p>
        </div>

        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">14. Prohibiciones y Políticas de Conducta</h2>

          <p><strong>14.1. Uso Responsable de la Plataforma</strong><br />
          Todos los Usuarios de LEGALO deben utilizar la Plataforma de manera responsable, ética y alineada con su propósito de conectar a Clientes con profesionales legales. Cualquier acción que desvíe el uso de la Plataforma de este objetivo será considerada una violación de los TyCU.</p>

          <p><strong>14.2. Actividades Prohibidas</strong><br />
          LEGALO prohíbe estrictamente las siguientes actividades dentro de la Plataforma:
          <ul className="list-disc pl-6">
              <li>Publicar, solicitar u ofrecer servicios que contravengan la legislación peruana o internacional.</li>
              <li>Gestionar o solicitar pagos directamente entre Clientes y Miembros, evadiendo la intermediación de LEGALO.</li>
              <li>Proporcionar datos inexactos, incompletos o fraudulentos durante el registro o el uso de la Plataforma.</li>
              <li>Involucrarse en conductas ofensivas, discriminatorias, intimidantes o difamatorias hacia otros Usuarios o hacia LEGALO.</li>
              <li>Realizar actividades que comprometan la seguridad de la Plataforma, como intentos de hackeo, envío de virus o acceso no autorizado a datos.</li>
              <li>Transferir o vender cuentas de LEGALO a terceros sin autorización expresa.</li>
              <li>Publicar contenido falso, ambiguo, engañoso, ofensivo, ilegal o que infrinja derechos de terceros.</li>
              <li>Difundir información que dañe la reputación de LEGALO o de otros Usuarios de la Plataforma.</li>
          </ul>
          </p>

          <p><strong>14.3. Responsabilidad del Contenido</strong><br />
          Los Usuarios son responsables del contenido que publiquen, compartan o transmitan a través de la Plataforma. Esto incluye:
          <ul className="list-disc pl-6">
              <li>Garantizar que el contenido sea lícito, preciso y no infrinja derechos de terceros.</li>
              <li>Abstenerse de subir contenido que pueda ser considerado ofensivo, difamatorio, engañoso o que contravenga las leyes aplicables.</li>
          </ul>
          LEGALO no será responsable del contenido generado por los Usuarios, pero se reserva el derecho de eliminar cualquier contenido que viole estos TyCU o que sea reportado como inapropiado.
          </p>

          <p><strong>14.4. Sanciones por Violaciones</strong><br />
          LEGALO podrá aplicar las siguientes sanciones en caso de violaciones a las políticas establecidas:
          <ul className="list-disc pl-6">
              <li>Advertencias: En caso de infracciones leves, se enviará una notificación para corregir el comportamiento.</li>
              <li>Suspensión temporal: Restricción de acceso a la Plataforma por un período definido, mientras se investigan las infracciones.</li>
              <li>Cancelación de cuenta: En casos graves o reincidentes, LEGALO podrá cancelar permanentemente la cuenta del Usuario infractor.</li>
              <li>Retención de fondos: LEGALO podrá retener pagos pendientes si las infracciones están relacionadas con disputas o incumplimientos graves.</li>
              <li>LEGALO podrá realizar auditorías periódicas para garantizar el cumplimiento de estas políticas y los TyCU.</li>
          </ul>
          </p>

          <p><strong>14.5. Principios de Ética y Conducta Profesional</strong><br />
          Los Usuarios de LEGALO deben adherirse a los siguientes principios de ética y conducta profesional:
          <ul className="list-disc pl-6">
              <li><strong>Para Miembros (Abogados):</strong>
                  <ul className="list-inside list-disc pl-4">
                      <li>Cumplir con las normas éticas del ejercicio legal, los estándares de confidencialidad y actuar conforme a las buenas costumbres.</li>
                      <li>Proporcionar servicios con diligencia, honestidad y en los plazos acordados.</li>
                      <li>Respetar los derechos de propiedad intelectual y la confidencialidad de la información proporcionada por los Clientes.</li>
                  </ul>
              </li>
              <li><strong>Para Clientes:</strong>
                  <ul className="list-inside list-disc pl-4">
                      <li>Proporcionar información veraz sobre sus necesidades legales y garantizar que el contenido publicado en la Plataforma sea lícito, preciso y no infrinja derechos de terceros.</li>
                      <li>Respetar el trabajo y la dedicación de los Miembros.</li>
                      <li>Abstenerse de utilizar información o servicios obtenidos a través de la Plataforma con fines ilícitos o no autorizados.</li>
                  </ul>
              </li>
          </ul>
          </p>

          <p><strong>14.6. Resolución de Incidentes</strong><br />
          Los Usuarios podrán reportar conductas inapropiadas o violaciones a las políticas a través de los canales oficiales de atención de LEGALO. LEGALO investigará los reportes recibidos y tomará las medidas correctivas necesarias dentro de un plazo razonable. Todas las denuncias serán tratadas con estricta confidencialidad, protegiendo la identidad de los involucrados.</p>
        </div>

        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">15. Comentarios del Mercado y Contenido del Usuario</h2>

          <p><strong>15.1. Publicación de Calificaciones y Opiniones</strong><br />
          LEGALO permite a los Clientes publicar calificaciones, opiniones o testimonios sobre los servicios recibidos de los Miembros. Estas publicaciones deben:
          <ul className="list-disc pl-6">
              <li>Reflejar la experiencia directa y personal del Cliente con el Miembro.</li>
              <li>Ser objetivamente precisas, respetuosas y útiles para otros Usuarios.</li>
              <li>Basarse en hechos verificables, sin tergiversaciones, rumores o información falsa.</li>
          </ul>
          </p>

          <p><strong>15.2. Restricciones sobre Comentarios</strong><br />
          Los Usuarios solo podrán calificar o comentar sobre servicios que hayan contratado directamente a través de la Plataforma. LEGALO se reserva el derecho de eliminar comentarios que considere, a su sola discreción, que:
          <ul className="list-disc pl-6">
              <li>Violen estos TyCU.</li>
              <li>Contengan lenguaje difamatorio, ofensivo o contrario a las buenas costumbres.</li>
              <li>Sean irrelevantes o inconsistentes con el servicio evaluado.</li>
          </ul>
          </p>

          <p><strong>15.3. Apelación de Comentarios Negativos</strong><br />
          Los Miembros tienen derecho a apelar comentarios o calificaciones negativas dentro de un plazo de diez (10) días hábiles desde su publicación. El proceso es el siguiente:
          <ul className="list-disc pl-6">
              <li>Enviar un correo a LEGALO con el asunto "Apelación a comentario", detallando los motivos de la apelación.</li>
              <li>LEGALO revisará la solicitud y podrá modificar o eliminar el comentario si determina que incumple las políticas de uso.</li>
          </ul>
          </p>

          <p><strong>15.4. Licencia para el Uso de Comentarios</strong><br />
          Al aceptar estos TyCU, los Usuarios conceden a LEGALO una licencia gratuita, no exclusiva y transferible para utilizar sus comentarios, calificaciones y opiniones con fines publicitarios, promocionales o de mejora de servicios. Este uso no requerirá consentimiento adicional, pero siempre se garantizará la confidencialidad de los datos personales.</p>

          <p><strong>15.5. Requisitos para el Contenido Publicado</strong><br />
          El contenido publicado por los Usuarios en la Plataforma, como comentarios, mensajes y descripciones de servicios, debe cumplir con los siguientes requisitos:
          <ul className="list-disc pl-6">
              <li>No infringir derechos de terceros, incluidas las leyes de propiedad intelectual.</li>
              <li>No contener información falsa, ambigua, engañosa o difamatoria.</li>
              <li>Ser relevante y estar alineado con los fines de la Plataforma.</li>
          </ul>
          </p>

          <p><strong>15.6. Responsabilidad sobre el Contenido</strong><br />
          LEGALO no garantiza la veracidad, exactitud ni calidad del contenido publicado por los Usuarios. No obstante, se reserva el derecho de:
          <ul className="list-disc pl-6">
              <li>Eliminar contenido que viole estos TyCU.</li>
              <li>Suspender o cancelar cuentas de Usuarios que reiteradamente publiquen contenido inapropiado.</li>
          </ul>
          </p>

          <p><strong>15.7. Exoneración de Responsabilidad de LEGALO</strong><br />
          LEGALO no será responsable por el contenido publicado por los Usuarios. Los Usuarios aceptan que:
          <ul className="list-disc pl-6">
              <li>Pueden encontrarse con contenido que sea inexacto, incompleto, ofensivo o inapropiado.</li>
              <li>LEGALO no monitorea de forma proactiva todo el contenido, pero hará su mejor esfuerzo para responder a reportes de incumplimientos.</li>
          </ul>
          </p>

          <p><strong>15.8. Reporte de Contenido Inapropiado</strong><br />
          Los Usuarios tienen la opción de reportar contenido inapropiado a través de los canales de atención de LEGALO, quienes evaluarán el caso y tomarán las medidas correspondientes.</p>
        </div>

        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">16. Terminación</h2>

          <p><strong>16.1. Terminación por el Usuario</strong><br />
          Los Usuarios pueden dar por terminada su relación con LEGALO en cualquier momento, mediante la desactivación de su cuenta en la Plataforma. Para ello, deberán:
          <ul className="list-disc pl-6">
              <li>Notificar a LEGALO a través del Canal de Atención.</li>
              <li>Cumplir con cualquier obligación pendiente, incluyendo pagos o la finalización de encargos en curso.</li>
          </ul>
          </p>

          <p><strong>16.2. Responsabilidades Legales</strong><br />
          La desactivación de la cuenta no exime al Usuario de responsabilidades legales o fiscales derivadas de su uso previo de la Plataforma.</p>

          <p><strong>16.3. Rescisión del Acuerdo con Encargos Abiertos</strong><br />
          Si el Usuario intenta rescindir este Acuerdo mientras tiene uno o más encargos abiertos, acepta que:
          <ul className="list-disc pl-6">
              <li>LEGALO notificará al otro Usuario para resolver el contrato por incumplimiento.</li>
              <li>Continuará estando sujeto a estos TyCU hasta que todos los encargos sean cerrados en la Plataforma.</li>
              <li>LEGALO continuará prestando los servicios necesarios para completar cualquier transacción abierta.</li>
          </ul>
          </p>

          <p><strong>16.4. Pago de Monto Acumulado</strong><br />
          El Usuario deberá pagar cualquier monto acumulado pero no pagado a la fecha de rescisión.</p>

          <p><strong>16.5. Causas de Suspensión o Cancelación</strong><br />
          LEGALO podrá suspender o cancelar el acceso de un Usuario a la Plataforma en los siguientes casos:
          <ul className="list-disc pl-6">
              <li>Incumplimiento de los presentes TyCU.</li>
              <li>Realización de actividades ilícitas o prohibidas en la Plataforma.</li>
              <li>Uso fraudulento o inapropiado de las funcionalidades de la Plataforma.</li>
              <li>Inactividad de la cuenta por un periodo superior a 12 meses, sin respuesta a los intentos de contacto.</li>
              <li>Provisión de información falsa o engañosa.</li>
              <li>Acciones que puedan causar responsabilidad legal o afectar negativamente a la comunidad de Usuarios.</li>
          </ul>
          </p>

          <p><strong>16.6. Notificación de Terminación</strong><br />
          En caso de terminación, cuando sea posible, LEGALO notificará al Usuario con una explicación del motivo y otorgará un plazo para subsanar el incumplimiento antes de proceder con la cancelación definitiva.</p>

          <p><strong>16.7. Notificación a Otros Usuarios</strong><br />
          LEGALO se reserva el derecho de notificar a otros Usuarios involucrados en Contratos de Servicio sobre el estado de una cuenta cerrada, incluyendo los motivos del cierre, si lo considera necesario para la transparencia de las operaciones en la Plataforma.</p>

          <p><strong>16.8. Desactivación del Acceso</strong><br />
          Al momento de la terminación, se desactivará el acceso del Usuario a la cuenta y a cualquier contenido almacenado en la Plataforma.</p>

          <p><strong>16.9. Pagos Pendientes</strong><br />
          Los Miembros no recibirán pagos pendientes hasta que se resuelvan las obligaciones en curso o cualquier disputa abierta.</p>

          <p><strong>16.10. Conservación de Datos</strong><br />
          LEGALO conservará los datos del Usuario conforme a lo establecido en la Política de Privacidad y las leyes aplicables.</p>

          <p><strong>16.11. Notificación sobre la Cuenta Terminada</strong><br />
          LEGALO podrá notificar a otros Usuarios con los que el Usuario haya celebrado contratos sobre el estado de la cuenta terminada y los motivos del cierre, en conformidad con la ley.</p>

          <p><strong>16.12. Uso de Nueva Cuenta</strong><br />
          Si el Usuario intenta utilizar la Plataforma con una cuenta diferente tras el cierre de su cuenta, LEGALO podrá reclamar cualquier fondo disponible en dicha cuenta o negarse a procesar transacciones futuras.</p>

          <p><strong>16.13. Eliminación de Contenido</strong><br />
          Salvo que la ley exija lo contrario, si se cierra una cuenta, el Usuario ya no tendrá acceso a la información o el material almacenado en el sitio, y cualquier contenido asociado a su cuenta podrá eliminarse. LEGALO puede conservar parte o la totalidad de la información de la cuenta según lo permita o exija la normativa aplicable, como la Ley de Protección de Datos.</p>

          <p><strong>16.14. Términos Vigentes Tras la Baja</strong><br />
          Los términos de servicio que por su naturaleza contemplen el cumplimiento después de la baja de la cuenta seguirán vigentes y continuarán en pleno vigor y efecto. Por ejemplo: obligaciones tributarias, propiedad intelectual, entre otros.</p>

          <p><strong>16.15. Obligaciones Pendientes</strong><br />
          La terminación de este Acuerdo por cualquier motivo no libera al Usuario ni a LEGALO de ninguna obligación pendiente antes de la fecha de terminación.</p>

          <p><strong>16.16. Reactivación de Cuentas</strong><br />
          Los Usuarios cuyas cuentas hayan sido desactivadas podrán solicitar su reactivación mediante el Canal de Atención. LEGALO evaluará cada solicitud caso por caso y podrá exigir:
          <ul className="list-disc pl-6">
              <li>Evidencia de cumplimiento con los TyCU.</li>
              <li>Solución de cualquier incumplimiento previo.</li>
          </ul>
          </p>

          <p><strong>16.17. Derecho de Rechazo</strong><br />
          LEGALO se reserva el derecho de rechazar la reapertura de cuentas según su criterio razonable.</p>

          <p><strong>16.18. Responsabilidad de LEGALO</strong><br />
          LEGALO no será responsable por daños o perjuicios derivados de la terminación de cuentas, excepto en casos de negligencia grave o dolo por parte de LEGALO. La terminación no afectará los derechos adquiridos por las partes antes de su ejecución.</p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">17. Canal de Atención</h2>

          <p><strong>17.1. Servicios de Terceros</strong><br />
          LEGALO utiliza servicios de terceros como WhatsApp para la atención al cliente. Los Usuarios reconocen y aceptan las condiciones de uso de estas plataformas al utilizarlas como medio de contacto oficial. LEGALO no se hace responsable por fallas técnicas, interrupciones del servicio o vulneraciones de seguridad derivadas del uso de dichas plataformas.</p>

          <p><strong>17.2. Uso de WhatsApp</strong><br />
          Al aceptar estos TyCU, el Usuario reconoce y acepta el uso de la plataforma WhatsApp, servicio proporcionado por WhatsApp Ireland Limited, como Canal de Atención oficial de LEGALO.</p>

          <p><strong>17.3. Funcionalidad del Canal de Atención</strong><br />
          El Usuario podrá utilizar el Canal de Atención de LEGALO para:
          <ul className="list-disc pl-6">
              <li>Resolver dudas relacionadas con el uso de la Plataforma.</li>
              <li>Completar información de encargos publicados o en proceso de publicación.</li>
              <li>Informar incidencias relacionadas con los servicios prestados.</li>
              <li>Reportar disputas con Clientes o Miembros.</li>
          </ul>
          </p>

          <p><strong>17.4. Compromisos de LEGALO</strong><br />
          LEGALO se compromete a:
          <ul className="list-disc pl-6">
              <li>Proporcionar un medio eficiente y accesible para la comunicación con los Usuarios.</li>
              <li>Atender solicitudes en un plazo razonable, dentro del horario de atención establecido en la Plataforma.</li>
          </ul>
          </p>

          <p><strong>17.5. Responsabilidades del Usuario</strong><br />
          El Usuario deberá:
          <ul className="list-disc pl-6">
              <li>Asegurarse de proporcionar información clara y precisa al utilizar el Canal de Atención.</li>
              <li>Respetar las normas de cortesía y profesionalismo en sus comunicaciones.</li>
          </ul>
          </p>

          <p><strong>17.6. Actualizaciones del Canal de Atención</strong><br />
          LEGALO se reserva el derecho de actualizar los medios de contacto y condiciones del Canal de Atención según las necesidades operativas de la Plataforma. Las actualizaciones serán notificadas a través de la Plataforma.</p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">18. Propiedad Intelectual</h2>

          <p><strong>18.1. Derechos de Propiedad Intelectual de la Plataforma</strong><br />
          Todos los derechos de propiedad intelectual relacionados con la Plataforma LEGALO, incluyendo pero no limitándose a su diseño, código fuente, gráficos, textos, logos, marcas y funcionalidades, son de propiedad exclusiva de LEGALO o sus licenciantes. Queda estrictamente prohibido copiar, modificar, distribuir, reproducir o utilizar cualquier contenido de la Plataforma sin el consentimiento previo y por escrito de LEGALO.</p>

          <p><strong>18.2. Transferencia de Derechos por Encargos</strong><br />
          Los derechos de autor y propiedad intelectual sobre los documentos, contratos u otros entregables creados por los Miembros en cumplimiento de los encargos contratados a través de LEGALO serán transferidos al Cliente una vez que el servicio sea completado y el pago sea recibido.
          <ul className="list-disc pl-6">
              <li>La transferencia de derechos no incluye trabajos preliminares, borradores o comunicaciones intermedias, salvo acuerdo expreso entre las partes.</li>
              <li>LEGALO no asume responsabilidad por el uso indebido o violación de los derechos de autor entre Clientes y Miembros.</li>
          </ul>
          </p>

          <p><strong>18.3. Licencia para el Uso de Contenido por LEGALO</strong><br />
          Al publicar contenido en la Plataforma, los Usuarios conceden a LEGALO una licencia no exclusiva, transferible, sublicenciable, gratuita y global para utilizar dicho contenido con fines operativos, publicitarios o de mejora del servicio.</p>

          <p><strong>18.4. Propiedad sobre el Contenido</strong><br />
          LEGALO no adquiere derechos de propiedad sobre los contenidos publicados por los Usuarios, pero podrá utilizarlos conforme a esta licencia.</p>

          <p><strong>18.5. Uso de la Marca LEGALO</strong><br />
          Queda prohibido el uso de la marca, logo o cualquier elemento distintivo de LEGALO sin autorización previa.</p>

          <p><strong>18.6. Uso del Nombre de LEGALO en Comunicaciones Externas</strong><br />
          Los Miembros y Clientes no podrán utilizar el nombre de LEGALO en comunicaciones externas, materiales publicitarios o negociaciones sin el consentimiento por escrito de LEGALO.</p>

          <p><strong>18.7. Reporte de Violaciones de Propiedad Intelectual</strong><br />
          Los Usuarios pueden reportar violaciones de propiedad intelectual mediante el Canal de Atención. LEGALO investigará el caso y tomará las medidas que considere apropiadas, que pueden incluir la eliminación del contenido infractor y la suspensión de cuentas.</p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">19. Impuestos</h2>

          <p><strong>19.1. Responsabilidades Fiscales de los Miembros</strong><br />
          Los Miembros son responsables de cumplir con todas sus obligaciones fiscales, incluyendo:
          <ul className="list-disc pl-6">
              <li>Emisión de comprobantes tributarios correspondientes (boletas o facturas) dentro de un plazo máximo de 5 días hábiles desde la recepción del pago.</li>
              <li>Declaración y pago del IGV y otros impuestos aplicables en su jurisdicción.</li>
          </ul>
          </p>

          <p><strong>19.2. Responsabilidad de LEGALO como Intermediario</strong><br />
          LEGALO actúa únicamente como intermediario en la transferencia de fondos entre Clientes y Miembros. No asume ninguna responsabilidad por el cumplimiento tributario de los Miembros ni de los Clientes. Las principales funciones de LEGALO incluyen:
          <ul className="list-disc pl-6">
              <li>Calcular y descontar la comisión correspondiente antes de transferir el pago al Miembro. La comisión de LEGALO no incluye impuestos y se calcula sobre el monto base del servicio acordado entre el Cliente y el Miembro.</li>
              <li>Emitir comprobantes de pago al Cliente en nombre de LEGALO.</li>
          </ul>
          </p>

          <p><strong>19.3. Responsabilidad de los Clientes en la Información Fiscal</strong><br />
          Los Clientes son responsables de proporcionar información fiscal precisa al momento de realizar una contratación, incluyendo:
          <ul className="list-disc pl-6">
              <li>La selección del tipo de comprobante tributario que desean recibir (boleta de venta o factura).</li>
              <li>La veracidad de los datos fiscales proporcionados para la emisión de dichos comprobantes.</li>
          </ul>
          </p>

          <p><strong>19.4. Responsabilidad por Errores en la Información Fiscal</strong><br />
          LEGALO no será responsable por errores en la información fiscal proporcionada por el Cliente. Cualquier corrección deberá ser gestionada directamente por el Cliente.</p>

          <p><strong>19.5. Retenciones Tributarias</strong><br />
          Cuando corresponda, LEGALO realizará las retenciones tributarias aplicables conforme a la normativa vigente en Perú. Estas retenciones serán descontadas directamente de los pagos realizados al Miembro, incluyendo:
          <ul className="list-disc pl-6">
              <li>Retención del 8% de renta de cuarta categoría, en caso de Miembros que emitan recibos por honorarios y siempre que aplique conforme a la ley.</li>
          </ul>
          </p>

          <p><strong>19.6. Solicitud de Información Adicional</strong><br />
          LEGALO se reserva el derecho de solicitar información adicional a los Usuarios para garantizar el cumplimiento de las normativas fiscales. Esto incluye, entre otros:
          <ul className="list-disc pl-6">
              <li>Validación de comprobantes emitidos.</li>
              <li>Verificación de la condición tributaria de los Miembros.</li>
          </ul>
          </p>

          <p><strong>19.7. Exoneración de Responsabilidad</strong><br />
          LEGALO no será responsable por:
          <ul className="list-disc pl-6">
              <li>Omisiones o errores en la declaración y pago de impuestos por parte de los Miembros.</li>
              <li>Cualquier incumplimiento fiscal derivado de información incorrecta proporcionada por los Usuarios.</li>
          </ul>
          </p>

          <p><strong>19.8. Actualizaciones de la Sección</strong><br />
          LEGALO podrá actualizar esta sección para reflejar cambios en la normativa fiscal o en las políticas internas de la Plataforma. Las modificaciones serán informadas a través de la Plataforma.</p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">20. Limitaciones de Responsabilidad y Exoneraciones</h2>

          <p><strong>20.1. Disponibilidad y Funcionalidad de la Plataforma</strong><br />
          LEGALO no garantiza la disponibilidad ininterrumpida ni la funcionalidad continua de la Plataforma. Aunque se implementan medidas razonables para garantizar un servicio seguro, los Usuarios aceptan que LEGALO no será responsable por fallos técnicos, errores del sistema, interrupciones, retrasos o cualquier otro problema que pueda afectar el acceso o uso de la Plataforma. LEGALO no asume responsabilidad por pérdidas o daños derivados del uso de herramientas tecnológicas de terceros integradas en la Plataforma.</p>

          <p><strong>20.2. Relación entre Clientes y Miembros</strong><br />
          LEGALO no participa ni interviene en las relaciones contractuales entre Clientes y Miembros más allá de facilitar la conexión y gestionar los pagos. En consecuencia, LEGALO no es responsable por el incumplimiento de las obligaciones contractuales entre Clientes y Miembros ni garantiza la calidad, idoneidad o resultados de los servicios prestados por los Miembros.</p>

          <p><strong>20.3. Responsabilidad por Contenido Publicado por los Usuarios</strong><br />
          El contenido publicado por los Usuarios en la Plataforma, incluyendo calificaciones, opiniones y documentos, es responsabilidad exclusiva del Usuario que lo genera.</p>

          <p><strong>20.4. Pérdidas y Daños Indirectos</strong><br />
          LEGALO no será responsable por pérdidas económicas indirectas, daños emergentes, lucro cesante o daños punitivos derivados del uso de la Plataforma.</p>

          <p><strong>20.5. Fuerza Mayor</strong><br />
          LEGALO no será responsable por incumplimientos o retrasos en sus obligaciones debido a circunstancias fuera de su control, incluyendo pero no limitándose a desastres naturales, pandemias, interrupciones de servicios de terceros, ciberataques, actos gubernamentales o conflictos laborales.</p>

          <p><strong>20.6. Indemnización por Uso Indebido</strong><br />
          El Usuario acepta indemnizar y mantener indemne a LEGALO frente a reclamos, demandas o daños resultantes del uso indebido de la Plataforma, incluyendo violaciones de derechos de propiedad intelectual, actividades ilícitas realizadas mediante la Plataforma e incumplimientos de los presentes TyCU.</p>

          <p><strong>20.7. Provisión de la Plataforma</strong><br />
          LEGALO proporciona la Plataforma y sus servicios según disponibilidad, sin garantías de ningún tipo, expresas o implícitas, incluyendo garantías de comerciabilidad, idoneidad para un propósito específico o no infracción.</p>
        </div>


        <div className="prose prose-lg text-gray-900">
          <h2 className="font-bold text-xl mt-6">21. Legislación Aplicable y Jurisdicción Competente</h2>

          <p><strong>21.1. Legislación Aplicable</strong><br />
          Estos TyCU se regirán e interpretarán de acuerdo con la legislación vigente en la República del Perú. En los casos en que el Cliente sea considerado consumidor según lo dispuesto en el Código de Protección y Defensa del Consumidor (Ley N° 29571), este será aplicable para garantizar sus derechos y establecer las obligaciones correspondientes de LEGALO.</p>

          <p><strong>21.2. Disposiciones para Miembros</strong><br />
          Para los Miembros, se aplicarán las disposiciones legales del ámbito civil y comercial peruano, ya que su relación con LEGALO y los Clientes es de naturaleza profesional y no de consumo.</p>

          <p><strong>21.3. Intermediación de LEGALO</strong><br />
          LEGALO actúa exclusivamente como un intermediario pasivo que facilita la conexión entre Clientes y Miembros (abogados). LEGALO no garantiza la calidad ni los resultados de los servicios legales prestados por los Miembros, ni interviene en los acuerdos específicos establecidos entre ellos.</p>

          <p><strong>21.4. Medidas de Supervisión</strong><br /></p>
          LEGALO, sin embargo, implementa medidas de supervisión para:
          <ul>
              <li>Revisar que el contenido publicado en la Plataforma sea claro y no infrinja derechos de terceros.</li>
              <li>Facilitar la resolución de disputas a través de un proceso interno de mediación y, cuando corresponda, de arbitraje.</li>
          </ul>

          <p><strong>21.5. Jurisdicción para Consumidores</strong><br />
          Para los casos en que el Cliente sea un consumidor conforme a la legislación peruana, cualquier controversia derivada del uso de la Plataforma o de estos TyCU será sometida a la jurisdicción del domicilio del Cliente.</p>

          <p><strong>21.6. Jurisdicción para Miembros en Perú</strong><br />
          Para los Miembros que residan en Perú, las controversias derivadas del uso de la Plataforma serán resueltas bajo la jurisdicción de los tribunales de Lima, salvo disposición en contrario en el contrato estándar.</p>

          <p><strong>21.7. Jurisdicción para Miembros o Clientes Fuera de Perú</strong><br />
          En situaciones donde el Cliente o el Miembro residan fuera del territorio peruano, las controversias serán resueltas exclusivamente bajo la jurisdicción de los tribunales de Lima, Perú.</p>
        </div>

        <br/>
        <Link href="https://legalo.s3.us-east-1.amazonaws.com/Legalo+-+Te%CC%81rminos+y+Condiciones+de+Uso+-+Enero+2025.pdf" target="_blank">
          Descarga aquí.
        </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosPage;
