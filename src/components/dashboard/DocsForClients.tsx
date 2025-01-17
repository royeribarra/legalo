import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Download as IcoDownload } from "lucide-react";
import Link from "next/link";

const DocsForClients = ({documento = "defecto", nombre = "defecto"}:{documento: string | null, nombre: string}) => {
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
        <span>{nombre}</span>
        {/* <span>[nombredeldocumento].pdf</span> */}
      </div>
      <div>
        <Link href={`${process.env.S3_FILE_ROUTE}/${documento}`} target="_blank">
          <Button variant="outline" size="lg" className="gap-3 h-12 border-black">
            Ver <IcoDownload />{" "}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DocsForClients;
