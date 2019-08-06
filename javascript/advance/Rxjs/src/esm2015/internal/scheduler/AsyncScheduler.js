import { Scheduler } from '../Scheduler';
export class AsyncScheduler extends Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
        super(SchedulerAction, () => {
            if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
                return AsyncScheduler.delegate.now();
            }
            else {
                return now();
            }
        });
        this.actions = [];
        this.active = false;
        this.scheduled = undefined;
    }
    schedule(work, delay = 0, state) {
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
            return AsyncScheduler.delegate.schedule(work, delay, state);
        }
        else {
            /**
             * supper: 
             export class Scheduler {
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
             * 1. 在初始化async的时候，间隔AsyncAction 传入了构造函数
                import { AsyncAction } from './AsyncAction';
                import { AsyncScheduler } from './AsyncScheduler';
                export const async = new AsyncScheduler(AsyncAction);
                2.所以上面的this.SchedulerAction 其实指的就是AsyncAction 
             */
            /**
             * 在执行return new this.SchedulerAction(this, work).schedule(state, delay); 时，会执行AsyncAction如下的方法
             * requestAsyncId(scheduler, id, delay = 0) {
                    return setInterval(scheduler.flush.bind(scheduler, this), delay);
                }
                scheduler 指向就是当前这个类AsyncScheduler，所以scheduler.flush 就是如下的方法：
             */
            return super.schedule(work, delay, state);
        }
    }
    flush(action) {
        const { actions } = this;
        if (this.active) {
            actions.push(action);
            return;
        }
        let error;
        this.active = true;
        do {// action.execute 指向的就是AsyncAction 的execute方法
            if (error = action.execute(action.state, action.delay)) {
                break;
            }
        } while (action = actions.shift());
        this.active = false;
        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    }
}
//# sourceMappingURL=AsyncScheduler.js.map