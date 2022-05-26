const myInstanceof = (obj, target) => {
    if (!obj || !target) return false;
    const targetProto = target.prototype
    const leftProto = obj.__proto__
    while(leftProto) {
        if (leftProto === targetProto) {
            return true
        }
        target = target.__proto__
    }
    return false;
}

const a  = [12,3]

console.log(myInstanceof(a, Object))