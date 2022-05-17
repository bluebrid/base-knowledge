class LazyManClass {
  constructor(name) {
    this.taskList = [];
    this.name = name;
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      // 这里是下个宏任务, 想将任务都推送到队列， 然后下一次宏任务，去队列里面获取任务执行
      this.next();
    }, 0);
  }
  eat(name) {
    var that = this;
    var fn = (function (n) {
      return function () {
        console.log(`I am eating ${n}`)
        // 接着执行下一个宏任务
        that.next();
      }
    })(name);
    this.taskList.push(fn);
    return this;
  }
  sleepFirst(time) {
    var that = this;
    var fn = (function (t) {
      return function () {
        setTimeout(() => {
          console.log(`等待了${t}秒...`)
          that.next();
        }, t * 1000);
      }
    })(time);
    this.taskList.unshift(fn); // sleepFirst 是首先需要sleep 才会执行其他的，所以推送到队列header 
    return this;
  }
  sleep(time) {
    var that = this
    var fn = (function (t) {
      return function () {
        setTimeout(() => {
          console.log(`等待了${t}秒...`)
          that.next();
        }, t * 1000);
      }
    })(time);
    this.taskList.push(fn);
    return this;
  }
  next() {
    var fn = this.taskList.shift();
    fn && fn();
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}
// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
LazyMan('Tony').eat('lunch').sleep(5).eat('dinner').sleep(4).eat('junk food');