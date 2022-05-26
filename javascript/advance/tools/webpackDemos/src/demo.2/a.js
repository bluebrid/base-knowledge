// import b from './b'
console.log('this is a')
const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
   import(/* webpackChunkName: "b" */ './b').then(module =>{ // 在动态引入的语法前，添加注释，对应的注释就是为chunk 的命名方式
    const b = module.default
    console.log(b())
   })
})