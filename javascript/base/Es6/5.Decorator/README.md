https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650585835&amp;idx=1&amp;sn=30a66ad25c4a643a45824a27fb115add&source=41#wechat_redirect

decorator 和 函数变换 都拥有不修改函数代码，调整和改变函数性质的能力。
decorator 的语法更加优雅，且能作用于 class 和 descriptor，而函数变换不仅仅对类有作用
还可以作用域普通函数，它们两者之间也可以通过 wrapperToDecorator 方法进行自由的转换。