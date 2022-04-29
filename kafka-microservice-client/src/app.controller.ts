import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserDto } from './user.dto';

@Controller('users')
export class AppController implements OnModuleInit{
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['127.0.0.1:9092']
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true
      }
    }
  })
  private client: ClientKafka

  async onModuleInit() {
    let requestPatterns = ['find-all-users']

    requestPatterns.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern)

      await this.client.connect()
    })
  }

  @Get()
  findAll() : Observable<UserDto[]>{
    console.log('get')
    return this.client.send('find-all-users', {});
  }

  @Post()
  createUser(@Body() user: UserDto) {
    console.log('post')
    return this.client.emit('create-users', user)
  }
}
