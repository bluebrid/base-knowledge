var window = window || global;
var a = 123;

function func() {
  console.log(a);
  a = 11;
  console.log(a)
  var a = 15;
  console.log(a);
}
//func();

//等价于：
function func01() {
  var a;//变量定义提升
  console.log(a);
  a = 11;//给变量赋值
  console.log(a);
  a = 15;//给变量重新赋值
  console.log(a);
}
//func01();


function func02() {
  var a;//变量定义提升
  console.log(window.a);// 在浏览器下面运行，window.a=123;
  a = 11;//给变量赋值
  console.log(a);//11
  a = 15;//给变量重新赋值
  console.log(a);//15
  console.log(window.a);// 123
}
func02();