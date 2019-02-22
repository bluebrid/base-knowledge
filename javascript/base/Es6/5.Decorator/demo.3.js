
const readonly = (target, name, descriptor) => {
    descriptor.writable = false
    return descriptor
}

const timer = (target, name, descriptor) => {
    // Creamos una referencia a la "vieja" función
    let fn = descriptor.value
    // Modificamos la función
    descriptor.value = function () {
        console.time(name)
        let result = fn.apply(this, arguments)
        console.timeEnd(name)
    }
    // apply on property
    Object.defineProperty(target, name, descriptor);
}

// Este metodo es más elegante
const decorate = (...args) => {
    return (target) => {
        Object.assign(target.prototype, ...args)
    }
}

const beSuperhero = {
    isSuperhero: true,
    canFly: true,
    fly: () => {
        console.log(`I'm flying!`)
    }
}

const convertInSuperhero = (target) => {
    let fly = () => {
        return `I'm flying!`
    }
    // Attach it to the prototype
    target.prototype.isSuperhero = true
    target.prototype.fly = fly
    target.prototype.canFly = true
}



// @convertInSuperhero
@decorate(beSuperhero)
class Person {

    constructor(first = '', last = '') {
        this.first = first
        this.last = last
        this.age = 0
    }

    @timer
    grow(age) {
        for (let i = 0; i < age; i++) {
            this.age = i
        }
    }
}

const p = new Person('Edgar Bermejo')
console.log(p.isSuperhero)
console.log(p.canFly)
console.log(p.fly())
p.grow(999)


