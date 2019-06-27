/**
 * 函数实例化与共享方法:
 * 这个方法已经解决了内存浪费和对象体积过大的问题，但是我们需要额外维护一个animalMethods对象
 * 
 */
const animalMethods = {
    eat(amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    },
    sleep(length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    },
    play(length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }
}

function Animal(name, energy) {
    let animal = {}
    animal.name = name
    animal.energy = energy
    animal.eat = animalMethods.eat
    animal.sleep = animalMethods.sleep
    animal.play = animalMethods.play

    return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)