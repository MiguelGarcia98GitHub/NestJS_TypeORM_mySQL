import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';

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

        return {
          type: 'mysql',
          database: configService.get<string>('database'),
          username: configService.get<string>('dbusername'),
          host: configService.get<string>('host'),
          password: configService.get<string>('dbpassword'),
          port: configService.get<number>('port'),
          ssl: {
            rejectUnauthorized: false,
          },
          entities: [User],
          synchronize: true,
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
