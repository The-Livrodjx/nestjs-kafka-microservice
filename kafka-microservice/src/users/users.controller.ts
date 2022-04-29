import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UsersController.name)

  @MessagePattern('find-all-users')
  index() : Promise<UserEntity[]> | Promise<any>{
    return this.userService.findAll();
  }

  @MessagePattern('create-users')
  create(@Payload() data) : Promise<UserEntity> | Promise<any> {
    this.logger.log(`User: ${JSON.stringify(data)}`)

    return this.userService.create(data.value)
  }
}
