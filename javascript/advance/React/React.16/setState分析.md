https://www.cnblogs.com/echolun/p/15510770.html

1. setState(updater, cb), updater 可以是Object,也可以是function 
2. setState 后要想获取最新的状态，只能在cb或者componentDidUpdate 中获取
<<<<<<< HEAD
3. setState设置成异步： react在渲染前， 会有意的进行等待， 知道所有在组件的事件处理函数调用，setState都完成后，再最终的this.state进行变更
=======
3. setState设置成异步： react在渲染钱， 会有意的进行等待， 知道所有在组件的事件处理函数调用，setState都完成后，再最终的this.state进行变更
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
这样可以避免不必要的重新渲染，来提升性能
4. 如果updater 是一个function , react 依旧做了批量合并处理如：
```jsx
class Echo extends React.Component {
  state = {
    num: 1
  }

  componentDidUpdate() {
    console.log('我是更新完成后的this.state',this.state.num); // 3, 并且只执行了一次
  }

  handleOnClick = () => {
    this.setState((state, props) => {
      console.log('第一次调用，我是最新的state',state.num)  // 1
      console.log('第一次调用，我是当前的this.state',this.state.num) // 1
      // 注意，这里用的是state，不是this.state
      return { num: state.num + 1 };
    }, () => {
      console.log('第一次调用，我是调用完成后的this.state',this.state.num) // 3
    });

    this.setState((state, preProps) => {
      console.log('第二次调用，我是最新的state',state.num) // 2
      console.log('第二次调用，我是当前的this.state',this.state.num) // 1 （this,state.num 还是1）
      return { num: state.num + 1 };
    }, () => {
      console.log('第二次调用，我是调用完成后的this.state',this.state.num) // 3
    });

    console.log('我用于检验异步，此时拿不到最新的this.state',this.state.num);//1
  }

  render() {
    console.log('用于检验render了几次'); //只执行了一次
    return (
      <>
        <div>{this.state.num}</div>
        <button onClick={this.handleOnClick}>加1</button>
      </>
    )
  }
}
```
5. 如果有多次执行setState ，如果updater 是一个object , 对于相同的key 的操作， 始终以最后一次修改为准
6. setState 在合成事件， 生命周期函数内都是异步的(下面`setTimeout`已经不是合成事件中了，所以每次都是同步的)， **，比如原生事件，定时器回调等等** 都是同步的
```jsx
class Echo extends React.Component {
  state = {
    num:1
  }

  componentDidUpdate() {
    console.log(this.state.num);//2 3 4
  }

  handleOnClick = () => {
    setTimeout(()=>{ // 
      this.setState({num:this.state.num+1});
      this.setState({num:this.state.num+1});
      this.setState({num:this.state.num+1});
      console.log(this.state.num);//4
    })
  }

  render() {
    console.log('我在render了');// 执行3次，每一次同步的setState都会执行一次
    return (
      <>
        <button onClick={this.handleOnClick}>click me</button>
      </>
    )
  }
}
```

## setState 为什么要设置为异步？
1. setState设置为异步，可以显著的提升性能
> 1. 如果每次执行setState 就去进行一次更新， 那么意味render 函数，会被频繁的调用， 界面进行渲染， 这样导致性能很差
> 2. 最好的办法是收集到所有的更新后， 之后进行批量更新
2. 如果同步更新了state,但是没有执行render函数，那么state和props 就不会同步了
> 如果state和props 不同步， 会造成很多的问题

3. setState 不一定是异步的， 他只有在合成事件和生命周期中才是异步的，在setTimeout和原生事件是同步的

> React其实是根据
```javascript
enqueueSetState(inst, payload, callback) {  
    const fiber = getInstance(inst);  // 会根据React上下文计算一个当前时间 
    const currentTime = requestCurrentTimeForUpdate();  
    const suspenseConfig = requestCurrentSuspenseConfig();  // 这个函数会返回当前是同步还是异步更新(准确的说是优先级)  
    const expirationTime = computeExpirationForFiber(    currentTime,    fiber,    suspenseConfig,  );  
    const update = createUpdate(expirationTime, suspenseConfig);   
     ...}
```



