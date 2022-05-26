// https://mp.weixin.qq.com/s?__biz=MzIzNjcwNzA2Mw==&mid=2247487230&idx=1&sn=a12a6e3417664ae9afb2206b44a51824&chksm=e8d28366dfa50a70e4fef2f6470c68df75a28f6b92491ee522d290f7483bfbdbe7f0d7ee249d&mpshare=1&scene=1&srcid=&sharer_sharetime=1585135146148&sharer_shareid=3efb78b5e058f0088976a184d31a463b&key=eadb0cb5ef4c17525847d2438c0639ba9beed1b6cb0541f0ec4dc0b3ed455b17fd6fcc5c8f1fce24d587f277b9db428c2f99d5db90af573dac7c7db7fd84dd00166266b824222cab30b1d920ed662c05&ascene=1&uin=MjEwNzg0ODc4Mg%3D%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=A5K%2BteLrSVWbE3yblrvrmIs%3D&pass_ticket=d8r%2FaEPu0uV8VrKPxH9MxuJesOqWiHs5IG80zW6USemiHeANVAcJYtVQ8Pc0IWgD
//movie is a target
const movie = {
    name: "Pulp Fiction",
    director: "Quentin Tarantino"
};

//this is a handler
const handler = {
    //get is a trap
    get: (target, prop) => {
        if (prop === 'director') {
            return 'God'
        }
        return target[prop]
    },

    set: function (target, prop, value) {
        if (prop === 'actor') {
            target[prop] = 'John Travolta'
        } else {
            target[prop] = value
        }
    }
};

const movieProxy = new Proxy(movie, handler);

console.log(movieProxy.director); //God

movieProxy.actor = "Tim Roth";
movieProxy.actress = "Uma Thurman";

console.log(movieProxy.actor); //John Travolta
console.log(movieProxy.actress); //Uma Thurman