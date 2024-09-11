import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { TrabajoModel } from './Trabajo'; // Importa la entidad Trabajo
import { IOferta } from '@/interfaces/Oferta.interface';
import { ClienteModel } from './Cliente';

@Entity()
export class OfertaModel extends BaseEntity implements IOferta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  titulo: string;

  @Column()
  especializacion_requerida: string;

  @OneToOne(() => ClienteModel, cliente => cliente.oferta)
  cliente: ClienteModel;

  @OneToOne(() => TrabajoModel, trabajo => trabajo.oferta)
  trabajo: TrabajoModel;

  @Column()
  estado: string;
}