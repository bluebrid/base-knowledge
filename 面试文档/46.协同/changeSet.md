# 常见错误示例

## Mismatched change set lengths
出现场景： 协作场景，进行客户端ot操作时


### 正常操作
OT 的正常操作
![](vx_images/140573666937035.png =500x)

```ts
// https://codemirror.net/try
import {basicSetup, EditorView} from "codemirror"
 
const view = new EditorView({
  doc: 'abc',
  /////// extensions: [plugin,theme,basicSetup, drawSelection(),javascript()],
  parent: document.body
})
setTimeout(() => {
  view.dispatch({
  changes:[{from:2, to:3}] // // 删除c ab
})
}, 1000)
setTimeout(() => {
  view.dispatch({
  changes:[{from:0, insert:"x"}] // 在0处添加x -> xab
})
}, 1000 * 2)


```
模拟上述操作
```js
let testState = EditorState.create({doc:"abc"})

testState.doc.toString() // abc

let tr = testState.update({changes:{from:2, to:3}}) // 删除c
tr.state.doc.toString() // ab

let tr1 = testState.update({changes:{from:0, insert:"x"}}) // 在0处添加x
tr1.state.doc.toString() // xabc


// 执行OT操作 保证两端保持一致 xbc

// 删除端进行ins 操作
let changes = tr.changes
let changes1 = tr1.changes

let changes_ins = changes.compose(changes1.map(changes))
/*
changes_ins.toJSON() 
[
    [
        0,
        "x"
    ],
    2,
    [
        1
    ]
]

*/
changes_ins.apply(testState.doc)  // xab  apply的文档的长度必须要和changes_ins.length保持一致

let changes_del = changes1.compose(changes.map(changes1))

// 展开后结果一致 应为apply的输入是一致的
changes_del.apply(testState.doc) // xab

```

现在来看一下什么情况下会出现该错误,并进行研究 触发了什么条件出现该错误

```js
// 以changes_ins 为例
let changes_ins = changes.compose(changes1.map(changes))

// 做以下处理出现  Mismatched change set lengths
changes_ins = changes.compose(changes1)
```

我们对文档 两个操作，一个增加和删除， 但是这两个操作并不是在同一个客户端操作的
changes_ins的操作包含两步： map操作和compose操作
map操作： 将changes1的操作映射到changes端，相当于changes1 和changes2 是在同一个客户端操作的
compose操作： 组合操作， 将两个更改组合成一个

具体的解释   
```ts
/**
    Combine two subsequent change sets into a single set. `other`
    must start in the document produced by `this`. If `this` goes
    `docA` → `docB` and `other` represents `docB` → `docC`, the
    returned value will represent the change `docA` → `docC`.
    */
    compose(other) { return this.empty ? other : other.empty ? this : composeSets(this, other, true); }
    /**
    Given another change set starting in the same document, maps this
    change set over the other, producing a new change set that can be
    applied to the document produced by applying `other`. When
    `before` is `true`, order changes as if `this` comes before
    `other`, otherwise (the default) treat `other` as coming first.
    
    Given two changes `A` and `B`, `A.compose(B.map(A))` and
    `B.compose(A.map(B, true))` will produce the same document. This
    provides a basic form of [operational
    transformation](https://en.wikipedia.org/wiki/Operational_transformation),
    and can be used for collaborative editing.
    */
    map(other, before = false) { return other.empty ? this : mapSet(this, other, before, true); }
```


关键的代码在这里
理解一个概念：
Sections
changesSet 中包含的一个字段
```js
// Sections are encoded as pairs of integers. The first is the
// length in the current document, and the second is -1 for
// unaffected sections, and the length of the replacement content
// otherwise. So an insertion would be (0, n>0), a deletion (n>0,
// 0), and a replacement two positive numbers.

//  相等表示冲突

// example

let testState = EditorState.create({doc:"abc"})

testState.doc.length // current doc length 3


// test insert  在0的位置
testState.update({changes:{from:0, insert: "test"}}).changes // [0 4 3 -1]
// test insert  在2的位置 也就是在原来c的位置，c 向后移动
testState.update({changes:{from:2, insert: "test"}}).changes // [2, -1, 0, 4, 1, -1]
// test insert  在3的位置（相当于是末尾）
testState.update({changes:{from:3, insert: "test"}}).changes // [3, -1, 0, 4] 这一个比较符合官方的描述


// based-0  位置描述
// test delete    del a
testState.update({changes:{from:0,to:1}}).changes  // [1, 0, 2, -1]

// test delete    del b
testState.update({changes:{from:1,to:2}}).changes // 1, -1, 1, 0, 1, -1]

// test delete    del c

testState.update({changes:{from:2,to:3}}).changes // [2, -1, 1, 0]


// test replace  a->test  [被替换元素长度  替换元素长度 不变的元素长度 -1]
testState.update({changes:{from:0,to:1,insert:"test"}}) // [1, 4, 2, -1]

// test repalce ab-> test
testState.update({changes:{from:0,to:2,insert:"test"}}) // [2, 4, 1, -1]

// test replace abc->test
testState.update({changes:{from:0,to:3,insert:"test"}}) //[3, 4]

```



```ts
// setA 在changes_ins 指changes      setB  指传入内容 changes1.map(changes) 或 changes1

/*
let changes_ins = changes.compose(changes1.map(changes))  // normal
let changes_ins = changes.compose(changes1) // error
看一下 changes1以及changes1.map(changes)中的sections

changes1: [0, 1, 3, -1]  length为3

changes1.map(changes)： [0, 1, 2, -1] //  length为2 changes1的更改是删除了一个字母c 导致不变的字符个数由3变为2

再看一下 changes 的sections
changes： [2, -1, 1, 0]  length为2

*/

function composeSets(setA, setB, mkSet = false) {
    let sections = [];
    let insert = mkSet ? [] : null;
    let a = new SectionIter(setA), b = new SectionIter(setB);
    for (let open = false;;) { 
        if (a.done && b.done) {
            return insert ? new ChangeSet(sections, insert) : new ChangeDesc(sections);
        }
        else if (a.ins == 0) { // Deletion in A
            addSection(sections, a.len, 0, open);
            a.next();
        }
        else if (b.len == 0 && !b.done) { // Insertion in B
            addSection(sections, 0, b.ins, open);
            if (insert)
                addInsert(insert, sections, b.text);
            b.next();
        }
        else if (a.done || b.done) {
            throw new Error("Mismatched change set lengths");
        }
        else {
            let len = Math.min(a.len2, b.len), sectionLen = sections.length;
            if (a.ins == -1) {
                let insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
                addSection(sections, len, insB, open);
                if (insert && insB)
                    addInsert(insert, sections, b.text);
            }
            else if (b.ins == -1) {
                addSection(sections, a.off ? 0 : a.len, len, open);
                if (insert)
                    addInsert(insert, sections, a.textBit(len));
            }
            else {
                addSection(sections, a.off ? 0 : a.len, b.off ? 0 : b.ins, open);
                if (insert && !b.off)
                    addInsert(insert, sections, b.text);
            }
            open = (a.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
            a.forward2(len);
            b.forward(len);
        }
    }
}

class SectionIter {
    constructor(set) {
        this.set = set;
        this.i = 0;
        this.next();
    }
    next() {
        let { sections } = this.set;  // 取出changes 中的set 
        if (this.i < sections.length) {
            this.len = sections[this.i++];
            this.ins = sections[this.i++];
        }
        else {
            this.len = 0;
            this.ins = -2;
        }
        this.off = 0;
    }
    get done() { return this.ins == -2; }
    get len2() { return this.ins < 0 ? this.len : this.ins; }
    get text() {
        let { inserted } = this.set, index = (this.i - 2) >> 1;
        return index >= inserted.length ? Text.empty : inserted[index];
    }
    textBit(len) {
        let { inserted } = this.set, index = (this.i - 2) >> 1;
        return index >= inserted.length && !len ? Text.empty
            : inserted[index].slice(this.off, len == null ? undefined : this.off + len);
    }
    forward(len) {
        if (len == this.len)
            this.next();
        else {
            this.len -= len;
            this.off += len;
        }
    }
    forward2(len) {
        if (this.ins == -1)
            this.forward(len);
        else if (len == this.ins)
            this.next();
        else {
            this.ins -= len;
            this.off += len;
        }
    }
}

```

这个问题出现的原因kennel是因为 中间的版本没有进行完整的同步，也就是文档变化没有完整同步， 导致变化的合并不能进行（前提必须是相同的文本长度）
保证： 每次文本更改都能够同步到中心端，并且都能够应用到其他端


## Applying change set to a document with the wrong length

这个错误容易理解，参照源码可以得知

```ts
class ChangeSet extends ChangeDesc {
    ...
    /**
    Apply the changes to a document, returning the modified
    document.
    */
    apply(doc) {
        if (this.length != doc.length)
            throw new RangeError("Applying change set to a document with the wrong length");
        iterChanges(this, (fromA, toA, fromB, _toB, text) => doc = doc.replace(fromB, fromB + (toA - fromA), text), false);
        return doc;
    }
    ...
}
```
其实基本原则是，多个客户端操作时，要求文档的长度必须保持一致，
也就是**大家在相同的文档基础上进行操作**
正如该class的描述：
A change set represents a group of modifications to a document. It
stores the document length, and can only be applied to documents
with exactly that length.


客户端版本的添加，是在客户端收到来自中心端的更新后才进行添加的

这部分的操作场景包括
1. 无内容时，两人都进入后开始编辑
 重点维护好中心端的版本
2. 一人先编辑好后，其余人在进入
后续进入的人，执行getDcument操作时，只需通知后续进入的人即可
3. 网络延迟
该场景会导致 客户端版本小于中心端，此时需要通知自己去执行拉操作




##  冲突的处理
 不会丢失信息
 
```js
let testState = EditorState.create({doc:"abc"})

testState.doc.toString() // abc

let tr1 = testState.update({changes:{from:2, to:3, insert:"A"}}) //c->A
tr.state.doc.toString() // abA

let tr2 = testState.update({changes:{from:2, to:3, insert:"B"}}) // c->B
tr1.state.doc.toString() // abB


let changes1 = tr1.changes
let changes2 = tr2.changes

let changesConflict = changes1.compose(changes2.map(changes1))

changesConflict.apply(testState.doc).toString() // abAB  [2, -1, 1, 1, 0, 1]

let changesConflict2 = changes2.compose(changes1.map(changes2))

changesConflict2.apply(testState.doc).toString() // abBA  [2, -1, 1, 1, 0, 1]

```




针对这种问题的排查，早点下断言，确定那些地方会出问题



## OT的并发操作

暴力测试如何执行的，将此场景能够具像化




