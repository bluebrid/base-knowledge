1. 在demo.1 中, 在输入框中输入任何值， home，detail 和search 组件都会重新渲染
2. 在demo.2 中， detail组件，用memo处理过， 则在输入框中输入任何的值，只会有home, search 重新渲染
3. 在demo.3 中， home 中handleSearchIdChange 方法用useCallback包裹，在输入框中输入任何的值， serach组件也不会渲染， 只有home组件渲染

useCallback 是用来缓存函数的， 所有需要缓存函数的地方都是useCallback的场景。

函数是引用类型， 如果每次重新创建函数， 与之前的创建的函数是不会相等的， 如果一个组件接收一个函数作为属性， 这个函数，如果每次都是重新创建，
则这个组件都会重新render