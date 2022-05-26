if (!Object.prototype.extend) {
    Object.prototype.extend = function(supperCls) {
        // 暂存子类原型
        var sbp = this.prototype;
        // 重写子类原型--原型继承
        this.prototype = new supperCls();
        //重写后一定要将constructor指回subcls
        this.prototype.constructor = this;
        //还原子类原型
        for (var atr in sbp) {
            this.prototype[atr] = sbp[atr];
        }
        // 暂存父类
        this.supr = supperCls;
    }
}


function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getName = function() {
    console.log(`My name is ${this.name}`);
}
Person.prototype.getAge = function() {
    console.log(`I am ${this.age} old.`);
}

function Student(name, age, classNo) {
    //实现继承参数传递
    Student.supr.call(this, name, age);
    this.classNo = classNo;
}
Student.prototype.getClassNo = function() {
    console.log(`My class no is ${this.classNo}`)
}

Student.extend(Person);
Person.prototype.sayHi=function(){
	console.log("Hello world.")
}
var student = new Student('ivan', '27', 'C001');
student.getName();
student.getAge();
student.getClassNo();
student.sayHi();
console.log('************************')
var person=new Person('king','30');
person.getName();
person.getAge();
person.getClassNo?person.getClassNo():console.log("getClassNo is not the Person method.")
