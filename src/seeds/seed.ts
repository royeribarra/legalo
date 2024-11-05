// src/seeds/seed.ts
import { AppDataSource } from '../data-source'; // Asegúrate de que esta ruta sea correcta
import { seedUsers } from './UserSeed';

const runSeed = async () => {
  try {
    await AppDataSource.initialize(); // Inicializa la conexión a la base de datos
    await seedUsers();
    console.log('Seed completado.');
    await AppDataSource.destroy(); // Cierra la conexión
  } catch (error) {
    console.error('Error al ejecutar el seed:', error);
  }
};

runSeed();
