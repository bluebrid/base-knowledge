https://www.cnblogs.com/nanchen/p/7905528.html

## ToPrimitive(input , PreferredType) 的流程

1. input的值为原始值，则直接返回
2. 不是原始值，调用该对象的valueOf()方法， 如果结果是原始值，则返回原始值
3. 调用valueOf()不是原始值， 则调用该对象的toString()方法， 如果结果是原始值，则返回原始值
4. 如果返回的不是原始值， 抛出异常TypeError

其中PreferedType 控制调取valueOf()和toString()

**Date**类型按照string去调用

## 数据运算符
1. 如果是数据运算符`-`, `*`, `\`, 则都直接准话成Number来计算
2. 如果是单目运算`+`, 则转换成Number,如： `+'2'`, 则直接转换成数字`2`,
3. 如果是双目运算`+`, 如果其中有任何一个值的原始值是字符串，则全部转换成字符串进行相加，如果没有原始值是字符串，则全部转换成Number进行相加

## 特殊案例

1. `[]`, 空数组， 其对应的`[].valueOf() == []`, `[].toString() == ''`
2. `[1,3]`, 有值的数组， 其对应的： `[1,2].valueOf() == [1,2]// 就是对应的数组`, `[1,2].toString() == '1,2'// 是一个值拼接的字符串`
3. `{}`, 空对象， 其对应的： `{}.valueOf() == {}//就是对应的空对象`, `{}.toString() == '[object Object]' // 是一个对应的字符串`
4. `{a:1}`, 有值的对象， 其对应的： `{a:1}.valueOf() == {a:1}// 就是对应的对象`, `{a:1}.toString() == '[object Object]' // 是一个对应的字符串`

下面来解析(**+**)
1. `[] + []`
> 输出的结果是： '' 是一个空字符串
> 因为先都转换成原始类型， []的值就是'',所以就想两个空字符串相加
2. `{} + {}`
> 输出的结果是：`[object Object][object Object]`这样的一个字符串 
3. `[] + {}`
> 输出的结果是： `[object Object]`这样的字符串
4. `[1,2] + {}`
> 输出结果是： `1,2[object Object]`
5. `[1,2]+[3,4]`
> 输出结果是： `1,23,4`

## 比较运算
因为`===`严格相等，是必须值相等，而且类型相等才为`true`, 否则都为`false`

比较特殊的是`==`宽相等，下面来分析下如下几个情况`x==y`
1. xy都为`null`,或者`undefined`结果返回`true`
2. xy中有任何一个值为`NaN`,返回`false`, 因为`NaN`不与任何值相等
3. 如果存在Object, 则转换为原始值在比较
4. 如果xy为string, numbere ,boolean并且类型不一致， 都转换为**Number** 来进行比较

下面来分析案例：

1. `[] == false` 其结果返回`true`
> 1. 首先`[]`返回的原始类型是一个空字符， 然后在转换成Number , 其值为： 0
> 2. false是一个Boolean类型， 转换成Number， 其值为： 0
> 3. 所以 [] == false 其转换为： 0 == 0 所以相等

2. `{} == false`, 其结果为`false`
> 1. 首先`{}`返回的原始类型是一个字符串`[object Object]`, 其在转换成Number, 也就是`Number('[object Object]')` 对应的值为`NaN`
> 2. `false`转换成Number 其对应的值为： 0
> 3. 因为`NaN`与任何值都不相等, 所以返回的是`false`

## Boolean值的转换
转换成falsely 的值有如下， `NaN`, `null`, `undefined`, `0`(是Number类型的0， 如果是字符串类型的0, 转换成Boolean 也是true)

**如果是一个字符串，且值为`false`, 转换成Boolean的值也是true**