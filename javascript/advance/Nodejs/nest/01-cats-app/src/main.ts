import { Logger, RequestMethod, ValidationPipe } from './common';
import {  HttpAdapterHost, NestFactory } from './core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './demoCore/pipes/validate.pipe';

import { AllExceptionsFilter } from './catCommon/filters/all-exceptions.filter';
const logger = new Logger('bootstrap')
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
  
  });
  // app.setGlobalPrefix('api/v1', {
  //   exclude: [{
  //     path: 'cats',
  //     method: RequestMethod.GET
  //   }]
  // })
  app.setGlobalPrefix('api/v1', {
    exclude: ['cats(\/)?','cats(\/.+)?']
  })
  const pipe = new ValidateInputPipe()
  app.useGlobalPipes(pipe);
  app.useGlobalPipes(new ValidationPipe());
  const adapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));
  // 可以直接用Express或fastify的中间件
  /*
  app.use(function (req, res, next) {
    const err = req.session.error;
    const msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
  })*/
  await app.listen(3000);
 
  logger.log(`Application is running on: ${await app.getUrl()}`);
  // let count = 0;
  
  // const id = setInterval(() => {
  //   if (count > 5) {
  //     clearInterval(id)
  //     throw new Error(`interval error`)
  //   }
  //   count ++
  // }, 1000)
  
}
process.on('uncaughtException', (e) => {
logger.error('uncaughtException', e)
})
bootstrap();
