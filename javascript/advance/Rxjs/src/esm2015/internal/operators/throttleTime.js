import { Subscriber } from '../Subscriber';
import { async } from '../scheduler/async';
import { defaultThrottleConfig } from './throttle';
export function throttleTime(duration, scheduler = async, config = defaultThrottleConfig) {
    return (source) => {
        return source.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
    }
}
class ThrottleTimeOperator {
    constructor(duration, scheduler, leading, trailing) {
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
    }
    call(subscriber, source) {
        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
    }
}
class ThrottleTimeSubscriber extends Subscriber {
    constructor(destination, duration, scheduler, leading, trailing) {
        super(destination);
        this.duration = duration;
        this.scheduler = scheduler;
        this.leading = leading;
        this.trailing = trailing;
        this._hasTrailingValue = false;
        this._trailingValue = null;
    }
    _next(value) {
        if (this.throttled) { // 如果还处于节流时间中， 则不会执行next 方法，也就是后面的operator 不会执行。
            if (this.trailing) {
                this._trailingValue = value;
                this._hasTrailingValue = true;
            }
        }
        else {
            /**
             *  1. internal\scheduler\AsyncAction.js, 在执行schedule 的时候，会执行requestAsyncId 方法
                requestAsyncId(scheduler, id, delay = 0) {
                    return setInterval(scheduler.flush.bind(scheduler, this), delay);
                }
                2. dispatchNext 就是调用clearThrottle 去清理throttled, dispatchNext 就是下面的work
                schedule(work, delay = 0, state) {
                    if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
                        return AsyncScheduler.delegate.schedule(work, delay, state);
                    }
                    else {
                        return super.schedule(work, delay, state);
                    }
                }               
             */
            this.throttled = this.scheduler.schedule(dispatchNext, this.duration, { subscriber: this })
            this.add(this.throttled);
            if (this.leading) {
                this.destination.next(value);
            }
        }
    }
    _complete() {
        if (this._hasTrailingValue) {
            this.destination.next(this._trailingValue);
            this.destination.complete();
        }
        else {
            this.destination.complete();
        }
    }
    clearThrottle() {
        const throttled = this.throttled;
        if (throttled) {
            if (this.trailing && this._hasTrailingValue) {
                this.destination.next(this._trailingValue);
                this._trailingValue = null;
                this._hasTrailingValue = false;
            }
            throttled.unsubscribe();
            this.remove(throttled);
            this.throttled = null;
        }
    }
}
function dispatchNext(arg) {
    const { subscriber } = arg;
    subscriber.clearThrottle();
}
//# sourceMappingURL=throttleTime.js.map