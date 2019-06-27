/**
 * https://github.com/qq449245884/xiaozhi/issues/60
 * 这种方式，不能创建多个animal 对象
 */
let animal = {}
animal.name = 'Leo'
animal.energy = 10

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

animal.eat('food')