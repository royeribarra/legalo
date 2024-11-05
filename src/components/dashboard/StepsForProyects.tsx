import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface StepsForProyectsProps {
  step: string;
  imageUrl: string;
  title: string;
  text: string;
}

const StepsForProyects: React.FC<StepsForProyectsProps> = ({
  step,
  imageUrl,
  title,
  text,
}) => {
  return (
    <Card className="min-w-[262px] max-w-[310px] border-none shadow-none">
      <CardHeader className="relative">
        <div className="rounded-full bg-lg-lawyer h-8 w-8 flex items-center justify-center absolute top-4 left-4">
          {step}
        </div>
        <div className="w-full h-auto flex justify-center ">
          <Image
            src={imageUrl}
            alt="Regístrate"
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <CardTitle className="font-tiempos lg:text-[32px] lg:pt-4">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-4 text-lg text-black">
          {text}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StepsForProyects;
