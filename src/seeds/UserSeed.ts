import 'dotenv/config';
import { AppDataSource } from '../../src/data-source'; // Asegúrate de importar la conexión correctamente
import { UserModel } from '../entities/User'; // Ajusta la ruta según tu estructura de carpetas
import { PerfilModel } from '../entities/Perfil'; 
import { AbogadoModel } from '../entities/Abogado'; 
import { ClienteModel } from '../entities/Cliente'; 

const usersData = [
  {
    username: 'usuario1',
    email: 'usuario1@example.com',
    password: 'password123',
  },
  {
    username: 'usuario2',
    email: 'usuario2@example.com',
    password: 'password456',
  },
  {
    username: 'usuario3',
    email: 'usuario3@example.com',
    password: 'password789',
  },
];

export const seedUsers = async () => {
  const userRepository = AppDataSource.getRepository(UserModel);
  const perfilRepository = AppDataSource.getRepository(PerfilModel);
  const abogadoRepository = AppDataSource.getRepository(AbogadoModel);
  const clienteRepository = AppDataSource.getRepository(ClienteModel);

  // Limpiar la tabla antes de insertar (opcional)
  await userRepository.clear();

  for (const userData of usersData) {
    // Crear y guardar un perfil, abogado y cliente
    const perfil = perfilRepository.create({
      // Asigna propiedades si es necesario
    });
    await perfilRepository.save(perfil);

    const abogado = abogadoRepository.create({
      // Asigna propiedades si es necesario
    });
    await abogadoRepository.save(abogado);

    const cliente = clienteRepository.create({
      // Asigna propiedades si es necesario
    });
    await clienteRepository.save(cliente);

    // Crear el usuario y asociar las entidades
    const user = userRepository.create({
      ...userData,
      perfil,
      abogado,
      cliente,
    });

    await userRepository.save(user);
    console.log(`Usuario creado: ${user.username}`);
  }

  console.log('Usuarios seedados exitosamente.');
};
