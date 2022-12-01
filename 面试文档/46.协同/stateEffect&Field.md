# stateEffect&Field&Facet

主要作用就是扩展编辑器的功能 Extending Editor State，让编辑器能够处理更多的变化

首先需要注意的一点是：扩展调用的顺序
除非指定[优先级](https://codemirror.net/examples/config/),默认就是按照插件列表中的顺序


## stateEffect
编辑器默认处理的变化包括changes 以及selection effects,虽然effects已经具备，但是怎么样处理，需要外部自己定义，属于编辑器暴露处的接口


官方解释是：
```
State effects can be used to represent additional effects associated with a transaction.
They are often useful to model changes to custom state fields, when those changes aren't implicit in document or selection changes.
```

可用于表示与视图事务transaction  相关的effects
当这些更改不隐含在文档或选择更改中时，它们通常可用于对自定义状态字段的更改进行建模
比如设置选择范围的样式等


```ts
// 定义方式
static define<Value = null>(spec⁠?: Object = {}) → StateEffectType<Value>
Define a new effect type. The type parameter indicates the type of values that his effect holds
```

示例
```ts
// Value  实际上是可以理解为该数据类型所对应的数据
class Mark {
      constructor(readonly from: number,
                  readonly to: number,
                  readonly id: string) {}

      map(mapping: ChangeDesc) {
        let from = mapping.mapPos(this.from, 1), to = mapping.mapPos(this.to, -1)
        return from >= to ? undefined : new Mark(from, to, this.id)
      }

      toString() { return `${this.from}-${this.to}=${this.id}` }
    }
let addMark = StateEffect.define<Mark>({map: (v, m) => v.map(m)}) // 定义

// 调用
state.update({effects: addMark.of(new Mark(3, 5, "b"))})

```

针对上述类型的解释
addMark  返回值是一个stateEffectType , 可以看一下源码的实现
```js
/**
    Define a new effect type. The type parameter indicates the type
    of values that his effect holds.
    */
static define(spec = {}) {
    return new StateEffectType(spec.map || (v => v));
}

```
在看一下StateEffectType是如何处理map函数的
```ts
/**
Representation of a type of state effect. Defined with
[`StateEffect.define`](https://codemirror.net/6/docs/ref/#state.StateEffect^define).
*/
class StateEffectType {
    /**
    @internal
    */
    constructor(
    // The `any` types in these function types are there to work
    // around TypeScript issue #37631, where the type guard on
    // `StateEffect.is` mysteriously stops working when these properly
    // have type `Value`.
    /**
    @internal
    */
    map) {
        this.map = map;  //  调用define时传入的map
    }
    /**
    Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
    type.
    */
    of(value) { return new StateEffect(this, value); }
}
/**
State effects can be used to represent additional effects
associated with a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction.effects). They
are often useful to model changes to custom [state
fields](https://codemirror.net/6/docs/ref/#state.StateField), when those changes aren't implicit in
document or selection changes.
*/
class StateEffect {
    /**
    @internal
    */
    constructor(
    /**
    @internal
    */
    type, 
    /**
    The value of this effect.
    */
    value) {
        this.type = type;
        this.value = value;
    }
    /**
    Map this effect through a position mapping. Will return
    `undefined` when that ends up deleting the effect.
    */
    map(mapping) {
        let mapped = this.type.map(this.value, mapping); // 当前的map 也就是外部传入的map
        return mapped === undefined ? undefined : mapped == this.value ? this : new StateEffect(this.type, mapped);
    }
    /**
    Tells you whether this effect object is of a given
    [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
    */
    is(type) { return this.type == type; }
    /**
    Define a new effect type. The type parameter indicates the type
    of values that his effect holds.
    */
    static define(spec = {}) {
        return new StateEffectType(spec.map || (v => v));
    }
    /**
    Map an array of effects through a change set.
    */
    static mapEffects(effects, mapping) {
        if (!effects.length)
            return effects;
        let result = [];
        for (let effect of effects) {
            let mapped = effect.map(mapping); // 数据类型自带的map 
            if (mapped)
                result.push(mapped);
        }
        return result;
    }
}

```


 如果不是协作模式的话，不需要定义map

addMark传入的map函数的用在 协作内部的映射,mapEffects 进行调用，调用方式为：
```js
// 可以查看 @codemirror/collab中的映射代码
effects = StateEffect.mapEffects(effects, update.changes);
```
在看一下mapEffects的实现
```ts
/**
    Map an array of effects through a change set.
    */
static mapEffects(effects: readonly StateEffect<any>[], mapping: ChangeDesc): readonly StateEffect<any>[];


/**
    Map an array of effects through a change set.
    */
static mapEffects(effects, mapping) {
    if (!effects.length)
        return effects;
    let result = [];
    for (let effect of effects) {
        let mapped = effect.map(mapping);
        if (mapped)
            result.push(mapped);
    }
    return result;
}
```


map传入的数据(v, m) => v.map(m)
其中v 表示当前类型所使用的数据, 在调用时也就是 new Mark(3, 5, "b")
v.map  表示所使用的数据必须具有map属性, Mark 的所自带的map属性
m  实际上是 映射所要基于的改变 一般指changes

 原生自带map的数据类型： selection changes SelectionRange 等


 总结一下就是： define时，声明好要传入的类型，并且决定是否传入map函数
 of 时进行调用， 传入对应类型数据，创建对应的effects

这个过程和创建changes 以及selection  的过程一样


## stateField

一句话，就是处理对应的stateEffect


```ts
//Fields can store additional information in an editor state, and keep it in sync with the rest of the state.
create(state: EditorState) → Value
Creates the initial value for the field when a state is created.

update(value: Value, transaction: Transaction) → Value
Compute a new value from the field's previous value and a transaction.
```

这里的value 需要定义的类型保持一致

```ts
 let marks = StateField.define<Mark[]>({
      create: () => [],
      update(value, tr) {
        value = value.map(m => m.map(tr.changes)).filter(x => x) as any
        for (let effect of tr.effects) if (effect.is(addMark)) value = value.concat(effect.value)
        return value.sort((a, b) => a.id < b.id ? -1 : 1)
      }
    })
```

marks也是一个插件，视图更新时，也会调用update，
调用顺序，在其他插件中生成effects时，再在update进行处理

## Facet
A facet is a labeled value that is associated with an editor state. It takes inputs from any number of extensions, and combines those into a single output value.

比较显著的应用是将effects应用到视图上
应用的方式是
```ts
provide: (f) => showTooltip.computeN([f], (state) => state.field(f)) // 输入输出列表类型
provide: f => EditorView.decorations.from(f)//可以换成下面的写法
provide: (f) => EditorView.decorations.from(f)
```
provide  言下之意提供当前插件的值交给视图去渲染

f 隐式传递当前所在的filed  

state.field(对应的statefiled)  返回的是update 的返回值或者create  的返回值

















