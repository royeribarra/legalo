import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { BaseEntity } from "./Base.entity"
import { AbogadoModel } from "./Abogado"
import { OfertaModel } from "./Oferta"

@Entity()
export class AplicacionModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    propuesta: string

    @Column()
    precio_propuesto: number

    @ManyToOne(() => AbogadoModel, abogado => abogado.aplicaciones)
    abogado: AbogadoModel

    @ManyToOne(() => OfertaModel, oferta => oferta.aplicaciones)
    oferta: OfertaModel
}