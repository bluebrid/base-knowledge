https://xiaochen1024.com/article_item/600acba1245877002ed5deff

## 状态更新时机
1. ReactDOM.render
2. this.setState,
3. this.forceUpdate
4. useState
5. useReducer

## forceUpdate
1. 在创建**Update**的时候，会设置一个**tag** 为**forceUpdate**
2. 如果标记ForceUpdate，render阶段组件更新会根据checkHasForceUpdateAfterProcessing，和checkShouldComponentUpdate来判断，如果Update的tag是ForceUpdate，则checkHasForceUpdateAfterProcessing为true，当组件是PureComponent时，checkShouldComponentUpdate会浅比较state和props，所以当使用this.forceUpdate一定会更新
![](https://xiaochen1024.com/_18.png)