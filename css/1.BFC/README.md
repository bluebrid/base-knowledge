[我对BFC的理解](https://www.cnblogs.com/dojo-lzz/p/3999013.html)

## BFC 生成方式
1. float 不为none
2. display: inline-block, table-cell
3. position : absolute, relative
4. overflow的值不为： visiable

## BFC的应用
1. 防止margin 重叠
2. float 的高度问题
3. BFC不会与float重叠，所以可用用来做三列布局
