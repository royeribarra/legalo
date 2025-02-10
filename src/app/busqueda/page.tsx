"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Search as IcoSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BusquedaOferta from "@/components/busqueda/busquedaOferta";
import BusquedaAbogado from "@/components/busqueda/busquedaAbogado";

const DashboardClientPage = () => {
  const [serviceTipe, setServiceTipe] = useState<string>("client");
  const [searchQuery, setSearchQuery] = useState("");
  const updateServiceTipe = (newType: string) => {
    setServiceTipe(newType);
  };
  const [openFilter, setOpenFilter] = useState(true);
  const [menuActive, setMenuActive] = useState("oportunidades");

  const menuItems = [
    { id: "talentos", texto: "Talentos" },
    { id: "oportunidades", texto: "Oportunidades" },
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setOpenFilter(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setOpenFilter(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchAbogado = () => {
    console.log(searchQuery)
  };

  return (
    <div>
      <Header serviceTipe={serviceTipe} updateServiceTipe={updateServiceTipe} />
      <div className="px-4 py-4 lg:px-16 lg:py-8 max-w-[1920px] mx-auto">
        <div className="flex justify-between flex-col-reverse lg:flex-row gap-4 ">
          <div>
            <p className="pb-2">Búsqueda por palabra clave</p>
            <div className="flex items-center gap-4 border border-black rounded-full h-12 px-4 lg:w-[553px]">
              <IcoSearch size={24} />
              <input
                type="text"
                placeholder="Escribe..."
                className=""
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchAbogado();
                  }
                }}
              />
              {/* <Input
                placeholder="Ejemplo Abogado, Minería, etc."
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchAbogado();
                  }
                }}
                className="rounded-[30px] border border-black px-[30px] py-[12px] focus-visible:border-none h-12"
              /> */}
            </div>
          </div>
          {/* <InfoNominations /> */}
        </div>

        <div className="mt-8">
          <div className="border-b-2 border-[#808080] flex w-full overflow-auto lg:overflow-auto">
            {menuItems.map((boton) => (
              <Button
                key={boton.id}
                variant={menuActive === boton.id ? "dashActive" : "dashInActive"}
                onClick={() => setMenuActive(boton.id)}
              >
                {boton.texto}
              </Button>
            ))}
          </div>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              {menuActive === "talentos" && <BusquedaAbogado searchButton={searchQuery} />}
            </Suspense>
            {menuActive === "oportunidades" && (
              <BusquedaOferta></BusquedaOferta>
            )}
          </div>
        </div>
        {/* <ModalInviteProyect 
          inviteProyect={inviteProyect} 
          abogados={abogados} 
          abogadoPrevioInvitado={abogadoPrevioInvitado}
          onModalClosed={() => setInviteProyectModal(false)}
          isOpen={inviteProyectModal}
        /> */}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardClientPage;
