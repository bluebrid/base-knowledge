import { Logger } from '../../common/services/logger.service';
import { ExceptionsHandler } from '../exceptions/exceptions-handler';
import { ExecutionContextHost } from '../helpers/execution-context-host';

export type RouterProxyCallback = <TRequest, TResponse>(
  req?: TRequest,
  res?: TResponse,
  next?: () => void,
) => void;

export class RouterProxy {
  public createProxy(
    targetCallback: RouterProxyCallback,
    exceptionsHandler: ExceptionsHandler,
  ) {
    new Logger(RouterProxy.name).debug('路由代理，路由都从这里入口')
    return async <TRequest, TResponse>(
      req: TRequest,
      res: TResponse,
      next: () => void,
    ) => {
      try {
        await targetCallback(req, res, next);
      } catch (e) {
        const host = new ExecutionContextHost([req, res, next]);
        new Logger(RouterProxy.name).debug('try catch 路由的错误，并且执行Filters')
        exceptionsHandler.next(e, host);
      }
    };
  }

  public createExceptionLayerProxy(
    targetCallback: <TError, TRequest, TResponse>(
      err: TError,
      req: TRequest,
      res: TResponse,
      next: () => void,
    ) => void,
    exceptionsHandler: ExceptionsHandler,
  ) {
    return async <TError, TRequest, TResponse>(
      err: TError,
      req: TRequest,
      res: TResponse,
      next: () => void,
    ) => {
      try {
        await targetCallback(err, req, res, next);
      } catch (e) {
        const host = new ExecutionContextHost([req, res, next]);
        exceptionsHandler.next(e, host);
      }
    };
  }
}
