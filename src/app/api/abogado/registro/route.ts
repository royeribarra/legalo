// src/app/api/users/route.ts
import { AbogadoModel } from '@/entities/Abogado';
import { UserModel } from '@/entities/User';
import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '../../../../data-source';

export async function GET() {
  // Manejar GET request
  return NextResponse.json({ message: 'Get users' });
}

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    
    const email = formData.get("email");
    const lastNames = formData.get("lastNames");
    const location = formData.get("location");
    const names = formData.get("names");
    const password = formData.get("password");

    const especialidad = formData.get("especialidad");
    const estudios = formData.get("estudios");
    const habilidades = formData.get("habilidades");
    const listaEstudios = formData.get("listaEstudios");
    const listaExperiencia = formData.get("listaExperiencia");
    const profileImg = formData.get("profileImg");
    const profileVideo = formData.get("profileVideo");
  
    let parsedEspecialidad = null;
    let parsedEstudios = null;
    let parsedHabilidades = null;
    let parsedListaEstudios = null;
    let parsedListaExperiencia = null;
    
    if (typeof especialidad === 'string') {
        try {
            parsedEspecialidad = JSON.parse(especialidad);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid estudios format' }, { status: 400 });
        }
    }
    if (typeof estudios === 'string') {
        try {
            parsedEstudios = JSON.parse(estudios);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid estudios format' }, { status: 400 });
        }
    }
    if (typeof habilidades === 'string') {
        try {
            parsedHabilidades = JSON.parse(habilidades);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid estudios format' }, { status: 400 });
        }
    }
    if (typeof listaEstudios === 'string') {
        try {
            parsedListaEstudios = JSON.parse(listaEstudios);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid estudios format' }, { status: 400 });
        }
    }
    if (typeof listaExperiencia === 'string') {
        try {
            parsedListaExperiencia = JSON.parse(listaExperiencia);
        } catch (error) {
            return NextResponse.json({ error: 'Invalid estudios format' }, { status: 400 });
        }
    }

    if (profileImg instanceof Blob) {
    //   const imgArrayBuffer = await profileImg.arrayBuffer();
    }
  
    // if (profileVideo instanceof Blob) {
    //   const videoArrayBuffer = await profileVideo.arrayBuffer();
    // }
    await AppDataSource.initialize();
    // const userRepository = AppDataSource.getRepository(UserModel);
    const user = new UserModel();
    user.password = password as string;
    user.email = email as string;

    const abogadoRepository = AppDataSource.getRepository(AbogadoModel);
    const abogado = new AbogadoModel();

    

    abogado.nombres = names as string;
    abogado.apellidos = lastNames as string;
    abogado.direccion = location as string;
    abogado.email = email as string;

    try {
        // const savedAbogado = await abogadoRepository.save(abogado);
    } catch (error) {
        console.error('Error al guardar el abogado:', error);
    }
    
    try {
        const savedAbogado = await abogadoRepository.save(abogado);
        return NextResponse.json({ message: 'Abogado creado', data: savedAbogado }, { status: 201 });
    } catch (error) {
        console.error('Error al guardar el abogado:', error);
        return NextResponse.json({ error: 'Error al crear el abogado' }, { status: 500 });
    }
  
    return NextResponse.json(
      {
        message: 'User created',
        data: {
            parsedEspecialidad,
            parsedEstudios,
            parsedHabilidades,
            parsedListaEstudios,
            parsedListaExperiencia,
            profileImg: profileImg ? "Imagen recibida" : null,
            profileVideo: profileVideo ? "Video recibido" : null,
        },
      },
      { status: 201 }
    );
}
