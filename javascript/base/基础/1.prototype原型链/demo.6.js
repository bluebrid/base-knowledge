/**
 * prototype 只是 JavaScript 中的每个函数都具有的一个属性，正如我们前面看到的，
 * 关于 new，有一件很酷的事情——当你使用new关键字调用一个函数时，以下编号为1和2两行代码将隐式地(在底层)为你完成，所创建的对象被称为this。
 * @param {*} name 
 * @param {*} energy 
 */
function Animal (name, energy) {
    // 关键点1
    //let animal = Object.create(Animal.prototype)
    this.name = name
    this.energy = energy
    // 关键点2
    //return animal
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
  
  const leo = new Animal('Leo', 7)
  const snoop = new Animal('Snoop', 10)
  
  leo.eat(10)
  snoop.play(5)