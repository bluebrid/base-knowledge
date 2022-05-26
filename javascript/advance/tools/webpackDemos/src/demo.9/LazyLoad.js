import React from 'react'
import Loadable from 'react-loadable'
const Loading = () => <div>Loading...</div>
/**
 * import不支持动态路径，是因为webpack需要先扫一遍js文件，
 * 找出里面按需加载的部分，进行按需打包，但不会关心内部的js执行上下文，
 * 也就是说，在webpack扫描的时候，js中的变量并不会计算出结果，所以import不支持动态路径。
 * 所以LazyLoad01 传入一个动态的path的方法是行不通的
 */
const LazyLoad01 = (path) => {
    return Loadable({
        loader: () => import(path),
        loading: Loading
    })
}

const LazyLoad = (loader) => {
    return Loadable({
        loader,
        loading: Loading
    })
}
export default LazyLoad