var Person = function (name, sex) {
    this.name = name;
    this.sex = sex;
    var _privateVariable = "";//私有变量    
    //构造器中定义的方法，即为私有方法
    function privateMethod() {
        _privateVariable = "private value";
        console.log("私有方法被调用！私有成员值：" + _privateVariable);
    }
    privateMethod(); //构造器内部可以调用私有方法            
}

Person.prototype.sayHello = function () {
    console.log("姓名：" + this.name + "，性别：" + this.sex);
}

var p = new Person("菩提树下的杨过", "男");
p.sayHello();



const PASSWORD = Symbol()

class Login {
    constructor(username, password) {
        this.username = username
        this[PASSWORD] = password
    }

    checkPassword(pwd) {
        return this[PASSWORD] === pwd
    }
}

const login = new Login('admin', '123456')


login.checkPassword('123456')  // true

console.log(login.PASSWORD) // oh!no!
console.log(login[PASSWORD]) // oh!no!


class Person1 {
    constructor(name) {
        this.name = name;
        this._sex = 'male';
        return new Proxy(this, {
            get: function (target, prop) {
                if (prop.toString().indexOf('_') === 0) {
                    throw new TypeError('private method');
                }
                return target[prop];
            },
            set: function (target, prop, value) {
                if (prop.toString().indexOf('_') === 0) {
                    throw new TypeError('private property');
                }
                target[prop] = value;
            }
        });
    }
    print() {
        console.log(this.name);
    }
    _change(name) {
        this.name = name;
    }
}

const me = new Person1('Eric');

console.log(me._sex) // typeerror

me.print() // 'Eric'

me._change('Kevin') // typeerror