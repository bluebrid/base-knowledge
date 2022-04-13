const a = { value : 0 };
a.valueOf = function() {
    return this.value += 1;
};

a.toString = function() {
    return this.value + '-'
}
console.log(a==1 && a==2 && a==3); //true
console.log(a + '')