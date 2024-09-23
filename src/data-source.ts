import { DataSource, DataSourceOptions } from 'typeorm';
import { UserModel } from './entities/User';
import { PerfilModel } from './entities/Perfil';
import { AbogadoModel } from './entities/Abogado';
import { ClienteModel } from './entities/Cliente';
import { OfertaModel } from './entities/Oferta';
import { TrabajoModel } from './entities/Trabajo';
import { HabilidadModel } from './entities/Habilidad';

require('dotenv').config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Legalo',
  entities: [
    UserModel, PerfilModel, AbogadoModel, ClienteModel, OfertaModel, TrabajoModel, HabilidadModel
  ],
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
  migrationsRun: false,
  logging: false,
});
