
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { IAbogado } from '@/interfaces/Abogado.interface';
import { UserModel } from './User';
import { ICliente } from '@/interfaces/Cliente.interface';
import { TrabajoModel } from './Trabajo';
import { OfertaModel } from './Oferta';

@Entity({name:'clientes'})
export class ClienteModel extends BaseEntity implements ICliente
{
    @Column()
    nombre: string;

    @Column()
    tipo_persona_id: number;

    @Column()
    razon_social: string;

    @Column()
    persona_contacto: string;

    @Column({unique: true})
    dni_contacto: string;

    @Column({nullable: true})
    ruc: string;

    @Column()
    industria: string;

    @Column()
    telefono: string;

    @Column()
    direccion: string;

    @Column({nullable: true})
    telefono_contacto: string;

    @OneToOne(() => UserModel, user => user.cliente)
    @JoinColumn()
    user: UserModel;

    @OneToMany(() => OfertaModel, oferta => oferta.cliente)
    ofertas: OfertaModel[]

    @OneToMany(() => TrabajoModel, trabajo => trabajo.cliente)
    trabajos: TrabajoModel[];
}