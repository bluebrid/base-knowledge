"use strict";

class Person {
    constructor(name) {
        this.name = name;
    }
    sayHi(msg) {
        console.log(`Hi,${msg}, I'am ${this.name}`)
    }
    static hello() {
        console.log('hello world')
    }

}

class Student extends Person {
    constructor(name, classNo) {
        super()
        this.name = name;
        this.classNo = classNo
    }
}
// => 转换成如下代码：
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        // 实例属性， 挂载在Constructor.prototype 上面
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        // 静态属性， 直接挂载在Constructor 上面
        if (staticProps) defineProperties(Constructor, staticProps); return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype,
        {
            constructor:
            {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function () {
    function Person(name) {
        _classCallCheck(this, Person);

        this.name = name;
    }

    _createClass(Person, [
        {
            key: 'sayHi',
            value: function sayHi(msg) {
                console.log('Hi,' + msg + ', I\'am ' + this.name);
            }
        }
    ], [
            {
                key: 'hello',
                value: function hello() {
                    console.log('hello world');
                }
            }
        ]);

    return Person;
}();

var Student = function (_Person) {
    _inherits(Student, _Person);

    function Student(name, classNo) {
        _classCallCheck(this, Student);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Student).call(this));

        _this.name = name;
        _this.classNo = classNo;
        return _this;
    }

    return Student;
}(Person);
