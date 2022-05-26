
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
Person.prototype.sayHi=function(){
	console.log("Hello world.")
}
function Student(name, age, classNo) {
    //实现继承参数传递
    Person.call(this, name, age);
    this.classNo = classNo;
}
Student.prototype=Object.create(Person.prototype);
Student.prototype.constructor=Student;
Student.prototype.getClassNo = function() {
    console.log(`My class no is ${this.classNo}`)
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

 