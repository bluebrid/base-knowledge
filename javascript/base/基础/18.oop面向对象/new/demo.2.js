/**
 * http://blog.csdn.net/spring21st/article/details/6307261
 */

function classA(){
	this.b=1;
}
classA.prototype.b=44;
classA.prototype.show=function(){
	console.log(this.b);
}
var b=new classA();
b.show();

/**
 * 其实javascript的new关键字只不过做了五件事情。
 *1.创建Object
 *2.查找class的prototype上的所有方法、属性，复制一份给创建的Object（注意，如果prototype上有属性是function或者数组或者Object，那么只复制指针）
 *3.将构造函数classA内部的this指向创建的Object
 *4.创建的Object的__proto__指向class的prototype
 *5.执行构造函数class
 * @param  {[type]} cls  [description]
 * @param  {[type]} args [description]
 * @return {[type]}      [description]
 */
function newClass(cls,args){  
    var obj = {};  
    for(var p in cls.prototype)  
        obj[p] = cls.prototype[p];  
    obj.__proto__ = cls.prototype;  
    cls.apply(obj,args||[]);  
    return obj;  
};  
var k = newClass(classA);  
k.show();  