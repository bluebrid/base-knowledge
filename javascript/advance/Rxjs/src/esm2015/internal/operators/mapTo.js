import { Subscriber } from '../Subscriber';
export function mapTo(value) {
    /**
     *   
    lift(operator) {
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
     */
    var operator = new MapToOperator(value)
    return (source) => source.lift(operator);
}
class MapToOperator {
    constructor(value) {
        this.value = value;
    }
    /**
     * 订阅的时候才会执行这个call 方法。
     * esm2015/internal/Observable.js
     * subscribe(observerOrNext, error, complete) {
        const { operator } = this;
        const sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source); // 执行这里的call 方法
        }
        else {
            sink.add(
                this.source || 
                (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink)
            );
        }
        if (config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    }
     */
    call(subscriber, source) {
        // source 是一个Observable 对象， 同样也有operator 属性
        return source.subscribe(new MapToSubscriber(subscriber, this.value));
    }
}
class MapToSubscriber extends Subscriber {
    constructor(destination, value) {
        super(destination);
        this.value = value;
    }
    _next(x) {
        this.destination.next(this.value);
    }
}
//# sourceMappingURL=mapTo.js.map