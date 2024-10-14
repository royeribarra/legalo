import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { AbogadoModel } from './Abogado';

@Entity()
export class HabilidadModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string

  @ManyToMany(() => AbogadoModel, abogado => abogado.habilidades)
  abogados: AbogadoModel[];
}
