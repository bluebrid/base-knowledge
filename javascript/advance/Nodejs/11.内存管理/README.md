<<<<<<< HEAD
## [内存管理](https://www.nodejs.red/#/nodejs/memory)
## [如何分析NodeJS的内存泄露](https://zhuanlan.zhihu.com/p/25736931)
1. <font color=red>内存泄漏</font>： 是指由于疏忽或者错误造成程序未能释放已经不在使用的内存的情况
2. 在V8中，每次GC，是根据<font color=red>root</font>对象(浏览器是：window, Node是： global)依次进行梳理对象的引用
   ，如果能从Root的引用链到达访问，V8就会将其标记为<font color=red>可到达对象</font>，反之为<font color=red>不可到达对象</font>
3. <font color=red>不可到达对象</font>会被V8回收

## 内存泄漏的几种情况
1. 全局变量(未声明对象的变量`a=10`,或者直接定义为`global.a =11`)
2. 闭包
3. 事件监听:对对同一个事件反复监听，忘记移除

## 定位内存泄漏
1. 重现内存泄漏的情况
   > 1. 正常使用就能复现的问题
   > 2. 对于偶然的内存泄漏，一般会跟特殊的输入有关系。（这种情况比较难以排查， 只能取生产环境，打印内存快照，打印快照是非常耗CPU的操作， 可能会对线上造成影响）
   > 3. heapdump 进行快照打印
   ```js
    const {EventEmitter} = require('events');
    const heapdump = require('heapdump');
    global.test = new EventEmitter();
    heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
    ​
    function run3() {
      const innerData = new Buffer(100);
      const outClosure3 = function () {
        void innerData;
      };
      test.on('error', () => {
        console.log('error');
      });
      outClosure3();
    }
    ​
    for(let i = 0; i < 10; i++) {
      run3();
    }
    gc();
    ​
    heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
   ```
   ## 如何避免内存泄漏
   1. ESLint 检测代码，检查非预期的<font color=red>全局变量</font>
   2. 使用<font color=red>闭包</font>的时候， 需要明确知道闭包了什么对象，还有引用必要对象何时清除闭包
   3. 绑定事件的时候，一定要在恰当的时候，清除监听。
=======
## [内存管理](https://www.nodejs.red/#/nodejs/memory)
## [如何分析NodeJS的内存泄露](https://zhuanlan.zhihu.com/p/25736931)
1. <font color=red>内存泄漏</font>： 是指由于疏忽或者错误造成程序未能释放已经不在使用的内存的情况
2. 在V8中，每次GC，是根据<font color=red>root</font>对象(浏览器是：window, Node是： global)依次进行梳理对象的引用
   ，如果能从Root的引用链到达访问，V8就会将其标记为<font color=red>可到达对象</font>，反之为<font color=red>不可到达对象</font>
3. <font color=red>不可到达对象</font>会被V8回收

## 内存泄漏的几种情况
1. 全局变量(未声明对象的变量`a=10`,或者直接定义为`global.a =11`)
2. 闭包
3. 事件监听:对对同一个事件反复监听，忘记移除

## 定位内存泄漏
1. 重现内存泄漏的情况
   > 1. 正常使用就能复现的问题
   > 2. 对于偶然的内存泄漏，一般会跟特殊的输入有关系。（这种情况比较难以排查， 只能取生产环境，打印内存快照，打印快照是非常耗CPU的操作， 可能会对线上造成影响）
   > 3. heapdump 进行快照打印
   ```js
    const {EventEmitter} = require('events');
    const heapdump = require('heapdump');
    global.test = new EventEmitter();
    heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
    ​
    function run3() {
      const innerData = new Buffer(100);
      const outClosure3 = function () {
        void innerData;
      };
      test.on('error', () => {
        console.log('error');
      });
      outClosure3();
    }
    ​
    for(let i = 0; i < 10; i++) {
      run3();
    }
    gc();
    ​
    heapdump.writeSnapshot('./' + Date.now() + '.heapsnapshot');
   ```
   ## 如何避免内存泄漏
   1. ESLint 检测代码，检查非预期的<font color=red>全局变量</font>
   2. 使用<font color=red>闭包</font>的时候， 需要明确知道闭包了什么对象，还有引用必要对象何时清除闭包
   3. 绑定事件的时候，一定要在恰当的时候，清除监听。
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
   4. 一般推荐使用`init`函数对类的事件进行监听，使用`destory`对事件和占用的资源进行释放