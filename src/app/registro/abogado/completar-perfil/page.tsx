"use client";

import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
// import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// form
import ServiceSelectAbogado from "@/components/abogado/ServiceSelectAbogado";
import IndustrySelectAbogado from "@/components/abogado/IndustrySelectAbogado";
import ModalAgregarExperiencia from "@/components/abogado/ModalAgregarExperiencia";
import SkillSection from "@/components/abogado/registro/SkillSection";
import AboutSection from "@/components/abogado/registro/AboutSection";
import ModalAgregarEducacion from "@/components/abogado/MoodalAgregarEducacion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import VideoUpload from "@/components/VideoUpload";
import FileUpload from "@/components/FileUpload";
import CvUpload from "@/components/abogado/registro/CvUpload";
import { IExperiencia } from "@/interfaces/Experiencia.interface";
import { IEstudio } from "@/interfaces/Estudio.interface";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import { useRegistroAbogado } from "@/contexts/registroAbogadoContext";
import { IArchivo } from "@/interfaces/Archivo.interface";
import { abogadoService, fileService } from "@/services";
import { base64ToFile } from "utils/uploadFile";

interface Educacion {
  id: number;
  desde_fecha: string;
  hasta_fecha: string;
  titulo: string;
  institucion: string;
  ubicacion: string;
  descripcion: string;
}

const CompleteProfileLawyerPage: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { stateAbogado, updateStateAbogado } = useRegistroAbogado();

  const [noExperiencia, setNoExperiencia] = useState(false);
  const [showModalAddEducacion, setShowModalAddEducacion] = useState(false);

  const [showModalAddExperiencia, setShowModalAddExperiencia] = useState(false);
  const [experienciaSelected, setExperienciaSelected] =
    useState<IExperiencia | null>(null);
  const [educacionSelected, setEducacionSelected] = useState<Educacion | null>(
    null
  );
  const [stepNumber, setStepNumber] = useState(1);
  const [triger, setTriger] = useState("tab1");

  const editarExperiencia = (experiencia: IExperiencia) => {
    setExperienciaSelected(experiencia);
    setShowModalAddExperiencia(true);
  };

  const eliminarExperiencia = (experiencia: IExperiencia) => {
    const newLista = stateAbogado.experiencias.filter(
      (item: IExperiencia) => item.id !== experiencia.id
    );
    updateStateAbogado({ experiencias: newLista });
  };

  const editarEducacion = (educacion: IEstudio) => {
    setEducacionSelected(educacion);
    setShowModalAddEducacion(true);
  };

  const eliminarEducacion = (educacion: IEstudio) => {
    const newLista = stateAbogado.estudios.filter(
      (item: Educacion) => item.id !== educacion.id
    );
    updateStateAbogado({ estudios: newLista });
  };

  const nextStep = async () => {
    if (stepNumber === 4) {
      if (!stateAbogado.archivo_imagen) {
        showToast("error", "Archivo Imagen", "Sube una imagen");
        return;
      }
      if (!stateAbogado.archivo_cv) {
        showToast("error", "Archivo CV", "Sube un archivo");
        return;
      }
      if (!stateAbogado.archivo_cul) {
        showToast("error", "Archivo CUL", "Sube un archivo");
        return;
      }
      if (!stateAbogado.servicios.length) {
        showToast("error", "Servicios", "Selecciona una opción como mínimo.");
        return;
      }
      if (!stateAbogado.industrias.length) {
        showToast("error", "Industrias", "Selecciona una opción como mínimo.");
        return;
      }

      if (!stateAbogado.habilidades_blandas.length) {
        showToast(
          "error",
          "Habilidades Blandas",
          "Selecciona una opción como mínimo."
        );
        return;
      }

      if (!stateAbogado.habilidades_duras.length) {
        showToast(
          "error",
          "Habilidades Duras",
          "Selecciona una opción como mínimo."
        );
        return;
      }

      

      const experiencias = stateAbogado.experiencias.map(
        (experiencia: IExperiencia) => ({
          institucion: experiencia.empresa,
          fecha_fin: experiencia.hasta_fecha,
          fecha_inicio: experiencia.desde_fecha,
          descripcion: experiencia.descripcion,
          titulo: experiencia.titulo,
        })
      );
      const educaciones = stateAbogado.estudios.map((estudio: IEstudio) => ({
        institucion: estudio.institucion,
        fecha_fin: estudio.hasta_fecha,
        fecha_inicio: estudio.desde_fecha,
        descripcion: estudio.descripcion,
        titulo: estudio.titulo,
        ubicacion: estudio.ubicacion,
      }));
      const data = {
        nombres: stateAbogado.nombres,
        apellidos: stateAbogado.apellidos,
        direccion: stateAbogado.ubicacion,
        correo: stateAbogado.email,
        dni: stateAbogado.dni,
        telefono: stateAbogado.telefono,
        contrasena: stateAbogado.contrasena,
        sobre_ti: stateAbogado.sobre_ti,
        grado_academico: stateAbogado.grado,
        cip: stateAbogado.cip,
        colegio: stateAbogado.colegio,
        habilidadesBlandas: stateAbogado.habilidades_blandas,
        habilidadesDuras: stateAbogado.habilidades_duras,
        industrias: stateAbogado.industrias,
        servicios: stateAbogado.servicios,
        experiencias: experiencias,
        educaciones: educaciones,
        especialidades: stateAbogado.especialidades,
      };

      try {
        const response = await abogadoService.createAbogado(data);
        if(response.state){
          if (stateAbogado.archivo_cv) {
            enviarArchivo(
              stateAbogado.archivo_cv,
              response.abogado.id,
              "archivo_cv"
            );
          }
    
          if (stateAbogado.archivo_cul) {
            enviarArchivo(
              stateAbogado.archivo_cul,
              response.abogado.id,
              "archivo_cul"
            );
          }
    
          if (stateAbogado.archivo_imagen) {
            enviarArchivo(
              stateAbogado.archivo_imagen,
              response.abogado.id,
              "archivo_imagen"
            );
          }
          if (stateAbogado.archivo_video) {
            enviarArchivo(
              stateAbogado.archivo_imagen,
              response.abogado.id,
              "archivo_video"
            );
          }
          localStorage.clear();
          router.push(
            `/registro/abogado/email-verify?correo=${encodeURIComponent(stateAbogado.email)}`
          );
        }
        showToast("error", response.message, "");
      } catch (error) {
        showToast("error", "Ocurrió un error", "");
      }
      return;
    }
    switch (stepNumber) {
      case 1:
        if (!stateAbogado.experiencias.length && !noExperiencia) {
          showToast("error", "Falta:", "Seleccionar experiencia.");
        } else if (!stateAbogado.archivo_cv) {
          showToast("error", "Falta:", "Sube un CV");
        } else {
          setTriger("tab2");
          setStepNumber(stepNumber + 1);
        }
        break;
      case 2:
        if (!stateAbogado.estudios.length) {
          showToast("error", "Falta:", "Seleccionar educación.");
        } else {
          setTriger("tab3");
          setStepNumber(stepNumber + 1);
        }
        break;
      case 3:
        if (
          !stateAbogado.grado ||
          !stateAbogado.especialidades.length ||
          !stateAbogado.sobre_ti
        ) {
          showToast(
            "error",
            "Falta:",
            "Rellenar todos los campos de la especialidad."
          );
        } else {
          setTriger("tab4");
          setStepNumber(stepNumber + 1);
        }
        break;
      default:
        break;
    }
  };

  const enviarArchivo = async (
    archivo: IArchivo,
    abogadoId: number,
    nombreArchivo: string
  ) => {
    const archivoBlob = base64ToFile(archivo.contenido, archivo.tipo, archivo.nombre);
    const body = {
      nombreArchivo,
      abogadoId,
      file: archivoBlob,
      folder: "abogados"
    };

    try {
      const response = await fileService.uploadFile(body);
    } catch (error) {
      console.error("Error al enviar el archivo", error);
    }
  };

  const prevStep = () => {
    if (stepNumber === 1) {
      window.location.href = `${process.env.BASE_APP_URL}/registro/abogado/objetivos`;
    }

    switch (stepNumber) {
      case 2:
        setTriger("tab1");
        break;
      case 3:
        setTriger("tab2");
        break;
      case 4:
        setTriger("tab3");
        break;
      default:
        break;
    }
    setStepNumber(stepNumber - 1);
  };

  return (
    <div className="container mx-auto p-4 lg:py-8 lg:px-0 w-full lg:max-w-[960px]">
      <div className="max-w-[680px] mb-4 mx-auto">
        <Progress value={100} className="mb-2 h-2" />
        <p className="text-left">Paso 3/3</p>
      </div>
      <div className="my-8">
        <h2 className="text-3xl lg:text-5xl font-nimbus mt-4">
          Personaliza tu perfil profesional
        </h2>
        <p className="">
          Esta información ayudará a los clientes a conocerte y confiar en tus
          servicios.
        </p>
      </div>
      <div className="border border-black p-5 my-4 rounded-xl flex flex-col md:flex-row gap-4">
        <ImageUpload
          updateStateAbogado={updateStateAbogado}
          stateAbogado={stateAbogado}
          campo={"archivo_imagen"}
        />

        <div className="w-full lg:w-4/6 flex flex-col justify-center">
          <p className="font-bold">
            {stateAbogado.nombres + " " + stateAbogado.apellidos[0] + "."}
          </p>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <ServiceSelectAbogado
              stateAbogado={stateAbogado}
              updateStateAbogado={updateStateAbogado}
            />
            <IndustrySelectAbogado
              stateAbogado={stateAbogado}
              updateStateAbogado={updateStateAbogado}
            />
          </div>
        </div>
        <VideoUpload></VideoUpload>
      </div>

      <FileUpload
        updateStateAbogado={updateStateAbogado}
        stateAbogado={stateAbogado}
        campo={"archivo_cul"}
      />
      {/* lateral menu  */}
      <div className="my-4 pb-32">
        <Tabs
          defaultValue="tab1"
          value={triger}
          className="flex gap-4 flex-col lg:flex-row"
        >
          <TabsList className="flex flex-row justify-start overflow-auto lg:flex-col lg:w-1/4 h-full p-4 gap-2 bg-white pl-0 lg:items-start lg:overflow-hidden">
            <TabsTrigger
              value="tab1"
              className="perfil-info text-[#D1D1D6] w-full flex-col items-start py-4 lg:text-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white rounded-[10px]"
              disabled={stepNumber != 1 ? true : false}
            >
              <p className="text-[18px] mb-2 text-bold">Experiencia Laboral</p>
              <div className="btn-info font-light">
                <p className="text-xs text-left">Detalla tus experiencias</p>
                <p className="text-xs text-left">laborales relevantes.</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              className="perfil-info text-[#D1D1D6] w-full flex-col items-start py-4 lg:text-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white rounded-[10px]"
              disabled={stepNumber != 2 ? true : false}
            >
              <p className="text-[18px] mb-2 text-bold">Educación</p>
              <div className="btn-info font-light">
                <p className="text-xs text-left">Añade tus títulos y</p>
                <p className="text-xs text-left">
                  certificaciones para destacar
                </p>
                <p className="text-xs text-left">tu formación académica.</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              className="perfil-info text-[#D1D1D6] w-full flex-col items-start py-4 lg:text-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white rounded-[10px]"
              disabled={stepNumber != 3 ? true : false}
            >
              <p className="text-[18px] mb-2 text-bold">Perfil Profesional</p>
              <div className="btn-info font-light">
                <p className="text-xs text-left">Añade tus especialidades,</p>
                <p className="text-xs text-left">
                  nivel profesional y una breve
                </p>
                <p className="text-xs text-left">descripción sobre ti.</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tab4"
              className="perfil-info text-[#D1D1D6] w-full flex-col items-start py-4 lg:text-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white rounded-[10px]"
              disabled={stepNumber != 4 ? true : false}
            >
              <p className="text-[18px] mb-2 text-bold">Skills</p>
              <div className="btn-info font-light">
                <p className="text-xs text-left">Añade tus habilidades para</p>
                <p className="text-xs text-left">complementar tu perfil</p>
                <p className="text-xs text-left">profesional.</p>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="tab5"
              className="perfil-info text-[#D1D1D6] w-full flex-col items-start py-4 lg:text-lg font-bold data-[state=active]:bg-black data-[state=active]:text-white rounded-[10px]"
              disabled={stepNumber != 5 ? true : false}
            >
              <p className="text-[18px] mb-2 text-bold">Documentación Extra</p>
              <div className="btn-info font-light">
                <p className="text-xs text-left">Añade documentación</p>
                <p className="text-xs text-left">adicional necesaria para</p>
                <p className="text-xs text-left">completar tu perfil.</p>
              </div>
            </TabsTrigger>
            <p className="hidden lg:block lg:my-8 text-black text-sm">
              Campos obligatorios(*)
            </p>
          </TabsList>
          <p className="lg:hidden block lg:my-8 text-black text-base">
            Campos obligatorios(*)
          </p>
          <div className="lg:w-3/4">
            <TabsContent value="tab1">
              <div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <p className="font-bold text-lg">Experiencia*</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={() => setShowModalAddExperiencia(true)}
                  >
                    <Plus size={20} color="black" className="mr-4" /> Sumar
                    experiencia
                  </Button>
                </div>
                <p>
                  Detalla tus experiencias laborales relevantes para resaltar tu
                  trayectoria profesional
                </p>
                {stateAbogado.experiencias.map(
                  (experiencia: IExperiencia, index) => (
                    <div className="flex gap-4 p-4" key={index}>
                      <div className="w-1/4 flex gap-1">
                        <p>{experiencia.desde_fecha}</p>
                        <span>-</span>
                        <p>{experiencia.hasta_fecha}</p>
                      </div>
                      <div className="w-3/4">
                        <p>{experiencia.titulo}</p>
                        <p>{experiencia.empresa}</p>
                        <div className="flex gap-2 border-b border-black py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-[120px] rounded-2xl border-black"
                            id="editar-experiencia"
                            onClick={() => editarExperiencia(experiencia)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-[120px] rounded-2xl border-black"
                            onClick={() => eliminarExperiencia(experiencia)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                )}
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox
                    id="terms"
                    onClick={() => setNoExperiencia(!noExperiencia)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No cuento con experiencia aún.
                  </label>
                </div>

                <CvUpload
                  updateStateAbogado={updateStateAbogado}
                  stateAbogado={stateAbogado}
                  campo={"archivo_cv"}
                />
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="flex justify-between border-b border-gray-600 py-2">
                <p className="font-bold text-lg">Educación*</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setShowModalAddEducacion(true)}
                >
                  <Plus size={20} color="black" className="mr-4" /> Agregar
                  estudio
                </Button>
              </div>
              <p>
                Añade tus títulos y certificaciones para destacar tu formación
                académica.
              </p>
              <div>
                {stateAbogado.estudios.map((educacion: IEstudio, index) => (
                  <div className="flex gap-4 p-4" key={index}>
                    <div className="w-1/4 flex gap-1">
                      <p>{educacion.desde_fecha}</p>
                      <span>-</span>
                      <p>{educacion.hasta_fecha}</p>
                    </div>
                    <div className="w-3/4">
                      <p>{educacion.titulo}</p>
                      <p>{educacion.institucion}</p>
                      <p>{educacion.ubicacion}</p>
                      <div className="flex gap-2 border-b border-black py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[120px] rounded-2xl border-black"
                          onClick={() => editarEducacion(educacion)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-[120px] rounded-2xl border-black"
                          onClick={() => eliminarEducacion(educacion)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <AboutSection
                stateAbogado={stateAbogado}
                updateStateAbogado={updateStateAbogado}
              />
            </TabsContent>
            <TabsContent value="tab4">
              <SkillSection
                stateAbogado={stateAbogado}
                updateStateAbogado={updateStateAbogado}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* modal agregar educación */}
      {showModalAddEducacion && (
        <ModalAgregarEducacion
          showModal={showModalAddEducacion}
          setShowModal={setShowModalAddEducacion}
          setEducacionSelected={setEducacionSelected}
          educacionSelected={educacionSelected}
          updateStateAbogado={updateStateAbogado}
          stateAbogado={stateAbogado}
        />
      )}

      {/* modal agregar servicios */}
      {showModalAddExperiencia && (
        <ModalAgregarExperiencia
          showModal={showModalAddExperiencia}
          setShowModal={setShowModalAddExperiencia}
          setExperienciaSelected={setExperienciaSelected}
          experienciaSelected={experienciaSelected}
          updateStateAbogado={updateStateAbogado}
          stateAbogado={stateAbogado}
        />
      )}
      <div className="flex fixed left-0 bottom-0 w-screen h-[115px] bg-[#D5F1F0] ">
        <div className="flex justify-center lg:justify-between items-center container mx-auto px-4 lg:px-8 max-w-[1000px]">
          <div className="w-[30%] ">
            <Button
              size="lg"
              variant="link"
              className="mx-0 px-2"
              onClick={prevStep}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Atras
            </Button>
          </div>
          <div className="w-[70%] flex justify-end">
            <Button size="lg" className="p-4 lg:px-8" onClick={nextStep}>
              <p className="">Sigue completando tu perfil</p>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerPage;
