# redux-learning
学习Redux 源码
## Redux 和 全局变量的区别
1. 如果全局变量，我们调试会变得噩梦， 任何时间，我们应用的任何部分的变更，在数据变更后， 都不会留下变更的记录
2. Redux/Vuex 可以追踪变量的改变，并且通过特定的属性才能改变，如`dispatch('action')`
3. 概念不同： 所谓状态，指的是与视图对应的数据，跟展示无关的东西就不算状态。
4. Redux 作用全局，而对象或者数组，只作用与对应的作用域
5. redux 里面实现的`subscribe`发布订阅模式，可以通知对应的修改，而全局变量没有
6. 全局变量<font color=red>在改变后是没法驱动视图的更新的</font>
## redux 为什么要求返回一个新的State出来？
1. 基于性能方面的考虑
2. 如果某个属性变更了，redux还一个个的去比较，是哪个属性变更了，对于一个大型的`数据结构`来说， 深度检测时非常好性能的
## redux-thunk
1. redux-thunk 是一个redux 的中间件
2. 其主要作用是<font color=red>让dispatch变成一个函数</font>
3. 如果没有这个中间件，dispatch 的action 一定是也给object 
4. 