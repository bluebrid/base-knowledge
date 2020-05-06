/**
 * http://www.cnblogs.com/sharpxiajun/p/4148932.html
 * 如果在javascript语言里没有通过new（包括对象字面量定义）、call和apply改变函数的this指针，函数的this指针都是指向window的。
 */

var obj = {
    name: "sharpxiajun",
    job: "Software",
    show: function() {
        console.log("Name:" + this.name + ";Job:" + this.job);
        //console.log(this); // Object { name="sharpxiajun", job="Software", show=function()}
    }
};
var otherObj = new Object();
otherObj.name = "xtq";
otherObj.job = "good";
otherObj.show = function() {
    console.log("Name:" + this.name + ";Job:" + this.job);
    console.log(this); // Object { name="xtq", job="good", show=function()}
};
obj.show(); //Name:sharpxiajun;Job:Software
otherObj.show(); //Name:xtq;Job:good
var show = obj.show;
show()