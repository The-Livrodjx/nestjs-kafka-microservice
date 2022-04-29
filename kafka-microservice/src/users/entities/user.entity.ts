import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  @BeforeUpdate()
  async hashPassword2() {
    this.password = await bcrypt.hash(this.password, 12);
  }

}