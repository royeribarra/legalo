"use client";

import { Progress } from "@/components/ui/progress";
// import Link from "next/link";
import React, { useRef, useState } from "react";
// import { useState } from "react";
import { Upload } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { X } from "lucide-react";
import { Check } from "lucide-react";
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

const UploadCV = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Crea una referencia para el input de archivo

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];

      if (!validTypes.includes(selectedFile.type)) {
        alert('Por favor, sube un archivo PDF o DOC/DOCX.');
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
            Ahorra tiempo importando tu CV, CUL o perfil de LinkedIn en
            formato PDF, Doc, Dox.
          </p>
        </div>
        <div className="w-full flex items-center justify-end lg:w-1/5">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            onChange={handleFileChange}
            style={{ display: 'none' }} // Oculta el input de archivo
            ref={fileInputRef} // Asocia la referencia al input
          />
          <Button onClick={handleButtonClick}> {/* Asocia el clic del botón al input */}
            Importa tu CV <Upload size={18} color="white" className="ml-2" />
          </Button>
        </div>
      </div>
      {uploadSuccess && ( // Muestra el mensaje de éxito
        <div className="flex flex-col bg-[#D9D9D9] rounded-lg p-2 gap-2 mt-2">
          <div className="flex justify-between">
            <div>
              <p className="font-bold">Autocompletado con éxito</p>
              <p>Revisa la información que ha sido completada automáticamente</p>
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
      const video = document.createElement('video');

      video.src = videoUrl;
      video.onloadedmetadata = () => {
        const duration = video.duration; // Duración en segundos
        const sizeInMB = file.size / (1024 * 1024); // Tamaño en MB

        if (duration > 60) {
          setError('El video debe ser de máximo 1 minuto de duración.');
          setVideoFile(null);
        } else if (sizeInMB > 10) { // Puedes ajustar el límite de tamaño aquí (10 MB en este caso)
          setError('El tamaño del video debe ser menor a 10 MB.');
          setVideoFile(null);
        } else {
          setError(null);
          setVideoFile(file); // Guardar el archivo si pasa las validaciones
        }
      };
    }
  };

  const handleButtonClick = () => {
    const input = document.getElementById('video-upload') as HTMLInputElement;
    if (input) {
      input.click(); // Activa el input de archivo al hacer clic en el botón
    }
  };

  return (
    <div className="w-full lg:w-1/5 flex flex-col flex-center justify-center items-center">
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
        style={{ display: 'none' }} // Oculta el input de archivo
        id="video-upload" // ID para el label
      />
      <Button variant="link" onClick={handleButtonClick}>
        Sube un video tuyo
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mostrar errores */}
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
    <div className="w-full lg:w-1/5 flex flex-col items-center gap-2">
      <Image
        src={selectedImage ? URL.createObjectURL(selectedImage) : "/assets/images/ico-photo-perfil.png"} // Usa la URL del objeto para mostrar la imagen
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
      <Button size="sm" variant="outline" className="rounded-full" onClick={handleButtonClick}>
        Sube una imagen*
      </Button>
    </div>
  );
};

const IndustrySelect = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    // Verifica si el servicio ya está seleccionado
    if (!selectedServices.includes(value)) {
      setSelectedServices([...selectedServices, value]);
    }
  };

  const handleRemove = (value: string) => {
    setSelectedServices(selectedServices.filter((service) => service !== value));
  };

  const services = [
    { value: "banca", label: "Banca" },
    { value: "academico", label: "Académico" },
    { value: "juicios", label: "Juicios" },
  ];

  const handleRemoveAll = (event: React.MouseEvent) => {
    setSelectedServices([]); // Limpia todas las selecciones
  };

  return (
    <div className="w-full lg:w-1/2">
      <p className="text-sm my-2">Industria</p>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="flex flex-wrap items-center">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Servicios</SelectLabel>
            {services
              .filter((service) => !selectedServices.includes(service.value)) // Filtra los servicios seleccionados
              .map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            {/* Opción "Quitar todos" solo si todos están seleccionados */}
            {selectedServices.length === services.length && (
              <SelectItem value="remove-all" onClick={handleRemoveAll}>
                Quitar todos
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-wrap mt-2">
        {selectedServices.map((service) => (
          <span
            key={service}
            className="bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
          >
            {services.find((s) => s.value === service)?.label}
            <button
              onClick={() => handleRemove(service)}
              className="ml-2 text-white focus:outline-none"
            >
              &times; {/* Icono de cierre */}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const ServiceSelect = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    // Verifica si el servicio ya está seleccionado
    if (!selectedServices.includes(value)) {
      setSelectedServices([...selectedServices, value]);
    }
  };

  const handleRemove = (value: string) => {
    setSelectedServices(selectedServices.filter((service) => service !== value));
  };

  const services = ["asesoria", "escritos", "juicios"];

  return (
    <div className="w-full lg:w-1/2">
      <p className="text-sm my-2">¿Cuáles son los servicios que ofreces?*</p>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="flex flex-wrap items-center">
          <SelectValue placeholder="Seleccionar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Servicios</SelectLabel>
            {services
              .filter((service) => !selectedServices.includes(service)) // Filtra los servicios seleccionados
              .map((service) => (
                <SelectItem key={service} value={service}>
                  {service === "asesoria" && "Consultoría"}
                  {service === "escritos" && "Investigación"}
                  {service === "juicios" && "Litigios"}
                </SelectItem>
              ))}
              {selectedServices.length === services.length && (
                <div className="p-2 text-green-500 text-sm">
                  Todos fueron seleccionados
                </div>
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-wrap mt-2">
        {selectedServices.map((service) => (
          <span
            key={service}
            className="bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2 flex items-center"
          >
            {service === "asesoria" && "Consultoría"}
            {service === "escritos" && "Investigación"}
            {service === "juicios" && "Litigios"}
            <button
              onClick={() => handleRemove(service)}
              className="ml-2 text-white focus:outline-none"
            >
              &times; {/* Icono de cierre */}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const CompleteProfileLawyerPage = () => {
  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-[1000px]">
      <div className="max-w-[680px] mb-4 mx-auto">
        <Progress value={100} className="mb-2" />
        <p className="text-center">Paso 3/3</p>
      </div>
      <div>
        <p>Campos obligatorios(*)</p>
      </div>
      <div className="border border-black p-5 my-4 rounded-xl flex flex-col md:flex-row gap-4">

        {/* <div className="w-full lg:w-1/5 flex flex-col items-center gap-2">
          <Image
            src="/assets/images/ico-photo-perfil.png"
            alt="ico-photo-perfil"
            width={96}
            height={96}
            className=""
          />
          <Button size="sm" variant="outline" className="rounded-full">
            Sube una imagen*
          </Button>
        </div> */}
        <ImageUpload></ImageUpload>

        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          <p className="font-bold">JUAN A.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <ServiceSelect></ServiceSelect>

            <IndustrySelect></IndustrySelect>
          </div>
        </div>
        <VideoUpload></VideoUpload>
      </div>

      {/* <div className="border border-black p-5 border-dashed ">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-4/5">
            <p>
              Ahorra tiempo importando tu CV, CUL o perfil de LinkedIn en
              formato PDF, Doc, Dox.
            </p>
          </div>
          <div className="w-full flex items-center justify-end lg:w-1/5">
            <Button>
              Importa tu CV <Upload size={18} color="white" className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between bg-[#D9D9D9] rounded-lg p-2 gap-2 mt-2">
          <div className="w-[60px] flex justify-center items-center">
            <Check
              size={40}
              color="black"
              className="border rounded-full bg-lg_yellow p-2"
            />
          </div>
          <div className="w-full">
            <p className="font-bold">Autocompletado con éxito</p>
            <p>Revisa la información que ha sido completada automáticamente</p>
          </div>
          <div className="w-[60px] flex justify-center items-center">
            <Button variant="link">
              <Image
                src="/icos/close-x-circle.png"
                alt="ico-cv"
                width={24}
                height={24}
              ></Image>
            </Button>
          </div>
        </div>
      </div> */}

      <UploadCV></UploadCV>

      <div className="my-4">
        <Tabs defaultValue="tab1" className="flex gap-4">
          <TabsList className="flex flex-col lg:w-1/4 h-full p-4 gap-2">
            <TabsTrigger value="tab1" className="w-full justify-start py-4">
              Experiencia laboral
            </TabsTrigger>
            <TabsTrigger value="tab2" className="w-full justify-start py-4">
              Educación
            </TabsTrigger>
            <TabsTrigger value="tab3" className="w-full justify-start py-4">
              Sobre tí
            </TabsTrigger>
            <TabsTrigger value="tab4" className="w-full justify-start py-4">
              Skills
            </TabsTrigger>
            <TabsTrigger value="tab5" className="w-full justify-start py-4">
              Documentación extra
            </TabsTrigger>
          </TabsList>
          <div className="lg:w-3/4">
            <TabsContent value="tab1">
              <div>
                <p className="font-bold text-base">Experiencia*</p>
                <div className="border border-black border-dashed p-4 flex justify-center my-2">
                  <Button variant="link">
                    <Plus
                      size={20}
                      color="black"
                      className="mr-4  border border-black rounded-full"
                    />{" "}
                    Sumar experiencia
                  </Button>
                </div>
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
                  <p className="font-bold text-xl">CV*</p>
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
                <p className="font-bold text-base">Educación*</p>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Plus size={20} color="black" className="mr-4" /> Agregar
                  estudio
                </Button>
              </div>
              <div>
                <div className="flex gap-4 p-4">
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
                </div>
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
                  <Select>
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
                  </Select>
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
      <div className="pb-32">
        <p>Campos Obligatorios*</p>
      </div>
    </div>
  );
};

export default CompleteProfileLawyerPage;
