import { canReportError } from './util/canReportError';
import { toSubscriber } from './util/toSubscriber';
import { observable as Symbol_observable } from '../internal/symbol/observable';
import { pipeFromArray } from './util/pipe';
import { config } from './config';
export class Observable {
    /**
     *  
       export function fromEvent(target, eventName, options, resultSelector) {
            if (isFunction(options)) {
                resultSelector = options;
                options = undefined;
            }
            if (resultSelector) {
                return fromEvent(target, eventName, options).pipe(map(args => isArray(args) ? resultSelector(...args) : resultSelector(args)));
            }
            return new Observable(subscriber => {
                // 在Observable 对象 _trySubscribe 方法会去执行这个方法， this._subscribe(sink);， subscriber 对应的就是sink: MapToSubscriber
                function handler(e) {
                    if (arguments.length > 1) {
                        subscriber.next(Array.prototype.slice.call(arguments));
                    }
                    else {
                        subscriber.next(e);
                    }
                }
                setupSubscription(target, eventName, handler, subscriber, options);
            });
        }
     *  
     */
    constructor(subscribe) {
        // subscirb 就是上面我们在创建Observable 对象传递的函数
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    lift(operator) {
        /**
         * 1. 在执行pipe的方法时，会触发这个方法
         * 2. 重新生成一个Observable 对象
         * 3. 将当前实例this 保存在source
         * 4. 将对应的operator 保存在新的Observable对象上
         * 5. 形成一个链路： observable.source.source......
         * 6. 链路最后面的observable 是我们执行fromEvent 时创建的Observable 对象，其对象上的source 是undefined.
         * 7. 
         */
        const observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    }
    subscribe(observerOrNext, error, complete) {
        //如果执行了pipe, subscribe是执行pipe 后返回的Observable 对象的方法。
        /**
         * const subscriber = value => {
                nameInput.value = value
            }

            addFromEventObj = addFromEventObj.subscribe(subscriber)

            observerOrNext 也就是subscriber
         */ 
        const { operator } = this;
        // 生成一个 Subscriber 对象 return new Subscriber(nextOrObserver, error, complete);
        //   this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
        /**
         *  import { Subscriber } from '../Subscriber';
            import { rxSubscriber as rxSubscriberSymbol } from '../symbol/rxSubscriber';
            import { empty as emptyObserver } from '../Observer';
            export function toSubscriber(nextOrObserver, error, complete) {
                if (nextOrObserver) {
                    if (nextOrObserver instanceof Subscriber) {
                        return nextOrObserver;
                    }
                    if (nextOrObserver[rxSubscriberSymbol]) {
                        return nextOrObserver[rxSubscriberSymbol]();
                    }
                }
                if (!nextOrObserver && !error && !complete) {
                    return new Subscriber(emptyObserver);
                }
                return new Subscriber(nextOrObserver, error, complete);
            }
         */
        const sink = toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source); // call 为对应的operator 中定义的call 方法。
        }
        else { 
            /**
             * 1. 如果没有operator 会走这个分支，执行_trySubscribe方法
             * 2. 没有operator , 则表示当前的Observable 对象是我们最先调用fromEvent 时创建的Observable 对象
             * 3. this._subscribe 就是我们在执行fromEvent 时创建Observable 对象时传递进来的参数。
             * 4. 所以在执行this._subscribe() 方法时，其实执行的就是fromEvent 中的对应的参数方法。
             */
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
    _trySubscribe(sink) {
        try {
            /**
             * this._subscribe 是在初始化Observable对象时传递进来的,
             * 如fromEvent 返回对象Observable 传递的参数函数
             * 
             export function fromEvent(target, eventName, options, resultSelector) {
                if (isFunction(options)) {
                    resultSelector = options;
                    options = undefined;
                }
                if (resultSelector) {
                    return fromEvent(target, eventName, options).pipe(map(args => isArray(args) ? resultSelector(...args) : resultSelector(args)));
                }
                return new Observable(subscriber => {
                    function handler(e) {
                        if (arguments.length > 1) {
                            subscriber.next(Array.prototype.slice.call(arguments));
                        }
                        else {
                            subscriber.next(e);
                        }
                    }
                    setupSubscription(target, eventName, handler, subscriber, options);
                });
            }
            sink 就是对应的操作符，如：MapToSubscriber 对象。

            class MapToSubscriber extends Subscriber {
                constructor(destination, value) {
                    super(destination);
                    this.value = value;
                }
                _next(x) {
                    this.destination.next(this.value);
                }
            }

            MapToSubscriber 对象继承与Subscriber 对象/esm2015/internal/Subscription.js
             */
            /**
             *  返回的是一个 unsubscribe 函数，如fromEvent 返回的是一个removeEventListener
             *  unsubscribe = () => source.removeEventListener(eventName, handler, options);
             * */
            /**
             * 1. sink 是一个Subscription 对象
             * 2. 其中一个重要的属性是destination，指向的是下一个Subscription 对象
             * 3. Subscription 有一个next 方法， 会指向的是子类的_next 方法
             * 4. 子类的_next 方法会运行this.destination.next(this.value);
             * 5. sink 作为参数subscriber 会传递给fromEvent 创建Observable 对象传递的参数函数
             * 6. 在fromEvent handler 方法中，会调用subscriber 的next方法。
             * 7. 在fromEvent中，运行this._subscribe 方法，其实就是给对应的元素注册事件，如:click
             * 8. 在上面已经给对应的元素注册了click 事件，我们可以点击对应的元素去触发事件
             * */              
            return this._subscribe(sink);
        }
        catch (err) {
            if (config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    }
    forEach(next, promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            let subscription;
            subscription = this.subscribe((value) => {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    }
    _subscribe(subscriber) {
        const { source } = this;
        return source && source.subscribe(subscriber);
    }
    [Symbol_observable]() {
        return this;
    }
    pipe(...operations) {
       
        if (operations.length === 0) {
            return this;
        }
        var opts = pipeFromArray(operations);
        /**
            opts 就是如下Function: 
            return function piped(input) {
              return fns.reduce((prev, fn) => fn(prev), input);
            };
            以当前Observable 对象作为初始化的input. 然后执行每一个operation, 将计算好的值作为下一个操作符的传入的值
            ddFromEventObj = addFromEventObj.pipe(
                throttleTime(1000 * 2), 
                mapTo(1), 
                scan((init, next) => init + next, 0)
            )
            上面的Demo中， 会先执行throttleTime -> mapTo -> scan 
         */
        // 如果pipe 中只传递了一个operator参数， opts 就是下面对应的`return (source) => source.lift(operator);`
        /**
         *  
          export function mapTo(value) {
    
            var operator = new MapToOperator(value)
            return (source) => source.lift(operator);
        }
         */
        /**
             *   
            lift(operator) {
                const observable = new Observable();
                observable.source = this;
                observable.operator = operator;
                return observable;
            }
            */
        var result = opts(this);
        // 所以 result 返回的是lift 返回的对象，也就是一个新的Observable 对象， 添加了一个operator 属性， 
        // operator属性会在subscribe 方法中引用
        // pipe 其实返回的是一个新的Observable 对象， 也就能处理链式调用

         return result;
    }
    toPromise(promiseCtor) {
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor((resolve, reject) => {
            let value;
            this.subscribe((x) => value = x, (err) => reject(err), () => resolve(value));
        });
    }
}
Observable.create = (subscribe) => {
    return new Observable(subscribe);
};
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}
//# sourceMappingURL=Observable.js.map