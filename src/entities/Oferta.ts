import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { TrabajoModel } from './Trabajo'; // Importa la entidad Trabajo
import { IOferta } from '@/interfaces/Oferta.interface';
import { ClienteModel } from './Cliente';
import { HabilidadModel } from './Habilidad';
import { AplicacionModel } from './Aplicacion';

@Entity({name:'ofertas'})
export class OfertaModel extends BaseEntity implements IOferta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  titulo: string;

  @Column()
  especializacion_requerida: string;

  @Column()
  estado: string;

  @OneToOne(() => ClienteModel, cliente => cliente.ofertas)
  cliente: ClienteModel;

  @OneToOne(() => TrabajoModel, trabajo => trabajo.oferta)
  trabajo: TrabajoModel;

  @ManyToMany(() => HabilidadModel)
  @JoinTable()
  habilidades_requeridas: HabilidadModel[]

  @OneToMany(() => AplicacionModel, aplicacion => aplicacion.oferta)
  aplicaciones: AplicacionModel[]
}