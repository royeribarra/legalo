import { Button } from "@/components/ui/button"
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const HomeMain = () => {
  return (
    <>
      <div className="container p-4 md:p-8 mx-auto flex justify-center flex-col items-center h-[860px]">
        <div className="flex gap-2 mb-20">
          <Button>Necesito un abogado</Button>
          <Button variant="outline">Buscar oportunidades</Button>
        </div>
        <div className="flex max-w-[1200px] gap-[70px] overflow-hidden flex-wrap justify-center">
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image 
                    src="/assets/img-register.webp" 
                    alt="Regístrate" 
                    width={107} 
                    height={107} 
                    className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className='line-clamp-3'>Crea una cuenta en pocos pasos y accede a nuestra amplia red de abogados.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image 
                    src="/assets/img-create.webp" 
                    alt="Regístrate" 
                    width={107} 
                    height={107} 
                    className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className='line-clamp-3'>Crea una cuenta en pocos pasos y accede a nuestra amplia red de abogados.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image 
                    src="/assets/img-explore.webp" 
                    alt="Regístrate" 
                    width={107} 
                    height={107} 
                    className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className='line-clamp-3'>Crea una cuenta en pocos pasos y accede a nuestra amplia red de abogados.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image 
                    src="/assets/img-contact.webp" 
                    alt="Regístrate" 
                    width={107} 
                    height={107} 
                    className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className='line-clamp-3'>Crea una cuenta en pocos pasos y accede a nuestra amplia red de abogados.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="max-w-[310px] border-none">
            <CardHeader className="relative">
              <div className="rounded-full bg-lg_yellow h-8 w-8 flex items-center justify-center absolute top-4 left-4">
                1
              </div>
              <div className="w-full h-auto flex justify-center">
                <Image 
                    src="/assets/img-resolv.webp" 
                    alt="Regístrate" 
                    width={107} 
                    height={107} 
                    className="rounded-lg"
                />
              </div>
              <CardTitle>Regístrate gratis</CardTitle>
              <CardDescription className='line-clamp-3'>Crea una cuenta en pocos pasos y accede a nuestra amplia red de abogados.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <div className="h-[584px] flex">
        <div className="w-1/2 bg-[#1E1E1E]">
          1
        </div>
        <div className="w-1/2 bg-lg_yellow">
          2
        </div>
      </div>

    </>
  )
}

export default HomeMain