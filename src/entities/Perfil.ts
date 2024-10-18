import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './Base.entity';
import { IProfile } from '@/interfaces/Profile.interface';
import { UserModel } from './User';

@Entity()
export class PerfilModel extends BaseEntity implements IProfile{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToOne(() => UserModel, user => user.perfil)
  user: UserModel;
}