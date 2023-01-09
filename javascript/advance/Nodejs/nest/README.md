https://nestjs.com/
https://docs.nestjs.cn/5.0/firststeps

## 整体流程
### 启动入口
1. NestJS 项目的启动入口文件`main.ts`
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
```
### NestFactory.create
2. 我们可以先分析`create`,方法`core/nest-factory.ts`
> 1. 先去判断，我们传入的第二个参数，是否是一个`HttpServer`,如果是，则直接返回，否则，通过`createHttpAdapter` 来创建一个Http Adapterß
```ts
 const [httpServer, appOptions] = this.isHttpServer(serverOrOptions)
      ? [serverOrOptions, options]
      : [this.createHttpAdapter(), serverOrOptions];
```
> 2. 默认是创建一个Express 引擎的Adapter
```ts
  private createHttpAdapter<T = any>(httpServer?: T): AbstractHttpAdapter {
    this.logger.debug('加载Node服务适配器，默认是Express')
    const { ExpressAdapter } = loadAdapter(
      '@nestjs/platform-express',
      'HTTP',
      () => require('../platform-express'),
    );
    return new ExpressAdapter(httpServer);
  }
```
> 3. 我们可以指定`FastifyAdapter`
```ts
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

```
> 4. `ApplicationConfig` 是整个应用的配置对象`core/application-config.ts`,保存了globale 相关的配置入口
```ts
 private globalPrefix = '';
  private globalPrefixOptions: GlobalPrefixOptions<ExcludeRouteMetadata> = {};
  private globalPipes: Array<PipeTransform> = [];
  private globalFilters: Array<ExceptionFilter> = [];
  private globalInterceptors: Array<NestInterceptor> = [];
  private globalGuards: Array<CanActivate> = [];
  private versioningOptions: VersioningOptions;
```
> 5. `NestContainer` Nest 的运行容器？`core/injector/container.ts`
> 6. `registerLoggerConfiguration`,应该是用来配置，自定义Logger的入口
```ts
 private registerLoggerConfiguration(
    options: NestApplicationContextOptions | undefined,
  ) {
    if (!options) {
      return;
    }
    const { logger, bufferLogs, autoFlushLogs } = options;
    if ((logger as boolean) !== true && !isNil(logger)) {
      Logger.overrideLogger(logger);
    }
    if (bufferLogs) {
      Logger.attachBuffer();
    }
    this.autoFlushLogs = autoFlushLogs ?? true;
  }
```
> 8. `await this.initialize(module, container, applicationConfig, httpServer);`
> 9. 初始化 `NestApplication` 应用 `core/nest-application.ts`
```ts
 constructor(
    container: NestContainer,
    private readonly httpAdapter: HttpServer,
    private readonly config: ApplicationConfig,
    private readonly appOptions: NestApplicationOptions = {},
  ) {
    super(container);
    this.logger.debug('实例化NestApplication对象')
    this.selectContextModule();
    this.registerHttpServer();

    this.routesResolver = new RoutesResolver(
      this.container,
      this.config,
      this.injector,
    );
  }
```
> 10. 在registerHttpServer 时，会创建一个httpServer
```ts
  public initHttpServer(options: NestApplicationOptions) {
    const isHttpsEnabled = options && options.httpsOptions;
    if (isHttpsEnabled) {
      this.httpServer = https.createServer(
        options.httpsOptions,
        this.getInstance(),
      );
      return;
    }
    this.logger.debug('利用http.createServer创建一个Node服务, this.getInstance返回的是一个函数，也就是Express createApplication 的函数')
    // var app = function(req, res, next) {
    //   app.handle(req, res, next);
    // };
    this.httpServer = http.createServer(this.getInstance());
  }
```

### app.listen(3000);
```ts
 public async listen(port: number | string, ...args: any[]): Promise<any> {
    !this.isInitialized && (await this.init());

    return new Promise((resolve, reject) => {
      const errorHandler = (e: any) => {
        this.logger.error(e?.toString?.());
        reject(e);
      };
      this.httpServer.once('error', errorHandler);

      const isCallbackInOriginalArgs = isFunction(args[args.length - 1]);
      const listenFnArgs = isCallbackInOriginalArgs
        ? args.slice(0, args.length - 1)
        : args;

      this.httpAdapter.listen(
        port,
        ...listenFnArgs,
        (...originalCallbackArgs: unknown[]) => {
          if (this.appOptions?.autoFlushLogs ?? true) {
            this.flushLogs();
          }
          if (originalCallbackArgs[0] instanceof Error) {
            return reject(originalCallbackArgs[0]);
          }

          const address = this.httpServer.address();
          if (address) {
            this.httpServer.removeListener('error', errorHandler);
            this.isListening = true;
            resolve(this.httpServer);
          }
          if (isCallbackInOriginalArgs) {
            args[args.length - 1](...originalCallbackArgs);
          }
        },
      );
    });
  }
```
> 1. `!this.isInitialized && (await this.init());`先进行init
```ts
  public async init(): Promise<this> {
    this.applyOptions();
    await this.httpAdapter?.init();
    this.logger.debug('开始初始化NestApplication')
    const useBodyParser =
      this.appOptions && this.appOptions.bodyParser !== false;
    useBodyParser && this.registerParserMiddleware();

    await this.registerModules();
    await this.registerRouter(); // 解析完整的路由
    await this.callInitHook();
    await this.registerRouterHooks();
    await this.callBootstrapHook();

    this.isInitialized = true;
    this.logger.log(MESSAGES.APPLICATION_READY);
    return this;
  }
```