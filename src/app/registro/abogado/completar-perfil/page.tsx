"use client";

import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
// import { useState } from "react";
import { Upload } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X as IconX } from "lucide-react";
import { Check as CheckIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

import specialtiesItems from "@/data/specialtiesItems";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

// form
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ModalAgregarEducacion from "@/components/abogado/ModalAgregarEducacion";
import ServiceSelectAbogado from "@/components/abogado/ServiceSelectAbogado";
import IndustrySelectAbogado from "@/components/abogado/IndustrySelectAbogado";
import ModalagregarEspecialidad from "@/components/abogado/ModalAgregarEspecialidad";
import ModalAgregarExperiencia from "@/components/abogado/ModalAgregarExperiencia";

const UploadCV = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Crea una referencia para el input de archivo

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
      ];

      if (!validTypes.includes(selectedFile.type)) {
        alert("Por favor, sube un archivo PDF o DOC/DOCX.");
        return;
      }

      setFile(selectedFile);
      setUploadSuccess(true); // Muestra el mensaje de éxito al subir el archivo
    }
  };

  const handleCloseMessage = () => {
    setUploadSuccess(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Simula el clic en el input de archivo
  };

  const handleRemoveFile = () => {
    setFile(null); // Elimina el archivo
    setUploadSuccess(false); // Cierra el mensaje de éxito
  };

  return (
    <div className="border border-black p-5 border-dashed">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-4/5">
          <p>
            Ahorra tiempo importando tu CV, CUL o perfil de LinkedIn en formato
            PDF, Doc, Dox.
          </p>
        </div>
        <div className="w-full flex items-center justify-end lg:w-1/5">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            style={{ display: "none" }} // Oculta el input de archivo
            ref={fileInputRef} // Asocia la referencia al input
          />
          <Button onClick={handleButtonClick}>
            {" "}
            {/* Asocia el clic del botón al input */}
            Importa tu CV <Upload size={18} color="white" className="ml-2" />
          </Button>
        </div>
      </div>
      {uploadSuccess && ( // Muestra el mensaje de éxito
        <div className="flex flex-col bg-[#D9D9D9] rounded-lg p-2 gap-2 mt-2">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Autocompletado con éxito</p>
              <p>
                Revisa la información que ha sido completada automáticamente
              </p>
            </div>
            <Button variant="link" onClick={handleCloseMessage}>
              <Image
                src="/icos/close-x-circle.png"
                alt="Cerrar mensaje"
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      )}
      {file && ( // Muestra el nombre del archivo y el botón de eliminar
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-700">Archivo: {file.name}</p>
          <Button variant="link" onClick={handleRemoveFile}>
            <Image
              src="/icos/close-x-circle.png"
              alt="Eliminar archivo"
              width={24}
              height={24}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Verificar duración y tamaño del video
      const videoUrl = URL.createObjectURL(file);
      const video = document.createElement("video");

      video.src = videoUrl;
      video.onloadedmetadata = () => {
        const duration = video.duration; // Duración en segundos
        const sizeInMB = file.size / (1024 * 1024); // Tamaño en MB

        if (duration > 60) {
          setError("El video debe ser de máximo 1 minuto de duración.");
          setVideoFile(null);
        } else if (sizeInMB > 10) {
          // Puedes ajustar el límite de tamaño aquí (10 MB en este caso)
          setError("El tamaño del video debe ser menor a 10 MB.");
          setVideoFile(null);
        } else {
          setError(null);
          setVideoFile(file); // Guardar el archivo si pasa las validaciones
        }
      };
    }
  };

  const handleButtonClick = () => {
    const input = document.getElementById("video-upload") as HTMLInputElement;
    if (input) {
      input.click(); // Activa el input de archivo al hacer clic en el botón
    }
  };

  useEffect(() => {
    console.log(videoFile);
  }, [videoFile]);

  return (
    <div className="w-full lg:w-1/6 flex flex-col flex-center justify-center items-center">
      <Image
        src="/assets/images/ico-camera.png"
        alt="ico-camera"
        width={64}
        height={64}
        className="block"
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        style={{ display: "none" }} // Oculta el input de archivo
        id="video-upload" // ID para el label
      />
      <Button variant="link" onClick={handleButtonClick}>
        Sube un video tuyo
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
      {/* Mostrar errores */}
    </div>
  );
};

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtén el archivo subido
    if (file) {
      setSelectedImage(file); // Guarda el archivo en el estado
    }
  };

  const handleButtonClick = () => {
    const input = document.getElementById("image-upload") as HTMLInputElement;
    input.click(); // Simula un clic en el input file
  };

  return (
    <div className="w-full lg:w-1/6 flex flex-col items-center gap-2">
      <Image
        src={
          selectedImage
            ? URL.createObjectURL(selectedImage)
            : "/assets/images/ico-photo-perfil.png"
        } // Usa la URL del objeto para mostrar la imagen
        alt="Imagen subida"
        width={96}
        height={96}
        className="rounded-full" // Puedes añadir estilos aquí
      />
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }} // Oculta el input
      />
      <Button
        size="sm"
        variant="outline"
        className="rounded-full"
        onClick={handleButtonClick}
      >
        Sube una imagen*
      </Button>
    </div>
  );
};

//form config
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  desde: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  desde_mes: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  desde_ano: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  hasta_ano: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  hasta_mes: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  titulo: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  institucion: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ubicacion: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  descripcion: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const CompleteProfileLawyerPage: React.FC = () => {
  const [openAddServices, setOpenAddServices] = useState(false);
  const [selectServices, setSelectServices] = useState<string[]>([]);
  const [listEducacion, setListEducacion] = useState([]);
  const [listExperiencia, setListExperiencia] = useState([]);
  const [selectIndustria, setSelectIndustria] = useState<string[]>([
    "Banca",
    "Académico",
    "Corporativo",
  ]);
  const [showModalAddEducacion, setShowModalAddEducacion] = useState(false);
  const [showModalAddEspecialidad, setShowModalAddEspecialidad] = useState(false);
  const [showModalAddExperiencia, setShowModalAddExperiencia] = useState(false);
  const [experienciaSelected, setExperienciaSelected] = useState();

  const toggleAddStudy = () => {
    setShowModalAddEducacion(!showModalAddEducacion);
  };
  const toggleAddServices = () => {
    setOpenAddServices(!openAddServices);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const editarExperiencia = (experiencia: any) => {
    setExperienciaSelected(experiencia);
    setShowModalAddExperiencia(true);
  };

  useEffect(()=> {
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

  useEffect(()=> {
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

      <UploadCV></UploadCV>
      {/* lateral menu  */}
      <div className="my-4 pb-32">
        <Tabs defaultValue="tab1" className="flex gap-4">
          <TabsList className="flex flex-col lg:w-1/4 h-full p-4 gap-2 bg-white pl-0 items-start">
            <TabsTrigger
              value="tab1"
              className="text-[#D1D1D6] w-full justify-start py-4 text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
            >
              Experiencia laboral
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              className="text-[#D1D1D6] w-full justify-start py-4 text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
            >
              Educación
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              className=" text-[#D1D1D6] w-full justify-start py-4 text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
            >
              Sobre tí
            </TabsTrigger>
            <TabsTrigger
              value="tab4"
              className=" text-[#D1D1D6] w-full justify-start py-4 text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="tab5"
              className=" text-[#D1D1D6] w-full justify-start py-4 text-lg font-bold data-[state=active]:bg-[#D9D9D9] data-[state=active]:text-black rounded-[10px]"
            >
              Documentación extra
            </TabsTrigger>
            <p className="my-8 text-black text-base">Campos obligatorios(*)</p>
          </TabsList>
          <div className="lg:w-3/4">
            <TabsContent value="tab1">
              <div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <p className="font-bold text-lg">Experiencia*</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    onClick={()=>setShowModalAddExperiencia(true)}
                  >
                    <Plus size={20} color="black" className="mr-4" /> Sumar experiencia
                  </Button>
                </div>
                {
                  listExperiencia.map((experiencia: any, index)=>
                    <div className="flex gap-4 p-4">
                      <div className="w-1/4 flex gap-1">
                        <p>{experiencia.desde_mes + "-" + experiencia.desde_ano}</p>
                        <span>-</span>
                        <p>{experiencia.hasta_mes + "-" + experiencia.hasta_ano}</p>
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
                            onClick={()=>editarExperiencia(experiencia)}
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
                  )
                }
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    No cuento con experiencia aún.
                  </label>
                </div>

                <div>
                  <p className="font-bold text-lg">CV*</p>
                  <div className="border border-black border-dashed p-2 flex flex-col items-center">
                    <Image
                      src="/assets/images/ico-upload.png"
                      alt="ico-cv"
                      width={64}
                      height={64}
                    ></Image>
                    <p>Sube tu Curriculum Vitae (CV)</p>
                    <p className="text-xs text-gray-500">DOC,DOCX,PDF(2 MB)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <div className="flex justify-between border-b border-gray-600 py-2">
                <p className="font-bold text-lg">Educación*</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={toggleAddStudy}
                >
                  <Plus size={20} color="black" className="mr-4" /> Agregar estudio
                </Button>
              </div>
              <div>
                {
                  listEducacion.map((educacion: any)=>
                    <div className="flex gap-4 p-4">
                      <div className="w-1/4 flex gap-1">
                        <p>{educacion.desde_mes + "-" + educacion.desde_ano}</p>
                        <span>-</span>
                        <p>{educacion.hasta_mes + "-" + educacion.hasta_ano}</p>
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
                  )
                }
                {/* <div className="flex gap-4 p-4">
                  <div className="w-1/4 flex gap-1">
                    <p>Oct 2022</p>
                    <span>-</span>
                    <p>Actualidad</p>
                  </div>
                  <div className="w-3/4">
                    <p>
                      Massachusetts Institute of Technology Professional
                      Education y ESADE
                    </p>
                    <p>Lima, Perú</p>
                    <div className="flex gap-2 border-b border-black py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[120px] rounded-2xl border-black"
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
                <div className="flex gap-4 p-4">
                  <div className="w-1/4 flex gap-1 text-base">
                    <p>Oct 2022</p>
                    <span>-</span>
                    <p>Actualidad</p>
                  </div>
                  <div className="w-3/4 text-base">
                    <p>
                      Massachusetts Institute of Technology Professional
                      Education y ESADE
                    </p>
                    <p>Lima, Perú</p>
                    <div className="flex gap-2 border-b border-black py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-[120px] rounded-2xl border-black"
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
                </div> */}
              </div>
            </TabsContent>
            <TabsContent value="tab3">
              <div className="flex flex-col gap-2">
                <div>
                  <Select>
                    <p className="text-sm my-2">Grado*</p>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Grado académico</SelectLabel>
                        <SelectItem value="licenciado">Licenciado</SelectItem>
                        <SelectItem value="bachiller">Bachiller</SelectItem>
                        <SelectItem value="Maestro">Maestro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm my-2">Especialidad*</p>
                  <Button onClick={()=>setShowModalAddEspecialidad(true) }>Especialidad</Button>
                  {/* <Select>
                    <p className="text-sm my-2">Especialidad*</p>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Grado académico</SelectLabel>
                        <SelectItem value="licenciado">Licenciado</SelectItem>
                        <SelectItem value="bachiller">Bachiller</SelectItem>
                        <SelectItem value="Maestro">Maestro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select> */}
                </div>
                <div>
                  <p className="text-sm my-2">Sobre ti*</p>
                  <Textarea placeholder="Una pequeña descripción" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab4">
              <div className="flex flex-col gap-2">
                <div className="border-b border-black pb-1">
                  <Select>
                    <p className="text-sm my-2">
                      Tus skills o habilidades duras:
                    </p>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Escribe tus skills" />
                    </SelectTrigger>
                    <p className="text-xs text-right my-1">Máximo 5</p>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Skills</SelectLabel>
                        <SelectItem value="licenciado">Ley privada</SelectItem>
                        <SelectItem value="bachiller">
                          Ley coorporativa
                        </SelectItem>
                        <SelectItem value="Maestro">Ley pública</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border-b border-black pb-1">
                  <Select>
                    <p className="text-sm my-2">
                      Tus skills o habilidades blandas:
                    </p>
                    <SelectTrigger className="border-black">
                      <SelectValue placeholder="Escribe tus skills" />
                    </SelectTrigger>
                    <p className="text-xs text-right my-1">Máximo 5</p>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Skills</SelectLabel>
                        <SelectItem value="licenciado">Ley privada</SelectItem>
                        <SelectItem value="bachiller">
                          Ley coorporativa
                        </SelectItem>
                        <SelectItem value="Maestro">Ley pública</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm my-2">
                    Sugerencias de habilidades blandas
                  </p>
                  <div className="flex flex-row gap-2">
                    <Button
                      variant="outline"
                      className="rounded-full border-black"
                    >
                      Liderazgo y organización
                      <Plus size={20} color="black" className="ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-black"
                    >
                      Conocimientos contracturales
                      <Plus size={20} color="black" className="ml-2" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-black"
                    >
                      Contabilidad financiera
                      <Plus size={20} color="black" className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tab5">
              <div>
                <p>Documentación*</p>
                <div className="mt-2">
                  <div className="border border-black border-dashed p-2 flex flex-col items-center">
                    <Image
                      src="/assets/images/ico-upload.png"
                      alt="ico-cv"
                      width={64}
                      height={64}
                    ></Image>
                    <p>Sube tu Certificado Único Laboral(CUL)</p>
                    <p className="text-xs text-gray-500">DOC,DOCX,PDF(2 MB)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* modal agregar educación */}
      {showModalAddEducacion && (
        <ModalAgregarEducacion 
          showModal={showModalAddEducacion}
          setShowModal={setShowModalAddEducacion}
        />
      )}

      {/* modal agregar servicios */}
      {showModalAddEspecialidad && (
        <ModalagregarEspecialidad
          showModal={showModalAddEspecialidad}
          setShowModal={setShowModalAddEspecialidad}
        />
      )}
      {showModalAddExperiencia && (
        <ModalAgregarExperiencia
          showModal={showModalAddExperiencia}
          setShowModal={setShowModalAddExperiencia}
          setExperienciaSelected={setExperienciaSelected}
          experienciaSelected={experienciaSelected}
        />
      )}
    </div>
  );
};

export default CompleteProfileLawyerPage;
