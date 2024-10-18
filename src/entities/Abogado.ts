
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { IAbogado } from '@/interfaces/Abogado.interface';
import { UserModel } from './User';
import { HabilidadModel } from './Habilidad';
import { TrabajoModel } from './Trabajo';
import { AplicacionModel } from './Aplicacion';

@Entity({name:'abogados'})
export class AbogadoModel extends BaseEntity implements IAbogado
{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => UserModel, user => user.abogado)
    @JoinColumn()
    user: UserModel;

    @Column()
    nombre: string;

    @Column()
    apellido_paterno: string;

    @Column()
    apellido_materno: string;

    @Column()
    dni: string;

    @Column()
    fecha_nacimiento: string;

    @Column()
    universidad: string;

    @Column()
    grade_academico: string;

    @Column()
    acerca_de: string;

    @Column()
    telefono: string;

    @Column()
    direccion: string;

    @Column()
    especializacion: string;

    @Column()
    industria: string;

    @Column()
    experiencia: string;

    @Column()
    experiencia_anos: string;

    @Column()
    pdf_cv: string;

    @ManyToMany(() => HabilidadModel, habilidad => habilidad.abogados)
    @JoinTable()
    habilidades: HabilidadModel[];

    @OneToMany(() => TrabajoModel, trabajo => trabajo.cliente)
    trabajos: TrabajoModel[];

    @OneToMany(() => AplicacionModel, aplicacion => aplicacion.abogado)
    aplicaciones: AplicacionModel[]
}