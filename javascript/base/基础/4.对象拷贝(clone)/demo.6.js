function  structuralClone(obj)  {
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    });
}

const obj = {
    name: 'ivan',
    age: 18,
    addredd: {
        a: 'a',
        b: 'b'
    }
}

const clone = await structuralClone(obj);
obj.name = "ken"
clone.age = 33
obj.addredd.a = 'a1'
console.log(obj)
console.log(clone)