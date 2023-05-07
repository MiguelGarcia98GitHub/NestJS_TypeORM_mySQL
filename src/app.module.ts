import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // check that .env variables are being injected successfully
        console.log('host:', configService.get<string>('host'));
        console.log('port:', configService.get<number>('port'));
        console.log('dbusername:', configService.get<string>('dbusername'));
        console.log('dbpassword:', configService.get<string>('dbpassword'));
        console.log('database:', configService.get<string>('database'));

        return {
          type: 'mysql',
          host: configService.get<string>('host'),
          port: configService.get<number>('port'),
          username: configService.get<string>('dbusername'),
          password: configService.get<string>('dbpassword'),
          database: configService.get<string>('database'),
          synchronize: true,
          ssl: {
            rejectUnauthorized: false
          }
        };
      }
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}