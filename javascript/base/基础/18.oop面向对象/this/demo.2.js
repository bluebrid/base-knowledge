/**
 * http://www.cnblogs.com/sharpxiajun/p/4148932.html
 * 其实理清上面情况也是有迹可循的，就以定义对象里的方法里传入函数为例：
　　情形一：传入的参数是函数的别名，那么函数的this就是指向window；
　　情形二：传入的参数是被new过的构造函数，那么this就是指向实例化的对象本身；
　　情形三：如果我们想把被传入的函数对象里this的指针指向外部字面量定义的对象，那么我们就是用apply和call
　　我们可以通过代码看出我的结论，代码如下：
 * @type {String}
 */
var name = "I am window";
var obj = {
    name: "sharpxiajun",
    job: "Software",
    ftn01: function(obj) {
        obj.show();
    },
    ftn02: function(ftn) {
        ftn();
    },
    ftn03: function(ftn) {
        ftn.call(this);
    }
};

function Person(name) {
    this.name = name;
    this.show = function() {
        console.log("姓名:" + this.name);
        //console.log(this);
    }
}
var p = new Person("Person");
obj.ftn01(p);

obj.ftn02(function() {
    console.log(this.name);
    //console.log(this);
});

obj.ftn03(function() {
    console.log(this.name);
    //console.log(this);
});
