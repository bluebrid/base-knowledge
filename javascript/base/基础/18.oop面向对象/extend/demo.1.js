/**
 * [extend description]
 * @param  {[type]} subCls    [description]
 * @param  {[type]} supperCls [description]
 * @param  {[type]} pars      [description]
 * @return {[type]}           [description]
 */
function extend(subCls, supperCls) {
    // 暂存子类原型
    var sbp = subCls.prototype;
    // 重写子类原型--原型继承
    subCls.prototype = new supperCls();
    //重写后一定要将constructor指回subcls
    subCls.prototype.constructor = subCls;
    //还原子类原型
    for (var atr in sbp) {
        subCls.prototype[atr] = sbp[atr];
    }
    // 暂存父类
    subCls.supr = supperCls;
}

function Person(name,age){
	this.name=name;
	this.age=age;
}
Person.prototype.getName=function(){
	console.log(`My name is ${this.name}`);
}
Person.prototype.getAge=function(){
	console.log(`I am ${this.age} old.`);
}

function Student(name,age,classNo){
	Student.supr.call(this,name,age);
	this.classNo=classNo;
}
Student.prototype.getClassNo=function(){
	console.log(`My class no is ${this.classNo}`)
}

extend(Student,Person);
var student=new Student('ivan','27','C001');
student.getName();
student.getAge();
student.getClassNo();
console.log('************************')
var person=new Person('king','30');
person.getName();
person.getAge();
person.getClassNo?person.getClassNo():console.log("getClassNo is not the Person method.")




