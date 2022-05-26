
func();
var func1=function(){
	console.log('function')
} 
function func(){
 console.log(' abc:'+abc);
 func1();
}
console.log(abc);
var abc='abc';
// 等价于：
var abc;
var func1;
function func(){
 console.log(' abc:'+abc);
 func1();
}
abc='abc';
func1=function(){
	console.log('function')
} 
 

