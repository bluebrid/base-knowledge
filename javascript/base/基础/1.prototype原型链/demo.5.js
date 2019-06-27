/**
 * prototype 只是 JavaScript 中的每个函数都具有的一个属性，正如我们前面看到的，
 * 它允许我们跨函数的所有实例共享方法。
 * 我们所有的功能仍然是相同的，但是现在我们不必为所有的方法管理一个单独的对象，我们只需要使用 Animal 函数本身内置的另一个对象Animal.prototype。
 * @param {*} name 
 * @param {*} energy 
 */
function Animal (name, energy) {
    // 关键点1
    let animal = Object.create(Animal.prototype)
    animal.name = name
    animal.energy = energy
    // 关键点2
    return animal
  }
  
  Animal.prototype.eat = function (amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  }
  
  Animal.prototype.sleep = function (length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  }
  
  Animal.prototype.play = function (length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
  
  const leo = Animal('Leo', 7)
  const snoop = Animal('Snoop', 10)
  
  leo.eat(10)
  snoop.play(5)