import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

let ENV = process.env.NODE_ENV;

if (ENV) {
  ENV = ENV.trim();
}

const config : ConfigModuleOptions = {
  envFilePath: [`${!ENV ? '.env' : '.env.' + ENV}`],
  isGlobal: true
}

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        
        return {
          type: 'mysql',
          database: config.get('DATABASE'),
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          entities: [UserEntity],
          synchronize: true
        } as TypeOrmModuleOptions
      }
    }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
