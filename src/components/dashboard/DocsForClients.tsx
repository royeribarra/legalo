import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Download as IcoDownload } from "lucide-react";

const DocsForClients = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 border border-[#E1E1E1] rounded-[8px] px-3 py-2 justify-between">
      <div className="bg-[#CACACA] h-14 w-14 flex items-center justify-center rounded-full">
        <Image
          src="/icos/ico-cv-file.png"
          alt="ico-cv"
          width={23}
          height={30}
        />
      </div>
      <div className="flex flex-col flex-1">
        <span>Curriculum Vitae</span>
        <span>[nombredeldocumento].pdf</span>
      </div>
      <div>
        <Button variant="outline" size="lg" className="gap-3 h-12 border-black">
          Descargar <IcoDownload />{" "}
        </Button>
      </div>
    </div>
  );
};

export default DocsForClients;
