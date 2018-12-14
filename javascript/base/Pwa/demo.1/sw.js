const CACHE_NAME = 'demo_v1.0'
// 需要缓存的静态资源
const URLS_TO_CACHE = [
    '/offline.html',
    '/offline.png'
]
/**
   *  1,在安装后，去缓存相应的静态资源,
   *  2,只有URLS_TO_CACHE中全部的文件安装完成，SW才会算安装成功，否则安装失败
   *  3，所以在Install 方法中，应该尽量少的缓存文件
  */
self.addEventListener('install', event => {
    self.skipWaiting()
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(URLS_TO_CACHE)
            })
    )
})

/**
 * 1. 更新客户端
 * 2. 清理旧版本
 */
self.addEventListener('activate', event => {
    Promise.all([
        // 更新客户端
        clients.claim(),
        // 清理旧的版本
        caches.keys()// return promise.
            .then(cacheList => Promise.all(
                cacheList.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        caches.delete(cacheName)
                    }
                })
            ))
    ])
})

/**
 * 1. 先去caches 中去查找是否存在, 如果命中缓存，则直接返回缓存，否则进行下一步
 * 2. 判断是否离线
 * 3. 
 */
function onlineRequest(request) {
    return fetch(request)
    .then(res => {
        if (
            !res
            || res.status !== 200
            || !res.headers.get('Content-type').match(/image|javascript|test\/css/i)
        ) {// 非image, javascript, test, css 文件不缓存，比如说通过接口获取数据的，是不缓存的
            return res
        }
        caches.open(CACHE_NAME)
        .then(cache => {
            cache.put(request, res)
        })
        return res
    })
    .catch( () => {
        offlineRequest(request)
    })
}
function offlineRequest(request) {
    if(request.url.match(/\.(png|gif|jpg)$/i)) {
        return caches.match('/images/offline.png')
    }
    if (request.url.match(/\.html$/)){
        return caches.match('/test/offline.html')
    }
}
self.addEventListener('fetch', event => {
    event.respondWidth (
        caches.match(event.request)
        .then(hit => {
            if(hit) {
                return hit
            }
            const fetchRequest = event.request.clone()
            if(navigator.online) {
                return onlineRequest(fetchRequest)
            } else {
                return offlineRequest(fetchRequest)
            }
        })
    )
})

