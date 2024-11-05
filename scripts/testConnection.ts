import 'dotenv/config';
import { AppDataSource } from '../src/data-source';

const testConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Conexión exitosa a la base de datos.');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error en la conexión:', error);
  }
};

testConnection();
