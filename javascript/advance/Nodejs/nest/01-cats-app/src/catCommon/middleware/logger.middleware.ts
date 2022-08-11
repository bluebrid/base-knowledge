import { Injectable, NestMiddleware } from '../../common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`Request...`);
    next();
  }
}
