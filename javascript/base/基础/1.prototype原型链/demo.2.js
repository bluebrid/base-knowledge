/**
 * https://github.com/qq449245884/xiaozhi/issues/60
 * 函数的实例化：
 * 这种方法的缺点是浪费内存， 我们没创建一个Animal 对象时，都会创建一个animal对象
 * @param {*} name 
 * @param {*} energy 
 */
function Animal(name, energy) {
    let animal = {}
    animal.name = name
    animal.energy = energy

    animal.eat = function (amount) {
        console.log(`${this.name} is eating.`)
        this.energy += amount
    }

    animal.sleep = function (length) {
        console.log(`${this.name} is sleeping.`)
        this.energy += length
    }

    animal.play = function (length) {
        console.log(`${this.name} is playing.`)
        this.energy -= length
    }

    return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)