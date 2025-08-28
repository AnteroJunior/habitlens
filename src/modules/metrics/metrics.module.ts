import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [MetricsController],
})
export class MetricsModule {}
