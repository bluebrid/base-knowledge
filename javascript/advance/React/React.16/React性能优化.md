[浅谈React性能优化的方向](https://juejin.im/post/5d045350f265da1b695d5bf2)
[Airbnb 爱彼迎房源详情页中的 React 性能优化](https://zhuanlan.zhihu.com/p/44404836)
[浅谈 React 函数式组件的性能优化](https://zhuanlan.zhihu.com/p/92564961)

[一网打尽 React 重难点](https://mp.weixin.qq.com/s?__biz=MzA4Nzg0MDM5Nw==&mid=2247484478&amp;idx=1&amp;sn=d39e4d6fc96dddbb4ab122d4819bc2fc&source=41#wechat_redirect)


## 分析 -> 修复 -> 分析(返回这个过程)
## React 性能优化方向
1. 减少计算的量 -> 减少渲染的节点和减低组件渲染的复杂度
2. 利用缓存-> 如何避免重新渲染, 利用函数式变成的React.useMemo方式来避免组件重新渲染，相当于PureComponent
3. 精确重新计算的范围-> 对应到React中就是绑定组件和状态的关系， 精确判断更新的**时机**和**范围**, 只重新渲染**脏**组件， 或者说降低渲染的范围

## 方案
1. 虚拟列表(只渲染可视窗口的组件)
2. 惰性渲染：我们只在有必要时才去渲染组件
3. 避免重新渲染，我们可以通过shouldComponentUpdate 和React.memo来处理
4. 不可变数据，让数据变得可预测，我们可以引用相应的JS工具库，如Immutable.js 
5. React.useCallback 去缓存函数的创建， 如果我们需要给一个组件的props 传递的一个函数，因为函数是一个引用类型
6. React.useMemo , 去缓存函数创建的结构，避免了函数的重新计算，但是这个应该是一个纯函数，也就是说，如果输入什么就一定会输出什么(**减少计算的量**)

