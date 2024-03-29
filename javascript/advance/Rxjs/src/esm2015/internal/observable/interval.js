import { Observable } from '../Observable';
import { async } from '../scheduler/async';
import { isNumeric } from '../util/isNumeric';
export function interval(period = 0, scheduler = async) {
    if (!isNumeric(period) || period < 0) {
        period = 0;
    }
    if (!scheduler || typeof scheduler.schedule !== 'function') {
        scheduler = async;
    }
    return new Observable(subscriber => {
        const initState = {
            subscriber, counter: 0, period 
        }
        // internal/scheduler/AsyncScheduler.js
        subscriber.add(scheduler.schedule(dispatch, period, initState));
        return subscriber;
    });
}
function dispatch(state) {
    const { subscriber, counter, period } = state;
    subscriber.next(counter);
    this.schedule({ subscriber, counter: counter + 1, period }, period);
}
//# sourceMappingURL=interval.js.map