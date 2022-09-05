import { RequestTimeoutException } from "src/common";
import { Observable, timeout, catchError, TimeoutError, throwError } from "rxjs";
import { Injectable } from "src/common/decorators";
import { CallHandler, ExecutionContext, NestInterceptor } from "src/common/interfaces";
// https://juejin.cn/post/7097941883778777125?share_token=59cbb38c-6056-4c86-8793-2b05392ce727
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(300),
      catchError((err) => {  // 捕获流中的错误
        if(err instanceof TimeoutError){
          return throwError(() => new RequestTimeoutException())
        }
        return throwError(() => err);
      }),
    );
  }
}