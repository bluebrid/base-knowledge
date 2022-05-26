import LazyLoad from '../LazyLoad'

export default [
    {
        path: "/a",
        component: LazyLoad(() => import(/* webpackChunkName: "chunckA" */'../a.js'))
    },
    {
        path: "/b",
        component: LazyLoad(() => import(/* webpackChunkName: "chunckB" */'../b.js')),
        routes: [
            {
                path: "/b/c",
                component: LazyLoad(() => import(/* webpackChunkName: "chunckC" */'../c.js'))
            },
            {
                path: "/b/d",
                component: LazyLoad(() => import(/* webpackChunkName: "chunckD" */'../d.js'))
            }
        ]
    }

]
// export 
