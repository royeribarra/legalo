import { IUser } from '@/interfaces/User.interface';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { ITrabajo } from '@/interfaces/Trabajo.interface';
import { OfertaModel } from './Oferta';
import { AbogadoModel } from './Abogado';
import { ClienteModel } from './Cliente';

@Entity()
export class TrabajoModel extends BaseEntity implements ITrabajo{
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => OfertaModel, oferta => oferta.trabajo)
    oferta: OfertaModel;
  
    @ManyToOne(() => AbogadoModel, abogado => abogado.trabajos, { nullable: false })
    abogado: AbogadoModel;
  
    @ManyToOne(() => ClienteModel, cliente => cliente.trabajos, { nullable: false })
    cliente: ClienteModel;
  
    @Column()
    estado: number;
}