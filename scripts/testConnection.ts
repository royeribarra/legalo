import { createConnection } from 'typeorm';

async function testConnection() {
  try {
    // Crea una conexión utilizando la configuración por defecto de TypeORM
    const connection = await createConnection();
    console.log('Conexión a MySQL establecida correctamente!');
    
    // Cierra la conexión después de la prueba
    await connection.close();
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
  }
}

testConnection();
