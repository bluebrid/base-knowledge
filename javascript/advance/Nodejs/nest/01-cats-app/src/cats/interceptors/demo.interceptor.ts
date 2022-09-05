import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '../../common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class DemoLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      console.log('Demo Before...');
  
      const now = Date.now();
      return next
        .handle()
        .pipe(tap(() => console.log(`Demo After... ${Date.now() - now}ms`)));
    }
  }
  