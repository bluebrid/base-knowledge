/**
 * 利用Object.create 创建了animal 对象， 不用直接去遍历animalMethods上面的所有的属性了.
 * 缺点： 我们依然需要去单独管理维护一个`animalMethods`对象， 下面我们就引出`prototype` 
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
  let animal = Object.create(animalMethods)
  animal.name = name
  animal.energy = energy

  return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)

leo.eat(10)
snoop.play(5)