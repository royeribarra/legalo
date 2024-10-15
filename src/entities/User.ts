import { IUser } from '@/interfaces/User.interface';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { PerfilModel } from './Perfil';
import { AbogadoModel } from './Abogado';
import { ClienteModel } from './Cliente';

@Entity()
export class UserModel extends BaseEntity implements IUser{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => PerfilModel, perfil => perfil.user)
  @JoinColumn()
  perfil: PerfilModel;

  @OneToOne(() => AbogadoModel, abogado => abogado.user)
  @JoinColumn()
  abogado: AbogadoModel;

  @OneToOne(() => ClienteModel, cliente => cliente.user)
  @JoinColumn()
  cliente: ClienteModel;
}