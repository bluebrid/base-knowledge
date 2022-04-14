// 实现sum(100,200)(300)(...)(...)()

function sum(...args) {
    var items = [...args]
    if (args.length === 0) return 0
    var subSum = (...args1) => {
        if (args1.length === 0) {
            return items.reduce((init, next) => {
                init += next
                return init
            }, 0 )
        } else {
            items = items.concat(args1)
            return subSum
        }
    }
    return subSum
}
console.log(sum(10))
console.log(sum(10)())
console.log(sum(100, 200)(100)(200, 400, 600)())