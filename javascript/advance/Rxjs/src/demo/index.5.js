import { Observable } from '../esm2015/internal/Observable'

export default function createDemo() {
    /**
     * Observable.create = (subscribe) => {
            return new Observable(subscribe);
        };
     */
    var subscribe = (subscriber) => {
        // subscriber 就是我们在执行observable.subscribe 生成的sink,是一个Subscriber 对象
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        setTimeout(() => {
            subscriber.next(4);
            subscriber.complete();
            /**
             * complete 将isStopped设置为true, 所以调用complete 方法后， 在调用next, error 都不会工作了。
             *    complete() {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._complete();
                    }
                }
             */
            subscriber.next(5);
        }, 1000);
    }
    // subscribe 也就是在Observable实例中的_subscribe 属性
    var observable = Observable.create(subscribe);

    console.log('just before subscribe');
    observable.subscribe({
        next: x => console.log('got value ' + x),
        error: err => console.error('something wrong occurred: ' + err),
        complete: () => console.log('done'),
    });
    console.log('just after subscribe');
}
