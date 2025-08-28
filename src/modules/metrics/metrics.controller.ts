import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { register, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';

// Configuração das métricas do Prometheus
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total de requisições HTTP',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const activeUsers = new Gauge({
  name: 'active_users_total',
  help: 'Total de usuários ativos',
});

const habitsCreated = new Counter({
  name: 'habits_created_total',
  help: 'Total de hábitos criados',
});

const checkinsTotal = new Counter({
  name: 'checkins_total',
  help: 'Total de check-ins realizados',
});

// Coletar métricas padrão do Node.js
collectDefaultMetrics();

@Controller('metrics')
export class MetricsController {
  constructor(
    private health: HealthCheckService,
    private mongoose: MongooseHealthIndicator,
  ) {}

  @Get()
  async getMetrics() {
    return await register.metrics();
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.mongoose.pingCheck('database'),
    ]);
  }

  // Métodos para expor as métricas customizadas
  static incrementHttpRequests(method: string, route: string, statusCode: number) {
    httpRequestsTotal.inc({ method, route, status_code: statusCode });
  }

  static observeHttpRequestDuration(method: string, route: string, duration: number) {
    httpRequestDuration.observe({ method, route }, duration);
  }

  static setActiveUsers(count: number) {
    activeUsers.set(count);
  }

  static incrementHabitsCreated() {
    habitsCreated.inc();
  }

  static incrementCheckins() {
    checkinsTotal.inc();
  }
}
