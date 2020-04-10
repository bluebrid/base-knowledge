function cloneJSON(source) {
    return JSON.parse(JSON.stringify(source));
}

 

var test={
    a:"ss",
    b:"dd",
    c:[
        {dd:"css",ee:"cdd"},
        {mm:"ff",nn:"ee"}
    ]
};
var test1 = JSON.parse(JSON.stringify(test));//拷贝数组,注意这行的拷贝方法
console.log(test);
console.log(test1);
test1.c[0].dd="change"; //改变test1的c属性对象的d属性
console.log(test);  //不影响test
console.log(test1);

// 不能包含引用对象