import { Subscriber } from '../Subscriber';
export function scan(accumulator, seed) {
    let hasSeed = false;
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
class ScanOperator {
    constructor(accumulator, seed, hasSeed = false) {
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    call(subscriber, source) {
        var subscriber = new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed);
        return source.subscribe(subscriber);
    }
}
class ScanSubscriber extends Subscriber {
    constructor(destination, accumulator, _seed, hasSeed) {
        super(destination);
        this.accumulator = accumulator;
        this._seed = _seed;
        this.hasSeed = hasSeed;
        this.index = 0;
    }
    get seed() {
        return this._seed;
    }
    set seed(value) {
        this.hasSeed = true;
        this._seed = value;
    }
    _next(value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    }
    _tryNext(value) {
        // 类似于数组的reduce 功能
        const index = this.index++;
        let result;
        try {
            // 传递给accumulator 三个参数： seed, value(是上一个operator 传递下来的值)， index是索引
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        // 将计算得到的结果又重新赋值给seed.
        this.seed = result;
        this.destination.next(result);
    }
}
//# sourceMappingURL=scan.js.map