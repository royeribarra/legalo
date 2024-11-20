"use client";

import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
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
import { IHabilidad } from "@/interfaces/Habilidad.interface";
import { IExperiencia } from "@/interfaces/Experiencia.interface";
import { IEstudio } from "@/interfaces/Estudio.interface";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/toastContext";
import { useRegistroAbogado } from "@/contexts/registroAbogadoContext";

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
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [culFile, setCulFile] = useState<File | null>(null);
  const [especialidad, setEspecialidad] = useState({
    grado: "",
    listaEspecialidades: [],
    sobre_ti: ""
  });
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
    const newLista = stateAbogado.experiencias.filter((item: IExperiencia) => item.id !== experiencia.id);
    updateStateAbogado({experiencias: newLista })
  };

  const editarEducacion = (educacion: IEstudio) => {
    setEducacionSelected(educacion);
    setShowModalAddEducacion(true);
  };

  const eliminarEducacion = (educacion: IEstudio) => {
    const newLista = stateAbogado.estudios.filter((item: Educacion) => item.id !== educacion.id);
    updateStateAbogado({estudios: newLista })
  };

  const nextStep = async() => {
    
    if (stepNumber === 4) {
      if(!profileImg) {
        showToast(
          "success",
          "Operación exitosa",
          "El formulario fue enviado correctamente."
        )
      }
      
      // if(!culFile) {
      //   alert("Debes cargar una documento en CUL.");
      //   return;
      // }
      const formData = new FormData();
      const especialidad = localStorage.getItem("especialidad");
      const habilidades = localStorage.getItem("habilidades");
      const listaEstudiosLocal = localStorage.getItem("listaEstudios");
      const listaExperienciaLocal = localStorage.getItem("listaExperiencia");
      const profileImgLocal = localStorage.getItem("profileImg");
      const profileVideo = localStorage.getItem("profileVideo");
      const industriasLocal = localStorage.getItem("industriasAbogado");
      const serviciosLocal = localStorage.getItem("serviciosAbogado");

      if (profileImgLocal) {
        const imgBlob = base64ToBlob(profileImgLocal, "image/jpeg");
        const formDataImg = new FormData();
        formDataImg.append("profileImg", imgBlob, "profileImg.jpg");
        formDataImg.append("dni", stateAbogado.dni);
        formDataImg.append("correo", stateAbogado.email);

        try {
          const response = await fetch(`${process.env.BASE_APP_API_URL}/temp-files/upload-profile-img`, {
            method: "POST",
            body: formDataImg,
          });
        
          if (!response.ok) {
            throw new Error(`Error en la petición: ${response.statusText}`);
          }
        
          const data = await response.json();
          console.log("Imagen enviada correctamente", data);
        } catch (error) {
          console.error("Error al enviar la imagen", error);
        }
      }
      if (profileVideo) {
        const videoBlob = base64ToBlob(profileVideo, "video/mp4");
        formData.append("profileVideo", videoBlob, "profileVideo.mp4");
      }

      if (habilidades && listaEstudiosLocal && listaExperienciaLocal && industriasLocal && serviciosLocal && especialidad) {
        
        const habilidadParse = JSON.parse(habilidades);
        const industriasParse = JSON.parse(industriasLocal);
        const serviciosParse = JSON.parse(serviciosLocal);
        const experienciaParse = JSON.parse(listaExperienciaLocal);
        const estudioParse = JSON.parse(listaEstudiosLocal);
        const especialidadParse = JSON.parse(especialidad);

        const habilidadesBlandas = habilidadParse.habilidades_blandas.map((habilidad: IHabilidad) => ({
          nombre: habilidad
        }));
        const habilidadesDuras = habilidadParse.habilidades_duras.map((habilidad: IHabilidad) => ({
          nombre: habilidad
        }));
        const industrias = industriasParse.map((industria: string) => ({
          nombre: industria
        }));
        const servicios = serviciosParse.map((servicio: string) => ({
          nombre: servicio
        }));
        const experiencias = experienciaParse.map((experiencia: IExperiencia) => ({
          institucion: experiencia.empresa,
          fecha_fin: experiencia.hasta_fecha,
          fecha_inicio: experiencia.desde_fecha,
          descripcion: experiencia.descripcion,
          titulo: experiencia.titulo
        }));
        const educaciones = estudioParse.map((estudio: IEstudio) => ({
          institucion: estudio.institucion,
          fecha_fin: estudio.hasta_fecha,
          fecha_inicio: estudio.desde_fecha,
          descripcion: estudio.descripcion,
          titulo: estudio.titulo,
          ubicacion: estudio.ubicacion
        }));
        const especialidades  = especialidadParse.listaEspecialidades.map((especialidad: string) => ({
          nombre: especialidad
        }));
        const data = {
          nombres: stateAbogado.nombres,
          apellidos: stateAbogado.apellidos,
          direccion: stateAbogado.ubicacion,
          correo: stateAbogado.email,
          dni: stateAbogado.dni,
          telefono: stateAbogado.telefono,
          contrasena: stateAbogado.contrasena,
          sobre_ti: especialidad ? JSON.parse(especialidad)?.sobre_ti : '',
          grado_academico: especialidad ? JSON.parse(especialidad)?.grado : '',
          cip: especialidad ? JSON.parse(especialidad)?.cip : '',
          colegio: especialidad ? JSON.parse(especialidad)?.colegio : '',
          habilidadesBlandas: habilidadesBlandas,
          habilidadesDuras: habilidadesDuras,
          industrias: industrias,
          servicios: servicios,
          experiencias: experiencias,
          educaciones: educaciones,
          especialidades: especialidades
        };

        fetch(`${process.env.BASE_APP_API_URL}/abogados/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            if(data.state){
              localStorage.clear();
              router.push("/registro/abogado/email-verify")
            }
          })
          .catch(err=>console.log(err));
      }
        return;
    }
    switch (stepNumber) {
      case 1:
        if(!stateAbogado.experiencias.length && !noExperiencia){
          showToast(
            "error",
            "Falta:",
            "Seleccionar experiencia."
          )
        }else{
          setTriger("tab2");
          setStepNumber(stepNumber + 1);
        }
        break;
      case 2:
        if(!stateAbogado.estudios.length){
          showToast(
            "error",
            "Falta:",
            "Seleccionar educación."
          )
        }else{
          setTriger("tab3");
          setStepNumber(stepNumber + 1);
        }
        break;
      case 3:
        if(!stateAbogado.grado || !stateAbogado.especialidades.length || !stateAbogado.sobre_ti){
          showToast(
            "error",
            "Falta:",
            "Rellenar todos los campos de la especialidad."
          )
        }else{
          setTriger("tab4");
          setStepNumber(stepNumber + 1);
        }
        break;
      default:
        break;
    }
  };

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

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


  useEffect(() => {
    const habilidad = localStorage.getItem("habilidades");
    if (!habilidad) {
      localStorage.setItem(
        "habilidades",
        JSON.stringify({
          habilidades_blandas: [],
          habilidades_duras: [],
        })
      );
    }
  }, []);

  useEffect(()=> {
    const imagen = localStorage.getItem("profileImg");
    if(imagen){
      setProfileImg(imagen);
    }
  }, []);

  useEffect(() => {
    // Verifica si hay un archivo en localStorage al cargar el componente
    const storedFile = localStorage.getItem("culFile");
    const storedFileName = localStorage.getItem("uploadedCulFileName");

    if (storedFile && storedFileName) {
      // Crear un blob y mostrarlo como archivo
      const blob = new Blob([atob(storedFile)], { type: "application/octet-stream" });
      const restoredFile = new File([blob], storedFileName);
      setCulFile(restoredFile);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 lg:py-8 lg:px-0 w-full lg:max-w-[960px]">
      <div className="max-w-[680px] mb-4 mx-auto">
        <Progress value={100} className="mb-2 h-2" />
        <p className="text-left">Paso 3/3</p>
      </div>
      <div>
        <p>Campos obligatorios(*)</p>
      </div>
      <div className="border border-black p-5 my-4 rounded-xl flex flex-col md:flex-row gap-4">
        <ImageUpload></ImageUpload>

        <div className="w-full lg:w-4/6 flex flex-col justify-center">
          <p className="font-bold">{stateAbogado.nombres + ' ' + stateAbogado.apellidos[0]+ '.'}</p>
          <div className="w-full flex flex-col md:flex-row gap-4">
            <ServiceSelectAbogado />
            <IndustrySelectAbogado />
          </div>
        </div>
        <VideoUpload></VideoUpload>
      </div>

      <FileUpload></FileUpload>
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
              className="text-[#D1D1D6] w-full justify-start py-4 lg:text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
              disabled={stepNumber != 1 ? true : false}
            >
              Experiencia laboral
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              className="text-[#D1D1D6] w-full justify-start py-4 lg:text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
              disabled={stepNumber != 2 ? true : false}
            >
              Educación
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              className=" text-[#D1D1D6] w-full justify-start py-4 lg:text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
              disabled={stepNumber != 3 ? true : false}
            >
              Sobre tí
            </TabsTrigger>
            <TabsTrigger
              value="tab4"
              className=" text-[#D1D1D6] w-full justify-start py-4 lg:text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
              disabled={stepNumber != 4 ? true : false}
            >
              Skills
            </TabsTrigger>
            {/* <TabsTrigger
              value="tab5"
              className=" text-[#D1D1D6] w-full justify-start py-4 lg:text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
              disabled={stepNumber != 5 ? true : false}
            >
              Documentación extra
            </TabsTrigger> */}
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
                {stateAbogado.experiencias.map((experiencia: IExperiencia, index) => (
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
                ))}
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="terms" onClick={()=>setNoExperiencia(!noExperiencia)} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No cuento con experiencia aún.
                  </label>
                </div>

                <CvUpload></CvUpload>
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
