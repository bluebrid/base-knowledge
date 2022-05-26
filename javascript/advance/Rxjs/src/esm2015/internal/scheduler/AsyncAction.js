import { Action } from './Action';
export class AsyncAction extends Action {
    constructor(scheduler, work) {
        super(scheduler, work);
        this.scheduler = scheduler;
        this.work = work;
        this.pending = false;
    }
    schedule(state, delay = 0) {
        if (this.closed) {
            return this;
        }
        this.state = state;
        const id = this.id;
        const scheduler = this.scheduler;
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
        return this;
    }
    requestAsyncId(scheduler, id, delay = 0) {
        return setInterval(scheduler.flush.bind(scheduler, this), delay);
    }
    recycleAsyncId(scheduler, id, delay = 0) {
        if (delay !== null && this.delay === delay && this.pending === false) {
            return id;
        }
        clearInterval(id);
    }
    execute(state, delay) {
        if (this.closed) {
            return new Error('executing a cancelled action');
        }
        this.pending = false;
        const error = this._execute(state, delay);
        if (error) {
            return error;
        }
        else if (this.pending === false && this.id != null) {
            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
    }
    _execute(state, delay) {
        let errored = false;
        let errorValue = undefined;
        try {
            /**
             * 这个就是我们在执行super.schedule(work, delay, state);传递到AsyncAction 中的。
             * export class Scheduler {
                constructor(SchedulerAction, now = Scheduler.now) {
                    this.SchedulerAction = SchedulerAction;
                    this.now = now;
                }
                schedule(work, delay = 0, state) {
                    return new this.SchedulerAction(this, work).schedule(state, delay);
                }
            }
            Scheduler.now = () => Date.now();
            
             */
            /**
             * work 就是subscriber.add(scheduler.schedule(dispatch, period, initState));的dispatch 方法
             * export function interval(period = 0, scheduler = async) {
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
             */
            this.work(state);
        }
        catch (e) {
            errored = true;
            errorValue = !!e && e || new Error(e);
        }
        if (errored) {
            this.unsubscribe();
            return errorValue;
        }
    }
    _unsubscribe() {
        const id = this.id;
        const scheduler = this.scheduler;
        const actions = scheduler.actions;
        const index = actions.indexOf(this);
        this.work = null;
        this.state = null;
        this.pending = false;
        this.scheduler = null;
        if (index !== -1) {
            actions.splice(index, 1);
        }
        if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
    }
}
//# sourceMappingURL=AsyncAction.js.map