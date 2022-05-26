class CreateUser {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}

const proxyMode = (function() {
    let _instance = null;
    return (name) => {
        if (!_instance) {
            _instance = new CreateUser(name);
        }
        return _instance;
    }
})()

const a = proxyMode('ivan');
const b = proxyMode('jake');
console.log(a===b);