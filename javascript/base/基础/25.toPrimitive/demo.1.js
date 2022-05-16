const a = { value : 0 };
a.valueOf = function() {
    return this.value += 1;
};

a.toString = function() {
    return this.value + '-'
}
const a1 = {
    value: 0,
    valueOf: function() {
        return this.value +=1
    },
    toString:function() {
        return this.value + '-'
    }
}
console.log(a==1 && a==2 && a==3); //true
console.log(a + '')

console.log(a1==1 && a1==2 && a1==3); //true
console.log(a1 + '')