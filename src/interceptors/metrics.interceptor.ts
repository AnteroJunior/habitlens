import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsController } from '../modules/metrics/metrics.controller';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const method = request.method;
    const route = request.route?.path || 'unknown';
    
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = (Date.now() - startTime) / 1000; // Convert to seconds
        const statusCode = response.statusCode;

        // Incrementar contador de requisições
        MetricsController.incrementHttpRequests(method, route, statusCode);
        
        // Observar duração da requisição
        MetricsController.observeHttpRequestDuration(method, route, duration);
      }),
    );
  }
}
