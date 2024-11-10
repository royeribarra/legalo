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

interface Educacion {
  id: number,
  desde_fecha: string;
  hasta_fecha: string;
  titulo: string;
  institucion: string;
  ubicacion: string;
  descripcion: string;
}

interface Experiencia {
  id: number;
  desde_fecha: string;
  hasta_fecha: string;
  descripcion: string;
  empresa: string;
  titulo: string;
}

const CompleteProfileLawyerPage: React.FC = () => {
  
  const [listEducacion, setListEducacion] = useState([]);
  const [listExperiencia, setListExperiencia] = useState([]);
  const [showModalAddEducacion, setShowModalAddEducacion] = useState(false);

  const [showModalAddExperiencia, setShowModalAddExperiencia] = useState(false);
  const [experienciaSelected, setExperienciaSelected] = useState<Experiencia | null>(null);
  const [educacionSelected, setEducacionSelected] = useState<Educacion | null>(null);
  const [stepNumber, setStepNumber] = useState(1);
  const [triger, setTriger] = useState("tab1");

  const editarExperiencia = (experiencia: Experiencia) => {
    setExperienciaSelected(experiencia);
    setShowModalAddExperiencia(true);
  };

  const editarEducacion = (educacion: Educacion) => {
    setEducacionSelected(educacion);
    setShowModalAddEducacion(true);
  };

  const nextStep = () => {
    if(stepNumber === 4){
      const formData = new FormData();
      const abogado = localStorage.getItem("abogado");
      const especialidad = localStorage.getItem("especialidad");
      const estudios = localStorage.getItem("estudios");
      const habilidades = localStorage.getItem("habilidades");
      const listaEstudiosLocal = localStorage.getItem("listaEstudios");
      const listaExperienciaLocal = localStorage.getItem("listaExperiencia");
      const profileImg = localStorage.getItem("profileImg");
      const profileVideo = localStorage.getItem("profileVideo");
      const industriasLocal = localStorage.getItem("industriasAbogado");
      const serviciosLocal = localStorage.getItem("serviciosAbogado");

      if (especialidad) formData.append("especialidad", especialidad);
      if (estudios) formData.append("estudios", estudios);
      if (profileImg) {
        const imgBlob = base64ToBlob(profileImg, "image/jpeg");
        formData.append("profileImg", imgBlob, "profileImg.jpg");
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

        const habilidadesBlandas = habilidadParse.habilidades_blandas.map((habilidad: any) => ({
          nombre: habilidad
        }));
        const habilidadesDuras = habilidadParse.habilidades_duras.map((habilidad: any) => ({
          nombre: habilidad
        }));
        const industrias = industriasParse.map((industria: any) => ({
          nombre: industria
        }));
        const servicios = serviciosParse.map((servicio: any) => ({
          nombre: servicio
        }));
        const experiencias = experienciaParse.map((servicio: any) => ({
          institucion: servicio.empresa,
          fecha_fin: servicio.hasta_fecha,
          fecha_inicio: servicio.desde_fecha,
          descripcion: servicio.descripcion,
          titulo: servicio.titulo
        }));
        const educaciones = estudioParse.map((estudio: any) => ({
          institucion: estudio.institucion,
          fecha_fin: estudio.hasta_fecha,
          fecha_inicio: estudio.desde_fecha,
          descripcion: estudio.descripcion,
          titulo: estudio.titulo,
          ubicacion: estudio.ubicacion
        }));
        const especialidades  = especialidadParse.listaEspecialidades.map((especialidad: any) => ({
          nombre: especialidad
        }));
        const data = {
          nombres: abogado ? JSON.parse(abogado)?.names : '',
          apellidos: abogado ? JSON.parse(abogado)?.lastNames : '',
          direccion: abogado ? JSON.parse(abogado)?.location : '',
          correo: abogado ? JSON.parse(abogado)?.email : '',
          contrasena: abogado ? JSON.parse(abogado)?.password : '',
          sobre_ti: especialidad ? JSON.parse(especialidad)?.sobre_ti : '',
          grado_academico: especialidad ? JSON.parse(especialidad)?.grado : '',
          habilidadesBlandas: habilidadesBlandas,
          habilidadesDuras: habilidadesDuras,
          industrias: industrias,
          servicios: servicios,
          experiencias: experiencias,
          educaciones: educaciones,
          especialidades: especialidades
        };
        
  
        fetch('http://localhost:3001/abogados/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(err=>console.log(err));
      }
        return;
    }
    switch (stepNumber) {
      case 1:
        setTriger("tab2");
        break;
      case 2:
        setTriger("tab3");
        break;
      case 3:
        setTriger("tab4");
        break;
      default:
        break;
    }
    setStepNumber(stepNumber + 1);
  };

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  const prevStep = () => {
    if(stepNumber === 1){
      window.location.href = 'http://localhost:3000/registro/abogado/objetivos';
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
    const estudiosString = localStorage.getItem("listaEstudios");
    let estudios;
    if (estudiosString) {
      estudios = JSON.parse(estudiosString);
      setListEducacion(estudios);
    } else {
      estudios = {};
    }
    console.log(estudios);
  }, [showModalAddEducacion]);

  useEffect(() => {
    const experienciaString = localStorage.getItem("listaExperiencia");
    let experiencia;
    if (experienciaString) {
      experiencia = JSON.parse(experienciaString);
      setListExperiencia(experiencia);
    } else {
      experiencia = {};
    }
    console.log(experiencia);
  }, [showModalAddExperiencia]);

  useEffect(() => {
    const listaExperiencia = localStorage.getItem("listaExperiencia");
    const listaEstudios = localStorage.getItem("listaEstudios");
    const especialidad = localStorage.getItem("especialidad");
    const habilidad = localStorage.getItem("habilidades");

    if (!listaExperiencia) {
      localStorage.setItem("listaExperiencia", JSON.stringify([]));
    }
    if (!listaEstudios) {
      localStorage.setItem("listaEstudios", JSON.stringify([]));
    }
    if (!habilidad) {
      localStorage.setItem(
        "habilidades",
        JSON.stringify({
          habilidades_blandas: [],
          habilidades_duras: [],
        })
      );
    }
    if (!especialidad) {
      localStorage.setItem(
        "especialidad",
        JSON.stringify({
          grado: "",
          listaEspecialidades: [],
          sobre_ti: "",
        })
      );
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
          <p className="font-bold">JUAN A.</p>
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
        <Tabs defaultValue="tab1" value={triger}  className="flex gap-4 flex-col lg:flex-row">
          <TabsList className="flex flex-row justify-start overflow-scroll lg:flex-col lg:w-1/4 h-full p-4 gap-2 bg-white pl-0 lg:items-start lg:overflow-hidden">
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
                {listExperiencia.map((experiencia: Experiencia, index) => (
                  <div className="flex gap-4 p-4" key={index}>
                    <div className="w-1/4 flex gap-1">
                      <p>
                        {experiencia.desde_fecha}
                      </p>
                      <span>-</span>
                      <p>
                        {experiencia.hasta_fecha}
                      </p>
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
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="terms" />
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
                {listEducacion.map((educacion: Educacion, index) => (
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
              <AboutSection></AboutSection>
            </TabsContent>
            <TabsContent value="tab4">
              <SkillSection></SkillSection>
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
        />
      )}

      {/* modal agregar servicios */}
      {showModalAddExperiencia && (
        <ModalAgregarExperiencia
          showModal={showModalAddExperiencia}
          setShowModal={setShowModalAddExperiencia}
          setExperienciaSelected={setExperienciaSelected}
          experienciaSelected={experienciaSelected}
        />
      )}
      <div className="flex fixed left-0 bottom-0 w-screen h-[115px] bg-[#D5F1F0] ">
        <div className="flex justify-center lg:justify-between items-center container mx-auto px-4 lg:px-8 max-w-[1000px]">
          <div className="w-[30%] ">
            <Button size="lg" variant="link" className="mx-0 px-2" onClick={prevStep}>
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