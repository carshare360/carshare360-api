import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { Vehicle } from './vehicles/entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VehiclesModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    VehiclesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/images/',
    }),

    TypeOrmModule.forFeature([Vehicle]),
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
