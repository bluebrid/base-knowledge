https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/6196d065c1553b002e57bf24
## 队列
1. 先进先出
[0,1,2] -> 0， 1， 2
2. 队列的特性是一种特殊的线性表，<font color="red">只能在表的一端进行删除操作，而在表的另外一段进行掺入操作</font>
3. 可以进行插入操作的称为<font size=5 color="red">队首</font>,可以进行插入操作的成为<font size=5 color="red">队尾</font>
4. 删除一个元素称为<font size=5 color="red">出队</font>，插入一个元素称为<font size=5 color="red">入队</font>
![](https://mmbiz.qpic.cn/mmbiz_png/ndgH50E7pIoAvJlib4f4lvae67jul6t2D3KqKIEtNdu1SuOmnILm5HyHJErlFEBOicXsUqGTHmV0Y6Vu8lGGWAHQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
```javascript
class Queue {
  constructor() {
    this.tiems = []
  }
  // 入队
  enqueue(item) {
    this.items.push(item)
  }
  // 出队
  dequeue() {
    this.items.shift(); // 先进先出
  }
  // 获取队首元素
  head() {
    return this.items[0]
  }
  // 获取队尾元素
  tail() {
    return this.items[this.item.length -1]
  }
  clear() {
    this.items = []
  }
  size () {
    return this.items.length
  }
  isEmpty() {
    return !!this.item.length
  }
}
```
## 应用
1. 排队买东西
2. 约瑟夫环问题
> 有一个数组存放了 100 个数据 0-99，要求每隔两个数删除一个数，到末尾时再循环至开头继续进行，求最后一个被删除的数字。
  