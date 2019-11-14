let client = {
    url: 'ws://localhost:8080/ws',
    onLoad() {
        this.linkSocket()
    },
    linkSocket () {
        this.socket = new WebSocket(this.url);
        this.socket.onopen = (msg) => {
            console.log('连接成功！')
        }
    }
}