import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRE_HOST'),
        port: configService.getOrThrow('POSTGRE_PORT'),
        database: configService.getOrThrow('POSTGRE_DATABASE'),
        username: configService.getOrThrow('POSTGRE_USERNAME'),
        password: configService.getOrThrow('POSTGRE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('POSTGRE_SYNCHRONIZE'),
        logging: configService.getOrThrow('POSTGRE_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}