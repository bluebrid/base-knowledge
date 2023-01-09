import {
  CanActivate,
  ForbiddenException,
  HttpServer,
  Logger,
  ParamData,
  PipeTransform,
  RequestMethod,
} from "@nestjs/common";
import {
  CUSTOM_ROUTE_ARGS_METADATA,
  HEADERS_METADATA,
  HTTP_CODE_METADATA,
  REDIRECT_METADATA,
  RENDER_METADATA,
  ROUTE_ARGS_METADATA,
  SSE_METADATA,
} from "@nestjs/common/constants";
import { RouteParamMetadata } from "@nestjs/common/decorators";
import { RouteParamtypes } from "@nestjs/common/enums/route-paramtypes.enum";
import { ContextType, Controller } from "@nestjs/common/interfaces";
import { isEmpty, isString } from "@nestjs/common/utils/shared.utils";
import { IncomingMessage } from "http";
import { Observable } from "rxjs";
import { FORBIDDEN_MESSAGE } from "../guards/constants";
import { GuardsConsumer } from "../guards/guards-consumer";
import { GuardsContextCreator } from "../guards/guards-context-creator";
import { ContextUtils } from "../helpers/context-utils";
import { ExecutionContextHost } from "../helpers/execution-context-host";
import {
  HandleResponseFn,
  HandlerMetadata,
  HandlerMetadataStorage,
  HandlerResponseBasicFn,
} from "../helpers/handler-metadata-storage";
import { STATIC_CONTEXT } from "../injector/constants";
import { InterceptorsConsumer } from "../interceptors/interceptors-consumer";
import { InterceptorsContextCreator } from "../interceptors/interceptors-context-creator";
import { PipesConsumer } from "../pipes/pipes-consumer";
import { PipesContextCreator } from "../pipes/pipes-context-creator";
import { IRouteParamsFactory } from "./interfaces/route-params-factory.interface";
import {
  CustomHeader,
  RedirectResponse,
  RouterResponseController,
} from "./router-response-controller";
import { HeaderStream } from "./sse-stream";

export interface ParamProperties {
  index: number;
  type: RouteParamtypes | string;
  data: ParamData;
  pipes: PipeTransform[];
  extractValue: <TRequest, TResponse>(
    req: TRequest,
    res: TResponse,
    next: Function
  ) => any;
}

export class RouterExecutionContext {
  private readonly handlerMetadataStorage = new HandlerMetadataStorage();
  private readonly contextUtils = new ContextUtils();
  private readonly responseController: RouterResponseController;
  private readonly logger: Logger;
  constructor(
    private readonly paramsFactory: IRouteParamsFactory,
    private readonly pipesContextCreator: PipesContextCreator,
    private readonly pipesConsumer: PipesConsumer,
    private readonly guardsContextCreator: GuardsContextCreator,
    private readonly guardsConsumer: GuardsConsumer,
    private readonly interceptorsContextCreator: InterceptorsContextCreator,
    private readonly interceptorsConsumer: InterceptorsConsumer,
    readonly applicationRef: HttpServer
  ) {
    this.responseController = new RouterResponseController(applicationRef);
    this.logger = new Logger(RouterExecutionContext.name);
  }

  public create(
    instance: Controller,
    callback: (...args: any[]) => unknown,
    methodName: string,
    moduleKey: string,
    requestMethod: RequestMethod,
    contextId = STATIC_CONTEXT,
    inquirerId?: string
  ) {
    this.logger.debug("创建Router执行上下文");
    const contextType: ContextType = "http";
    const {
      argsLength,
      fnHandleResponse,
      paramtypes,
      getParamsMetadata,
      httpStatusCode,
      responseHeaders,
      hasCustomHeaders,
    } = this.getMetadata(
      instance,
      callback,
      methodName,
      moduleKey,
      requestMethod,
      contextType
    );

    const paramsOptions = this.contextUtils.mergeParamsMetatypes(
      getParamsMetadata(moduleKey, contextId, inquirerId),
      paramtypes
    );
    const pipes = this.pipesContextCreator.create(
      instance,
      callback,
      moduleKey,
      contextId,
      inquirerId
    );
    const guards = this.guardsContextCreator.create(
      instance,
      callback,
      moduleKey,
      contextId,
      inquirerId
    );
    const interceptors = this.interceptorsContextCreator.create(
      instance,
      callback,
      moduleKey,
      contextId,
      inquirerId
    );

    const fnCanActivate = this.createGuardsFn(
      guards,
      instance,
      callback,
      contextType
    );
    const fnApplyPipes = this.createPipesFn(pipes, paramsOptions);

    const handler =
      <TRequest, TResponse>(
        args: any[],
        req: TRequest,
        res: TResponse,
        next: Function
      ) =>
      async () => {
        this.logger.debug("2. 执行pipe");
        fnApplyPipes && (await fnApplyPipes(args, req, res, next));
        return callback.apply(instance, args);
      };

    return async <TRequest, TResponse>(
      req: TRequest,
      res: TResponse,
      next: Function
    ) => {
      const args = this.contextUtils.createNullArray(argsLength);
      this.logger.debug("1. 执行Guards守卫");
      fnCanActivate && (await fnCanActivate([req, res, next]));

      this.responseController.setStatus(res, httpStatusCode);
      hasCustomHeaders &&
        this.responseController.setHeaders(res, responseHeaders);
      this.logger.debug("3. 执行拦截器");
      const result = await this.interceptorsConsumer.intercept(
        interceptors,
        [req, res, next],
        instance,
        callback,
        handler(args, req, res, next), // 这里会去执行Pipe
        contextType
      );
      await (fnHandleResponse as HandlerResponseBasicFn)(result, res, req);
    };
  }

  public getMetadata<TContext extends ContextType = ContextType>(
    instance: Controller,
    callback: (...args: any[]) => any,
    methodName: string,
    moduleKey: string,
    requestMethod: RequestMethod,
    contextType: TContext
  ): HandlerMetadata {
    const cacheMetadata = this.handlerMetadataStorage.get(instance, methodName);
    if (cacheMetadata) {
      return cacheMetadata;
    }
    const metadata =
      this.contextUtils.reflectCallbackMetadata(
        instance,
        methodName,
        ROUTE_ARGS_METADATA
      ) || {};
    const keys = Object.keys(metadata);
    const argsLength = this.contextUtils.getArgumentsLength(keys, metadata);
    const paramtypes = this.contextUtils.reflectCallbackParamtypes(
      instance,
      methodName
    );

    const contextFactory = this.contextUtils.getContextFactory(
      contextType,
      instance,
      callback
    );
    const getParamsMetadata = (
      moduleKey: string,
      contextId = STATIC_CONTEXT,
      inquirerId?: string
    ) =>
      this.exchangeKeysForValues(
        keys,
        metadata,
        moduleKey,
        contextId,
        inquirerId,
        contextFactory
      );

    const paramsMetadata = getParamsMetadata(moduleKey);
    const isResponseHandled = this.isResponseHandled(
      instance,
      methodName,
      paramsMetadata
    );

    const httpRedirectResponse = this.reflectRedirect(callback);
    const fnHandleResponse = this.createHandleResponseFn(
      callback,
      isResponseHandled,
      httpRedirectResponse
    );

    const httpCode = this.reflectHttpStatusCode(callback);
    const httpStatusCode = httpCode
      ? httpCode
      : this.responseController.getStatusByMethod(requestMethod);

    const responseHeaders = this.reflectResponseHeaders(callback);
    const hasCustomHeaders = !isEmpty(responseHeaders);
    const handlerMetadata: HandlerMetadata = {
      argsLength,
      fnHandleResponse,
      paramtypes,
      getParamsMetadata,
      httpStatusCode,
      hasCustomHeaders,
      responseHeaders,
    };
    this.handlerMetadataStorage.set(instance, methodName, handlerMetadata);
    return handlerMetadata;
  }

  public reflectRedirect(
    callback: (...args: unknown[]) => unknown
  ): RedirectResponse {
    return Reflect.getMetadata(REDIRECT_METADATA, callback);
  }

  public reflectHttpStatusCode(
    callback: (...args: unknown[]) => unknown
  ): number {
    return Reflect.getMetadata(HTTP_CODE_METADATA, callback);
  }

  public reflectRenderTemplate(
    callback: (...args: unknown[]) => unknown
  ): string {
    return Reflect.getMetadata(RENDER_METADATA, callback);
  }

  public reflectResponseHeaders(
    callback: (...args: unknown[]) => unknown
  ): CustomHeader[] {
    return Reflect.getMetadata(HEADERS_METADATA, callback) || [];
  }

  public reflectSse(callback: (...args: unknown[]) => unknown): string {
    return Reflect.getMetadata(SSE_METADATA, callback);
  }

  public exchangeKeysForValues(
    keys: string[],
    metadata: Record<number, RouteParamMetadata>,
    moduleContext: string,
    contextId = STATIC_CONTEXT,
    inquirerId?: string,
    contextFactory?: (args: unknown[]) => ExecutionContextHost
  ): ParamProperties[] {
    this.pipesContextCreator.setModuleContext(moduleContext);

    return keys.map((key) => {
      const { index, data, pipes: pipesCollection } = metadata[key];
      const pipes = this.pipesContextCreator.createConcreteContext(
        pipesCollection,
        contextId,
        inquirerId
      );
      const type = this.contextUtils.mapParamType(key);

      if (key.includes(CUSTOM_ROUTE_ARGS_METADATA)) {
        const { factory } = metadata[key];
        const customExtractValue = this.contextUtils.getCustomFactory(
          factory,
          data,
          contextFactory
        );
        return { index, extractValue: customExtractValue, type, data, pipes };
      }
      const numericType = Number(type);
      const extractValue = <TRequest, TResponse>(
        req: TRequest,
        res: TResponse,
        next: Function
      ) =>
        this.paramsFactory.exchangeKeyForValue(numericType, data, {
          req,
          res,
          next,
        });
      return { index, extractValue, type: numericType, data, pipes };
    });
  }

  public async getParamValue<T>(
    value: T,
    {
      metatype,
      type,
      data,
    }: { metatype: unknown; type: RouteParamtypes; data: unknown },
    pipes: PipeTransform[]
  ): Promise<unknown> {
    if (!isEmpty(pipes)) {
      this.logger.debug('开始消费pipes')
      return this.pipesConsumer.apply(
        value,
        { metatype, type, data } as any,
        pipes
      );
    }
    return value;
  }

  public isPipeable(type: number | string): boolean {
    return (
      type === RouteParamtypes.BODY ||
      type === RouteParamtypes.QUERY ||
      type === RouteParamtypes.PARAM ||
      type === RouteParamtypes.FILE ||
      type === RouteParamtypes.FILES ||
      isString(type)
    );
  }

  public createGuardsFn<TContext extends string = ContextType>(
    guards: CanActivate[],
    instance: Controller,
    callback: (...args: any[]) => any,
    contextType?: TContext
  ): (args: any[]) => Promise<void> | null {
    const canActivateFn = async (args: any[]) => {
      this.logger.debug('开始去遍历消费所有的Guards')
      const canActivate = await this.guardsConsumer.tryActivate<TContext>(
        guards,
        args,
        instance,
        callback,
        contextType
      );
      if (!canActivate) {
        this.logger.debug('如果有任何一个Guard没通过， 则直接跑出异常，在路由的catch中捕获，Filter进行处理，可以定义全局处理')
        // export class RouterProxy {
        //   public createProxy(
        //     targetCallback: RouterProxyCallback,
        //     exceptionsHandler: ExceptionsHandler,
        //   ) {
        //     new Logger(RouterProxy.name).debug('路由代理，路由都从这里入口')
        //     return async <TRequest, TResponse>(
        //       req: TRequest,
        //       res: TResponse,
        //       next: () => void,
        //     ) => {
        //       try {
        //         await targetCallback(req, res, next);
        //       } catch (e) {
        //         const host = new ExecutionContextHost([req, res, next]);
        //         new Logger(RouterProxy.name).debug('try catch 路由的错误，并且执行Filters')
        //         exceptionsHandler.next(e, host);
        //       }
        //     };
        throw new ForbiddenException(FORBIDDEN_MESSAGE);
      }
    };
    return guards.length ? canActivateFn : null;
  }

  public createPipesFn(
    pipes: PipeTransform[],
    paramsOptions: (ParamProperties & { metatype?: any })[]
  ) {
    const pipesFn = async <TRequest, TResponse>(
      args: any[],
      req: TRequest,
      res: TResponse,
      next: Function
    ) => {
      const resolveParamValue = async (
        param: ParamProperties & { metatype?: any }
      ) => {
        const {
          index,
          extractValue,
          type,
          data,
          metatype,
          pipes: paramPipes,
        } = param;
        const value = extractValue(req, res, next);

        args[index] = this.isPipeable(type)
          ? await this.getParamValue(
              value,
              { metatype, type, data } as any,
              pipes.concat(paramPipes)
            )
          : value;
      };
      await Promise.all(paramsOptions.map(resolveParamValue));
    };
    return paramsOptions.length ? pipesFn : null;
  }

  public createHandleResponseFn(
    callback: (...args: unknown[]) => unknown,
    isResponseHandled: boolean,
    redirectResponse?: RedirectResponse,
    httpStatusCode?: number
  ): HandleResponseFn {
    const renderTemplate = this.reflectRenderTemplate(callback);
    if (renderTemplate) {
      return async <TResult, TResponse>(result: TResult, res: TResponse) => {
        return await this.responseController.render(
          result,
          res,
          renderTemplate
        );
      };
    }
    if (redirectResponse && isString(redirectResponse.url)) {
      return async <TResult, TResponse>(result: TResult, res: TResponse) => {
        await this.responseController.redirect(result, res, redirectResponse);
      };
    }
    const isSseHandler = !!this.reflectSse(callback);
    if (isSseHandler) {
      return <
        TResult extends Observable<unknown> = any,
        TResponse extends HeaderStream = any,
        TRequest extends IncomingMessage = any
      >(
        result: TResult,
        res: TResponse,
        req: TRequest
      ) => {
        this.responseController.sse(
          result,
          (res as any).raw || res,
          (req as any).raw || req,
          { additionalHeaders: res.getHeaders?.() }
        );
      };
    }
    return async <TResult, TResponse>(result: TResult, res: TResponse) => {
      result = await this.responseController.transformToResult(result);
      this.logger.debug('这里调用responseController.apply ,其实也就是调用applicationRef（Express Adapter 的 reply 方法去响应请求')
      // public async apply<TInput = any, TResponse = any>(
      //   result: TInput,
      //   response: TResponse,
      //   httpStatusCode?: number,
      // ) {
      //   return this.applicationRef.reply(response, result, httpStatusCode);
      // }
      !isResponseHandled &&
        (await this.responseController.apply(result, res, httpStatusCode));
    };
  }

  private isResponseHandled(
    instance: Controller,
    methodName: string,
    paramsMetadata: ParamProperties[]
  ): boolean {
    const hasResponseOrNextDecorator = paramsMetadata.some(
      ({ type }) =>
        type === RouteParamtypes.RESPONSE || type === RouteParamtypes.NEXT
    );
    const isPassthroughEnabled = this.contextUtils.reflectPassthrough(
      instance,
      methodName
    );
    return hasResponseOrNextDecorator && !isPassthroughEnabled;
  }
}
