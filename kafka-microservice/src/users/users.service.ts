import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
;


@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>
  ) {}

  async findAll() {
    let users = await this.userEntity.find({select: ['id', 'name', 'email']})

    if(users.length > 0) return users

    return {error: 'Nenhum usuário encontrado', statusCode: 406}
  }

  async create(body: UserDto) {
    let userExists = await this.userEntity.findOne({where: {email: body.email}})

    if(!userExists) {
      await this.userEntity.save(this.userEntity.create(body as DeepPartial<UserEntity>))
      
      return {message: 'Usuário criado com sucesso', statusCode: 201}
    }

    return {error: 'Usuário já existe', statusCode: 406}
  }
}
