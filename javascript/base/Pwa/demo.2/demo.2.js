if ('serviceWorker' in navigator) {
    // 注册
    navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(function (registration) {
            console.log('ServiceWorker 注册成功！作用域为: ', registration.scope);
        })
        .catch(function (err) {
            console.log('ServiceWorker 注册失败: ', err);
        });

    // SW 消息处理
    navigator.serviceWorker.ready.then(function (reg) {
        if (!window.Notification || !window.MessageChannel) {
            return;
        }

        // 建立一个消息管道，用于当前页面与 SW 之间的消息传递，也便于 SW 知道该消息的来源
        var channel = new window.MessageChannel();

        channel.port1.onmessage = function (e) {
            console.log('get Message: ', e.data);
            if (!e.data) {
                return;
            }

            // 要求申请通知权限
            if (e.data.type === 'applyNotify') {
                window.Notification.requestPermission().then(function (grant) {
                    if (grant !== 'granted') {
                        console.log('申请通知权限被拒绝了！')
                        return;
                    }

                    reg.active.postMessage({ type: 'notify', info: e.data.info }, [channel.port2]);
                });
            }
        }

        reg.active.postMessage('hello', [channel.port2]);
    });

    this.offlineNotify();
}