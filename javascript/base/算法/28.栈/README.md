https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/6196d002c1553b002e57bf23
## 栈
1. 先进后出
[0,1,2] -> 2, 1, 0
![](https://mmbiz.qpic.cn/mmbiz_png/ndgH50E7pIoAvJlib4f4lvae67jul6t2DPK0iafmGq86E9eXRy7TibwQPfLYgicUfCNPv8DMziaLESR71x9mZDTxLuQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
```javascript
class Stack {
  constructor(){
    this.items = [];
  }
  // 入栈
  push(item) {
    this.items.push(item)
  }
  // 出栈
  pop() {
    this.items.pop()
  }
  // 第一个
  top() {
    return this.items[this.items.length -1]
  }
  //清空
  clear() {
    this.items = []
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return !!this.item.length
  }
}
```
## 应用
1. 判断字符串是否匹配
2. 判断HTML标签是否匹配
3. 版本号的大小比较