function square(a) {
    var b = a * a;
    return function () {
        return b + a;
    };
}
var n = 1;
