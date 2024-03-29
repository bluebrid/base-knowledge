import { Logger } from '../../common/services/logger.service';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
export class SilentLogger extends Logger {
  log = noop;
  error = noop;
  warn = noop;
  debug = noop;
  verbose = noop;
  setLogLevels = noop;
}
