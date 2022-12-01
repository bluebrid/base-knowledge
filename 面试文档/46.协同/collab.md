# collab

## sendableUpdates

```js
function sendableUpdates(state) {
    return state.field(collabField).unconfirmed;
}
```
Returns the set of locally made updates that still have to be sent to the authority. The returned objects will also have an origin property that points at the transaction that created them. This may be useful if you want to send along metadata like timestamps. (But note that the updates may have been mapped in the meantime, whereas the transaction is just the original transaction that created them.)


collabField 默认是changes 也就是只返回 docChanges, 光标跟随以及selections不会被识别

光标需要做的事情是： 光标跟随，user样式展示， 多光标问题

需要解决的问题： 如何添加新的collabField

## StateField
Fields can store additional information in an editor state, and keep it in sync with the rest of the state


```js
let countDocChanges = StateField.define({
  create() { return 0 },
  update(value, tr) { 
    console.log(tr)
    return tr.docChanged ? value + 1 : value 
  }
})

console.log("countDocChanges", countDocChanges)

let countState = EditorState.create({
  doc:"1234456",
  extensions: countDocChanges
})
countState = countState.update({changes: {from: 0, insert: "."}}).state // 文本更改
// countState = countState.update({selection: {anchor:1, head:4}}).state // 选择更改
console.log(countState.field(countDocChanges)) // 1
```
可以当作插件，提供非默认信息




## StateEffect

State effects can be used to represent additional effects associated with a transaction. They are often useful to model changes to custom state fields, when those changes aren't implicit in document or selection changes.

```ts
declare type CollabConfig = {
    /**
    The starting document version. Defaults to 0.
    */
    startVersion?: number;
    /**
    This client's identifying [ID](https://codemirror.net/6/docs/ref/#collab.getClientID). Will be a
    randomly generated string if not provided.
    */
    clientID?: string;
    /**
    It is possible to share information other than document changes
    through this extension. If you provide this option, your
    function will be called on each transaction, and the effects it
    returns will be sent to the server, much like changes are. Such
    effects are automatically remapped when conflicting remote
    changes come in.
    */
    sharedEffects?: (tr: Transaction) => readonly StateEffect<any>[];
};
```

怎么识别到变化


# 变化
所有针对编辑器状态的改变都被转换为一个事务
典型的，用户打算创建一个事务：可能是文档变化、选择改变
或是其他效果， 可以通过
Create a transaction by calling
[`EditorState.update`](https://codemirror.net/6/docs/ref/#state.EditorState.update), or immediately
dispatch one by calling
[`EditorView.dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch)

如果想要查看中间状态，还是直接通过EditorState.update 生成事务进行查看

顺序其实有两种
通过state.update 创建事务，然后使用view.dispatch 应用更新
或是直接使用view.dispatch 应用更新

原理为 view.dispatch的接收参数
```js
/**
    All regular editor state updates should go through this. It
    takes a transaction or transaction spec and updates the view to
    show the new state produced by that transaction. Its
    implementation can be overridden with an
    [option](https://codemirror.net/6/docs/ref/#view.EditorView.constructor^config.dispatch). This
    function is bound to the view instance, so it does not have to
    be called as a method.
    */
    dispatch(tr: Transaction): void;
    dispatch(...specs: TransactionSpec[]): void;
    


```

满足以下格式即可
```js
interface TransactionSpec {
    /**
    The changes to the document made by this transaction.
    */
    changes?: ChangeSpec;
    /**
    When set, this transaction explicitly updates the selection.
    Offsets in this selection should refer to the document as it is
    _after_ the transaction.
    */
    selection?: EditorSelection | {
        anchor: number;
        head?: number;
    };
    /**
    Attach [state effects](https://codemirror.net/6/docs/ref/#state.StateEffect) to this transaction.
    Again, when they contain positions and this same spec makes
    changes, those positions should refer to positions in the
    updated document.
    */
    effects?: StateEffect<any> | readonly StateEffect<any>[];
}
```
## 主动设置变化
通过设置变化的信息，创建事务，并更新到视图
### 文本变化

from: 必须提供，插入点位置
to: 不提供默认单个位置
insert: 不提供默认为空

```js
changes = {
    from: 5, insert: "hello world"
}

transaction = view.state.update({changes: changes})
view.dispatch(transaction)
```

### 光标变化
都是对应selection

anchor： 锚定的位置
head： 不提供，相当于是focus行为， 当前的位置

```js
selection = {anchor: 5}
transaction_select = view.state.update({selection: selection})
view.dispatch(transaction_select) 

selection = {anchor:11, head:16}
view.dispatch({selection: selection})

```

```js
let ranges = [EditorSelection.range(11, 16),
                EditorSelection.cursor(5),
                 EditorSelection.range(0, 4)]


view.dispatch({
  selection: EditorSelection.create(ranges)
})
```



## 视图监测变化

```js
class Mark {
    constructor(from, to, id) {
        this.from = from;
        this.to = to;
        this.id = id;
    }
    map(mapping) {
        console.log("Mark", mapping)
        let from = mapping.mapPos(this.from, 1), to = mapping.mapPos(this.to, -1);
        return from >= to ? undefined : new Mark(from, to, this.id);
    }
    toString() { return `${this.from}-${this.to}=${this.id}`; }
}

let addMark = StateEffect.define({ map: (v, m) => v.map(m) });

s.update({ effects: addMark.of(new Mark(1, 3, "a")) })  // 自定义change的应用

```

StateEffect.define 中的map
```ts
interface StateEffectSpec<Value> {
    /**
    Provides a way to map an effect like this through a position
    mapping. When not given, the effects will simply not be mapped.
    When the function returns `undefined`, that means the mapping
    deletes the effect.
    */
    map?: (value: Value, mapping: ChangeDesc) => Value | undefined;
}
```


## codemirror6 中的映射

主要包含 changes selection 中的映射
map mapPos 等

### changeSet

```ts
class ChangeSet extends ChangeDesc
A change set represents a group of modifications to a document. It stores the document length, and can only be applied to documents with exactly that length.

由于扩展了 ChangeDesc  包含了字段 length(当前的doc长度) newLength（将要更改变成的长度）

apply(doc: Text) → Text
Apply the changes to a document, returning the modified document.
将本次的变化应用到doc上， 输入参数的doc的长度要和ChangeSet 中保存的长度是一致的，如果不一致将会报错

invert(doc: Text) → ChangeSet
相当于撤销已经做了的改变   doc 为最近一次更改的文本   
Given the document as it existed before the changes, return a change set that represents the inverse of this set, which could be used to go from the document created by the changes back to the document as it existed before the changes.

compose(other: ChangeSet) → ChangeSet
Combine two subsequent change sets into a single set. other must start in the document produced by this. If this goes docA → docB and other represents docB → docC, the returned value will represent the change docA → docC.

map(other: ChangeDesc, before⁠?: boolean = false) → ChangeSet
Given another change set starting in the same document, maps this change set over the other, producing a new change set that can be applied to the document produced by applying other. When before is true, order changes as if this comes before other, otherwise (the default) treat other as coming first.

Given two changes A and B, A.compose(B.map(A)) and B.compose(A.map(B, true)) will produce the same document. This provides a basic form of operational transformation, and can be used for collaborative editing.

iterChanges(
f: fn(
fromA: number,
toA: number,
fromB: number,
toB: number,
inserted: Text
),
individual⁠?: boolean = false
)
Iterate over the changed ranges in the document, calling f for each, with the range in the original document (fromA-toA) and the range that replaces it in the new document (fromB-toB).

When individual is true, adjacent changes are reported separately.

desc: ChangeDesc
Get a change description for this change set.

toJSON() → any
Serialize this change set to a JSON-representable value.

static of(
changes: ChangeSpec,
length: number,
lineSep⁠?: string
) → ChangeSet
Create a change set for the given changes, for a document of the given length, using lineSep as line separator.

static empty(length: number) → ChangeSet
Create an empty changeset of the given length.

static fromJSON(json: any) → ChangeSet
Create a changeset from its JSON representation (as produced by toJSON.
```


```js
// eg1 apply  
let state = EditorState.create({doc: "1233"})

let tr = testState.update({changes:{from:0, insert:"5"}})  // apply 5 to 1233 => 51233

let applyChangeSet = tr.changes

doc = applyChangeSet.apply(state.doc) // 这里不能直接更新 state.doc
let new_state = tr.state // doc => 51233

// eg2 invert  相当于撤销此次更新

let invertChangeSet = applyChangeSet.invert(new_state.doc)

original_doc = invertChangeSet.apply(new_state.doc)


compose和map 需要结合使用, 最主要解决原有元素的位置变化
Given two changes A and B, A.compose(B.map(A)) and B.compose(A.map(B, true)) will produce the same document. This provides a basic form of operational transformation, and can be used for collaborative editing.

```

### EditorSelection

这部分包括两部分操作 光标操作以及文本选择

其中光标操作表示为
```ts
state.update({selection: {anchor: 10}})

let ranges = [EditorSelection.range(10, 10)] // range(achor, head)
state.update({selection: EditorSelection.create(ranges))


// 需要进行位置映射

// setp1 设定初始选择
state = view.state
tr_selection = state.update({selection: {anchor:6, head:10}})
view.dispath(tr_selection)
// step2  更改文本   同时保持原来选择的前后元素保持一致
tr_change = state.update({changes: {from:6, insert:"test"}})

// 映射处新的位置
tr_selection_2 = tr_selection.selection.map(tr_change.changes.desc)
// => 得到的最新的选择范围是 {anchor:6, head:14}

// 应用到最新的视图上
combine_tr = state.update({changes:{from:6, insert:"test"}, selection: {anchor:6, head:14}})
view.dispatch(combine_tr)

```


![](vx_images/454783476807222.png =585x)


![](vx_images/104954608901362.png =604x)

光标的变化同理


### StateEffect
对stateField 进行建模，表示自定义的变化事件

####  定义与使用

```js
class Mark {
  constructor(from, to, id) {
      this.from = from;
      this.to = to;
      this.id = id;
  }
  map(mapping) {
      console.log("Mark", mapping)
      let from = mapping.mapPos(this.from, 1), to = mapping.mapPos(this.to, -1);
      return from >= to ? undefined : new Mark(from, to, this.id);
  }
  toString() { return `${this.from}-${this.to}=${this.id}`; }
}

// 返回是一个 StateEffectType类型， 使用场景在 使用StateEffect实例的is属性

let addMark = StateEffect.define({ map: (v, m) => v.map(m) });


```

直接使用StateEffect的静态define方法进行定义，对于参数的传入，取决与使用，对于这一描述
![](vx_images/240242918648738.png =425x)

不同于 selection 自带的map的实现(EditorSelection 扩展的SelectionRange )
```js
// EditorSelection的map
/**
    Map a selection through a change. Used to adjust the selection
    position for changes.
    */
    map(change, assoc = -1) {
        if (change.empty)
            return this;
        return EditorSelection.create(this.ranges.map(r => r.map(change, assoc)), this.mainIndex);
    }
// SelectionRange 的map
/**
    Map this range through a change, producing a valid range in the
    updated document.
    */
    map(change, assoc = -1) {
        let from, to;
        if (this.empty) {
            from = to = change.mapPos(this.from, assoc);
        }
        else {
            from = change.mapPos(this.from, 1);
            to = change.mapPos(this.to, -1);
        }
        return from == this.from && to == this.to ? this : new SelectionRange(from, to, this.flags);
    }
```

 StateEffect 的map 依赖于外部传入（具体看下of 函数的返回），不过如果不需要考虑对由文档内容发生变化而引起的位置进行映射，则不需要传入。
 在协作编辑的场景下，必须传入
 





```js
tr = state.update({effects: addMark.of(new Mark(1, 3, "a"))})
view.dispatch(tr)
```
addMark.of 返回一定是一个StateEffect对象，可以看一下具体返回了那些东西

```js
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
        this.map = map;
    }
    /**
    Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
    type.
    */
    of(value) { return new StateEffect(this, value); }
}
```

在看下 StateEffect 的define
```js
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
        let mapped = this.type.map(this.value, mapping);
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
            let mapped = effect.map(mapping);
            if (mapped)
                result.push(mapped);
        }
        return result;
    }
}
```

这个地方相当于进行了链式调用 

```js
//   返回一个StateEffectType一个实例， 同时对map属性进行赋值
static define(spec = {}) {
        return new StateEffectType(spec.map || (v => v));
    }
    
// 然后基于上述返回的实例 返回一个StateEffect实例，实例参数 type value 进行赋值
of(value) { return new StateEffect(this, value); }
```
value的作用，相当于描述了自定义effect 的值，也就是如何表现

上述中，StateEffect的实例化方法 map 依赖type 属性的值，更进一步，也就是依赖于外部输入

该map方法，在静态方法mapEffects中进行调用，
协作模式下，针对mapEffects的调用是在客户端接收服务端更新时进行调用的 调用的方法为，
```js
/**
Create a transaction that represents a set of new updates received
from the authority. Applying this transaction moves the state
forward to adjust to the authority's view of the document.
*/
function receiveUpdates(state$1, updates) {
    let { version, unconfirmed } = state$1.field(collabField);
    let { clientID } = state$1.facet(collabConfig);
    version += updates.length;
    let own = 0;
    while (own < updates.length && updates[own].clientID == clientID)
        own++;
    if (own) {
        unconfirmed = unconfirmed.slice(own);
        updates = updates.slice(own);
    }
    // If all updates originated with us, we're done.
    if (!updates.length)
        return state$1.update({ annotations: [collabReceive.of(new CollabState(version, unconfirmed))] });
    let changes = updates[0].changes, effects = updates[0].effects || [];
    for (let i = 1; i < updates.length; i++) {
        let update = updates[i];
        effects = state.StateEffect.mapEffects(effects, update.changes);
        if (update.effects)
            effects = effects.concat(update.effects);
        changes = changes.compose(update.changes);
    }
    if (unconfirmed.length) {
        unconfirmed = unconfirmed.map(update => {
            let updateChanges = update.changes.map(changes);
            changes = changes.map(update.changes, true);
            return new LocalUpdate(update.origin, updateChanges, state.StateEffect.mapEffects(update.effects, changes), clientID);
        });
        //  根据changes set进行map 
        effects = state.StateEffect.mapEffects(effects, unconfirmed.reduce((ch, u) => ch.compose(u.changes), state.ChangeSet.empty(unconfirmed[0].changes.length)));
    }
    return state$1.update({
        changes,
        effects,
        annotations: [
            state.Transaction.addToHistory.of(false),
            state.Transaction.remote.of(true),
            collabReceive.of(new CollabState(version, unconfirmed))
        ],
        filter: false
    });
```

### Facet
A facet is a labeled value that is **associated with an editor
state**. It takes inputs from any number of extensions, and combines
those into a single output value.

主要和配置相关

### Annotation

Annotations are tagged values that are used to add metadata to
transactions in an extensible way. They should be used to model
things that effect the entire transaction (such as its [time
stamp](https://codemirror.net/6/docs/ref/#state.Transaction^time) or information about its
[origin](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent)). For effects that happen
_alongside_ the other changes made by the transaction, [state
effects](https://codemirror.net/6/docs/ref/#state.StateEffect) are more appropriate.

扩展数据
### combineConfig




changes  selections  effects  在update调用之后 背后怎么做的

事务是怎么创建的


断网操作，本地versiond的更新


中心端version的维护

设计好回放操作以及编辑器内的操作


base:文件信息
CRDT: 各种操作   文件树操作以及编辑器内的操作

文件树 编辑器 shell console  



















