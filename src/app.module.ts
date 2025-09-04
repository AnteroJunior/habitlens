import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HabitsModule } from './modules/habits/habits.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsInterceptor } from './interceptors/metrics.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    AuthModule,
    HabitsModule,
    MetricsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule {}
