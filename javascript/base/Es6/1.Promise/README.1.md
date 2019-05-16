## 前言

我们根据[Promises/A+](https://promisesaplus.com/) 规范来一步步实现一个`Promise`

## 基本用法

我们先看下Promise 的一个基本的用法

```javascript
new Promise((resolve, reject) => {
    resolve('OK')
}).then(
    msg => console.log(msg),
    err => console.log(err) 
)
```
上面是一个最简单的`Promise`的使用方式，我们可以根据上面的代码分析：

1. `Promise` 是一个对象
2. 实例化一个`Promise` 需要传递一个参数，而且参数是一个`Function`
3. 作为参数的`Function` 接收两个参数: `resolve` 和`reject`，而且都是一个`Function`
4. `new` 一个实例化对象有一个`then` 的实例方法
5. `then` 方法接收两个参数, 而且两个参数都是`Function` ，而且都接收一个参数`msg` 或者`err`

我们将上面的代码做如下转换成如下代码，更便于我们分析代码：

```javascript
new Promise(function executor (resolve, reject){
    resolve('OK')
}).then(
    function onResolve(msg) {
        console.log(msg)
    },
    function onReject(err) {
        console.log(err)
    }
)
```
在上面代码，我们将三个箭头函数都转换成了ES5的函数形式，并且都进行了命名： `exector`, `onResolve` , `onReject`,

从上面的命名我们可以知道：
1. 我们在创建一个`Promise`的实例对象时，我们传入了一个`exector`(执行器)的函数
2. `onResolve` 从名称上理解应该就是在`exector` 函数执行时`resolve` 要执行的回调函数
3. 同样`onReject` 从名称上理解应该就是在`exector` 函数执行时`reject` 要执行的回调函数

所以我们可以根据上面的分析来简单来设置`MyPromise` 这个对象代码：
```javascript
class MyPromise {

    let resolve = msg => {

    }

    let reject = err => {

    }

    constructor (executor) {
        executor(resolve, reject)
    }

    then (onResolve, onReject) {

    }

}
```

上面我们已经写好了`MyPromise` 的基本框架，但是当我们执行完`executor` 后，
需要根据执行的是`resolve` 或者`reject` 来执行`then` 方法中对应的的`onResolve` 和 `onReject` 方法.

我们可以来查看下[Promises/A+](https://promisesaplus.com/#promise-states) 规范中关于**Promise States** 对于状态的描叙：
> A promise must be in one of three states: pending, fulfilled, or rejected.

我们可以根据这个状态来进行处理：
1. 首先在`MyPromise` 中维护三个状态变量，分别是： pending, fulfilled, rejected.
2. 我们在`MyPromise` 中为一个当前状态变量`currentState`,其默认值是`pending`
3. 我们在执行内部方法`resolve`,`reject` 去设置`currentState` 的值
4. 我们在执行`then` 方法时，根据`currentState` 来判断是执行`onResolve` 还是`onReject`
5. 我们执行`onResolve`和`onReject`时，需要传递`resolve`和`reject`的值，所以我们还需要定义两个变量来保存值，分别是:`value`, `reason`
修改后的代码如下：
```javascript
class MyPromise {
    constructor (executor) {
        this.STATUS = {
            PENDING: 'pending',
            FULFILLED: 'fulfilled',
            REJECTED: 'rejected'
        }
        this.currentState = this.STATUS.PENDING
        let resolve = msg => {
            this.currentState = this.STATUS.FULFILLED
            this.value = msg
        }

        let reject = err => {
            this.currentState = this.STATUS.REJECTED
            this.reason = err
        }
        this.value = undefined
        this.reason = undefined
        executor(resolve, reject)
    }     
    then (onResolve, onReject) {
        if (this.currentState === this.STATUS.FULFILLED) {
           onResolve &&  onResolve(this.value)
        } else if (this.currentState === this.STATUS.REJECTED) {
            onReject && onReject(this.reason);
        }
    }

}

new MyPromise((resolve, reject) => {
    resolve('ok')
}).then(msg => console.log(msg), err => console.log(err))
```

## 异步执行

上面的代码已经一些了一个**同步** 的Promise, 但是Promise解决的一个最核心的痛点就是**异步回调地狱**,
所以我们下面来看下Promise 异步的实现方式：

1. 首先我们需要明确的是`then` 方法是一个**同步**的方法
2. `Promise` 默认的初始化状态`pending`, 而且只有在`resolve` 和`reject` 中才会变更状态
3. 所以如果是异步执行的时候，我们在`then` 方法中去判断状态，如果是`pending` 的时候，
我们将`then`方法的两个参数方法`onResolve`, `onRject` 保存起来, 在`resolve`和`reject` 中去执行
4. 我们可以来查看下[Promises/A+](https://promisesaplus.com/#promise-states) 规范中关于**Promise States** 对于状态的描叙：
 
![](https://user-gold-cdn.xitu.io/2019/5/9/16a9bb5d42c0e2b8?w=801&h=377&f=png&s=44401)

`must not transition to any other state.`状态是不可逆转的,  

修改后的代码如下：

```javascript
class MyPromise {
    constructor (executor) {
        this.STATUS = {
            PENDING: 'pending',
            FULFILLED: 'fulfilled',
            REJECTED: 'rejected'
        }
        this.currentState = this.STATUS.PENDING
        let resolve = msg => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.FULFILLED
                this.value = msg
                this.onResovleCallbacks.forEach(cb => cb(this.value))
            }
           
        }

        let reject = err => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.REJECTED
                this.reason = err
                this.onRejectedCallbacks.forEach(cb => cb(this.reason))  
            }
            
        }
        this.value = undefined
        this.reason = undefined
        this.onResovleCallbacks = []
        this.onRejectedCallbacks = []
        executor(resolve, reject)
    }     
    then (onResolve, onReject) {
        if (this.currentState === this.STATUS.FULFILLED) {
           onResolve &&  onResolve(this.value)
        } else if (this.currentState === this.STATUS.REJECTED) {
            onReject && onReject(this.reason);
        } else if (this.currentState === this.STATUS.PENDING) {
            this.onResovleCallbacks.push(onResolve)
            this.onRejectedCallbacks.push(onReject)
        }
    }

}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
    
}).then(msg => console.log(msg), err => console.log(err))
```

## 链式调用

上面我们已经完成了`Promise`的基本功能， 但是`Promise` 还有一个特性就是**链式调用** ，我们下面来看下**链式调用** 是怎么实现的。

我们先看下**链式调用** 是怎么调用的:

```javascript
new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})
.then(
    msg => {
      console.log(msg)
      return 100 
     },
    err => {
        console.log(err)
        return 0
     }
).then(
    msg => {
      console.log(msg)
      
     },
     err => {
        console.log(err)        
     }
)
```
上面的案例是一个简单的**链式调用** 的Demo,最好会先后输出: OK, 100

我们来分析下上面的代码：

1. 在`then` 的`onResolve` 中有一个返回值 100
2. `then` 是`Promise`的一个实例方法，但是它却可以**链式调用** `then` 方法，说明`then` 返回了一个新的`Promise` 对象
3. 当`then`返回一个正常的值时，在链式调用的时候,应该执行的是下一个`then` 方法的`onResolve`, 
如果抛出**异常**，应该执行下一个`then`方法的`onReject`
我们现在根据上面分析的两点来进行`MyPromise` 的改进，

修改后的代码如下：
```javascript
class MyPromise {
    constructor (executor) {
        this.STATUS = {
            PENDING: 'pending',
            FULFILLED: 'fulfilled',
            REJECTED: 'rejected'
        }
        this.currentState = this.STATUS.PENDING
        let resolve = msg => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.FULFILLED
                this.value = msg
                this.onResovleCallbacks.forEach(cb => this.value = cb(this.value))
            }
           
        }

        let reject = err => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.REJECTED
                this.reason = err
                this.onRejectedCallbacks.forEach(cb => this.value = cb(this.reason))  
            }
            
        }
        this.value = undefined
        this.reason = undefined
        this.onResovleCallbacks = []
        this.onRejectedCallbacks = []
        executor(resolve, reject)
    }     
    then (onResolve, onReject) {  
        let promise2 = new MyPromise((resolve2, reject2) => {
            this.onResovleCallbacks = []
            this.onRejectedCallbacks = []
            let newValue
              if (this.currentState === this.STATUS.FULFILLED) { 
                try {
                    newValue = onResolve &&  onResolve(this.value)
                    resolve2(newValue)
                }catch(err) {
                    reject2(err)
                }
                   
              } else if (this.currentState === this.STATUS.REJECTED) {                    
                try {
                    newValue = onReject &&  onReject(this.reason) 
                    resolve2(newValue)
                }catch(err) {
                    reject2(err)
                }

              } else if (this.currentState === this.STATUS.PENDING) {
                    this.onResovleCallbacks.push(() => {
                        try {
                            newValue = onResolve(this.value)
                            resolve2(newValue)
                        }catch(err) {
                            reject2(err)
                        }
                        
                    })
                    this.onRejectedCallbacks.push(() => {
                        try {
                            newValue = onReject(this.reason) 
                            resolve2(newValue)
                        }catch(err) {
                            reject2(err)
                        }
                    })
              }
        })
        return promise2;
    }

}
// Demo
new MyPromise((resolve,reject) => {
    setTimeout(() => {
        resolve('ok')
    }, 1000)
})
.then(
    msg => {
      console.log(msg)
      throw Error('custom error')
     },
    err => {
        console.log(err)
        return 0
     }
).then(
    msg => {
      console.log('msg', msg)
      
     },
     err => {
        console.log('%cReject reason','background:red; color:white', err)
        return 'Reject'           
     }
).then(
    msg => {
      console.log('msg', msg)
      
     },
     err => {
        console.log('%cReject reason','background:red; color:white', err)
        return 'Reject'          
     }
)
```

## then 返回 Promise

在上面的代码我们已经实现了一个**异步**,**链式调用** 的`Promise`, 但是链式调用我们考虑的只是在`then` 方法中返回值的情况
其实在`then` 方法中，可以直接返回一个`Promise`,同样是一个**链式** 调用，如下用例：
```javascript
new Promise((resolve, reject) => {
        resolve(100)   
}).then(msg => {
    return new  Promise((resolve, reject) => {
        resolve(msg + 200)
    })
}).then(msg => console.log(msg))
```
上面的用例在最后输出的是`300`, 

但是用`MyPromise` 执行，最后输出的是一个`MyPromise`的对象：
```javascript
new MyPromise((resolve, reject) => {
        resolve(100)   
}).then(msg => {
    return new  MyPromise((resolve, reject) => {
        resolve(msg + 200)
    })
}).then(msg => console.log(msg))
```
根据上面的代码分析可知：
1. 我们首先需要在`then` 方法中当执行`onResolve`, `onReject`中执行返回的结果判断是否是一个`MyPromise` 类型: `newValue instanceof MyPromise`
2. 如果`newValue` 不是一个`MyPromise` 对象，我们就按照之前的逻辑直接调用`resovle` 或者`reject` 方法
3. 如果`newValue` 是一个`MyPromise` 对象，我们
```javascript
 
class MyPromise {
    constructor (executor) {
        this.STATUS = {
            PENDING: 'pending',
            FULFILLED: 'fulfilled',
            REJECTED: 'rejected'
        }
        this.currentState = this.STATUS.PENDING
        let resolve = msg => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.FULFILLED
                this.value = msg
                this.onResovleCallbacks.forEach(cb => this.value = cb(this.value))
            }
           
        }

        let reject = err => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.REJECTED
                this.reason = err
                this.onRejectedCallbacks.forEach(cb => this.value = cb(this.reason))  
            }
            
        }
        this.value = undefined
        this.reason = undefined
        this.onResovleCallbacks = []
        this.onRejectedCallbacks = []
        executor(resolve, reject)
    }     
    then (onResolve, onReject) {
        function resolvePromise(value, resolve, reject ) {
            if(value instanceof MyPromise) {
                value.then.call(
                    value, 
                    function onResolve(data) {
                            resolve(data)
                    },
                    function onReject(err) {
                        reject(err)
                    })
            } else {
                resolve(value)
            }
        }  
        let promise2 = new MyPromise((resolve, reject) => {
            this.onResovleCallbacks = []
            this.onRejectedCallbacks = []
            let newValue
              if (this.currentState === this.STATUS.FULFILLED) { 
                try {
                    newValue = onResolve &&  onResolve(this.value)
                    resolvePromise(newValue, resolve, reject)
                }catch(err) {
                    reject(err)
                }
                   
              } else if (this.currentState === this.STATUS.REJECTED) {                    
                try {
                    newValue = onReject &&  onReject(this.reason) 
                    resolvePromise(newValue, resolve, reject)
                }catch(err) {
                    reject(err)
                }

              } else if (this.currentState === this.STATUS.PENDING) {
                    this.onResovleCallbacks.push(() => {
                        try {
                            newValue = onResolve(this.value)
                            resolvePromise(newValue, resolve, reject)
                        }catch(err) {
                            reject(err)
                        }
                        
                    })
                    this.onRejectedCallbacks.push(() => {
                        try {
                            newValue = onReject(this.reason) 
                           resolvePromise(newValue, resolve, reject)
                        }catch(err) {
                            reject(err)
                        }
                    })
              }
        })
        return promise2;
    }

}
// Demo
new MyPromise((resolve, reject) => {
        resolve(100)   
}).then(msg => {
    return new  MyPromise((resolve, reject) => {
        resolve(msg + 200)
    })
}).then(msg => console.log(msg))
```
上面的代码的改动就是在`then` 方法中添加了一个`resolvePromise`, 然后用这个方法替换之前的`resolve2(newValue)`

## 静态方法resolve和reject

上面我们已经完成了一个`Promise` 的基本功能,但是我们生成一个`Promise` 都是通过`new` 创建一个对象，
其实`Promise` 还有两个静态方法，同样可以生成一个`Promise` 对象，如下范例：
```javascript
Promise.resolve(1).then(msg => console.log(msg))
Promise.reject('error msg').then(msg => console.log(msg), err => console.log(err))
```
从上面的代码我们可以分析得知：
1. `resolve` 和`reject` 是挂载在`Promise` 上面的两个静态方法
2. `resolve` 和`reject`后面可以直接调用`then` 方法，说明这两个方法返回的是一个`Promise` 对象
3. 调用`resolve` 方法，直接执行的是`onResolve`方法
4. 调用`reject` 方法，直接执行的是`onReject` 方法

我们根据上面的分析，将`MyPromise` 代码修改如下：
```javascript
 
class MyPromise {
    constructor (executor) {
        this.STATUS = {
            PENDING: 'pending',
            FULFILLED: 'fulfilled',
            REJECTED: 'rejected'
        }
        this.currentState = this.STATUS.PENDING
        let resolve = msg => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.FULFILLED
                this.value = msg
                this.onResovleCallbacks.forEach(cb => this.value = cb(this.value))
            }
           
        }

        let reject = err => {
            if (this.currentState === this.STATUS.PENDING) {
                this.currentState = this.STATUS.REJECTED
                this.reason = err
                this.onRejectedCallbacks.forEach(cb => this.value = cb(this.reason))  
            }
            
        }
        this.value = undefined
        this.reason = undefined
        this.onResovleCallbacks = []
        this.onRejectedCallbacks = []
        executor(resolve, reject)
    }     
    then (onResolve, onReject) {
        function resolvePromise(value, resolve, reject ) {
            if(value instanceof MyPromise) {
                value.then.call(
                    value, 
                    function onResolve(data) {
                            resolve(data)
                    },
                    function onReject(err) {
                        reject(err)
                    })
            } else {
                resolve(value)
            }
        }  
        let promise2 = new MyPromise((resolve, reject) => {
            this.onResovleCallbacks = []
            this.onRejectedCallbacks = []
            let newValue
              if (this.currentState === this.STATUS.FULFILLED) { 
                try {
                    newValue = onResolve &&  onResolve(this.value)
                    resolvePromise(newValue, resolve, reject)
                }catch(err) {
                    reject(err)
                }
                   
              } else if (this.currentState === this.STATUS.REJECTED) {                    
                try {
                    newValue = onReject &&  onReject(this.reason) 
                    resolvePromise(newValue, resolve, reject)
                }catch(err) {
                    reject(err)
                }

              } else if (this.currentState === this.STATUS.PENDING) {
                    this.onResovleCallbacks.push(() => {
                        try {
                            newValue = onResolve(this.value)
                            resolvePromise(newValue, resolve, reject)
                        }catch(err) {
                            reject(err)
                        }
                        
                    })
                    this.onRejectedCallbacks.push(() => {
                        try {
                            newValue = onReject(this.reason) 
                           resolvePromise(newValue, resolve, reject)
                        }catch(err) {
                            reject(err)
                        }
                    })
              }
        })
        return promise2;
    }

}
// 修改的代码：
MyPromise.resolve = (data) => {
    return new MyPromise ((resolve, reject) => {
        resolve(data)
    })
}
MyPromise.reject = (err) => {
     return new MyPromise ((resolve, reject) => {
        reject(err)
    })
}
// Demo
MyPromise.resolve(1).then(msg => console.log(msg))
MyPromise.reject('error msg').then(msg => console.log(msg), err => console.log(err))
```

## 静态方法race和all

上面我们已经给`MyPromise` 添加了`resolve` 和`reject` 两个静态方法，我们下面添加`race` 和`all` 两个静态方法，

我们还是先看下`all` 的使用方式：
```javascript
let promises = [];
for(let i =0 ;i < 10 ;i ++) {
    let p = new Promise((resolve, reject) => {
        resolve(i)
    })
    promises.push(p)
}
Promise.all(promises).then(
    datas => console.log(datas.join(',')),
    err => console.log(err)
    )
```
我们从上面的代码可以分析得知：
1. `all` 方法，接收的是一个数组，而且是一组`Promise` 对象
2. 调用`all` 方法后， 可以**链式调用** `then` 说明`all` 方法返回的是一个`Promise` 对象
3. 如果有任何一个`Promise` 调用`reject`, 则整个流程结束，调用`then` 的`onReject` 方法
4. 当所有的`Promise`都调用`resolve`后，会调用`then` 的`onReject` 方法， 且将每个`Promise` 调用`resolve` 返回的值按照**顺序** 保存在一个数组中

``` javascript
// 将MyPromise 的定义部分省略了，同上

MyPromise.all = (promises) => {
    if (!Array.isArray(promises)) {
        promises = [promises]
    }
    let results = []
    let promise2 = new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then(msg => {
               results.push(msg) 
            },
            err => {
                reject(err)
            })
        })
        resolve(results)
    })
    return promise2
}

// Demo

let promises = [];
for(let i =0 ;i < 10 ;i ++) {
    let p = new MyPromise((resolve, reject) => {
        resolve(i)
    })
    promises.push(p)
}
MyPromise.all(promises).then(
    datas => console.log(datas.join(',')),
    err => console.log(err)
    )

let promises2 = [];
for(let i =0 ;i < 10 ;i ++) {
    let p = new MyPromise((resolve, reject) => {
        if (i === 5) {
            reject('error msg ' + i)
        } else {
           resolve(i)
        }
       
    })
    promises2.push(p)
}
MyPromise.all(promises2).then(
    datas => console.log(datas.join(',')),
    err => console.log(err)
    )

```

上面我们已经实现了`all` 的功能，现在我们再来分析下`race` 的功能

我们还是从`race` 的使用方法来进入分析：
```javascript
let promises = [];
for(let i =0 ;i < 10 ;i ++) {
    let p = new Promise((resolve, reject) => {
        resolve(i)
    })
    promises.push(p)
}
Promise.race(promises).then(
    data => console.log(data),
    err => console.log(err)
    )
```
1. 从上面的代码可知，`race` 与`all` 第一个区别就是:`then` 中`onResolve` 方法返回的不再是一个数组了，而是一个单个的值
2. `race` 要实现的功能就是，在一组`Promsie` 中，任何一个`Promise` 先执行`resove` 或者`reject` 都结束流程

我们从上面的解析中，我们来实现下`race` 函数：
```javascript
MyPromise.race = (promises) => {
    if (!Array.isArray(promises)) {
        promises = [promises]
    }
    let results = []
    let promise2 = new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then(msg => {
               resolve(msg) 
            },
            err => {
              reject(err)
            })
        })
        resolve(results)
    })
    return promise2
}

// Demo

let promises = [];
for(let i =0 ;i < 10 ;i ++) {
    let p = new MyPromise((resolve, reject) => {
        resolve(i)
    })
    promises.push(p)
}
MyPromise.race(promises).then(
    data => console.log(data),
    err => console.log(err)
    )

let promises2 = [];
for(let i =0 ;i < 10 ;i ++) {
    let p = new MyPromise((resolve, reject) => {
        if (i === 0) {
            reject('error msg ' + i)
        } else {
           resolve(i)
        }
       
    })
    promises2.push(p)
}
MyPromise.race(promises2).then(
    data => console.log(data),
    err => console.log(err)
    )
```

## catch

我们上面已经写好了一个我们自己的`Promise` ,但是`Promise` 还有一个实例方法`catch`,
我们先看下`catch` 的如下七个使用范例以及对应的输出来进行分析：
```javascript
// Demo 1
new Promise((resolve, reject) => {
    throw Error('throw a error')
}) 
// 输出:
// 没有任何的输出，直接报JS错误

// Demo 2
new Promise((resolve, reject) => {
    throw Error('throw a error')
})
.then(
    msg => console.log('onResolve:' + msg))
// 输出：
// 没有任何的输出，直接报JS错误

// Demo 3
new Promise((resolve, reject) => {
    throw Error('throw a error')
}) 
.then(
    msg => console.log('onResolve:' + msg),
    err => console.log('onReject:' + err))
// 输出：
// onReject:Error: throw a error

// Demo 4
new Promise((resolve, reject) => {
    throw Error('throw a error')
})
.catch(err => console.log('onCatch:'+ err))
.then(
    msg => console.log('onResolve:' + msg),
    err => console.log('onReject:' + err))
// 输出：
// onCatch: Error: throw a error
// onResolve:undefined

// Demo 5
new Promise((resolve, reject) => {
    throw Error('throw a error')
})
.then(
    msg => console.log('onResolve:' + msg),
    err => console.log('onReject:' + err))
.catch(err => console.log('onCatch:'+ err))
// 输出：
// onReject: Error: throw a error
 
// Demo 6
new Promise((resolve, reject) => {
    throw Error('throw a error')
})
.then(
    msg => console.log('onResolve:' + msg))
.catch(err => console.log('onCatch:'+ err))
// 输出:
// onCatch:Error: throw a error

// Demo 7
new Promise((resolve, reject) => {
   reject(1)
})
.catch(err => console.log('onCatch:'+ err))
.then(
    msg => console.log('onResolve:' + msg),
    err => console.log('onReject:' + err))
// 输出：
// onCatch: 1
// onResolve:undefined

// Demo 8
new Promise((resolve, reject) => {
   resolve(1)
})
.catch(err => console.log('onCatch:'+ err))
.then(
    msg => console.log('onResolve:' + msg),
    err => console.log('onReject:' + err))
// 输出：
// onReject: 1

```
上面的所有的Demo 1 到　Demo 6 我们都是先在`Promise` 的`executor`(构造函数的参数),中直接抛出了一个`Error`：
1. 在Demo 1 中，我们只是创建了一个`Promise`的对象，没有再调用任何的方法，执行的结果是直接报JS错误
2. 在Demo 2 中，我们`链式调用` 了`then` 方法，但是我们没有传递`onReject` 方法，执行的结果也是直接报JS错误
3. 在Demo 3 中，我们`链式调用` 了`then` 方法，而且传递了`onReject` 方法，执行的结果是运行了`onReject` 方法
4. 在Demo 4 中，我们`链式调用` 了`catch` -> `then` 方法, 而且`then` 传递了`onResolve` 和`onReject`, 
执行的结果是： 首先输出了`catch` 方法，然后执行了`then`的`onResove` 方法，但是`msg` 是`undefined`,是因为在`throw` 中没有`return` 任何的值
5. 在Demo 5 中，我们`链式调用` 了`then` -> `catch` 方法， 而且在`then` 中传递了`onResove`和`onReject`,
执行的结果是: 只执行了`then` 中的`onReject` 方法，　`catch` 方法没有执行
6. 在Demo 6 中，我们`链式调用` 了`then` -> `catch` 方法，但是在`then` 中没有传递`onReject`，　
执行的结果是: 只执行了`catch`方法
7. 在Demo 7 中，我们在`executor` 中直接执行`reject`, 然后`链式调用`了`catch` -> `then` ,并且在`then` 中传递了`onReject`,
执行的结果是: 执行`catch` 和`then`中的`onResove`
8. 在Demo 8 中，我们在`executor` 中直接执行了`resolve`, 然后链式调用le`catch` -> `then`, 并且在`then`中传递了`onReject`,
执行的结果是： 没有执行`catch`, 直接执行了`then` 的`onResolve` 方法, 并且`resovle`传递的值也被`then` 中的`onResove` 接收.

所以我们从上面的分析可知：
1. `catch` 可以`链式调用`，说明`catch` 是一个`实例方法`，而且返回的也是一个`新的Promise`
2. `executor` 会抛出错误，所以我们在执行`executor`时需要`try` `catch`, 并且在`catch` 中要执行`onReject`, 将状态变更成`rejected`
3. `executor` 抛出错误或者执行`reject`, 如果直接调用`catch` 都是会执行的，所以可以认为如果当前状态是`rejected`, 直接调用`catch` 都会执行的
```javascript
function createNewPromise(onResolve, onReject) {
    function resolvePromise(value, resolve, reject) {
      if (value instanceof MyPromise) {
        value.then.call(
          value,
          function onResolve(data) {
            resolve(data)
          },
          function onReject(err) {
            reject(err)
          })
      } else {
        resolve(value)
      }
    }
  let promise2 = new MyPromise((resolve, reject) => {
    this.onResovleCallbacks = []
    this.onRejectedCallbacks = []
    let newValue
    if (this.currentState === this.STATUS.FULFILLED) {
      try {
        newValue = onResolve && onResolve(this.value)
        resolvePromise(newValue, resolve, reject)
      } catch (err) {
        reject(err)
      }

    } else if (this.currentState === this.STATUS.REJECTED) {
      try {
        newValue = onReject(this.reason)
        this.error = null;
        resolvePromise(newValue, resolve, reject)
      } catch (err) {
        reject(err)
      }

    } else if (this.currentState === this.STATUS.PENDING) {
      this.onResovleCallbacks.push(() => {
        try {
          newValue = onResolve(this.value)
          resolvePromise(newValue, resolve, reject)
        } catch (err) {
          reject(err)
        }

      })
      this.onRejectedCallbacks.push(() => {
        try {
          newValue = onReject(this.reason)
          resolvePromise(newValue, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    }
  })
  return promise2
}
class MyPromise {
  constructor(executor) {
    this.STATUS = {
      PENDING: 'pending',
      FULFILLED: 'fulfilled',
      REJECTED: 'rejected'
    }
    this.error = null;
    this.currentState = this.STATUS.PENDING
    let resolve = msg => {
      if (this.currentState === this.STATUS.PENDING) {
        this.currentState = this.STATUS.FULFILLED
        this.value = msg
        this.onResovleCallbacks.forEach(cb => this.value = cb(this.value))
      }

    }

    let reject = err => {
      if (this.currentState === this.STATUS.PENDING) {
        this.currentState = this.STATUS.REJECTED
        this.reason = err
        this.onRejectedCallbacks.forEach(cb => this.value = cb(this.reason))
      }
    }
    this.value = undefined
    this.reason = undefined
    this.onResovleCallbacks = []
    this.onRejectedCallbacks = []
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
      this.error = e
    }

  }

  then(onResolve, onReject) {
    return createNewPromise.call(this, onResolve, onReject);
  }

  catch(onCatch) {
    return createNewPromise.call(this, null, onCatch);
  }

}
// 修改的代码：
MyPromise.resolve = (data) => {
  return new MyPromise((resolve, reject) => {
    resolve(data)
  })
}

MyPromise.reject = (err) => {
  return new MyPromise((resolve, reject) => {
    reject(err)
  })
}

MyPromise.all = (promises) => {
    if (!Array.isArray(promises)) {
        promises = [promises]
    }
    let results = []
    let promise2 = new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then(msg => {
               results.push(msg) 
            },
            err => {
                reject(err)
            })
        })
        resolve(results)
    })
    return promise2
}

MyPromise.race = (promises) => {
    if (!Array.isArray(promises)) {
        promises = [promises]
    }
    let results = []
    let promise2 = new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then(msg => {
               resolve(msg) 
            },
            err => {
              reject(err)
            })
        })
        resolve(results)
    })
    return promise2
}
```
<font size=5 color=red>问题:</font>

上面的代码已经基本实现了`catch` 功能，但是如果我们在`executor` 抛出异常，而且在`then` 方法中，没有传递`onReject` 方法， 应该报JS错误的，但是还没有实现

## finally
`finally`方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
我们先看下使用的方式如下：

```javascript
// Demo 1
Promise.resolve(1)
.finally(() => {
    console.log('finally')
})
.then(msg => console.log(msg)) 
// 输出
// finally
// 1

// Demo 2
Promise.resolve(1)
.finally(() => {
    console.log('finally')
    return 'finally'
})
.then(msg => console.log(msg)) 
// 输出
// finally
// 1
// Demo 3
Promise.resolve(1)
.then(() => {
    console.log('then')
    return 'then'
})
.then(msg => console.log(msg)) 
// 输出
// then
// then
```
从上面的范例我们可以分析得知：

1. 不管`Promise` 对象的最后状态如何，都会执行`finally`
2. 


## 静态方法try