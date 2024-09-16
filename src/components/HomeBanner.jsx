import React from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Briefcase } from 'lucide-react'
import { ChevronRight } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const HomeBanner = () => {
  return (
    <div className="bg-[url('/assets/bg-banner3.jpg')] bg-cover bg-center w-full h-full md:h-[800px]">
      <div className="container mx-auto h-full flex flex-col justify-center">
        <div className="flex items-start justify-center flex-col px-4 md:px-8 max-w-[784px] mb-20">
          <h1 className="text-white text-3xl md:text-6xl mb-10">
            Encuentra a los mejores abogados{' '}
            <span className="italic">especializados</span>
          </h1>
          <div className="w-full max-w-[500px] flex gap-4">
            <Input placeholder="Ejemplo Abogado, Minería, etc." />
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-lg_yellow"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full px-4 md:px-8 mb-8"
        >
          <CarouselContent>
            {Array.from({ length: 15 }).map((_, index) => (
              <CarouselItem key={index} className="max-w-[220px]">
                <div>
                  <Card>
                    <CardHeader>
                      <div className="rounded-full bg-slate-300 h-12 w-12 flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-gray-700" />
                      </div>
                      <CardTitle>Abogado Civil</CardTitle>
                      <CardDescription className="line-clamp-3">
                        Listo para proteger tus contratos, gestionar propiedades
                        y planificar herencias familiares
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="link" className="px-0">
                        Más información
                        <ChevronRight className="h-6 w-6 text-gray-700" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="px-4 md:px-8 flex gap-8 text-white ">
          <p>¿No sabes que especialidad puede ayudarte con tu caso?</p>
          <Link href="">Aberigualo</Link>
        </div>
      </div>
    </div>
  )
}

export default HomeBanner
