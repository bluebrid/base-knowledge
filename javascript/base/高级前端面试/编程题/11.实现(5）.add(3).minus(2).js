Number.prototype.add = function(val) {
    return this + val
}
Number.prototype.minus = function(val) {
    return this - val
}

console.log((5).add(3).minus(2))