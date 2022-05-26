/**
 * 多继承
 */
function SuperClass () {
    this.superVal = 'super'
}

function OtherSuperClass () {
    this.otherSuperVal = 'other super value'
}

function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
    this.val = 'val'
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
    console.log(this.val, this.superVal, this.otherSuperVal)
};

var myClass = new MyClass()

myClass.myMethod()