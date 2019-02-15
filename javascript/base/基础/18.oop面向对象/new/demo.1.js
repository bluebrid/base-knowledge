/**
 * http://www.cnblogs.com/purediy/archive/2012/09/12/2682490.html
 * 下面我贴出在《javascript高级编程》里对new操作符的解释：
　　new操作符会让构造函数产生如下变化：
　　1.       创建一个新对象；
　　2.       将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
　　3.       执行构造函数中的代码（为这个新对象添加属性）；
　　4.       返回新对象
 */
function Person(name, age) {
    this.name = name;
    this.age = age;     
}
Person.prototype.sayName=function(){
    console.log(this.name);
}
/**
 * 通过New创建对象经历四个步骤
 * 1、创建一个新对象；[var o = new Object();]
 * 2、将构造函数的作用域赋给新对象（因此this指向了这个新对象）；[Person.apply(o)]  [Person原来的this指向的是window]
 * 3、执行构造函数中的代码(为这个新对象添加属性)；
 * 4、返回新对象。
 * @param  {[type]} cls [description]
 * @return {[type]}     [description]
 */
function createObject(cls) {
    //1,创建一个空对象
    var o = new Object();
    var args = Array.prototype.slice.call(arguments, 1);
    //2，将新队形的原指向构造函数
    o.__proto__ = cls.prototype;
    cls.prototype.constructor = cls;
    //3,执行构造函数，给新对象添加属性值
    cls.apply(o, args);
    //4,返回创建的新对象，也即是New创建的对象
    return o;
}

var p = createObject(Person, 'ivan', 27);
p.sayName();
var p1=createObject(Person,'king',29)
p1.sayName();
