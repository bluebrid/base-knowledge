import { Controller } from '@nestjs/common/interfaces';
import {

  Logger,
} from "@nestjs/common";
import { STATIC_CONTEXT } from '../injector/constants';
import { ContextId } from '../injector/instance-wrapper';

export abstract class ContextCreator {
  private logger: Logger;
  public abstract createConcreteContext<T extends any[], R extends any[]>(
    metadata: T,
    contextId?: ContextId,
    inquirerId?: string,
  ): R;
  public getGlobalMetadata?<T extends any[]>(
    contextId?: ContextId,
    inquirerId?: string,
  ): T;

  public createContext<T extends unknown[] = any, R extends unknown[] = any>(
    instance: Controller,
    callback: (...args: any[]) => void,
    metadataKey: string,
    contextId = STATIC_CONTEXT,
    inquirerId?: string,
  ): R {
    this.logger = new Logger(ContextCreator.name);
    const globalMetadata =
      this.getGlobalMetadata &&
      this.getGlobalMetadata<T>(contextId, inquirerId);
    const classMetadata = this.reflectClassMetadata<T>(instance, metadataKey);
    const methodMetadata = this.reflectMethodMetadata<T>(callback, metadataKey);
    this.logger.debug(`获取${instance.constructor.name}.${callback.name} Global, class, method 对应的Meta数据，如${metadataKey}`)
    return [
      ...this.createConcreteContext<T, R>(
        globalMetadata || ([] as T),
        contextId,
        inquirerId,
      ),
      ...this.createConcreteContext<T, R>(classMetadata, contextId, inquirerId),
      ...this.createConcreteContext<T, R>(
        methodMetadata,
        contextId,
        inquirerId,
      ),
    ] as R;
  }

  public reflectClassMetadata<T>(instance: Controller, metadataKey: string): T {
    const prototype = Object.getPrototypeOf(instance);
    return Reflect.getMetadata(metadataKey, prototype.constructor);
  }

  public reflectMethodMetadata<T>(
    callback: (...args: unknown[]) => unknown,
    metadataKey: string,
  ): T {
    return Reflect.getMetadata(metadataKey, callback);
  }
}
