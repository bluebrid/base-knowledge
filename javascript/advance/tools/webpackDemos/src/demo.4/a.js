import jquery from 'jquery'
import loadsh from 'loadsh'
console.log('this is a')
const btn = jquery('#btn')
btn.on('click', () => {
   import(/* webpackChunkName: "b" */ './b').then(module =>{ // 在动态引入的语法前，添加注释，对应的注释就是为chunk 的命名方式
    const b = module.default
    console.log(b())
   })
})
if (module.hot) {// 开启热替换
   module.hot.accept()
}